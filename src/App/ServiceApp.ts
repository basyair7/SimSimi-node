import axios from "axios"
import TelegramBot from "node-telegram-bot-api"
import KeyManager from "../keys";

export default class ServiceApp {
    private bot: TelegramBot;
    private keys: KeyManager = KeyManager.getInstance();
    private TeleBotToken: string;
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: string;

    constructor() {
        this.TeleBotToken = this.keys.TeleBotToken;
        this.simSimiApiUrl = this.keys.SimSimiAPIUrl;
        this.simSimiApiKeys = this.keys.SimSimiApiKeys;
        this.region = this.keys.RegionSimSimi;

        this.bot = new TelegramBot(this.TeleBotToken, { polling: true });
    }

    private async handleMessage(msg: TelegramBot.Message) {
        const chatId: number = msg.chat.id;
        try {
            const message: string = msg.text?.toString()!;
            const response = await axios.post(this.simSimiApiUrl,
                {
                    text: message,
                    lc: this.region,
                    // keys: this.simSimiApiKeys
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const botReply: string = response.data.message;
            this.bot.sendMessage(chatId, botReply);
        } 
        catch (error) {
            if(axios.isAxiosError(error)) {
                // console.error(`Axios error: ${error.response?.data}`);

                // get error message
                const errorData = error.response?.data;
                const errorMessage = errorData?.message || "Unknown error occurred";
                const errorCode = errorData?.status || "No status code";

                // Mengirim pesan error
                console.error(`Axios error: ${errorMessage} (Status code : ${errorCode})`);
                this.bot.sendMessage(chatId, errorMessage);
            }
            
            else {
                console.error(error);
            }
        }
    }

    public run() {
        this.bot.on("message", this.handleMessage.bind(this));
        console.log("Bot is running...");
    }
}