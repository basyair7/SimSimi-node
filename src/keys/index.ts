import { Keys } from "../types"

const keys: Keys = {
    TeleBotToken: process.env.TELEBOT_TOKEN ?? 'nil',
    SimSimiAPIUrl: process.env.SIMSIMI_APIURL ?? 'nil',
    SimSimiApiKeys: process.env.SIMSIMI_APIKEYS ?? 'nil',
};

if (Object.values(keys).includes('nil')){
    throw new Error("Not all ENV variables are defined!");
}

export default keys;