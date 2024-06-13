import TelegramBot from "node-telegram-bot-api"
import { CommandHandler } from "./CommandHandler"

export class DisableSimSimi implements CommandHandler {
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = false;
    }

    execute(bot: TelegramBot, msg: TelegramBot.Message): void {
        this.enable = false;
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "SimSimi has been Disabled.");
    }

    isEnable(): boolean {
        return this.enable;
    }
}