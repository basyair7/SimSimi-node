import TelegramBot from "node-telegram-bot-api"
import { MessageHandler } from "../handles/MessageHandler"
import { HelpCommand, StartCommand, CommandHandler, EnableSimSimi, DisableSimSimi } from "../commands"

export default class ServiceApp {
    private bot: TelegramBot;
    private TeleBotToken: string;
    private TeleBotUsername: string;
    private messageHandler: MessageHandler;
    private commands: CommandHandler[];
    private simsimiEnable: boolean;

    constructor(TeleBotToken: string, TeleBotUsername: string, SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        // initializing bot
        this.TeleBotToken = TeleBotToken;
        this.TeleBotUsername = TeleBotUsername;
        this.bot = new TelegramBot(this.TeleBotToken, { polling: true });

        // initializing message handler
        this.messageHandler = new MessageHandler(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
        
        // initializing commands
        this.commands = [
            new HelpCommand(),
            new StartCommand(),
        ];

        this.simsimiEnable = false;
    }

    private commandRegExp(command: string): RegExp {
        return new RegExp(`^/${command}(?:@${this.TeleBotUsername})?(?:\\s+(.*))?$`, 'i');
    }

    private initialize(): void {
        this.bot.on('polling_error', (error) => {
            console.error('Polling error:', error);
        });
        this.commands.forEach(command => {
            this.bot.onText(this.commandRegExp(command.name), (msg, match) => {
                if(command instanceof EnableSimSimi || command instanceof DisableSimSimi) {
                    this.simsimiEnable = command instanceof EnableSimSimi;
                }
                command.execute(this.bot, msg, match);
            });
        });
        this.bot.on("message", msg => {
            if(msg.text && !msg.text.startsWith('/') && this.simsimiEnable) {
                this.messageHandler.handle(this.bot, msg);
            }
        });
    }

    public run(): void {
        this.initialize();
        console.log("Bot is running...");
    }
}
