import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {latest_prices: []}

    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(latest_prices => this.setState({ latest_prices }));
    }

    render() {
        return (
            <div className="App">
                <h1>Exchange Compare</h1>
                {this.state.latest_prices.map(latest_prices =>
                    <div key={latest_prices.id}>{latest_prices}</div>
                )}
            </div>
        );
    }
}

export default App;