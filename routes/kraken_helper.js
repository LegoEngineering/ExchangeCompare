const got    = require('got');
const qs     = require('qs');

module.exports.ticker= async (pairs) => {
    const options = {
        method : 'POST',
        body   : qs.stringify(pairs),
    };
    const url      = 'https://api.kraken.com/0/public/Ticker'
    const { body } = await got(url, options);
    const response = JSON.parse(body);

    if(response.error && response.error.length) {
        const error = response.error
            .filter((e) => e.startsWith('E'))
            .map((e) => e.substr(1));

        if(!error.length) {
            throw new Error("Kraken API returned an unknown error");
        }

        throw new Error(error.join(', '));
    }

    return response;
};