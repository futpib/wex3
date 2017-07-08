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
class PublicAPI {
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    ticker(from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const pairName = from + "_" + to;
            const response = yield fetch("https://btc-e.com/api/3/ticker/" + pairName);
            return (yield response.json())[pairName];
        });
    }
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    tickers(pairs) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://btc-e.com/api/3/ticker/"
                + pairs.map((pair) => pair.from + "_" + pair.to).join("-"));
            return yield response.json();
        });
    }
}
exports.default = PublicAPI;
