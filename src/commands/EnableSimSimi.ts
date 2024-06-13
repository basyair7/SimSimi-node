import TelegramBot from "node-telegram-bot-api"
import { CommandHandler } from "./CommandHandler"

export class EnableSimSimi implements CommandHandler {
    readonly name = "simsimi_enable";
    readonly description: string = "Enable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = true;
    }

    execute(bot: TelegramBot, msg: TelegramBot.Message): void {
        this.enable = true;
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "SimSimi has been enabled.");
    }

    isEnable(): boolean {
        return this.enable;
    }
}