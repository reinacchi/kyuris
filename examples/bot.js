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
            ownerID: ["516186529547288576"]
        });

    }

}

module.exports = new ExampleBot();