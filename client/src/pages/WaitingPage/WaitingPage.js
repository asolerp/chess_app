import React, { useContext, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './WaitingPage.css'

import {
  useHistory,
} from "react-router-dom";

import {store} from '../../state/store'

const ENDPOINT = "/";


export const WaitingPage = () => {

  const state = useContext(store)
  const { dispatch } = state
  const history = useHistory()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("get_data", data => {
      dispatch({ type: "ADD_TOURNAMENT", payload: data })
      history.push('/partidas')
      // console.log("Llegan datos!", data)
      // setTournament(data)
    });
  }, []);


  return (
    <div className="mainpage-wrapper">
      <h1>ESPERANDO LA RETRANSMISIÓN DEL TORNEO</h1>
    </div>
  )
}