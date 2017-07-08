# btc-e3

API Client for https://btc-e.com: Trade API and Public API with TypeScript support.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install btc-e3 --save

    or

    yarn add btc-e3

# Usage

    import { TradeAPI, PublicAPI } from "btc-e3";
    const api = new TradeAPI({
        key: "key1",
        secret: "secret1",
    });
    api.getInfo().then((info)=>{
        console.log(info.transaction_count);
    });


# Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/btc-e3.svg
[npm-url]: https://npmjs.org/package/btc-e3
[travis-image]: https://travis-ci.org/arvitaly/btc-e3.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/btc-e3
[daviddm-image]: https://david-dm.org/arvitaly/btc-e3.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/btc-e3
[coveralls-image]: https://coveralls.io/repos/arvitaly/btc-e3/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/btc-e3