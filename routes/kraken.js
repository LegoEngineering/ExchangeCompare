var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Trade_update = require('../models/Trade_update.model');
const kraken = require('./kraken_helper');
const poloniex = require('./poloniex');
const coincap = require('./coincap');

async function coincap_call() {
    var packet = (await coincap.ticker());
    var coinTrade_update = new Trade_update({
        Exchange: 'Coincap',
        DASH_price: packet[8].price_btc,
        ETH_price: packet[2].price_btc,
        LTC_price: packet[5].price_btc

    });
    coinTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Trade_update');
        } else {
            console.log('Trade_update successfully saved.');
        }
    });
};
coincap_call();

async function poloniex_call() {
    var packet = (await poloniex.ticker());
    var poloTrade_update = new Trade_update({
        Exchange: 'Poloniex',
        DASH_price: packet.BTC_DASH.last,
        ETH_price: packet.BTC_ETH.last,
        LTC_price: packet.BTC_LTC.last
    });
    poloTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Trade_update');
        } else {
            console.log('Trade_update successfully saved.');
        }
    });
};
poloniex_call();

async function kraken_call() {
    //var DASH_packet = (await kraken.ticker({pair: 'DASHXBT'}));
    var ETH_packet = (await kraken.ticker({pair: 'ETHXBT'}));
    //console.log(ETH_packet.result.XETHXXBT.c)
    var LTC_packet = (await kraken.ticker({pair: 'LTCXBT'}));
    var newTrade_update = new Trade_update({
        Exchange: 'Kraken',
        //DASH_price: DASH_packet.result.DASHUSD.c[0],
        ETH_price: ETH_packet.result.XETHXXBT.c[0],
        LTC_price: LTC_packet.result.XLTCXXBT.c[0]
    });
    newTrade_update.save(function(err, Trade_update) {
        if(err) {
            res.send('error saving Trade_update');
        } else {
            console.log('Trade_update successfully saved.');
        }
    });
};
kraken_call();

router.get('/', function(req, res, next) {
    var query = mongoose.model('Trade_update').find({},'-_id',function(err,Trade_update){
        console.log(Trade_update);
        console.log('Trade_update');
        res.send(Trade_update);

    });
});

module.exports = router;


