import TelegramBot from "node-telegram-bot-api"

export interface CommandHandler {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    execute(bot: TelegramBot, msg: TelegramBot.Message, match: RegExpExecArray | null): void;
}