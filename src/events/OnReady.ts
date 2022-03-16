import {REST} from "@discordjs/rest";
import {Client, Webhook} from "discord.js";


import {CommandList} from "../commands/_CommandList";
import {Routes} from "discord-api-types/v9";
import {RegexpHelper} from "../helpers/RegexpHelper";


export const onReady = async (client: Client) => {
    const discordAuthToken = process.env.DISCORD_AUTH_TOKEN as string;
    const serverID= process.env.SERVER_ID as string;
    const rest = new REST({version: "9"})
        .setToken(discordAuthToken as string);
    var userId= client.user?.id || "missing id"
    var applicationCommand = Routes.applicationGuildCommands( userId, serverID)
    const commandData = CommandList.map((command) => command.data.toJSON());
    await rest.put(applicationCommand, { body: commandData});
    console.log("Discord ready!");
}