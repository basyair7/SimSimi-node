import { Message } from "node-telegram-bot-api"
import TelegramBot from "node-telegram-bot-api"

export interface CommandHandler {
    readonly name: string;
    readonly description: string;
    execute(bot: TelegramBot, msg: Message, match: RegExpExecArray | null): void;
}