const Eris = require("eris");
const KyurisError = require("./errors/KyurisError");
const KyurisMessages = require("./errors/KyurisMessages");
const KyurisHandler = require("./utils/KyurisHandler");
const Command = require("./structures/KyurisCommand");
const Event = require("./structures/KyurisEvent");
const Logger = require("./utils/KyurisLogger");
const Constants = require("./utils/KyurisConstants");
const path = require("path");
const readdirp = require("readdirp");

class KyurisClient extends Eris.Client {

    /**
     * An Extended Of Eris Client
     * @param {String} token The bot's token
     * @param {Object} [kyurisOptions] Kyuris Options
     * @param {String | Number} [kyurisOptions.embedColor] The color which will represent in embeds
     * @param {Object} [kyurisOptions.enableCustomEvents] [DEPRECATED] Whether to use custom `ready` or `messageCreate` events. Note: 11/10 not recommended to use custom `messageCreate` or Kyuris won't able to handle messages and commands unless you know what you're doing
     * @param {Boolean} [kyurisOptions.enableCustomEvents.messageCreate] [DEPRECATED] [NOT RECOMMENDED] Whether to use custom `messageCreate` event
     * @param {Boolean} [kyurisOptions.enableCustomEvents.ready] [DEPRECATED] Whether to use custom `ready` event
     * @param {Boolean} [kyurisOptions.enablePresence=false] Whether to enable game presence or not
     * @param {Boolean} [kyurisOptions.ignoreAllBots=true] Whether to ignore all bot accounts or not
     * @param {Array<String>} [kyurisOptions.ownerID] An array of the bot's owner ID
     * @param {String | Array<String>} [kyurisOptions.prefix="@mention "] The bot prefix. Use an array of prefixes strings
     * @param {Eris.ActivityPartial<Eris.BotActivityType>} [kyurisOptions.presences={}] A presence object
     * @param {String} [kyurisOptions.presences.name="with Kyuris"] The name of the bot's presence game
     * @param {Number} [kyurisOptions.presences.type=0] The type of game. 0 is playing, 1 is streaming (Twitch only), 2 is listening, 3 is watching, 5 is competing in
     * @param {String} [kyurisOptions.presences.url=null] The url of the bot's presence game
     * @param {Eris.Status} [kyurisOptions.status="online"] The bot's status, either "online", "idle", "dnd", or "offline". `kyurisOptions.enablePresence` must be true to use this
     * @returns {KyurisClient}
     */
    constructor(token, kyurisOptions) {

        if (!token) {

            throw new KyurisError(KyurisMessages.LIBRARY.MISSING_TOKEN);

        }

        if (!kyurisOptions.prefix || kyurisOptions.prefix.length === 0) {

            throw new KyurisError(KyurisMessages.LIBRARY.NO_PREFIX);

        }

        super(token, kyurisOptions);

        this.commands = new Eris.Collection();
        this.events = new Set();
        this.kyurisHandler = new KyurisHandler(this)
        this.kyurisOptions = Object.assign({
            embedColor: "RANDOM",
            enableCustomEvents: { messageCreate: false, ready: false },
            enablePresence: false,
            ignoreAllBots: true,
            prefix: "@mention ",
            ownerID: [],
            presences: { name: "with Kyuris", type: 0, url: null },
            status: "online"
        }, kyurisOptions);
        this.prefix = kyurisOptions.prefix;
        this.token = token;

        this.commandFiles = [];
        this.eventFiles = [];

    }

    /**
     * Emitted Events
     * @private
     */
    async _addEventsListeners() {

        /* Fired When Client Is Ready*/
        if (this.kyurisOptions.enableCustomEvents.ready) {

            return null;

        } else {

            this.on("ready", this._readyEvent);

        }

        /* Fired When A Message Is Create */
        if (this.kyurisOptions.enableCustomEvents.messageCreate) {

            return null;

        } else {

            this.on("messageCreate", this._onMessageCreate);

        }

    }

    /**
     * 
     * @param {Eris.Message<Eris.TextableChannel>} message 
     * @returns {Eris.Message<Eris.TextableChannel>}
     */
    async _onMessageCreate(message) {

        this._messageCreateEvent(message);

    }

    /**
     * 
     * @param {Eris.Message<Eris.TextableChannel>} message 
     * @returns {Eris.Message<Eris.TextableChannel>}
     */
    async _messageCreateEvent(message) {

        try {

            let prefix = null;

            if (message.author.bot) return;

            if (Array.isArray(this.prefix)) {

                if (this.prefix.length === 0) {

                    throw new KyurisError(`The array of passed prefixes mustn't be empty!`);
              
                }

                const mentionIndex = this.prefix.indexOf('@mention');

                if (mentionIndex !== -1) {

                    this.prefix.splice(mentionIndex, 1);

                    this.prefix.push(`<@!${this.user.id}> `, `<@${this.user.id}> `);
              
                }
                
                for (const pf of this.prefix) {

                    if (message.content.startsWith(pf)) {

                        prefix = pf;
                        break;
                 
                    }
               
                }

            } else {
               
                if (this.prefix.toLowerCase() === '@mention') {

                    if (message.content.startsWith('<@!')) {

                        prefix = `<@!${this.user.id}> `;
                
                    } else {

                        prefix = `<@${this.user.id}> `;
                 
                    }
                } else {

                    prefix = this.prefix;
               
                }

            }

            if (!message.content.startsWith(prefix)) return;
            if (message.content === prefix) return;

            message.prefix = prefix;

            this.kyurisHandler.handleMessage(message, this.commands);

        } catch (err) {
            
            Logger.error("KYURIS - ERROR", `An Error Occured When Emitting messageCreate Event: ${err}`);

        }

    }

    async _readyEvent() {

        if (this.kyurisOptions.enablePresence) {

            this.editStatus(this.kyurisOptions.status || "online", this.kyurisOptions.presences || { name: "with Kyuris", type: 0, url: null });

        }

        Logger.success("KYURIS - BOT", `${this.user.username}#${this.user.discriminator} Has Gone Online!`)

    }

    async _registerKyurisCommands() {

        const dir = path.dirname(require.main.filename);
        const custDirFilter = [];

        if (
            this.kyurisOptions.excludeDirectories !== void 0
            && Array.isArray(this.kyurisOptions.excludeDirectories)
            && this.kyurisOptions.excludeDirectories.length >= 1
        ) {

            this.kyurisOptions.excludeDirectories.forEach((dirItem) => {

                if (dirItem.length > 0) {

                    custDirFilter.push(`!${dirItem}`);

                }

            });

        }

        const readFiles = await readdirp.promise(dir, { fileFilter: "*.js", directoryFilter: ["!.git", "!*modules", ...custDirFilter ]});

        this.commandFiles = readFiles.map((file) => file.path);

        for (const kyurisCommandFile of this.commandFiles) {

            let kyurisCommand = require(path.join(dir, kyurisCommandFile));

            if (kyurisCommand.__esModule) {

                kyurisCommand = kyurisCommand.default;

            }

            if (this.commands.has(kyurisCommand.name) && (kyurisCommand instanceof Command)) {

                throw new KyurisError(KyurisMessages.LIBRARY.COMMAND_EXIST.replace("{command}", kyurisCommand.name));

            }

            if (kyurisCommand instanceof Command) {

                this.commands.set(kyurisCommand.name, kyurisCommand);

            }

        }

        Logger.success("KYURIS - COMMANDS", `Successfully Loaded ${this.commands.size} ${this.commands.size === 1 || this.commands.size === 0 ? "Command" : "Commands"}`)

    }

    async _registerKyurisEvents() {

        const dir = path.dirname(require.main.filename);
        const custDirFilter = [];

        if (
            this.kyurisOptions.excludeDirectories !== void 0
            && Array.isArray(this.kyurisOptions.excludeDirectories) 
            && this.kyurisOptions.excludeDirectories.length >= 1
        ) {

            this.kyurisOptions.excludeDirectories.forEach((directoryItem) => {
                if (directoryItem.length > 0) {
                    custDirFilter.push(`!${directoryItem}`);
                }
            });
       
        }

        const readFiles = await readdirp.promise(dir, { fileFilter: '*.js', directoryFilter: ['!.git', '!*modules', ...custDirFilter]});

        this.eventFiles = readFiles.map((file) => file.path);

        for (const kyurisEventFile of this.eventFiles) {

            let kyurisEvent = require(path.join(dir, kyurisEventFile));

            if (kyurisEvent.__esModule) {

                kyurisEvent = kyurisEvent.default;

            }

            kyurisEvent.client = this;

            if (kyurisEvent instanceof Event) {

                if (!Constants.EVENTS.EVENT_NAMES.includes(kyurisEvent._eventName)) {

                    throw new KyurisError(`Unknown event called "${kyurisEvent._eventName}" in file "${kyurisEventFile}". Event names are case sensitive! Check https://abal.moe/Eris/docs/Client for an event overview.`)
            
                }

                if (typeof kyurisEvent.run === 'undefined') {

                    throw new KyurisError(`Couldn't find main executor "run" in event file "${kyurisEventFile}"!`);
              
                }

                this.events.add(kyurisEvent);

            }

        }

        this.events.forEach((event) => {

            this.on(event._eventName, event.run);

        });

        Logger.success("KYURIS - EVENTS", `Successfully Loaded ${this.events.size} ${this.events.size === 1 || this.events.size === 0 ? "Event" : "Events"}`)

    }

    /**
     * Run the Bot.
     * This includes connecting the bot to Discord gateway and load all commands & events
     * @returns {Promise<void>}
     */
    async run() {

        /* Connect to Discord */
        this._addEventsListeners();
        this._registerKyurisCommands();
        this._registerKyurisEvents();
        this.connect().catch((err) => Logger.error("KYURIS - ERROR", `Error When Connecting: ${err}`));

    }

}

module.exports = KyurisClient;