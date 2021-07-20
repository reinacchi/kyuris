"use-strict";

module.exports = {
    Client: require("./src/KyurisClient"),
    Command: require("./src/structures/KyurisCommand"),
    Event: require("./src/structures/KyurisEvent"),
    Logger: require("./src/utils/KyurisLogger"),
    RichEmbed: require("./src/structures/KyurisEmbed"),
    VERSION: require("./package.json").version
}