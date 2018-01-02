import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import timer from './Components/timer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            count:0
        };
        this.interval = setInterval(this.updateDate, 5000);

    }
    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({ data }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    updateDate= () => {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({ data }));
    }

    render() {
        return (
            <div className="App">
                <h1>Exchange Data</h1>
                <h4>Dash Price       ETH Price       LTC Price</h4>
                {this.state.data.filter(({Index}) => Index === 5).map(data =>
                    <div key={data.Index}>{data.Exchange}: {data.DASH_price} {data.ETH_price} {data.LTC_price}</div>
                )}
            </div>
        );
    }
}


export default App;