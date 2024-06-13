import { CommandHandler } from "../handles/CommandHandler"
import TelegramBot, { Message } from "node-telegram-bot-api"

export default class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    execute(bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Welcome! How can I assist you today?");
    }
}