import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// PAGES
import { TournamentPage } from './pages/TournamentPage/TournamentPage'
import { WaitingPage } from './pages/WaitingPage/WaitingPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <WaitingPage />
          </Route>
          <Router path="/partidas">
            <TournamentPage />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
