import { OrderType, Valute, ValutePair } from ".";
import TradeAPI from "./TradeAPI";
let request: jasmine.Spy;
let api: TradeAPI;
let ret: string;
beforeEach(() => {
    api = new TradeAPI({} as any);
    request = spyOn(api, "request");
    ret = "return" + Math.random();
    request.and.returnValue(ret);
    fetch.resetMocks();
});
it("success request", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: 1, return: "res1" }));
    const key = "key1";
    const secret = "secret1";
    const api2 = new TradeAPI({
        key,
        secret,
    });
    const params = { param1: "value1", param2: "value2" };
    expect(await api2.request("method1", params)).toBe("res1");
});
it("failure request", async () => {
    fetch.mockResponseOnce(JSON.stringify({ success: 0, error: "err1" }));
    const key = "key1";
    const secret = "secret1";
    const api2 = new TradeAPI({
        key,
        secret,
    });
    const params = {};
    try {
        await api2.request("method1", params);
        fail("Not throw");
    } catch (e) {
        expect(e.toString()).toBe("Error: err1");
    }
});
it("getInfo", async () => {
    expect(await api.getInfo()).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["getInfo", {}]]);
});
it("Trade", async () => {
    const rate = 11;
    const amount = 567;
    expect(await api.Trade(ValutePair.BTC_EUR, OrderType.Buy, rate, amount)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["Trade", {
        amount,
        pair: "btc_eur",
        rate,
        type: "buy",
    }]]);
});
it("ActiveOrders", async () => {
    expect(await api.ActiveOrders(ValutePair.ETH_BTC)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["ActiveOrders", {
        pair: "eth_btc",
    }]]);
});
it("OrderInfo", async () => {
    const orderId = 123;
    expect(await api.OrderInfo(orderId)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["OrderInfo", {
        order_id: orderId,
    }]]);
});
it("CancelOrder", async () => {
    const orderId = 2345;
    expect(await api.CancelOrder(orderId)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CancelOrder", {
        order_id: orderId,
    }]]);
});
it("TradeHistory", async () => {
    const count = 12;
    const end = 20;
    const endId = 22;
    const from = 111;
    const fromId = 500;
    const since = 775;
    expect(await api.TradeHistory({
        count,
        end,
        endId,
        from,
        fromId,
        order: "ASC",
        pair: ValutePair.BTC_USD,
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
});
it("TransHistory", async () => {
    const count = 12;
    const end = 20;
    const endId = 22;
    const from = 111;
    const fromId = 500;
    const since = 775;
    const order = "DESC";
    expect(await api.TransHistory({
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
});
it("CoinDepositAddress", async () => {
    expect(await api.CoinDepositAddress(Valute.BTC)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CoinDepositAddress", {
        coinName: "BTC",
    }]]);
});
it("WithdrawCoin", async () => {
    const amount = 204;
    const address = "addr1";
    expect(await api.WithdrawCoin(Valute.LTC, amount, address)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["WithdrawCoin", {
        address,
        amount,
        coinName: "LTC",
    }]]);
});
it("CreateCoupon", async () => {
    const amount = 204;
    const receiver = "receiver1";
    expect(await api.CreateCoupon(Valute.ETH, amount, receiver)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["CreateCoupon", {
        receiver,
        amount,
        currency: "ETH",
    }]]);
});
it("RedeemCoupon", async () => {
    const coupon = "coupon1";
    expect(await api.RedeemCoupon(coupon)).toBe(ret);
    expect(request.calls.allArgs()).toEqual([["RedeemCoupon", {
        coupon,
    }]]);
});
