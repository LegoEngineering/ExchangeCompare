
const got    = require('got');
const qs     = require('qs');

module.exports.ticker= async (pairs) => {
    const options = {
        method : 'POST',
        body   : qs.stringify(pairs),
    };
    const url      = 'https://poloniex.com/public?command=returnTicker'
    const { body } = await got(url, options);
    return JSON.parse(body);
};