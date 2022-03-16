import {Client, TextChannel} from "discord.js";
import {IntentOptions} from "./config/IntentOptions"
import {onReady} from "./events/OnReady";
import {onInteraction} from "./events/OnInteractions";
import {TowerTimer} from "./tools/TowerTimer";
import { validateEnv} from "./helpers/validateEnv";

require("dotenv").config({path: "src/.env"});


export var activeTimersList: TowerTimer[];
activeTimersList = [];
export let client = new Client({
    intents: IntentOptions
});

(async () => {
    if (!validateEnv()) return;

    client.on(
        "ready",
        async ()=> await onReady(client));

    client.on(
        "interactionCreate",
        async (interaction) => await onInteraction(interaction)
    );

    await client.login(process.env.DISCORD_AUTH_TOKEN);
})();
