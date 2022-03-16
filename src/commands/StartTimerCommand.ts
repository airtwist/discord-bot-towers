import {Command} from "../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {Client, GuildChannel, Message, MessageEmbed} from "discord.js";
import {TowerTimer} from "../tools/TowerTimer";
import {TimeSpan} from "../tools/TimeSpan";
import {activeTimersList, client} from "../index";
import {RegexpHelper} from "../helpers/RegexpHelper";



export const startTimerCommand: Command = {
    data: new SlashCommandBuilder()
        .setName("start")
        .setDescription("start discord bot for towers timer")
        .addStringOption((option) =>
            option
                .setName("layer")
                .setDescription("the number of a layer")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("time")
                .setDescription("start time for notification  Expected format :HH:mm  for example: 14:55")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();

        const channel = interaction.channel
        const layer = interaction.options.getString("layer", true).toUpperCase();
        const time = interaction.options.getString("time", true);
        if (!RegexpHelper.timeFormatIsValid(time)) {
            var errorMSG = new MessageEmbed();

            errorMSG.setTitle("Error: time format validation")
            errorMSG.setDescription("You are using wrong time format, Expected format is HH:mm ")
             var message =   await channel?.send({
                embeds: [errorMSG]
            })

            return
        }
        var startTime = TimeSpan.parse(time)
        var towerTimer: TowerTimer = new TowerTimer(layer.toUpperCase(), startTime, async timer => {

            if (channel == null) {
                console.error("Не существует канала")
                return
            }
            const eventMsg = new MessageEmbed();
            eventMsg.setTitle("Towers Timer");
            eventMsg.setDescription(`After 10 minutes Daily PVP EVENT GONNA START ON LAYER: ${timer.layerName}`);

            var message = await channel.send({
                embeds: [eventMsg]
            })

            message.channel.send("@here get rdy!")

        })

        activeTimersList.push(towerTimer);
        towerTimer.schedule()
        const commandReply = new MessageEmbed();
        commandReply.setTitle("Towers Timer");
        commandReply.setDescription(`Started timer at: ${startTime}`);
        await interaction.editReply({embeds: [commandReply]})
    },

};



