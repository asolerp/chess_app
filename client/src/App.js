import React, { useState } from 'react';
import './App.css';

import { StateProvider } from './state/store'

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
    <StateProvider>
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/">
            <WaitingPage />
          </Route>
          <Route path="/partidas">
            <TournamentPage />
          </Route>
        </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export const Context = React.createContext()
export default App;
