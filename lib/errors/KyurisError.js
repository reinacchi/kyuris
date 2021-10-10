"use-strict";

class KyurisError extends Error {

    /**
     * A Generic Error From Kyuris
     * @param {String} message Error message
     * @param {String} [type] Error type
     * @returns {KyurisError}
     */
    constructor(message, type = "LIBRARY") {

        super();

        this.name = `KyurisError [${type}]: ${message}`;

    }

}

module.exports = KyurisError;