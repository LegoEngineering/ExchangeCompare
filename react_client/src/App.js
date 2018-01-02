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
        this.interval = setInterval(this.updateDate, 7000);

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

    render() {
        /*var cake;
        if (this.state.count>0){
            cake ='frame'
        } else{
            cake = 'no frame'
        }*/

        return (
            <div className="App">
                <h1>Exchange Data</h1>
                <h1> {this.state.count} </h1>
                <h4>Huey Duey Louie</h4>
                {this.helper('Poloniex')}

            </div>
        );
    }
}

export default App;