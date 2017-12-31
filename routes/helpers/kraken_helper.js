const got    = require('got');
const qs     = require('qs');

module.exports.ticker= async (pairs) => {
    const options = {
        method : 'POST',
        body   : qs.stringify(pairs),
    };
    const url      = 'https://api.kraken.com/0/public/Ticker'
    const { body } = await got(url, options);
    return JSON.parse(body);
};