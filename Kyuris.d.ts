import Eris from "eris";

/**
 * An Easy-To-Use Framework For The Eris Library
 */
declare module "kyuris";

export class Client extends Eris.Client {

    constructor(token: string, options?: KyurisClientOptions);

    public commandFiles: Array<Command>;
    public commands: Eris.Collection<Command>;
    public eventFiles: Array<Event>;
    public events: Set<Event>;
    public kyurisHandler: KyurisHandler;
    public kyurisOptions: KyurisClientOptions;
    public token: string;

    public run(): Promise<void>;

}

export class Command {

    constructor();

    public aliases?: Array<string>;
    public allowInDMs?: boolean;
    public cooldown?: number;
    public meta?: MetaOptions;
    public name: string;
    public nsfwOnly?: boolean;
    public ownerOnly?: boolean;
    public permissions?: Array<string>;
    public subcommands?: Array<string> | null;
    public userPermissions?: Array<string>;

    public run(client: Client, message: Eris.Message<Eris.TextableChannel>, args: Array<string>): Promise<void>;

}

export class Event {

    constructor(eventName: keyof ErisClientEvents);

    private _eventName: string;

    public run(): Promise<void>;
}

export class KyurisHandler {

    constructor(kyuris: Client);

    public kyuris: Client;
    public cooldowns: Eris.Collection<number>;
    public defaultPermissions: Array<string>;

    public handleMessage(message: Eris.Message<Eris.TextableChannel>, commands: Eris.Collection<Command>): Promise<void | Eris.Message<Eris.TextableChannel>>

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

    public addFields(...fields: EmbedFieldsOptions[]): RichEmbed;

}

export const VERSION: string;

interface ErisClientEvents {

    callCreate: [call: Eris.Call];
    callDelete: [call: Eris.Call];
    callRing: [call: Eris.Call];
    callUpdate: [call: Eris.Call, oldCall: Eris.OldCall];
    channelCreate: [channel: Eris.TextChannel | Eris.VoiceChannel | Eris.CategoryChannel | Eris.StoreChannel | Eris.NewsChannel | Eris.GuildChannel | Eris.PrivateChannel | Eris.StageChannel];
    channelDelete: [channel: Eris.TextChannel | Eris.PrivateChannel | Eris.NewsChannel | Eris.VoiceChannel | Eris.StageChannel];
    channelPinUpdate: [channel: Eris.TextChannel | Eris.PrivateChannel | Eris.NewsChannel, timestamp: number, oldTimestamp: number];
    channelRecipientAdd: [channel: Eris.GroupChannel, user: Eris.User];
    channelRecipientRemove: [channel: Eris.GroupChannel, user: Eris.User];
    channelUpdate: [channel: Eris.TextChannel | Eris.VoiceChannel | Eris.CategoryChannel | Eris.StoreChannel | Eris.NewsChannel | Eris.GuildChannel | Eris.PrivateChannel | Eris.StageChannel, oldChannel: Eris.OldGuildChannel];
    connect: [id: number];
    debug: [message: string, id: number];
    disconnect: [];
    error: [err: Error, id: number];
    friendSuggestionCreate: [user: Eris.User, reasons: Array<string>];
    friendSuggestionDelete: [user: Eris.User];
    guildAvailable: [guild: Eris.Guild];
    guildBanAdd: [guild: Eris.Guild, user: Eris.User];
    guildBanRemove: [guild: Eris.Guild, user: Eris.User];
    guildCreate: [guild: Eris.Guild];
    guildDelete: [guild: Eris.Guild];
    guildEmojisUpdate: [guild: Eris.Guild, emojis: Array<any>, oldEmojis: Array<any> | null];
    guildMemberAdd: [guild: Eris.Guild, member: Eris.Member];
    guildMemberChunk: [guild: Eris.Guild, members: Array<Eris.Member>];
    guildMemberRemove: [guild: Eris.Guild, member: Eris.Member | object];
    guildMemberUpdate: [guild: Eris.Guild, member: Eris.Member, oldMember: Eris.OldMember];
    guildRoleCreate: [guild: Eris.Guild, role: Eris.Role];
    guildRoleDelete: [guild: Eris.Guild, role: Eris.Role];
    guildRoleUpdate: [guild: Eris.Guild, role: Eris.Role, oldRole: Eris.OldRole];
    guildUnavailable: [guild: Eris.Guild];
    guildUpdate: [guild: Eris.Guild, oldGuild: Eris.OldGuild];
    hello: [trace: Array<string>, id: number];
    inviteCreate: [guild: Eris.Guild, invite: Eris.Invite];
    inviteDelete: [guild: Eris.Guild, invite: Eris.Invite];
    messageCreate: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel>];
    messageDelete: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel> | object];
    messageDeleteBulk: [messages: Array<Eris.Message<Eris.PossiblyUncachedTextableChannel>> | Array<object>];
    messageReactionAdd: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel> | object, emoji: Eris.Emoji, reactor: Eris.Member | object];
    messageReactionRemove: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel> | object, emoji: Eris.Emoji, userID: string];
    messageReactionRemoveAll: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel> | object];
    messageReactionRemoveEmoji: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel> | object, emoji: Eris.Emoji];
    messageUpdate: [message: Eris.Message<Eris.PossiblyUncachedTextableChannel>, oldMessage: Eris.OldMessage | null];
    presenceUpdate: [other: Eris.Member | Eris.Relationship, oldPresence: Eris.Presence | null];
    rawREST: [request: Eris.RawRESTRequest];
    rawWS: [packet: Eris.RawPacket, id: number];
    ready: [];
    relationshipAdd: [relationship: Eris.Relationship];
    relationshipRemove: [relationship: Eris.Relationship];
    relationshipUpdate: [relationship: Eris.Relationship, oldRelationship: object];
    shardDisconnect: [error: Error | null, id: number];
    shardPreReady: [id: number];
    shardReady: [id: number];
    shardResume: [id: number];
    typingStart: [channel: Eris.TextChannel | Eris.PrivateChannel | Eris.NewsChannel | object, user: Eris.User | object, member: Eris.Member | null];
    unavailableGuildCreate: [guild: Eris.UnavailableGuild];
    unknown: [packet: Eris.RawPacket, id: number];
    userUpdate: [user: Eris.User, oldUser: object];
    voiceChannelJoin: [member: Eris.Member, newChannel: Eris.StageChannel | Eris.VoiceChannel];
    voiceChannelLeave: [member: Eris.Member, oldChannel: Eris.StageChannel | Eris.VoiceChannel];
    voiceChannelSwitch: [member: Eris.Member, newChannel: Eris.StageChannel | Eris.VoiceChannel, oldChannel: Eris.StageChannel | Eris.VoiceChannel];
    voiceStateUpdate: [member: Eris.Member, oldState: Eris.OldVoiceState];
    warn: [message: string, id: number];
    webhooksUpdate: [data: Eris.WebhookData];


}

interface EmbedFieldsOptions {

    inline?: boolean;
    name?: string;
    value?: string;

}

interface EnableCustomEvent {

    /** @deprecated */
    messageCreate?: boolean;
    /** @deprecated */
    ready?: boolean;

}

interface KyurisClientOptions extends Eris.ClientOptions {
    embedColor?: ColorResolvable;
    /** @deprecated */
    enableCustomEvents?: EnableCustomEvent;
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