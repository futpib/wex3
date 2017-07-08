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
    Valute[Valute["BTC"] = "btc"] = "BTC";
    Valute[Valute["USD"] = "usd"] = "USD";
    Valute[Valute["LTC"] = "ltc"] = "LTC";
    Valute[Valute["ETH"] = "eth"] = "ETH";
})(Valute = exports.Valute || (exports.Valute = {}));
var OrderType;
(function (OrderType) {
    OrderType[OrderType["Buy"] = "buy"] = "Buy";
    OrderType[OrderType["Sell"] = "sell"] = "Sell";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Active"] = 0] = "Active";
    OrderStatus[OrderStatus["Executed"] = 1] = "Executed";
    OrderStatus[OrderStatus["Canceled"] = 2] = "Canceled";
    OrderStatus[OrderStatus["CanceledButPartiallyExecuted"] = 3] = "CanceledButPartiallyExecuted";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
