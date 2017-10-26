import { ValutePair } from ".";
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
    expect(fetch.mock.calls).toEqual([["https://wex.nz/api/3/info"]]);
});
it("ticker", async () => {
    const api = new PublicAPI();
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value,
    }));
    expect(await api.ticker(ValutePair.BTC_USD)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://wex.nz/api/3/ticker/btc_usd"]]);
});
it("tickers", async () => {
    const api = new PublicAPI();
    const value1 = { test: 1 };
    const value2 = { test2: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value1,
        usd_btc: value2,
    }));
    expect(await api.tickers([ValutePair.USD_RUR, ValutePair.ETH_BTC])).toEqual({
        btc_usd: value1,
        usd_btc: value2,
    });
    expect(fetch.mock.calls).toEqual([["https://wex.nz/api/3/ticker/usd_rur-eth_btc"]]);
});
it("depth", async () => {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ eth_eur: value }));
    const api = new PublicAPI();
    expect(await api.depth(ValutePair.ETH_EUR)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://wex.nz/api/3/depth/eth_eur"]]);
});
it("trades", async () => {
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({ dsh_ltc: value }));
    const api = new PublicAPI();
    expect(await api.trades(ValutePair.DSH_LTC)).toEqual(value);
    expect(fetch.mock.calls).toEqual([["https://wex.nz/api/3/trades/dsh_ltc"]]);
});
