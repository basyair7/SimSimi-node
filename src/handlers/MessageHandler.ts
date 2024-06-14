import TelegramBot, { Message } from "node-telegram-bot-api"
import { SimSimiCommand } from "./SimSimiCommands";

export class MessageHandler extends SimSimiCommand {
    private text: string = "";
    
    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        super(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
    }

    handle(bot: TelegramBot, msg: Message): void {
        this.text = msg.text?.toString() || "";

        // Ignore command
        if (this.text.startsWith('/')) return;

        this.SimSimi_run(bot, msg);
    }
}