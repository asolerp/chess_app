import React, { useState, useEffect, useContext } from 'react';
import {ChessBoard} from "react-fen-chess-board";
import { connect } from 'react-redux'

// ICONS
import { MdPlayArrow } from 'react-icons/md'
import { MdSkipNext } from 'react-icons/md'
import { MdSkipPrevious } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'


import {
  useHistory,
} from "react-router-dom";

import './TournamentPage.css'

// UI
import { PgnComponent } from '../../components/PgnComponent/PgnComponent'

const TournamentPage = ({tournament}) => {
    
  const history = useHistory()

  const [ positions, setPositions ] = useState(undefined)
  const [ partidas, setPartidas ] = useState(undefined)
  const [ live, setLive ] = useState(undefined)
  const [ pgns, setPgns ] = useState(undefined)

  const brownBoardTheme = {
    darkSquare: "#b58863",
    lightSquare: "#f0d9b5"
  };

  const initialPosition = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']

  useEffect(() => {
    if (!tournament.length > 0) {
      history.push('/')
    } 
  },[])

  useEffect(() => {
    let positions = JSON.parse(localStorage.getItem('tournament')).map((game, i) => (game.match.length))
    setPositions(positions)
  },[])

  useEffect(() => {
    let lives = JSON.parse(localStorage.getItem('tournament')).map((game, i) => (true))
    setLive(lives)
  },[])

  useEffect(() => {
    let pgns = tournament.map((game, i) => ([...game.pgns]))
    setPgns(pgns)
  },[tournament])

  useEffect(() => {
    let partidas = tournament.map((game, i) => ([...initialPosition,...game.match]))
    setPartidas(partidas)
  },[tournament])

  useEffect(() => {
    if (partidas && partidas.length > 0) {
      let newPositions = positions && [...positions]
      live && live.forEach((l, i) => {
        if (l) {
          newPositions[i] = partidas[i].length - 1
        }
      })
      console.log(newPositions)
      setPositions(newPositions)
    }
  }, [partidas, live])

  const first = (i) => {
    let newLives = [...live]
    newLives[i] = false
    setLive(newLives)
    const newPositions = [...positions]
    newPositions[i] = 0
    setPositions(newPositions)
  }

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
            <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
              <div style={{display: 'flex', padding: '10px'}} key={`game-${i}`}>
                <div className="board-wrapper__mainboard">
                  <ChessBoard 
                    fen={live && live[i] ? partidas && partidas[i][partidas[i].length - 1] : partidas[i][positions[i]]}
                    boardTheme={brownBoardTheme}
                  />
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
              <div className="board-wrapper__actions">
                <MdSkipPrevious size={35} onClick={() => first(i)} disabled={partidas && partidas[i].length === 1} />
                <MdKeyboardArrowLeft size={35} onClick={() => back(i)} disabled={partidas && partidas[i].length === 1} />
                <MdPlayArrow size={35} onClick={() => setLiveHandler(i)} />
                <MdKeyboardArrowRight size={35} onClick={() => next(i)} disabled={partidas && partidas[i].length === 1} />
                <MdSkipNext size={35} onClick={() => setLiveHandler(i)} />
              </div>
            </div>
          ))
        }
        </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentPage)
