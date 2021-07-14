const Eris = require("eris");
const KyurisError = require("../errors/KyurisError");

class KyurisEvent {

    /**
     * Create an instance of Kyuris Event
     * @param {Eris.ClientEvents} eventName An Eris event.
     */
    constructor(eventName) {

        this._eventName = eventName;

    }

}

module.exports = KyurisEvent;