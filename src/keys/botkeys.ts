import { TelegramKeysType } from "../types"

class TelegramKeys implements TelegramKeysType {
    public TeleBotToken: string;

    constructor(BotToken?: string) {
        this.TeleBotToken = BotToken ?? 'nil';
        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(BotToken?: string): TelegramKeys {
        return new TelegramKeys(BotToken);
    }
}

export default TelegramKeys;