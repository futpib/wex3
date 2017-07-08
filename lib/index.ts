import "isomorphic-fetch";
export { default as PublicAPI } from "./PublicAPI";
export { default as TradeAPI } from "./TradeAPI";
export * from "./PublicAPI";
export * from "./TradeAPI";
export type OrderID = number;
export enum Valute {
    BTC = "btc",
    USD = "usd",
    LTC = "ltc",
    ETH = "eth",
    RUR = "rur",
    EUR = "eur",
    NMC = "nmc",
    NVC = "nvc",
    PPC = "ppc",
    DSH = "dsh",
}
export enum OrderType {
    Buy = "buy",
    Sell = "sell",
}
export enum OrderStatus {
    Active = 0,
    Executed = 1,
    Canceled = 2,
    CanceledButPartiallyExecuted = 3,
}
