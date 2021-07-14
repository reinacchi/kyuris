const Kyuris = require("kyuris");

class shardPreReady extends Kyuris.Event {

    constructor() {

        super("shardPreReady");

    }

    /**
     * 
     * @param {number} id 
     */
    async run(id) {

        Kyuris.Logger.info("KYURIS - SHARD-PRE-READY", `Shard ${id} Has Successfully Connected!`);

    }

}

module.exports = new shardPreReady();