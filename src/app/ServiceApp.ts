import TelegramBot from "node-telegram-bot-api"
import * as handler from "../handlers"
import * as commands from "../commands"

export default class ServiceApp {
    private bot: TelegramBot;
    private TeleBotToken: string;
    private TeleBotUsername: string;
    private messageHandler: handler.MessageHandler;
    private commands: handler.CommandHandler[];
    private simsimiEnable: boolean;

    constructor(TeleBotToken: string, TeleBotUsername: string, SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        // initializing bot
        this.TeleBotToken = TeleBotToken;
        this.TeleBotUsername = TeleBotUsername;
        this.bot = new TelegramBot(this.TeleBotToken, { polling: true });

        // initializing message handler
        this.messageHandler = new handler.MessageHandler(SimSimiAPIUrl, SimSimiAPIKeys, RegionSimSimi);
        
        // initializing commands
        this.commands = [
            new commands.HelpCommand(),
            new commands.StartCommand(),
            new commands.EnableSimSimi(),
            new commands.DisableSimSimi(),
        ];

        this.simsimiEnable = false;
    }

    private commandRegExp(command: string): RegExp {
        return new RegExp(`^/${command}(?:@${this.TeleBotUsername})?(?:\\s+(.*))?$`, 'i');
    }

    private initialize(): void {
        this.bot.on('polling_error', (error) => {
            console.error(`Polling error: ${error.name} - ${error.message}`);
            const errorMsg = handler.ErrorHandler.getErrorMessage(error);
            console.log(errorMsg);
            process.exit(1);
        });
        this.commands.forEach(command => {
            this.bot.onText(this.commandRegExp(command.name), (msg, match) => {
                if(command instanceof commands.EnableSimSimi || command instanceof commands.DisableSimSimi) {
                    this.simsimiEnable = command instanceof commands.EnableSimSimi;
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
