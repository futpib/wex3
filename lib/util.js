"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function generateSign(data, key) {
    return crypto.createHmac("sha512", key).update(new Buffer(data)).digest("hex").toString();
}
exports.generateSign = generateSign;
