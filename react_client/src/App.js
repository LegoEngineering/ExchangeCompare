import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import timer from './Components/timer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data:[]};
        this.interval = setInterval(this.updateDate, 5000);

    }
    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(data => this.setState({ data }));
            //.then(console.log(JSON.stringify(res)));
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
                {this.state.data.map(data =>
                    <div key={data.id}>{data.Exchange}</div>

                    //<div key={user.Exchange}>{user.ETH_price}</div>
                )}
            </div>
        );
    }
}


export default App;