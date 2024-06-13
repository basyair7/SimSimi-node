import ServiceApp from "./ServiceApp"
import { TelegramKeys, SimSimiKeys } from "../keys"

const simsimikeys: SimSimiKeys = SimSimiKeys.getInstance();
const botToken1: TelegramKeys = TelegramKeys.getInstance(process.env.TELEBOT_TOKEN, process.env.TELEBOT_USERNAME);
// const botToken2: TelegramKeys = TelegramKeys.getInstance(process.env.TELEBOT_TOKEN2, process.env.TELEBOT_USERNAME2);

const bot1: ServiceApp = new ServiceApp(
    botToken1.TeleBotToken, 
    botToken1.TeleBotUsername,
    simsimikeys.SimSimiAPIUrl, 
    simsimikeys.SimSimiAPIKeys, 
    simsimikeys.RegionSimSimi
);

/*
const bot2: ServiceApp = new ServiceApp(
    botToken2.TeleBotToken,
    botToken2.TeleBotUsername,
    simsimikeys.SimSimiAPIUrl, 
    simsimikeys.SimSimiAPIKeys, 
    simsimikeys.RegionSimSimi
); */

bot1.run();
// bot2.run();