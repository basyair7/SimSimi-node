import axios from "axios";
import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();

const telegramToken: string = process.env.TelebotTOKEN!;
const simSimiApiUrl: string = process.env.UrlSimSimi!;

const bot: TelegramBot = new TelegramBot(telegramToken, { polling: true });

bot.on("message", async (msg) => {
    const chatId: number = msg.chat.id;
    const message: string = msg.text?.toString()!;

    try {
        const response = await axios.post(simSimiApiUrl, {
            text: message,
            lc: "id"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const botReply: string = response.data.message;
        bot.sendMessage(chatId, botReply);
    }
    catch (error) {
        console.error(error);
        bot.sendMessage(chatId, `Error : ${error}`);
    }
});

console.log("Bot is running....");