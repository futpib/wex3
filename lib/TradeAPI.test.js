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
const TradeAPI_1 = require("./TradeAPI");
let request;
let api;
let ret;
beforeEach(() => {
    api = new TradeAPI_1.default({});
    request = spyOn(api, "request");
    ret = "return" + Math.random();
    request.and.returnValue(ret);
    fetch.resetMocks();
});
it("success request", () => __awaiter(this, void 0, void 0, function* () {
    fetch.mockResponseOnce(JSON.stringify({ success: 1, return: "res1" }));
    const key = "key1";
    const secret = "secret1";
    const api2 = new TradeAPI_1.default({
        key,
        secret,
    });
    const params = { param1: "value1", param2: "value2" };
    expect(yield api2.request("method1", params)).toBe("res1");
}));
it("failure request", () => __awaiter(this, void 0, void 0, function* () {
    fetch.mockResponseOnce(JSON.stringify({ success: 0, error: "err1" }));
    const key = "key1";
    const secret = "secret1";
    const api2 = new TradeAPI_1.default({
        key,
        secret,
    });
    const params = {};
    try {
        yield api2.request("method1", params);
        fail("Not throw");
    }
    catch (e) {
        expect(e.toString()).toBe("Error: err1");
    }
}));
it("getInfo", () => __awaiter(this, void 0, void 0, function* () {
    expect(yield api.getInfo()).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["getInfo", {}]]);
}));
it("Trade", () => __awaiter(this, void 0, void 0, function* () {
    const rate = 11;
    const amount = 567;
    expect(yield api.Trade(_1.ValutePair.BTC_EUR, _1.OrderType.Buy, rate, amount)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["Trade", {
                amount,
                pair: "btc_eur",
                rate,
                type: "buy",
            }]]);
}));
it("ActiveOrders", () => __awaiter(this, void 0, void 0, function* () {
    expect(yield api.ActiveOrders(_1.ValutePair.ETH_BTC)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["ActiveOrders", {
                pair: "eth_btc",
            }]]);
}));
it("OrderInfo", () => __awaiter(this, void 0, void 0, function* () {
    const orderId = 123;
    expect(yield api.OrderInfo(orderId)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["OrderInfo", {
                order_id: orderId,
            }]]);
}));
it("CancelOrder", () => __awaiter(this, void 0, void 0, function* () {
    const orderId = 2345;
    expect(yield api.CancelOrder(orderId)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CancelOrder", {
                order_id: orderId,
            }]]);
}));
it("TradeHistory", () => __awaiter(this, void 0, void 0, function* () {
    const count = 12;
    const end = 20;
    const endId = 22;
    const from = 111;
    const fromId = 500;
    const since = 775;
    expect(yield api.TradeHistory({
        count,
        end,
        endId,
        from,
        fromId,
        order: "ASC",
        pair: _1.ValutePair.BTC_USD,
        since,
    })).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["TradeHistory", {
                count,
                end,
                fromId,
                from,
                pair: "btc_usd",
                since,
                end_id: endId,
                order: "ASC",
            }]]);
}));
it("TransHistory", () => __awaiter(this, void 0, void 0, function* () {
    const count = 12;
    const end = 20;
    const endId = 22;
    const from = 111;
    const fromId = 500;
    const since = 775;
    const order = "DESC";
    expect(yield api.TransHistory({
        from,
        count,
        end,
        endId,
        fromId,
        order,
        since,
    })).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["TransHistory", {
                count,
                end,
                fromId,
                from,
                since,
                end_id: endId,
                order,
            }]]);
}));
it("CoinDepositAddress", () => __awaiter(this, void 0, void 0, function* () {
    expect(yield api.CoinDepositAddress(_1.Valute.BTC)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CoinDepositAddress", {
                coinName: "BTC",
            }]]);
}));
it("WithdrawCoin", () => __awaiter(this, void 0, void 0, function* () {
    const amount = 204;
    const address = "addr1";
    expect(yield api.WithdrawCoin(_1.Valute.LTC, amount, address)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["WithdrawCoin", {
                address,
                amount,
                coinName: "LTC",
            }]]);
}));
it("CreateCoupon", () => __awaiter(this, void 0, void 0, function* () {
    const amount = 204;
    const receiver = "receiver1";
    expect(yield api.CreateCoupon(_1.Valute.ETH, amount, receiver)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CreateCoupon", {
                receiver,
                amount,
                currency: "ETH",
            }]]);
}));
it("RedeemCoupon", () => __awaiter(this, void 0, void 0, function* () {
    const coupon = "coupon1";
    expect(yield api.RedeemCoupon(coupon)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["RedeemCoupon", {
                coupon,
            }]]);
}));
