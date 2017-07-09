"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var PublicAPI_1 = require("./PublicAPI");
exports.PublicAPI = PublicAPI_1.default;
var TradeAPI_1 = require("./TradeAPI");
exports.TradeAPI = TradeAPI_1.default;
__export(require("./PublicAPI"));
__export(require("./TradeAPI"));
var Valute;
(function (Valute) {
    Valute["BTC"] = "btc";
    Valute["USD"] = "usd";
    Valute["LTC"] = "ltc";
    Valute["ETH"] = "eth";
    Valute["RUR"] = "rur";
    Valute["EUR"] = "eur";
    Valute["NMC"] = "nmc";
    Valute["NVC"] = "nvc";
    Valute["PPC"] = "ppc";
    Valute["DSH"] = "dsh";
})(Valute = exports.Valute || (exports.Valute = {}));
var ValutePair;
(function (ValutePair) {
    ValutePair["BTC_USD"] = "btc_usd";
    ValutePair["BTC_RUR"] = "btc_rur";
    ValutePair["BTC_EUR"] = "btc_eur";
    ValutePair["LTC_BTC"] = "ltc_btc";
    ValutePair["LTC_USD"] = "ltc_usd";
    ValutePair["LTC_RUR"] = "ltc_rur";
    ValutePair["LTC_EUR"] = "ltc_eur";
    ValutePair["NMC_BTC"] = "nmc_btc";
    ValutePair["NMC_USD"] = "nmc_usd";
    ValutePair["NVC_BTC"] = "nvc_btc";
    ValutePair["NVC_USD"] = "nvc_usd";
    ValutePair["USD_RUR"] = "usd_rur";
    ValutePair["EUR_USD"] = "eur_usd";
    ValutePair["EUR_RUR"] = "eur_rur";
    ValutePair["PPC_BTC"] = "ppc_btc";
    ValutePair["PPC_USD"] = "ppc_usd";
    ValutePair["DSH_BTC"] = "dsh_btc";
    ValutePair["DSH_USD"] = "dsh_usd";
    ValutePair["DSH_RUR"] = "dsh_rur";
    ValutePair["DSH_EUR"] = "dsh_eur";
    ValutePair["DSH_LTC"] = "dsh_ltc";
    ValutePair["DSH_ETH"] = "dsh_eth";
    ValutePair["ETH_BTC"] = "eth_btc";
    ValutePair["ETH_USD"] = "eth_usd";
    ValutePair["ETH_EUR"] = "eth_eur";
    ValutePair["ETH_LTC"] = "eth_ltc";
    ValutePair["ETH_RUR"] = "eth_rur";
})(ValutePair = exports.ValutePair || (exports.ValutePair = {}));
var OrderType;
(function (OrderType) {
    OrderType["Buy"] = "buy";
    OrderType["Sell"] = "sell";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Active"] = 0] = "Active";
    OrderStatus[OrderStatus["Executed"] = 1] = "Executed";
    OrderStatus[OrderStatus["Canceled"] = 2] = "Canceled";
    OrderStatus[OrderStatus["CanceledButPartiallyExecuted"] = 3] = "CanceledButPartiallyExecuted";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
