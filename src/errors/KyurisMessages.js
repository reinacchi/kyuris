'use-strict';

module.exports.LIBRARY = {
    
    ACCESS_DENIED: "Access Denied",
    COMMAND_EXIST: "Command with the name {command} has already been registered",
    EMPTY_SUBCOMMAND: "Subcommand name must be an array of string",
    EXECUTOR_OVERWRITTEN: "The Command class \"run\" method cannot be overwritten",
    MISSING_TOKEN: "Missing a token",
    MISSING_PERMISSIONS: "Missing Permissions!",
    NO_COMMAND_LOGIC: "No command logic implemented",
    NO_PERMISSIONS: "Failed to run the command: **{command}** due to lack of the following permissions: **{missingPerms}**",
    NO_SUBCOMMAND_EXECUTEABLE_FUNCTION: "Subcommand: \"{subcommand}\" has no executional method inside the Command class. Simply fix this by adding: {method}",
    NO_USER_PERMISSIONS: "You're lack of the following permissions to use this command: **{missingPerms}**",
    NO_PREFIX: "Missing a prefix",
    NOT_IN_NSFW: "Command: **{command}** can only be run in NSFW channels!",
    ON_COOLDOWN: "Please wait for **{timeLeft}** before using **{command}** again."

}