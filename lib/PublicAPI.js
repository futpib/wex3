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
     * such as the maximum number of digits after the decimal point,
     * the minimum price, the maximum price, the minimum transaction size,
     * whether the pair is hidden, the commission for each pair.
     *
     * A hidden pair (hidden=1) remains active but is not displayed in the list of pairs on the main page.
     * The Commission is displayed for all users, it will not change even
     * if it was reduced on your account in case of promotional pricing.
     * If one of the pairs is disabled, it will simply disappear from the list.
     */
    info() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://wex.nz/api/3/info");
            return yield response.json();
        });
    }
    /**
     * This method provides all the information about currently active pairs,
     * such as: the maximum price, the minimum price, average price, trade volume,
     * trade volume in currency, the last trade, Buy and Sell price.
     *  All information is provided over the past 24 hours.
     */
    ticker(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://wex.nz/api/3/ticker/" + pair);
            return (yield response.json())[pair];
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
            const response = yield fetch("https://wex.nz/api/3/ticker/"
                + pairs.map((pair) => pair).join("-"));
            return yield response.json();
        });
    }
    /**
     * This method provides the information about active orders on the pair.
     * Additionally it accepts an optional GET-parameter limit,
     * which indicates how many orders should be displayed (150 by default).
     * Is set to less than 5000.
     */
    depth(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://wex.nz/api/3/depth/" + pair);
            return (yield response.json())[pair];
        });
    }
    /**
     * This method provides the information about the last trades.
     * Additionally it accepts an optional GET-parameter limit,
     * which indicates how many orders should be displayed (150 by default).
     * The maximum allowable value is 5000.
     */
    trades(pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("https://wex.nz/api/3/trades/" + pair);
            return (yield response.json())[pair];
        });
    }
}
exports.default = PublicAPI;
