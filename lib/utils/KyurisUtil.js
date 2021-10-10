"use-strict";

class Util {

    /**
    * Formats a permission name
    * @param {String} perms The formatted permission
    * @returns {String | Array<String>}
    */
   static formatPerms(perms) {

       const permission = perms.split(/(?=[A-Z])/).join(" ");

       return permission.charAt(0).toUpperCase() + permission.slice(1);

   }

}

module.exports = Util;