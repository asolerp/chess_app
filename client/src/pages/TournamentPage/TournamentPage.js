import React, { useState, useEffect } from 'react';
import {ChessBoard} from "react-fen-chess-board";
import socketIOClient from "socket.io-client";

import './TournamentPage.css'

// UI
import { PgnComponent } from '../PgnComponent/PgnComponent'

export const TournamentPage = () => {
    
  const ENDPOINT = "/";

  const [ tournament, setTournament ] = useState()
  const [ positions, setPositions ] = useState(undefined)
  const [ partidas, setPartidas ] = useState(undefined)
  const [ jugadas, setJugadas ] = useState(undefined)
  const [ live, setLive ] = useState(undefined)
  const [ pgns, setPgns ] = useState(undefined)

  const brownBoardTheme = {
    darkSquare: "#b58863",
    lightSquare: "#f0d9b5"
  };

  const initialPosition = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("get_data", data => {
      console.log("Llegan datos!", data)
      setTournament(data)
    });
  }, []);

  useEffect(() => {
    const positions = tournament && tournament.map((game, i) => (0))
    setPositions(positions)
  },[tournament])

  useEffect(() => {
    const lives = tournament && tournament.map((game, i) => ( true))
    setLive(lives)
  },[tournament])

  useEffect(() => {
    let jugadas = tournament && tournament.map((game, i) => (game.match[game.match.length - 1]))
    setJugadas(jugadas)
  },[tournament])

  useEffect(() => {
    let pgns = tournament && tournament.map((game, i) => ([...game.pgns]))
    setPgns(pgns)
  },[tournament])

  useEffect(() => {
    console.log("partidas")
    let partidas = tournament && tournament.map((game, i) => ([...initialPosition,...game.match]))
    setPartidas(partidas)
  },[tournament])

  useEffect(() => {
    let newPositions = positions && [...positions]
    live && live.forEach((l, i) => {
      if (l) {
        newPositions[i] = partidas[i].length - 1
      }
    })
    setPositions(newPositions)
  }, [partidas, live])

  const next = (index) => {
    let newLives = [...live]
    newLives[index] = false
    setLive(newLives)
    if (positions[index] < (partidas[index].length - 1)) {
      const newPositions = [...positions]
      newPositions[index] = newPositions[index] + 1
      setPositions(newPositions)
    }
  }

  const back = (index) => {
    let newLives = [...live]
    newLives[index] = false
    setLive(newLives)
    if (positions[index] > 0) {
      const newPositions = [...positions]
      newPositions[index] = newPositions[index] - 1
      setPositions(newPositions)
    }
  }

  const goToPosition = (index, position) => {
    console.log("[[INDEX]]", index)
    console.log("[[POSITION]]", position)
    let newLives = Array.isArray(live) && [...live]
    newLives[index] = false
    setLive(newLives)

    let newPositions = [...positions]
    newPositions[index] = position
    setPositions(newPositions)
  }
 

  const setLiveHandler = (index) => {
    let newLives = [...live]
    newLives[index] = true
    setLive(newLives)
    let newPositions = [...positions]
    newPositions[index] = partidas[index].length - 1
    setPositions(newPositions)
  }

  return (
    <React.Fragment>
      <div className="board-wrapper">
        {
          partidas && partidas.map((game, i) => (
            <div style={{display: 'flex', padding: '10px'}} key={`game-${i}`}>
            <div className="board-wrapper__mainboard">
              <ChessBoard 
                fen={live && live[i] ? jugadas && jugadas[i] : partidas && partidas[i][positions && positions[i]]}
                boardTheme={brownBoardTheme}
              />
            <div className="board-wrapper__actions">
              <button onClick={() => back(i)} disabled={partidas && partidas[i].length === 1}>Atrás</button>
              <button onClick={() => next(i)} disabled={partidas && partidas[i].length === 1}>Siguiente</button>
              <button onClick={() => setLiveHandler(i)}>Live</button>
            </div>
            </div>
            <div className="bard-wrapper__pgns">
              {
              pgns && pgns[i].map((pgn, x) => (
                <PgnComponent 
                  key={i + x}
                  onClick={() => goToPosition(i, x+1)} 
                  active={x === positions[i] - 1 && 'yellow'}  
                  pos={x}    
                  pgn={pgn}    
                />
              ))
              }
            </div>
          </div>
          ))
        }
        </div>
    </React.Fragment>
  )
}