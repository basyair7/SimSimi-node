import { CommandHandler } from "../../handlers/CommandHandler"
import TelegramBot, { Message } from "node-telegram-bot-api"

class StartCommand implements CommandHandler {
    readonly id = 0;
    readonly name = 'start';
    readonly description = 'Start the bot';
    
    execute(bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Welcome! How can I assist you today? Get /help commands?");
    }
}

export default StartCommand;