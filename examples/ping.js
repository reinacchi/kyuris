const Eris = require("eris");
const Kyuris = require("kyuris");

class PingCommand extends Kyuris.Command {

    constructor() {
        super();

        this.name = "ping"
        this.cooldown = 5;

    }

    /**
     * 
     * @param {Kyuris.Client} client 
     * @param {Eris.Message<Eris.TextableChannel>} message 
     * @param {Array<String>} args 
     */
    async run(client, message, args) {

        message.channel.createMessage({ content: `Pong! | ${client.guilds.get(message.guildID).shard.latency}ms` });

    }

}

module.exports = new PingCommand();