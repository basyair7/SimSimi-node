// import axios from "axios";
// import * as dotenv from "dotenv";
// import TelegramBot from "node-telegram-bot-api";

// dotenv.config();

// const telegramToken: string = process.env.TelebotTOKEN!;
// const simSimiApiUrl: string = process.env.UrlSimSimi!;

// const bot: TelegramBot = new TelegramBot(telegramToken, { polling: true });

// bot.on("message", async (msg) => {
//     const chatId: number = msg.chat.id;
//     const message: string = msg.text?.toString()!;

//     try {
//         const response = await axios.post(simSimiApiUrl, {
//             text: message,
//             lc: "id"
//         }, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         const botReply: string = response.data.message;
//         bot.sendMessage(chatId, botReply);
//     }
//     catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, `Error : ${error}`);
//     }
// });

// console.log("Bot is running....");

import axios from "axios"
import TelegramBot from "node-telegram-bot-api"
import keys from "../keys"

export default class ServiceApp {
    private bot: TelegramBot;
    private TeleBotToken: string;
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: any = "id";

    constructor() {
        this.TeleBotToken = keys.TeleBotToken;
        this.simSimiApiUrl = keys.SimSimiAPIUrl;
        this.simSimiApiKeys = keys.SimSimiApiKeys;

        this.bot = new TelegramBot(this.TeleBotToken, { polling: true });
    }

    public run() {
        this.bot.on("message", this.handleMessage.bind(this));
        console.log("Bot is running...");
    }

    private async handleMessage(msg: TelegramBot.Message) {
        const chatId: number = msg.chat.id;
        try {
            const message: string = msg.text?.toString()!;
            const response = await axios.post(this.simSimiApiUrl,
                // `text=${message}&lc=${this.region}&key=${this.simSimiApiKeys}`,
                `text=${message}&lc=${this.region}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const botReply: string = response.data.message;
            this.bot.sendMessage(chatId, botReply);
        } catch (error) {
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
}