var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Trade_update = require('../models/Trade_update.model');
const kraken = require('./helpers/kraken_helper');
const poloniex = require('./poloniex');
const coincap = require('./coincap');

async function kraken_call(count) {
    var DASH_packet = (await kraken.ticker({pair: 'DASHXBT'}));
    var ETH_packet = (await kraken.ticker({pair: 'ETHXBT'}));
    //console.log(DASH_packet);
    var LTC_packet = (await kraken.ticker({pair: 'LTCXBT'}));
    var krakTrade_update = new Trade_update({
        Exchange: 'Kraken',
        Index: count,
        DASH_price: DASH_packet.result.DASHXBT.c[0],
        ETH_price: ETH_packet.result.XETHXXBT.c[0],
        LTC_price: LTC_packet.result.XLTCXXBT.c[0]
    });
    krakTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Kraken Trade_update');
        } else {
            console.log('Kraken Trade_update successfully saved.');
        }
    });
};


async function coincap_call(count) {
    var packet = (await coincap.ticker())
    var coinTrade_update = new Trade_update({
        Exchange: 'Coincap',
        Index: count,
        DASH_price: packet[9].price_btc,
        ETH_price: packet[2].price_btc,
        LTC_price: packet[5].price_btc
    });
    coinTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Coincap Trade_update');
        } else {
            console.log('Coincap Trade_update successfully saved.');
        }
    });
};


async function poloniex_call(count) {
    var packet = (await poloniex.ticker());
    var poloTrade_update = new Trade_update({
        Exchange: 'Poloniex',
        Index: count,
        DASH_price: packet.BTC_DASH.last,
        ETH_price: packet.BTC_ETH.last,
        LTC_price: packet.BTC_LTC.last
    });
    poloTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Poloniex Trade_update');
        } else {
            console.log('Poloniex Trade_update successfully saved.');
        }
    });
};

function apicalls(count){
    kraken_call(count);
    coincap_call(count);
    poloniex_call(count);
    return 0;
};

var index = 0;
setInterval(function(){apicalls(++index)},15000);


router.get('/', function(req, res) {
    var query = mongoose.model('Trade_update').find({},function(err,Trade_update){
        //console.log(Trade_update);
        res.send(Trade_update);

    });
});

module.exports = router;


