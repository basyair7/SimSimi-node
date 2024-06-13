import TelegramBot, { Message } from "node-telegram-bot-api"
import { SimSimiCommand } from "./SimSimiCommands";

export class MessageHandler {
    private simSimiCommand: SimSimiCommand;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        this.simSimiCommand = new SimSimiCommand(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
        
    }

    handle(bot: TelegramBot, msg: Message): void {
        const text = msg.text || "";

        // Ignore command
        if (text.startsWith('/')) return;

        this.simSimiCommand.handle(bot, msg);

    }
}