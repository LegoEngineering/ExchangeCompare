var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Trade_update = require('../models/Trade_update.model');
const kraken = require('./helpers/kraken_helper');

async function apicalls() {

    var DASH_packet = (await kraken.ticker({pair: 'DASHUSD'}));
    var ETH_packet = (await kraken.ticker({pair: 'ETHXBT'}));
    var LTC_packet = (await kraken.ticker({pair: 'LTCXBT'}));
    var newTrade_update = new Trade_update({
        DASH_price: DASH_packet.result.DASHUSD.c[0],
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
apicalls();



/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = mongoose.model('Trade_update').find({},'-_id',function(err,Trade_update){
        console.log(Trade_update);
        console.log('Trade_update');
        res.send(Trade_update);

    });
});

module.exports = router;


