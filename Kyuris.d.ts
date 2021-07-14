import Eris from "eris";

/**
 * An Easy-To-Use Framework For The Eris Library
 */
declare module "kyuris";

export class Client extends Eris.Client {

    constructor(token: string, options?: KyurisClientOptions);

    commands: Eris.Collection;
    events: Set;
    kyurisOptions: KyurisClientOptions;
    token: string;

}

export class Command {

    aliases: Array<string>;
    allowInDMs?: boolean;
    cooldown?: number;
    meta?: object;
    name: string;
    nsfw?: boolean;
    owner?: boolean;
    permissions?: Array<string>;
    subcommands?: Array<string>;
    userPermissions?: Array<string>;

    run(client: Client, message: Eris.Message<Eris.TextableChannel>, args: Array<string>): Promise<void>;

}

export class Event {

    constructor(eventName: Eris.ClientEvents);

    private _eventName = eventName;

}

export class Logger {

    static command(title: string, message: string): Promise<void>;

    static error(title: string, message: string): Promise<void>;

    static info(title: string, message: string): Promise<void>;

    static log(title: string, message: string, color: string): Promise<void>;

    static success(title: string, message: string): Promise<void>;

    static system(title: string, message: string): Promise<void>;

    static warn(title: string, message: string): Promise<void>;

}

export class RichEmbed {

    constructor(data: object);

    public setTitle(title: string): RichEmbed;

    public setURL(url: string): RichEmbed;

    public setDescription(description: string): RichEmbed;

    public setImage(imageURL: string): RichEmbed;

    public setThumbnail(thumbnailURL: string): RichEmbed;

    public setFooter(text: string, iconURL?: string): RichEmbed;

    public setTimestmap(timestamp?: DateConstructor): RichEmbed;

    public setAuthor(name: string, iconURL?: string, url?: string): RichEmbed;

    public setColor(color: ColorResolvable): RichEmbed;

    public addField(name: string, value: string, inline?: boolean): RichEmbed;

}

interface KyurisClientOptions extends Eris.ClientOptions {
    enablePresence?: boolean;
    ignoreAllBots?: boolean;
    ownerID?: Array<srting>;
    prefix?: string | Array<string>;
    presences?: Eris.ActivityPartial<Eris.BotActivityType>;
    status?: Eris.Status;
}

type ColorResolvable =
    | 'DEFAULT'
    | 'INVISIBLE'
    | 'WHITE'
    | 'AQUA'
    | 'GREEN'
    | 'BLUE'
    | 'YELLOW'
    | 'PURPLE'
    | 'LUMINOUS_VIVID_PINK'
    | 'GOLD'
    | 'ORANGE'
    | 'RED'
    | 'GREY'
    | 'DARKER_GREY'
    | 'NAVY'
    | 'DARK_AQUA'
    | 'DARK_GREEN'
    | 'DARK_BLUE'
    | 'DARK_PURPLE'
    | 'DARK_VIVID_PINK'
    | 'DARK_GOLD'
    | 'DARK_ORANGE'
    | 'DARK_RED'
    | 'DARK_GREY'
    | 'LIGHT_GREY'
    | 'DARK_NAVY'
    | 'BLURPLE'
    | 'GREYPLE'
    | 'DARK_BUT_NOT_BLACK'
    | 'NOT_QUITE_BLACK'
    | 'RANDOM'