import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { Command } from "../interfaces/Command";

export const help: Command = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Provides information on using this bot."),
    run: async (interaction) => {
        await interaction.deferReply();
        const helpEmbed = new MessageEmbed();
        helpEmbed.setTitle("Terokkar towers pvp event".toUpperCase());
        helpEmbed.setDescription(
            "This discord bot is designed to help you track 6 hour between events."
        );
        helpEmbed.addField(
            "Create a timer",
            "Use the `/start` command to create your timer for today."
        );
        helpEmbed.addField(
            "Cancel a specific timer",
            "You can cancel a timer on specific layer using `/cancel` command."
        );
        // helpEmbed.addField(
        //     "Show timers that running right now",
        //     "To see your current timers you can use `/view`."
        // );
        helpEmbed.setFooter({ text: `Version ${process.env.npm_package_version}` });
        await interaction.editReply({ embeds: [helpEmbed] });
        return;
    },
};
