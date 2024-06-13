import { CommandHandler } from "./CommandHandler"
import TelegramBot, { Message } from "node-telegram-bot-api"

export class HelpCommand implements CommandHandler {
    readonly name = 'help';
    readonly description = 'Get help';

    execute(bot: TelegramBot, msg: TelegramBot.Message): void {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Here are some commands you can use: \n/start - start the bot\n/help - get help");

    }
}