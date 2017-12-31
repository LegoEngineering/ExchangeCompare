var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trade_updateSchema = new Schema({
        Exchange: "String",
        Date: "String",
        DASH_price: "String",
        ETH_price: "String",
        LTC_price: "String",
    }
);

module.exports = mongoose.model('Trade_update', Trade_updateSchema);

/* a = ask array(<price>, <whole lot volume>, <lot volume>),
    b = bid array(<price>, <whole lot volume>, <lot volume>),
    c = last trade closed array(<price>, <lot volume>),
    v = volume array(<today>, <last 24 hours>),
    p = volume weighted average price array(<today>, <last 24 hours>),
    t = number of trades array(<today>, <last 24 hours>),
    l = low array(<today>, <last 24 hours>),
    h = high array(<today>, <last 24 hours>),
    o = today's opening price
    */