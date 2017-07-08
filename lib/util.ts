
import crypto = require("crypto");

export function generateSign(data: string, key: string) {
    return crypto.createHmac("sha512", key).update(new Buffer(data)).digest("hex").toString();
}
