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
    expect(yield api.ticker(_1.Valute.BTC, _1.Valute.USD)).toEqual(value);
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
    expect(yield api.tickers([{
            from: _1.Valute.USD,
            to: _1.Valute.BTC,
        }, {
            from: _1.Valute.DSH,
            to: _1.Valute.NVC,
        }])).toEqual({
        btc_usd: value1,
        usd_btc: value2,
    });
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/ticker/usd_btc-dsh_nvc"]]);
}));
it("depth", () => __awaiter(this, void 0, void 0, function* () {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_nmc: value }));
    const api = new PublicAPI_1.default();
    expect(yield api.depth(_1.Valute.ETH, _1.Valute.NMC)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/depth/eth_nmc"]]);
}));
it("trades", () => __awaiter(this, void 0, void 0, function* () {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_dsh: value }));
    const api = new PublicAPI_1.default();
    expect(yield api.trades(_1.Valute.ETH, _1.Valute.DSH)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/trades/eth_dsh"]]);
}));
