const telebot = require("node-telegram-bot-api");
const axios = require("axios");
require("dotenv").config();

const TOKEN = process.env.TELEBOT_TOKEN;
const API = process.env.SIMSIMI_APIKEYS;
const URL = process.env.SIMSIMI_APIURL;

const bot = new telebot(TOKEN, { polling: true });

bot.on("message", async function(msg) {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text.startsWith('/')) return;
    
    try {
        const response = await axios.post(`${URL}/simtalk`, {
            utext: text,
            lang: "id"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API
            }
        });

        const simisimiResponse = response.data.atext;
        bot.sendMessage(chatId, simisimiResponse);

    } catch (error) {
        console.log(error);
    }
});