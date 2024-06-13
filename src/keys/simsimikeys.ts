import { SimSimiKeysType } from "../types"

class SimSimiKeys implements SimSimiKeysType {
    public SimSimiAPIUrl: string;
    public SimSimiAPIKeys: string;
    public RegionSimSimi: string;

    constructor() {
        this.SimSimiAPIUrl = process.env.SIMSIMI_APIURL ?? 'nil';
        this.SimSimiAPIKeys = process.env.SIMSIMI_APIKEYS ?? 'nil';
        this.RegionSimSimi = process.env.REGION ?? 'nil';

        this.validateKeys();
    }

    private validateKeys(): void {
        if(Object.values(this).includes('nil'))
            throw new Error("Not all ENV variables are defined!");
    }

    public static getInstance(): SimSimiKeys {
        return new SimSimiKeys();
    }
}

export default SimSimiKeys;