import React, { useEffect }from 'react';
import './App.css';
import { connect } from 'react-redux'

import socketIOClient from "socket.io-client";

import {
  Switch,
  Route,
} from "react-router-dom";

// PAGES
import TournamentPage from './pages/TournamentPage/TournamentPage'
import { WaitingPage } from './pages/WaitingPage/WaitingPage'

import {
  useHistory
} from "react-router-dom";


const ENDPOINT = "/";

function App({ addTournament }) {

  const history = useHistory()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("get_data", data => {
      addTournament(data)
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


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTournament: (data) => dispatch({ type: "ADD_TOURNAMENT", payload: data })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
