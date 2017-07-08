import { Valute } from ".";
export interface IValutePair {
    from: Valute;
    to: Valute;
}
export interface ITickerValue {
    high: number; // maximum price.
    low: number; // minimum price.
    avg: number; // average price.
    vol: number; // trade volume.
    vol_cur: number; //  trade volume in currency.
    last: number; // the price of the last trade.
    buy: number; // buy price.
    sell: number; // sell price.
    updated: number; // last update of cache.
}
export interface ITickerResult {
    [index: string]: ITickerValue;
}
class PublicAPI {
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    public async ticker(from: Valute, to: Valute): Promise<ITickerValue> {
        const pairName = from + "_" + to;
        const response = await fetch("https://btc-e.com/api/3/ticker/" + pairName);
        return (await response.json())[pairName];
    }
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    public async tickers(pairs: IValutePair[]): Promise<ITickerResult> {
        const response = await fetch("https://btc-e.com/api/3/ticker/"
            + pairs.map((pair) => pair.from + "_" + pair.to).join("-"));
        return await response.json();
    }
}
export default PublicAPI;
