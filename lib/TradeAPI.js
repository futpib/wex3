"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
 * This API allows to trade on the exchange and receive information about the account.
 * To use this API, you need to create an API key. https://btc-e.com/tapi/docs#main
 */
class TradeAPI {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns information about the user’s current balance, API-key privileges,
     * the number of open orders and Server Time.
     * To use this method you need a privilege of the key info.
     */
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("getInfo", {});
        });
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
    Trade(pair, type, rate, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("Trade", {
                pair,
                type,
                rate,
                amount,
            });
        });
    }
    /**
     * Returns the list of your active orders.
     * To use this method you need a privilege of the info key.
     * If the order disappears from the list, it was either executed or canceled.
     * @param pair pair :: btc_usd (example) :: all pairs
     */
    ActiveOrders(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("ActiveOrders", {
                pair,
            });
        });
    }
    /**
     * Returns the information on particular order.
     * @param orderId order ID :: numerical
     */
    OrderInfo(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("OrderInfo", {
                order_id: orderId,
            });
        });
    }
    /**
     * This method is used for order cancelation.
     * To use this method you need a privilege of the trade key.
     * @param orderId 	order ID :: numerical
     */
    CancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("CancelOrder", {
                order_id: orderId,
            });
        });
    }
    /**
     * Returns trade history.
     */
    TradeHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params || {};
            const p = Object.assign({}, params);
            if (params.endId) {
                p.end_id = params.endId;
                delete p.endId;
            }
            return this.request("TradeHistory", p);
        });
    }
    /**
     * Returns the history of transactions.
     */
    TransHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params = params || {};
            const p = Object.assign({}, params);
            if (params.endId) {
                p.end_id = params.endId;
                delete p.endId;
            }
            return this.request("TransHistory", p);
        });
    }
    /**
     * This method can be used to retrieve the address for depositing crypto-currency.
     * To use this method, you need the info key privilege.
     * At present, this method does not generate new adresses.
     * If you have never deposited in a particular crypto-currency and try to retrive a deposit address,
     * your request will return an error, because this address has not been generated yet.
     * @param coinName 	crypto currency :: For example: BTC, LTC
     */
    CoinDepositAddress(coinName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("CoinDepositAddress", {
                coinName: coinName.toUpperCase(),
            });
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
    WithdrawCoin(coinName, amount, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("WithdrawCoin", {
                coinName: coinName.toUpperCase(),
                amount,
                address,
            });
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
    CreateCoupon(currency, amount, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("CreateCoupon", {
                currency: currency.toUpperCase(),
                amount,
                receiver,
            });
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
    RedeemCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request("RedeemCoupon", {
                coupon,
            });
        });
    }
    request(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const nonce = Math.round((new Date()).getTime() / 1000);
            params.nonce = nonce;
            params.method = method;
            const postData = Object.keys(params)
                .map((paramName) => ({ name: paramName, value: params[paramName] }))
                .sort((param1, param2) => param1.name > param2.name ? 1 : -1)
                .map((param) => {
                return param.name + "=" + param.value;
            }).join("&");
            const sign = util_1.generateSign(postData, this.config.secret);
            const headers = {
                "Key": this.config.key,
                "Sign": sign,
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const response = yield fetch("https://btc-e.com/tapi", {
                method: "POST",
                headers,
                body: postData,
            });
            const res = yield response.json();
            if (res.success === 0) {
                throw new Error(res.error);
            }
            return res.return;
        });
    }
}
exports.default = TradeAPI;
