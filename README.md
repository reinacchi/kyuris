# Kyuris

**Kyuris** is a lightweight, easy-to-use framework built specially for the **[Eris](https://npmjs.com/package/eris)** library.

# Example

- **Kyuris** supports any kind of project structure since **Kyuris** is made to be customizable for developers to code in their own style ✨

**Note:** It's not needed setup `messageCreate` and `ready` events as **Kyuris** has already handle them in order to works. 

An Example Of a Project Structure:

```

Discord-Bot/
├── Commands/
│   ├── General/
│   │   └── Ping.js
│
├── Events/
│   └── ShardPreReady.js/
│
└── index.js

```

## `index.js` File:

```js

const Kyuris = require("kyuris");

class ExampleBot extends Kyuris.Client {
    constructor() {

        /* Replace TOKEN with your bot's token */
        /* Pro Tips: KyurisOptions supports for Eris.ClientOptions as well! Thus, there'll be 2 different Client options at once */
        super("TOKEN", {
            prefix: "!",
            ownerID: [
                "YourID"
            ],
            maxShards: "auto"
        });

        /* Run the bot */
        this.run();

    }

}

module.exports = new ExampleBot();

```

That's it? Yes but no. We also need to setup a commands for your bot. **Kyuris.Client** has 2 parameters, `token` and `KyurisOptions`. We need to filled out `token` in order for the bot to connect to the Discord gateway and `KyurisOptions` as an optional things for the bot. `prefix` property inside the `KyurisOptions` is required for your bot to work. `KyurisOptions` is also an extended options for `Eris.ClientOptions` as shown above example. Now, let's move to the next step.

## `Commands/General/Ping.js` File:

```js

const Eris = require("eris");
const Kyuris = require("kyuris");

class PingCommand extends Kyuris.Command {

    constructor() {

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

## `Events/ShardPreReady.js` File:

```js

const Kyuris = require("kyuris");

class ShardPreReady extends Kyuris.Event {

    constructor() {

        /* Eris's Events. See https://abal.moe/Eris/Client and head to the Events section for more */
        super("shardPreReady");

    }

    /**
     * @param {number} id The shard ID
     */
    async run(id) {

        Kyuris.Logger.info("KYURIS - SHARD-PRE-READY", `Shard ${id} Has Successfully Connected!`);

    }

}

module.exports = ShardPreReady();

```

- **That's It!** Your bot is now fully setup and ready to go as long as you didn't forgot to save your files :P

# Why Kyuris?

- Lightweight
- Easy-To-Use
- Up-To-Date
- Customizable Behaviour

# Resources Links

- **Kyuris' Official Docs** is currently W.I.P.
- **[Kyuris' Official GitHub Repo](https://github.com/NotMarx/kyuris)** is where the primary development occurs.
- **[Kyuris' Support Server](https://discord.gg/78RyqJK)** is where you can get support within the framework or get in contact with me.

# ToDo List:

- 🚧 Proper Custom `ready` & `messageCreate` Events (`messageCreate` event is where Kyuris handles messages and commands (Making a custom `messageCreate` event **isn't recommended** at all unless you know what you're doing.)
- ✖ Cluster Client
- 🚧 More properties

# License

**Kyuris** was released under the [MIT License](https://opensource.org/licenses/MIT).