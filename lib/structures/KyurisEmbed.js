const KyurisColor = require("../utils/KyurisColor");
const urlRegex = /^http(s)?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

class KyurisEmbed {
    /**
     * Create a Rich Embed
     * @param {Object} [data] Embed's object
     */
    constructor(data = {}) {
        this.title = data.title;
        this.description = data.description;
        this.url = data.url;
        this.timestamp = data.timestamp;
        this.color = data.color;
        this.footer = data.footer;
        this.image = data.image;
        this.thumbnail = data.thumbnail;
        this.author = data.author;
        this.fields = data.fields || [];
    }

    /**
     * Sets the embed's title
     * @param {String} title The title of the embed
     * @returns {KyurisEmbed}
     */
    setTitle(title) {
        if (typeof title !== 'string') throw new TypeError(`Expected type 'string', received '${typeof title}`);
        if (title.length > 256) throw new RangeError("Embed title should be less than 256 characters");
        this.title = title;
        return this;
    }

    /**
     * Sets the embed's description
     * @param {String} description The description of the embed
     * @returns {KyurisEmbed}
     */
    setDescription(description) {
        if (typeof description !== "string") throw new TypeError(`Expected type 'string', received '${typeof description}'`);
        if (description.length > 2048) throw new RangeError("Embed description should be less than 2048 characters");
        this.description = description;
        return this;
    }

    /**
     * Sets the embed's URL
     * @param {String} url The URL of the embed
     * @return {KyurisEmbed}
     */
    setURL(url) {
        if (typeof url !== 'string') throw new TypeError(`Expected type 'string', received '${typeof url}'`);
        if (!urlRegex.test(url)) throw new TypeError("URL is not well formed");
        this.url = url;
        return this;
    }

    /**
     * Sets the embed's timestamp
     * @param {DateConstructor} [timestamp] The timestamp of the embed
     * @returns {KyurisEmbed}
     */
    setTimestmap(timestamp = new Date()) {
        if (Number.isNaN(new Date(timestamp).getTime())) throw new Error("Invalid Date");
        this.timestamp = timestamp;
        return this;
    }

    /**
     * Sets the color of the embed.
     * Can be a number, hex string, an RGB array like:
     * ```js
     * [255, 0, 255] // purple
     * ```
     * or one of the following strings:
     * - `DEFAULT`
     * - `WHITE`
     * - `AQUA`
     * - `GREEN`
     * - `BLUE`
     * - `YELLOW`
     * - `PURPLE`
     * - `LUMINOUS_VIVID_PINK`
     * - `GOLD`
     * - `ORANGE`
     * - `RED`
     * - `GREY`
     * - `DARKER_GREY`
     * - `NAVY`
     * - `DARK_AQUA`
     * - `DARK_GREEN`
     * - `DARK_BLUE`
     * - `DARK_PURPLE`
     * - `DARK_VIVID_PINK`
     * - `DARK_GOLD`
     * - `DARK_ORANGE`
     * - `DARK_RED`
     * - `DARK_GREY`
     * - `LIGHT_GREY`
     * - `DARK_NAVY`
     * - `RANDOM`
     * - `INVISIBLE`
     * 
     * @typedef {String|Number|Number[]} ColorResolvable
     **/

    /** 
     * Sets the embed's color
     * @param {ColorResolvable} color The Color of the embed
     * @returns {KyurisEmbed}
     */
    setColor(color) {
        if (!color) throw new Error("Embed color shouldn't be empty!");

        if (typeof color === 'string') {
            if (color.startsWith("#")) color = parseInt(color.replace('#', ''), 16);
            else color = KyurisColor[color]
        } else if (Array.isArray(color)) {
            color = (color[0] << 16) + (color[1] << 8) + color[2];
        }

        this.color = color;
        return this;
    }

    /**
     * Sets the embed's footer
     * @param {String} text The footer text of the embed
     * @param {String} [iconURL] The icon URL of the embed
     * @returns {KyurisEmbed}
     */
    setFooter(text, iconURL) {
        if (typeof text !== "string") throw new TypeError(`Expected type 'string', received '${typeof text}'`);
        if (text.length > 2048) throw new RangeError("Embed footer text should be less than 2048 characters");
        this.footer = { text };

        if (iconURL !== undefined) {
            if (typeof iconURL !== "string") throw new TypeError(`Expected type 'string', received '${typeof iconURL}'`);
            if (!iconURL.startsWith("attachment://") && !urlRegex.test(iconURL)) throw new TypeError("URL is not well formed");
            this.footer.icon_url = iconURL
        }
        return this;
    }

    /**
     * Sets the embed's image
     * @param {String} imageURL The image of the embed
     * @returns {KyurisEmbed}
     */
    setImage(imageURL) {
        if (typeof imageURL !== "string") throw new TypeError(`Expected type 'string', received ${typeof imageURL}`);
        if (!imageURL.startsWith("attachment://") && !urlRegex.test(imageURL)) throw new Error("URL is not well formed");
        this.image = { url: imageURL };
        return this;
    }

    /**
     * Sets the embed's thumbnail
     * @param {String} thumbnailURL The thumbnail of the embed
     * @returns {KyurisEmbed}
     */
    setThumbnail(thumbnailURL) {
        if (typeof thumbnailURL !== "string") throw new TypeError(`Expected type 'string', received '${typeof thumbnailURL}'`);
        if (!thumbnailURL.startsWith("attachment://") && !urlRegex.test(thumbnailURL)) throw new Error("URL is not well formed");
        this.thumbnail = { url: thumbnailURL };
        return this;
    }

    /**
     * Sets the embed's author
     * @param {String} name The author name of the embed
     * @param {String} [iconURL] The author icon of the embed
     * @param {String} [url] The author URL of the embed
     */
    setAuthor(name, iconURL, url) {
        if (typeof name !== "string") throw new TypeError(`Expected type 'string', received '${typeof name}'`);
        if (name.length > 256) throw new RangeError("Embed author name should be less than 256 characters");
        this.author = { name };

        if (iconURL !== undefined) {
            if (typeof iconURL !== "string") throw new TypeError(`Expected type 'string', received '${typeof iconURL}'`);
            if (!iconURL.startsWith("attachment://") && !urlRegex.test(iconURL)) throw new Error("URL is not well formed");
            this.author.icon_url = iconURL;
        }

        if (url !== undefined) {
            if (typeof url !== "string") throw new TypeError(`Expected type 'string', received '${typeof url}'`);
            if (!urlRegex.test(url)) throw new Error("URL is not well formed");
            this.author.url = url;
        }
        return this;
    }

    /**
     * add field on the embed
     * @param {String} name The field name of the embed
     * @param {String} value The field value of the embed
     * @param {Boolean} [inline] Whether the field should be inline or not
     */
    addField(name, value, inline = false) {
        if (this.fields.length >= 25) throw new RangeError("Embeds cannot hold more than 25 fields at once");
        if (typeof name !== "string") throw new TypeError(`Expected type 'string', received '${typeof name}'`);
        if (typeof value !== "string") throw new TypeError(`Expected type 'string', received '${typeof value}'`);
        if (typeof inline !== 'boolean') throw new TypeError(`Expected type 'boolean', received '${typeof inline}'`);
        if (name.length > 256) throw new RangeError("Embed field name should be less than 256 characters");
        if (value.length > 1024) throw new RangeError("Embed field value should be less than 1028 characters");

        this.fields.push({ name, value, inline })
        return this;
    }

    /**
     * Add multiple fields
     * @param {Object} fields An object of field
     */
    addFields(...fields) {
        this.fields.push(...fields);
        return this;

    }

}

module.exports = KyurisEmbed;