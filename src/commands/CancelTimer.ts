import {SlashCommandBuilder} from "@discordjs/builders";
import {Command} from "../interfaces/Command";
import {activeTimersList} from "../index";
import {MessageEmbed} from "discord.js";
import {TowerTimer} from "../tools/TowerTimer";

export const cancelTimer: Command = {
    data: new SlashCommandBuilder()
        .setName("cancel_timer")
        .setDescription("cancel timer on specific layer")
        .addStringOption((option) =>
            option
                .setName("layer")
                .setDescription("the number of a layer")
                .setRequired(true)
        ),

    run: async (interaction) => {
        await interaction.deferReply();
        const channel = interaction.channel
        const layer = interaction.options.getString("layer", true).toUpperCase();

        if (channel == null) {
            console.error("Не существует канала")
            return
        }
        const eventMsg = new MessageEmbed();
        eventMsg.setTitle("Towers Timer");
        eventMsg.setDescription(`Timer on this ${layer} gonna be cancelled `);


        var activeTimer = activeTimersList.find(x => x.layerName == layer)

        activeTimer?.cancel();

        const commandReply = new MessageEmbed();
        commandReply.setTitle("Towers Timer");
        commandReply.setDescription(`U have cancelled: ${layer} layer timer`);
        await interaction.editReply({embeds: [commandReply]})
    },
};