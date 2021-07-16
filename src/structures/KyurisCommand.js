const { KyurisError } = require("../errors/KyurisError");
const KyurisMessages = require("../errors/KyurisMessages");
const Kyuris = require("../../Kyuris");
const Eris = require("eris");

/**
 * Kyuris Command Client
 */
class kyurisCommand {

    constructor() {

        this.aliases = [],
        this.allowInDMs = true,
        this.cooldown = 0,
        this.meta = {
            category: "",
            description: "",
            nsfwOnly: false,
            ownerOnly: false,
            usage: ""
            },
        this.nsfwOnly = false,
        this.ownerOnly = false,
        this.permissions = [],
        this.subcommands = [],
        this.userPermissions = []

    }

    /**
     * A run function to run the commands
     * @param {Kyuris.Client} client Kyuris Client
     * @param {Eris.Message<Eris.TextableChannel>} message Eris Message
     * @param {Array<String>} args Message Arguments
     */
    run(client, message, args) {

        throw new KyurisError(KyurisMessages.LIBRARY.NO_COMMAND_LOGIC);

    }

}

module.exports = kyurisCommand;