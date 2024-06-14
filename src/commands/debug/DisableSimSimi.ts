import TelegramBot from "node-telegram-bot-api"
import { CommandHandler } from "../../handlers/CommandHandler"

class DisableSimSimi implements CommandHandler {
    readonly id = 3;
    readonly name = "simsimi_disable";
    readonly description: string = "Disable SimSimi response";

    private enable: boolean;

    constructor() {
        this.enable = false;
    }

    execute(bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null): void {
        this.enable = false;
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "SimSimi has been Disabled.");
    }

    isEnable(): boolean {
        return this.enable;
    }
}

export default DisableSimSimi;