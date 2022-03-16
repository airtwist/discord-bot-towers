import { Command } from "../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {startTimerCommand} from "./StartTimerCommand";
import {cancelTimer} from "./CancelTimer";
import {help} from "./Help";



export const CommandList: Command[] = [startTimerCommand,cancelTimer,help];
