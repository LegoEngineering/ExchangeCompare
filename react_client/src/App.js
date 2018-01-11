import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import timer from './Components/timer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            count: 0
        };
        var delay = setInterval(null, 10000);
        this.interval = setInterval(this.updateDate, 30000);
    }

    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({data: data, count: this.state.count}))
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateDate = () => {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({data: data, count: this.state.count + 1}))
    }

    helper = (exName) => {
        const num = this.state.count;
        return this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === exName).map(data =>
            <div><br/><br/>{data.Exchange}:
                <ul>DASH: {data.DASH_price} BTC</ul>
                <ul>ETH: {data.ETH_price} BTC</ul>
                <ul>LTC: {data.LTC_price} BTC</ul>
            </div>
        )
    };

    bestExchange = (currency) => {
        var polo = [];
        var coin = [];
        var krak = [];
        const num = this.state.count;
        this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Poloniex').map(function(data) {
            polo[0] = data.DASH_price;
            polo[1] = data.ETH_price;
            polo[2] = data.LTC_price;
        })
        this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Coincap').map(function(data) {
            coin[0] = data.DASH_price;
            coin[1] = data.ETH_price;
            coin[2] = data.LTC_price;
        })
        this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Kraken').map(function(data) {
            polo[0] = data.DASH_price;
            krak[1] = data.ETH_price;
            krak[2] = data.LTC_price;
        })

        var dash_prices=[polo[0],coin[0],krak[0]];
        var eth_prices=[polo[1],coin[1],krak[1]];
        var ltc_prices=[polo[2],coin[2],krak[2]];
        if (currency === 'DASH') {
            if (polo[0] == Math.min.apply(null, dash_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Poloniex'
            } else if(coin[0] == Math.min.apply(null, dash_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Coincap'
            } else if(krak[0] == Math.min.apply(null, dash_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Kraken'
            } else {
            return 'unknown'
            }
        }
        if (currency === 'ETH') {
            if (polo[1] == Math.min.apply(null, eth_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Poloniex'
            } else if(coin[1] == Math.min.apply(null, eth_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Coincap'
            } else if(krak[1] == Math.min.apply(null, eth_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Kraken'
            } else {
                return 'unknown'
            }
        }
        if (currency === 'LTC') {
            if (polo[2] == Math.min.apply(null, ltc_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Poloniex'
            } else if(coin[2] == Math.min.apply(null, ltc_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Coincap'
            } else if(krak[2] == Math.min.apply(null, ltc_prices.filter(function(n) { return !isNaN(n); }))){
                return 'Kraken'
            } else {
                return 'unknown'
            }
        }
    }

render() {

        return (
            <div className="App">
                <h1>Exchange Data</h1>
                <h4>Compare Pricing Data from Your Favorite Exchanges!</h4><br/>
                    <div>Huey should use  {this.bestExchange('DASH')} for Dash</div>
                    <div>Dewey should use {this.bestExchange('ETH')} for Ether</div>
                    <div>Louie should use  {this.bestExchange('LTC')} for Litecoin</div>
                <div id="Polo">{this.helper('Poloniex')}</div> <div id="Coin">{this.helper('Coincap')}</div> <div id="Krak">{this.helper('Kraken')}</div>
                <h6>Update #{this.state.count} </h6>
            </div>
        );
    }
}

export default App;