const Eris = require("eris");
const Util = require("./KyurisUtil");
const Logger = require("./KyurisLogger")
const Kyuris = require("../../Kyuris");
const RichEmbed = require("../structures/KyurisEmbed");
const KyurisError = require("../errors/KyurisError");
const KyurisMessages = require("../errors/KyurisMessages");
const juration = require('juration');

class KyurisHandler {

    /**
     * Handle things
     * @param {Kyuris.Client} kyuris Kyuris Client (Extended of Eris.Client)
     */
    constructor(kyuris) {

        this.kyuris = kyuris;
        this.cooldowns = new Eris.Collection();
        this.defaultPermissions = ["readMessageHistory", "sendMessages", "viewChannel"];

    }


    /**
     * Handle messages & commands
     * @param {Eris.Message<Eris.TextableChannel} message The message object emitted from Discord 
     * @param {Eris.Collection<Kyuris.Command>} commands A collection containing all registered commands 
     */
    async handleMessage(message, commands) {

        const commandArgs = message.content.slice(message.prefix.length).split(/ +/);
        const commandName = commandArgs.shift().toLowerCase();
        const command = commands.get(commandName) || commands.find(kyurisCommand => kyurisCommand.aliases);
        const kyurisConfig = this.kyuris.kyurisOptions;

        if (!command) return;

        if (message.channel.type !== 0 && !command.allowInDMs) return;

        if (message.channel.type === 0) {

            const permissions = (!command.permissions) ? this.defaultPermissions : this.defaultPermissions.concat(command.permissions);
            let missingPermissions = [];

            for (let i = 0; i < permissions.length; i++) {

                if (!message.channel.permissionsOf(this.kyuris.user.id).has(permissions[i])) {

                    missingPermissions.push(Util.formatPerms(permissions[i]));

                }

            }

            if (missingPermissions.length) {

                return this.kyuris.createMessage(message.channel.id, { content: KyurisMessages.LIBRARY.NO_PERMISSIONS.replace("{command}", command.name).replace("{missingPerms}", missingPermissions.join(", ")) }).catch((err) => {



                });

            }

            const userPermissions = (!command.userPermissions) ? false : command.userPermissions;
            let missingUserPermissions = [];

            if (userPermissions) {

                for (let j = 0; j < userPermissions.length; j++) {

                    if (!message.member.permissions.has(userPermissions[j])) {

                        missingUserPermissions.push(Util.formatPerms(userPermissions[j]));

                    }

                }

            }

            if (missingUserPermissions.length) {

                return this.kyuris.createMessage(message.channel.id, { content: KyurisMessages.LIBRARY.NO_PERMISSIONS.replace("{command}", command.name).replace("{missingPerms}", missingPermissions.join(", ")) }).catch((err) => {

                    Logger.error("KYURIS - FORBIDDEN", `Error Sending Message In #${message.channel.name} (${message.channel.id}) | ${err}`);

                });

            }
        }

        if (command.ownerOnly && !kyurisConfig.ownerID.includes(message.author.id)) {

            return this.kyuris.createMessage(message.channel.id, { content: KyurisMessages.LIBRARY.ACCESS_DENIED });

        }

        if (message.channel.type === 0) {

            if (command.nsfwOnly && !message.channel.nsfw) {

                let onlyNSFWEmbed = new RichEmbed()
                    .setDescription(KyurisMessages.LIBRARY.NOT_IN_NSFW.replace("{command}", command.name))
                    .setColor(kyurisConfig.embedColor || "RED");

                return this.kyuris.createMessage(message.channel.id, { embed: onlyNSFWEmbed }).catch((err) => {

                    Logger.error("KYURIS - FORBIDDEN", `Error Sending Message In #${message.channel.name} (${message.channel.id}) | ${err}`);

                });

            }

        }

        if (!this.cooldowns.has(command.name)) {

            this.cooldowns.set(command.name, new Eris.Collection());

        }

        const now = Date.now();
        const timestamps = this.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;

        if (timestamps.has(message.author.id)) {

            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {

                const timeLeft = (expirationTime - now) / 1000;
                const timeLeftFormatted = juration.stringify(timeLeft, { format: "long", units: 1 });

                const onCooldownEmbed = new RichEmbed()
                        .setDescription(KyurisMessages.LIBRARY.ON_COOLDOWN.replace("{timeLeft}", timeLeftFormatted).replace("{command}", command.name))
                        .setColor(kyurisConfig.embedColor || "RANDOM")

                    return this.kyuris.createMessage(message.channel.id, { embed: onCooldownEmbed }).catch((err) => {

                        Logger.error("KYURIS - FORBIDDEN", `Error Sending Message In #${message.channel.name} (${message.channel.id}) | ${err}`);

                    });

            }

        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            if (commandArgs.length && command.subcommands) {

                if (Array.isArray(command.subcommands) && command.subcommands.length) {

                    for (let i = 0; i < command.subcommands.length; i++) {

                        if (!command.subcommands[i]) {

                            throw new KyurisError(KyurisMessages.LIBRARY.EMPTY_SUBCOMMAND);

                        }

                        if (typeof command[command.subcommands[i]] !== 'function') {

                            throw new KyurisError(KyurisMessages.LIBRARY.NO_SUBCOMMAND_EXECUTEABLE_FUNCTION.replace("{subcommand}", command.subcommands[i]).replace("{method}", `async ${command.subcommands[i]}(client, message, args) {}`));

                        }

                        if (command.subcommands[i].toLowerCase() === 'run') {

                            throw new KyurisError(KyurisMessages.LIBRARY.EXECUTOR_OVERWRITTEN);

                        }

                    }

                    if (command.subcommands.includes(commandArgs[0].toLowerCase()) && typeof command[commandArgs[0].toLowerCase()] === 'function') {

                        const subcommandName = commandArgs.shift();

                        command[subcommandName.toLowerCase()](this.kyuris, message, commandArgs).catch((err) => {

                            Logger.error('KYURIS - SUBCOMMAND EXECUTION ERROR', `Command ${command.name} couldn't be executed due to: ${err}`);

                        });

                    } else {

                        command.run(this.kyuris, message, commandArgs).catch((err) => {

                            Logger.error('COMMAND EXECUTION ERROR', `Command ${command.name} couldn't be executed due to: ${err}`);
                        });

                    }

                } else {


                    throw new KyurisError('A specified subcommands property must be of type array and have at least 1 element! If no subcommands are required, remove the subcommands property from the command constructor!');
                }

            } else {

                command.run(this.kyuris, message, commandArgs).catch((err) => {

                    Logger.error('COMMAND EXECUTION ERROR', `Command ${command.name} couldn't be executed due to: ${err}`);

                });

            }

    }

}

module.exports = KyurisHandler;