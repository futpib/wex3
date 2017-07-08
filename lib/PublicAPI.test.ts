import { Valute } from ".";
import PublicAPI from "./PublicAPI";
beforeEach(() => {
    fetch.resetMocks();
});
it("info", async () => {
    const api = new PublicAPI();
    const ret = {
        test: "value1",
    };
    fetch.mockResponseOnce(JSON.stringify(ret));
    expect(await api.info()).toEqual(ret);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/info"]]);
});
it("ticker", async () => {
    const api = new PublicAPI();
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value,
    }));
    expect(await api.ticker(Valute.BTC, Valute.USD)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/ticker/btc_usd"]]);
});
it("tickers", async () => {
    const api = new PublicAPI();
    const value1 = { test: 1 };
    const value2 = { test2: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value1,
        usd_btc: value2,
    }));
    expect(await api.tickers([{
        from: Valute.USD,
        to: Valute.BTC,
    }, {
        from: Valute.DSH,
        to: Valute.NVC,
    }])).toEqual({
        btc_usd: value1,
        usd_btc: value2,
    });
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/ticker/usd_btc-dsh_nvc"]]);
});
it("depth", async () => {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_nmc: value }));
    const api = new PublicAPI();
    expect(await api.depth(Valute.ETH, Valute.NMC)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/depth/eth_nmc"]]);
});
it("trades", async () => {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_dsh: value }));
    const api = new PublicAPI();
    expect(await api.trades(Valute.ETH, Valute.DSH)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://btc-e.com/api/3/trades/eth_dsh"]]);
});
