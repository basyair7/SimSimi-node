import { TelegramKeysType } from "../types"

class TelegramKeys implements TelegramKeysType {
    public TeleBotToken: string;
    public TeleBotUsername: string;

    constructor(BotToken?: string, BotUsername?: string) {
        this.TeleBotToken = BotToken ?? 'nil';
        this.TeleBotUsername = BotUsername ?? 'nil';
        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(BotToken?: string, BotUsername?: string): TelegramKeys {
        return new TelegramKeys(BotToken, BotUsername);
    }
}

export default TelegramKeys;