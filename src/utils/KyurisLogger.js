const chalk = require("chalk");
const moment = require("moment");

class Logger {
    
    /**
     * Custom Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     * @param {string} c The Hex Color (Optional)
     */
    static log(t, m, c) {
        console.log(`[ ${chalk.hex(c)(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.hex(c)(m)}`);
    }

    /**
     * Error Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static error(t, m) {
        console.log(`[ ${chalk.redBright(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.redBright(m)}`);
    }

    /**
     * Success Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static success(t, m) {
        console.log(`[ ${chalk.greenBright(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.greenBright(m)}`);
    }

    /**
     * Info Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static info(t, m) {
        console.log(`[ ${chalk.cyanBright(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.cyanBright(m)}`);
    }

    /**
     * Warn Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static warn(t, m) {
        console.log(`[ ${chalk.yellow(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.yellow(m)}`);
    }

    /**
     * Commands Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static command(t, m) {
        console.log(`[ ${chalk.hex("#DAEE94")(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.hex("#DAEE94")(m)}`);
    }

    /**
     * System Log
     * @param {string} t Logs Type
     * @param {string} m Message To Be Logged
     */
    static system(t, m) {
        console.log(`[ ${chalk.blue(t)} ] - ${chalk.grey(moment().format("MMMM Do YYYY, h:mm:ss a"))} - ${chalk.blue(m)}`);
    }

}

module.exports = Logger;