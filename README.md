# wex3

API Client for https://wex.nz: Trade API and Public API with TypeScript support.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install wex3 --save

    or

    yarn add wex3

# Usage

    import { TradeAPI, PublicAPI } from "wex3";
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

# Donate

    Ethereum: 0x053C5BF25C80a04494768a2436e54126FDE9DB1d

[npm-image]: https://badge.fury.io/js/wex3.svg
[npm-url]: https://npmjs.org/package/wex3
[travis-image]: https://travis-ci.org/arvitaly/wex3.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/wex3
[daviddm-image]: https://david-dm.org/arvitaly/wex3.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/wex3
[coveralls-image]: https://coveralls.io/repos/arvitaly/wex3/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/wex3