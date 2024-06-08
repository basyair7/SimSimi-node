import { Keys } from "../types"

class KeyManager implements Keys {
    public TeleBotToken: string;
    public SimSimiAPIUrl: string;
    public SimSimiApiKeys: string;
    public RegionSimSimi: string;

    constructor() {
        this.TeleBotToken = process.env.TELEBOT_TOKEN ?? 'nil';
        this.SimSimiAPIUrl = process.env.SIMSIMI_APIURL ?? 'nil';
        this.SimSimiApiKeys = process.env.SIMSIMI_APIKEYS ?? 'nil';
        this.RegionSimSimi = process.env.REGION ?? 'nil';

        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(): KeyManager {
        return new KeyManager();
    }
}

export default KeyManager;