const Kyuris = require("kyuris");

class ExampleBot extends Kyuris.Client {
    constructor() {

        super("TOKEN", {
            prefix: "!",
            status: "idle",
            presences: {
                name: "with Kyuris",
                type: 0
            },
            enablePresence: true,
            ownerID: ["OwnerID"]
        });

        /* Run the bot */
        this.run();

    }

}

module.exports = new ExampleBot();