import Eris from "eris";

/**
 * An Easy-To-Use Framework For The Eris Library
 */
declare module "kyuris";

export class Client extends Eris.Client {

    constructor(token: string, options?: KyurisClientOptions);

    public commands: Eris.Collection<Command>;
    public events: Set<Event>;
    public kyurisHandler: KyurisHandler;
    public kyurisOptions: KyurisClientOptions;
    public token: string;

}

export class Command {

    constructor();

    public aliases: Array<string>;
    public allowInDMs?: boolean;
    public cooldown?: number;
    public meta?: MetaOptions;
    public name: string;
    public nsfwOnly?: boolean;
    public ownerOnly?: boolean;
    public permissions?: Array<string>;
    public subcommands?: Array<string>;
    public userPermissions?: Array<string>;

    public run(client: Client, message: Eris.Message<Eris.TextableChannel>, args: Array<string>): Promise<void>;

}

export class Event<T> {

    constructor(eventName: Eris.ClientEvents<T>);

    private _eventName: string;
}

export class KyurisHandler {

    constructor(kyuris: Client);

    public kyuris: Client;
    public cooldowns: Eris.Collection;
    public defaultPermissions: Array<string>;

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
    ownerID?: Array<string>;
    prefix?: string | Array<string>;
    presences?: Eris.ActivityPartial<Eris.BotActivityType>;
    status?: Eris.Status;
}

interface MetaOptions {

    category?: string;
    description?: string;
    nsfwOnly?: boolean;
    ownerOnly?: boolean;
    usage?: string;

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