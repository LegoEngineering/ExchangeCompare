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
        this.interval = setInterval(this.updateDate, 10000);

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
            <div>{data.Exchange}:
                <ul>DASH: {data.DASH_price}</ul>
                <ul>ETH:  {data.ETH_price}</ul>
                <ul>LTC:  {data.LTC_price}</ul></div>
        )};

    bestExchange = () => {
        var polo= [];
        var coin = [];
        const num = this.state.count;
        var PoloData = this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Poloniex').map(data =>
            polo = data.DASH_price
        )
        var CoinData = this.state.data.filter(({Index}) => Index === num).filter(({Exchange}) => Exchange === 'Coincap').map(data =>
            coin = data.DASH_price
        )
        if(polo >= coin){
            return (polo);
        } else {
            return (coin);
        }
    }

render() {

        return (
            <div className="App">
                <h1>Exchange Data</h1>
                <h1> {this.state.count} </h1>
                <h4>Huey Duey Louie</h4>
                <div>
                    <div>yo  {this.bestExchange('DASH_price')}</div>
                    <div>yo  {this.bestExchange('ETH_price')}</div>
                    <div>yo  {this.bestExchange('LTC_price')}</div>
                <div id="Polo">{this.helper('Poloniex')}</div> <div id="Coin">{this.helper('Coincap')}</div>
                </div>
            </div>
        );
    }
}

export default App;