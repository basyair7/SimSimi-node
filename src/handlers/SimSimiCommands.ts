import TelegramBot, { Message } from "node-telegram-bot-api"
import axios from "axios"

export class SimSimiCommand {
    private simSimiApiUrl: string;
    private simSimiApiKeys: string;
    private region: string;

    constructor(SimSimiAPIUrl: string, SimSimiAPIKeys: string, RegionSimSimi: string) {
        this.simSimiApiUrl = SimSimiAPIUrl;
        this.simSimiApiKeys = SimSimiAPIKeys;
        this.region = RegionSimSimi;

    }

    protected async SimSimi_run(bot: TelegramBot, msg: TelegramBot.Message) {
        const chatId: number = msg.chat.id;
        try {
            const message: string = msg.text || "";
            
            if(message.startsWith('/')) return;

            const response = await axios.post(this.simSimiApiUrl, 
                {
                    text: message,
                    lc: this.region,
                    keys: this.simSimiApiKeys
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const botReply: string = response.data.message;
            bot.sendMessage(chatId, botReply);

        } catch (error) {
            if(axios.isAxiosError(error)) {
                // console.error(`Axios error: ${error.response?.data}`);

                // get error message
                const errorData = error.response?.data;
                const errorMsg = errorData?.message || "Unknown error occurred";
                const errorCode = errorData?.status || "No status code";

                // mengirim pesan error
                console.error(`Axios error: ${errorMsg} (status code : ${errorCode})`);
                bot.sendMessage(chatId, errorMsg);
            }
            else {
                console.error(error);
            }
        }
    }
}