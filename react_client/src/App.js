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

    render() {
        const num = this.state.count;
        return (
            <div className="App">
                <h1>Exchange Data</h1>
                <h1> {this.state.count} </h1>
                <h4>Dash Price       ETH Price       LTC Price</h4>
                {this.state.data.filter(({Index}) => Index === num).map(data =>
                    <div>{data.Exchange}:
                        <ul>DASH: {data.DASH_price}</ul>
                        <ul>ETH:  {data.ETH_price}</ul>
                        <ul>LTC:  (data.LTC_price}</ul></div>
                )}

            </div>
        );
    }
}
//{this.state.data.filter(({Index}) => Index === 5).map(data =>
  //  <div key={data.Index}>{data.Exchange}: {data.DASH_price} {data.ETH_price} {data.LTC_price}</div>

export default App;