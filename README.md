# Kyuris

**Kyuris** is a lightweight, easy-to-use framework for the **[Eris](https://npmjs.com/package/eris)** library.

# Example

- **Kyuris** supports any kinda of project structure. With this way, it's much customizable and you can still able to follow your own scripting style! 

An Example Of a Project Structure:

```

Discord-Bot/
├── Commands/
│   ├── General/
│   │   └── Ping.js
│
├── Events/
│   └── Ready.js/
│
└── index.js

```

`index.js` File:

```js
const Kyuris = require("kyuris");

class MyBot extends Kyuris.Client {

    constructor() {

        /* Replace TOKEN with your bot's token */
        /* Pro Tips: KyurisOptions supports for Eris.ClientOptions as well! Thus, there'll be 2 different Client options at once */
        super("TOKEN", {
            prefix: "!", // The prefix property is required to pass
            ownerID: [
                "YourID"
            ],
            intents: [
                "guilds",
                "guildsMessages"
            ],
            maxShards: "auto"
        });

    }

}

module.exports = new MyBot();

```

That's it? Yes but no. We also need to setup a commands for your bot. **Kyuris.Client** has 2 parameters, `token` and `KyurisOptions`. We need to filled out `token` in order for the bot to connect to the Discord gateway and `KyurisOptions` as an optional things for the bot. `prefix` property inside the `KyurisOptions` is required for your bot to work. `KyurisOptions` is also an extended options for `Eris.ClientOptions` as shown above example. Now, let's move to the next step.

`Commands/General/Ping.js` File:

```js

const Eris = require("eris");
const Kyuris = require("kyuris");

class PingCommand extends Kyuris.Command {

    constructor(); {

        super();

        this.name = "ping"; // The command name
        this.aliases = ["p"]; // The command aliases. Must be an array of string
        this.cooldown = 3; // Cooldown must be in numbers (seconds)
        this.allowInDMs = true // Whether to allow users to execute the command in Private Channels/DMs

    }

    /**
     * @param {Kyuris.Client} client Extended Client for Eris.Client
     * @param {Eris.Message<Eris.TextableChannel>} message Eris message
     * @param {Array<String>} args Command's arguments
     */
    async run(client, message, args) {

        client.createMessage(message.channel.id, "Pong!");

    }

}

module.exports = new PingCommand();

```

This time, we're creating a command in a command file. You'll need to pass the `name` property for the command name and this is required. Any other properties are optional. To run the command, we're going to use a function called `run`. This method has 3 parameters. They are `Kyuris.Client` client (An extended Client of Eris.Client), `Eris.Message` message, and `Array<String>` args.  

- **That's It!** Your bot is now fully setup and ready to go as long as you didn't forgot to save your files :P

# Documentation

- Soon™

# License

**Kyuris** was released under the [MIT License](https://opensource.org/licenses/MIT).