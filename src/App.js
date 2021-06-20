import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import Home from './Home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from './Customers/Customers';
import CreateUser from './CreateUser/CreateUser';
import Transfers from './Transfers/Transfers';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/create-new" exact component={CreateUser} />
        <Route path="/transfers" exact component={Transfers} />
      </Switch>
    </Router>
  );
}

export default App;
