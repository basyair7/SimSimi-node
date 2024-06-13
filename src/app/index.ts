import ServiceApp from "./ServiceApp"
import { TelegramKeys, SimSimiKeys } from "../keys"

const simsimikeys: SimSimiKeys = SimSimiKeys.getInstance();
const botToken1: TelegramKeys = TelegramKeys.getInstance(process.env.TELEBOT_TOKEN);
const botToken2: TelegramKeys = TelegramKeys.getInstance(process.env.TELEBOT_TOKEN2);

const bot1: ServiceApp = new ServiceApp(botToken1.TeleBotToken, simsimikeys.SimSimiAPIUrl, simsimikeys.SimSimiAPIKeys, simsimikeys.RegionSimSimi);
const bot2: ServiceApp = new ServiceApp(botToken2.TeleBotToken, simsimikeys.SimSimiAPIUrl, simsimikeys.SimSimiAPIKeys, simsimikeys.RegionSimSimi);

bot1.run();
bot2.run();