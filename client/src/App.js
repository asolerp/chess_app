import React, { useContext, useEffect }from 'react';
import './App.css';

import socketIOClient from "socket.io-client";

import {
  Switch,
  Route,
} from "react-router-dom";

// PAGES
import { TournamentPage } from './pages/TournamentPage/TournamentPage'
import { WaitingPage } from './pages/WaitingPage/WaitingPage'

import {
  useHistory
} from "react-router-dom";

import {store} from './state/store'

const ENDPOINT = "/";

function App() {

  const state = useContext(store)
  const { dispatch } = state
  const history = useHistory()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("get_data", data => {
      console.log("Partidas", data)
      dispatch({ type: "ADD_TOURNAMENT", payload: data })
      if (window.location.pathname === '/') {
        history.push('/partidas')
      }
    });
  }, []);
  
  return (
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
  );
}

export const Context = React.createContext()
export default App;
