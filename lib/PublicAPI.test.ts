import { Valute } from ".";
import PublicAPI from "./PublicAPI";
beforeEach(() => {
    fetch.resetMocks();
});
it("ticker", async () => {
    const api = new PublicAPI();
    const value = { test: 1 };
    fetch.mockResponseOnce(JSON.stringify({
        btc_usd: value,
    }));
    expect(await api.ticker(Valute.BTC, Valute.USD)).toEqual(value);
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
        from: Valute.BTC,
        to: Valute.USD,
    }])).toEqual({
        btc_usd: value1,
        usd_btc: value2,
    });
});
