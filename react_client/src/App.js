import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {users:[]};

    }
    componentDidMount() {
        fetch('/kraken')
            .then(res => res.json())
            .then(users => this.setState({ users }));
            //.then(console.log(JSON.stringify(res)));
    }

    render() {
        return (
            <div className="App">
                <h1>Exchange Data</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.Exchange}</div>
                    //<div key={user.Exchange}>{user.ETH_price}</div>
                )}
            </div>
        );
    }
}


export default App;