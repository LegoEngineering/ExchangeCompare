import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import timer from './Components/timer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            count: 0

        };
        var delay = setInterval(null, 10000);
        this.interval = setInterval(this.updateDate, 15000);

    }
    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({data: data, count: this.state.count} ))
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateDate= () => {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({data: data, count: this.state.count+1} ))
    }

    helper =(exName) =>{
        const num = this.state.count;
        return this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === exName).map(data =>
            <div><br/><br/>{data.Exchange}:
                <ul>DASH: {data.DASH_price}</ul>
                <ul>ETH:  {data.ETH_price}</ul>
                <ul>LTC:  {data.LTC_price}</ul></div>
        )};

    bestExchange = () => {
        var polo= [];
        var coin = [];
        var krak= [];
        const num = this.state.count;
        var PoloData = this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Poloniex').map(data =>
            polo = data.DASH_price
        )
        var CoinData = this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Coincap').map(data =>
            coin = data.DASH_price
        )
        var KraKData = this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Kraken').map(data =>
            krak = data.DASH_price
        )
        if (krak >= 0 ){
                return krak
        } else {
            return 'pants';
        }
        /*
        if(polo >= coin){
            return (krak);
        } else {
            return (krak);
        }*/
    }

render() {

        return (
            <div className="App">
                <h1>Exchange Data</h1><br/>
                <h1> {this.state.count} </h1>
                <h4>Compare Pricing Data from Your Favorite Exchanges!</h4><br/>
                <div>

                    <div>Huey  {this.bestExchange('ETH_price')}</div>
                    <div>Dewey  {this.bestExchange('DASH_price')}</div>
                    <div>Louie  {this.bestExchange('LTC_price')}</div>
                <div id="Polo">{this.helper('Poloniex')}</div> <div id="Coin">{this.helper('Coincap')}</div> <div id="Krak">{this.helper('Kraken')}</div>
                </div>
            </div>
        );
    }
}

export default App;