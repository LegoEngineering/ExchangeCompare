# ExchangeCompare
A web app built with MERN stack to compare the rates of various cryptocurrency exchanges

Setup:

1.Install MongoDB & run in CLI with "mongod" command

2.Run `npm install` inside master folder

3.Run `npm start`

4.CD into react_client and repeat steps 2 & 3 

The client should open automatically in your browser.
Keep in mind there is an initial 30 second delay and the app refreshes every 20 seconds.

Currently the app only speaks with the public APIs.
If no data is available for a given exchange it is simply not included in the current comparison.
If including every exchange is a priority, then the refresh time simply needs to be changed in line 15 of `App.js` in the client and line 77 of `kraken.js`.

The system maintains no historical data except that collected after initialization. Future versions will use historical data combined with charts to increase appeal and potential advantages when projecting price.

The two main files, outside of standards, here are `App.js` in the react_client and `Kraken.js` in the main folder
