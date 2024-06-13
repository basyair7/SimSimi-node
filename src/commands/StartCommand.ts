import { CommandHandler } from "./CommandHandler"
import TelegramBot, { Message } from "node-telegram-bot-api"

export class StartCommand implements CommandHandler {
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    execute(bot: TelegramBot, msg: TelegramBot.Message) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Welcome! How can I assist you today?");
    }
}