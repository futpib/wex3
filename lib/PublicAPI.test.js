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
const _1 = require(".");
const PublicAPI_1 = require("./PublicAPI");
beforeEach(() => {
    fetch.resetMocks();
});
it("info", () => __awaiter(this, void 0, void 0, function* () {
    const api = new PublicAPI_1.default();
    const ret = {
        test: "value1",
    };
    fetch.mockResponseOnce(JSON.stringify(ret));
    expect(yield api.info()).toEqual(ret);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/info"]]);
}));
it("ticker", () => __awaiter(this, void 0, void 0, function* () {
    const api = new PublicAPI_1.default();
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value,
    }));
    expect(yield api.ticker(_1.ValutePair.BTC_USD)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/ticker/btc_usd"]]);
}));
it("tickers", () => __awaiter(this, void 0, void 0, function* () {
    const api = new PublicAPI_1.default();
    const value1 = { test: 1 };
    const value2 = { test2: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value1,
        usd_btc: value2,
    }));
    expect(yield api.tickers([_1.ValutePair.USD_RUR, _1.ValutePair.ETH_BTC])).toEqual({
        btc_usd: value1,
        usd_btc: value2,
    });
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/ticker/usd_rur-eth_btc"]]);
}));
it("depth", () => __awaiter(this, void 0, void 0, function* () {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_eur: value }));
    const api = new PublicAPI_1.default();
    expect(yield api.depth(_1.ValutePair.ETH_EUR)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/depth/eth_eur"]]);
}));
it("trades", () => __awaiter(this, void 0, void 0, function* () {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ dsh_ltc: value }));
    const api = new PublicAPI_1.default();
    expect(yield api.trades(_1.ValutePair.DSH_LTC)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/trades/dsh_ltc"]]);
}));
