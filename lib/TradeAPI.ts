import { OrderID, OrderStatus, OrderType, Valute, ValutePair } from ".";
import { generateSign } from "./util";
export interface ITradeAPIConfig {
    key: string;
    secret: string;
}
export type Funds = {[P in Valute]: number};
export interface IWithdrawCoinResult {
    tId: number; // Transaction ID.
    amountSent: number; // The amount sent including commission.
    funds: Funds; // Balance after the request.
}
/**
 * This API allows to trade on the exchange and receive information about the account.
 * To use this API, you need to create an API key. https://wex.nz/tapi/docs#main
 */
class TradeAPI {
    constructor(protected config: ITradeAPIConfig) { }
    /**
     * Returns information about the user’s current balance, API-key privileges,
     * the number of open orders and Server Time.
     * To use this method you need a privilege of the key info.
     */
    public async getInfo(): Promise<{
        funds: Funds; // Your account balance available for trading. Doesn’t include funds on your open orders.
        rights: { // The privileges of the current API key. At this time the privilege to withdraw is not used anywhere.
            info: number;
            trade: number;
            withdraw: number;
        };
        transaction_count: number; // Deprecated, is equal to 0.
        open_orders: number; // The number of your open orders.
        server_time: number; // Server time (MSK).
    }> {
        return this.request("getInfo", {});
    }
    /**
     * The basic method that can be used for creating orders and trading on the exchange.
     * To use this method you need an API key privilege to trade.
     * You can only create limit orders using this method, but you can emulate market orders using rate parameters.
     * E.g. using rate=0.1 you can sell at the best market price.
     * Each pair has a different limit on the minimum / maximum amounts,
     * the minimum amount and the number of digits after the decimal point.
     *  All limitations can be obtained using the info method in PublicAPI v3.
     * @param pair pair :: btc_usd (example)
     * @param type order type :: buy or sell
     * @param rate the rate at which you need to buy/sell :: numerical
     * @param amount the amount you need to buy / sell :: numerical
     */
    public async Trade(pair: ValutePair, type: OrderType, rate: number, amount: number): Promise<{
        received: number; // The amount of currency bought/sold.
        remains: number; // The remaining amount of currency to be bought/sold (and the initial order amount).
        /*
        * Is equal to 0 if the request was fully “matched” by the opposite orders,
        * otherwise the ID of the executed order will be returned.
        */
        order_id: number;
        funds: Funds; // Balance after the request.
    }> {
        return this.request("Trade", {
            pair,
            type,
            rate,
            amount,
        });
    }
    /**
     * Returns the list of your active orders.
     * To use this method you need a privilege of the info key.
     * If the order disappears from the list, it was either executed or canceled.
     * @param pair pair :: btc_usd (example) :: all pairs
     */
    public async ActiveOrders(pair: ValutePair): Promise<{
        // index - Order ID.
        [index: number]: {
            pair: string; // The pair on which the order was created.
            type: OrderType; // Order type, buy/sell.
            amount: number; // The amount of currency to be bought/sold.
            rate: number; // Sell/Buy price.
            timestamp_created: number; // The time when the order was created.
            status: OrderStatus; // Deprecated, is always equal to 0.
        };
    }> {
        return this.request("ActiveOrders", {
            pair,
        });
    }
    /**
     * Returns the information on particular order.
     * @param orderId order ID :: numerical
     */
    public async OrderInfo(orderId: OrderID): Promise<{
        // index - Order ID.
        [index: number]: {
            pair: string; // The pair on which the order was created
            type: OrderType; // Order type, buy/sell.
            start_amount: number; // The initial amount at the time of order creation.
            amount: number; // The remaining amount of currency to be bought/sold.
            rate: number; // Sell/Buy price.
            timestamp_created: number; // The time when the order was created.
            // 0 - active, 1 – executed order, 2 - canceled, 3 – canceled, but was partially executed.
            status: 0 | 1 | 2 | 3;
        };
    }> {
        return this.request("OrderInfo", {
            order_id: orderId,
        });
    }
    /**
     * This method is used for order cancelation.
     * To use this method you need a privilege of the trade key.
     * @param orderId 	order ID :: numerical
     */
    public async CancelOrder(orderId: OrderID): Promise<{
        order_id: OrderID; // The ID of canceled order.
        funds: Funds; // Balance upon request.
    }> {
        return this.request("CancelOrder", {
            order_id: orderId,
        });
    }
    /**
     * Returns trade history.
     */
    public async TradeHistory(params?: {
        from?: number; // trade ID, from which the display starts :: numerical :: 0
        count?: number; // the number of trades for display :: numerical :: 1000
        fromId?: number; // trade ID, from which the display starts :: numerical :: 0
        endId?: number; // trade ID on which the display ends :: numerical :: 	∞
        order?: "ASC" | "DESC"; // Sorting :: ASC or DESC :: DESC
        since?: number; // the time to start the display :: UNIX time :: 0
        end?: number; // the time to end the display :: UNIX time :: ∞
        pair?: ValutePair; // pair to be displayed :: btc_usd (example) :: all pairs
    }): Promise<{
        [index: number]: {
            pair: string; // The pair on which the trade was executed.
            type: OrderType; // Trade type, buy/sell.
            amount: number; // The amount of currency was bought/sold.
            rate: number; // Sell/Buy price.
            order_id: OrderID; // Order ID.
            is_your_order: 1 | 0; // Is equal to 1 if order_id is your order, otherwise is equal to 0.
            timestamp: number; // Trade execution time.
        };
    }> {
        params = params || {};
        const p: any = { ...params };
        if (params.endId) {
            p.end_id = params.endId;
            delete p.endId;
        }
        return this.request("TradeHistory", p);
    }
    /**
     * Returns the history of transactions.
     */
    public async TransHistory(params?: {
        from?: number; // transaction ID, from which the display starts :: numerical :: 0
        count?: number; // number of transaction to be displayed :: numerical :: 1000
        fromId?: number; // transaction ID, from which the display starts :: numerical :: 0
        endId?: number; // transaction ID on which the display ends :: numerical :: ∞
        order?: "ASC" | "DESC"; // sorting :: ASC or DESC :: ASC
        since?: number; // the time to start the display :: UNIX time :: 0
        end?: number; // the time to end the display :: UNIX time :: ∞
    }): Promise<{
        // index - Transaction ID.
        [index: number]: {
            type: number; // Transaction type. 1/2 - deposit/withdrawal, 4/5 - credit/debit.
            amount: number; // Transaction amount.
            currency: string; // Transaction currency.
            desc: string; // Transaction description.
            // Transaction status. 0 - canceled/failed, 1 - waiting for acceptance, 2 - successful, 3 – not confirmed
            status: 0 | 1 | 2 | 3;
            timestamp: number; // Transaction time.
        };
    }> {
        params = params || {};
        const p: any = { ...params };
        if (params.endId) {
            p.end_id = params.endId;
            delete p.endId;
        }
        return this.request("TransHistory", p);
    }
    /**
     * This method can be used to retrieve the address for depositing crypto-currency.
     * To use this method, you need the info key privilege.
     * At present, this method does not generate new adresses.
     * If you have never deposited in a particular crypto-currency and try to retrive a deposit address,
     * your request will return an error, because this address has not been generated yet.
     * @param coinName 	crypto currency :: For example: BTC, LTC
     */
    public async CoinDepositAddress(coinName: Valute): Promise<{
        address: string; // address for deposits
    }> {
        return this.request("CoinDepositAddress", {
            coinName: coinName.toUpperCase(),
        });
    }
    /**
     * The method is designed for cryptocurrency withdrawals.
     * Please note: You need to have the privilege of the Withdraw key to be able to use this method.
     * You can make a request for enabling this privilege by submitting a ticket to Support.
     * You need to create the API key that you are going to use for this method in advance.
     * Please provide the first 8 characters of the key (e.g. HKG82W66) in your ticket to support.
     * We'll enable the Withdraw privilege for this key.
     * When using this method, there will be no additional confirmations of withdrawal.
     * Please note that you are fully responsible for keeping the secret of the API key safe
     * after we have enabled the Withdraw privilege for it.
     * @param coinName :: currency (BTC, LTC (example))
     * @param amount :: numeric
     * @param address :: address
     */
    public async WithdrawCoin(coinName: Valute, amount: number, address: string): Promise<{
        tId: number; // Transaction ID.
        amountSent: number; // The amount sent including commission.
        funds: Funds; // Balance after the request.
    }> {
        return this.request("WithdrawCoin", {
            coinName: coinName.toUpperCase(),
            amount,
            address,
        });
    }
    /**
     * This method allows you to create Coupons.
     * Please, note: In order to use this method, you need the Coupon key privilege.
     * You can make a request to enable it by submitting a ticket to Support...
     * You need to create the API key that you are going to use for this method in advance.
     * Please provide the first 8 characters of the key (e.g. HKG82W66) in your ticket to support.
     * We'll enable the Coupon privilege for this key.
     * You must also provide us the IP-addresses from which you will be accessing the API.
     * When using this method, there will be no additional confirmations of transactions.
     * Please note that you are fully responsible for keeping the secret of the API key safe
     * after we have enabled the Withdraw privilege for it.
     * @param currency currency :: USD, BTC (example)
     * @param amount withdrawal amount :: numeric
     * @param receiver name of user who is allowed to redeem the code :: username
     */
    public async CreateCoupon(currency: Valute, amount: number, receiver: string): Promise<{
        coupon: string; // Generated coupon.
        transID: number; // Transaction ID.
        funds: Funds; // Balance after the request.
    }> {
        return this.request("CreateCoupon", {
            currency: currency.toUpperCase(),
            amount,
            receiver,
        });
    }
    /**
     * This method is used to redeem coupons.
     * Please, note: In order to use this method, you need the Coupon key privilege.
     * You can make a request to enable it by submitting a ticket to Support...
     * You need to create the API key that you are going to use for this method in advance.
     * Please provide the first 8 characters of the key (e.g. HKG82W66) in your ticket to support.
     * We'll enable the Coupon privilege for this key.
     * You must also provide us the IP-addresses from which you will be accessing the API.
     * When using this method, there will be no additional confirmations of transactions.
     * Please note that you are fully responsible for keeping the secret of the API key safe
     * after we have enabled the Withdraw privilege for it.
     * @param coupon coupon :: 	BTCE-USD... (example)
     */
    public async RedeemCoupon(coupon: string): Promise<{
        couponAmount: number; // The amount that has been redeemed.
        couponCurrency: string; // The currency of the coupon that has been redeemed.
        transID: number; // Transaction ID.
        funds: Funds; // Balance after the request.
    }> {
        return this.request("RedeemCoupon", {
            coupon,
        });
    }
    public async request(method: string, params: { [index: string]: any }) {
        const nonce = Math.round((new Date()).getTime() / 1000);
        params.nonce = nonce;
        params.method = method;
        const postData = Object.keys(params)
            .map((paramName) => ({ name: paramName, value: params[paramName] }))
            .sort((param1, param2) => param1.name > param2.name ? 1 : -1)
            .map((param) => {
                return param.name + "=" + param.value;
            }).join("&");
        const sign = generateSign(postData, this.config.secret);
        const headers = {
            "Key": this.config.key,
            "Sign": sign,
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const response = await fetch("https://wex.nz/tapi", {
            method: "POST",
            headers,
            body: postData,
        });
        const res = await response.json();
        if (res.success === 0) {
            throw new Error(res.error);
        }
        return res.return;
    }
}
export default TradeAPI;
