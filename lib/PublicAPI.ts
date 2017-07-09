import { ValutePair } from ".";

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
     * such as the maximum number of digits after the decimal point,
     * the minimum price, the maximum price, the minimum transaction size,
     * whether the pair is hidden, the commission for each pair.
     *
     * A hidden pair (hidden=1) remains active but is not displayed in the list of pairs on the main page.
     * The Commission is displayed for all users, it will not change even
     * if it was reduced on your account in case of promotional pricing.
     * If one of the pairs is disabled, it will simply disappear from the list.
     */
    public async info(): Promise<{
        server_time: number; // UNIX timestamp
        decimal_places: number; // number of decimals allowed during trading.
        min_price: number; // minimum price allowed during trading.
        max_price: number; // maximum price allowed during trading.
        min_amount: number; // minimum sell / buy transaction size.
        hidden: 0 | 1; // whether the pair is hidden, 0 or 1.
        fee: number; // commission for this pair.
    }> {
        const response = await fetch("https://btc-e.com/api/3/info");
        return await response.json();
    }
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    public async ticker(pair: ValutePair): Promise<ITickerValue> {
        const response = await fetch("https://btc-e.com/api/3/ticker/" + pair);
        return (await response.json())[pair];
    }
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    public async tickers(pairs: ValutePair[]): Promise<ITickerResult> {
        const response = await fetch("https://btc-e.com/api/3/ticker/"
            + pairs.map((pair) => pair).join("-"));
        return await response.json();
    }
    /**
     * This method provides the information about active orders on the pair.
     * Additionally it accepts an optional GET-parameter limit,
     * which indicates how many orders should be displayed (150 by default).
     * Is set to less than 5000.
     */
    public async depth(pair: ValutePair): Promise<{
        asks: Array<[number, number]>;
        bids: Array<[number, number]>;
    }> {
        const response = await fetch("https://btc-e.com/api/3/depth/" + pair);
        return (await response.json())[pair];
    }
    /**
     * This method provides the information about the last trades.
     * Additionally it accepts an optional GET-parameter limit,
     * which indicates how many orders should be displayed (150 by default).
     * The maximum allowable value is 5000.
     */
    public async trades(pair: ValutePair): Promise<Array<{
        type: "ask" | "bid"; // ask – Sell, bid – Buy.
        price: number; // Buy price/Sell price.
        amount: number; // the amount of asset bought/sold.
        tid: number; // trade ID.
        timestamp: number; // UNIX time of the trade.
    }>> {
        const response = await fetch("https://btc-e.com/api/3/trades/" + pair);
        return (await response.json())[pair];
    }
}
export default PublicAPI;
