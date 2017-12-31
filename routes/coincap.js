const got    = require('got');
const qs     = require('qs');

module.exports.ticker= async () => {
    const url      = 'https://api.coinmarketcap.com/v1/ticker/';
    const { body } = await got(url);
    return JSON.parse(body);
};