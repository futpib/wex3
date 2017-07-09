import "isomorphic-fetch";
export { default as PublicAPI } from "./PublicAPI";
export { default as TradeAPI } from "./TradeAPI";
export * from "./PublicAPI";
export * from "./TradeAPI";
export type OrderID = number;
export enum Valute {
    BTC = "btc", // Bitcoin
    USD = "usd", // Dollar
    LTC = "ltc", // Litecoin
    ETH = "eth", // Ethereum
    RUR = "rur", // Ruble
    EUR = "eur", // Euro
    NMC = "nmc", // Namecoin
    NVC = "nvc", // Novacoin
    PPC = "ppc", // Peercoin
    DSH = "dsh", // Dashcoin
}
export enum ValutePair {
    BTC_USD = "btc_usd",
    BTC_RUR = "btc_rur",
    BTC_EUR = "btc_eur",
    LTC_BTC = "ltc_btc",
    LTC_USD = "ltc_usd",
    LTC_RUR = "ltc_rur",
    LTC_EUR = "ltc_eur",
    NMC_BTC = "nmc_btc",
    NMC_USD = "nmc_usd",
    NVC_BTC = "nvc_btc",
    NVC_USD = "nvc_usd",
    USD_RUR = "usd_rur",
    EUR_USD = "eur_usd",
    EUR_RUR = "eur_rur",
    PPC_BTC = "ppc_btc",
    PPC_USD = "ppc_usd",
    DSH_BTC = "dsh_btc",
    DSH_USD = "dsh_usd",
    DSH_RUR = "dsh_rur",
    DSH_EUR = "dsh_eur",
    DSH_LTC = "dsh_ltc",
    DSH_ETH = "dsh_eth",
    ETH_BTC = "eth_btc",
    ETH_USD = "eth_usd",
    ETH_EUR = "eth_eur",
    ETH_LTC = "eth_ltc",
    ETH_RUR = "eth_rur",
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
