import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './commponts/Header';
import Home from './commponts/Home';
import Favorite from './commponts/Favorite';

export class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Header />
        <Switch>
        <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/fav">
            <Favorite />
          </Route>
        </Switch>
    </Router>
      </>
    )
  }
}

export default App
