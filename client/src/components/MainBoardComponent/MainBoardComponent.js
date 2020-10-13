import React, { useState, useEffect } from 'react'
import {ChessBoard} from "react-fen-chess-board";
import './MainBoardComponent.css'

// UI
import { PgnTableComponent } from '../../components/PgnTableComponent/PgnTableComponent'
import { InfoPlayerComponent } from '../InfoPlayerComponent/InfoPlayerComponent'

// ICONS
import { MdPlayArrow } from 'react-icons/md'
import { MdSkipNext } from 'react-icons/md'
import { MdSkipPrevious } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'


export const MainBoardComponent = ({board}) => {

  console.log(board)

  const initialPosition = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1']

  const brownBoardTheme = {
    darkSquare: "#b58863",
    lightSquare: "#f0d9b5"
  };

  const [ live, setLive ] = useState(true)
  const [ position, setPosition ] = useState(undefined)
  const [ partida, setPartida ] = useState(undefined)

  useEffect(() => {
    if (board) {
      let partida = [...initialPosition,...board.match]
      setPartida(partida)
    }
  },[board])

  useEffect(() => {
    if (board) {
      let position = board.match.length
      setPosition(position)
    }
  },[])

  useEffect(() => {
    if (partida && partida.length > 0) {
      let newPosition = position
      if (live) {
        newPosition = partida.length - 1
      }
      setPosition(newPosition)
    }
  }, [partida, live])

  const first = () => {
    setLive(false)
    setPosition(0)
  }

  const next = () => {
    setLive(false)
    if (position < (board.match.length - 1)) {
      setPosition(position + 1)
    }
  }

  const back = () => {
    setLive(false)
    if (position > 0) {
      setPosition(position - 1)
    }
  }

  const goToPosition = (position) => {
    setLive(false)
    setPosition(position)
  } 

  const setLiveHandler = (index) => {
    setLive(true)
    setPosition(board.match.length - 1)
  }

  return (
    <React.Fragment>
      {
        board && (
          <div style={{display: 'flex', flexDirection: 'column', padding: '10px'}}>
            <div className={"board"}>
              <div className="board-wrapper__mainboard">
                <ChessBoard 
                  fen={live ? board.match[board.match.length - 1] : partida[position]}
                  boardTheme={brownBoardTheme}
                />
              </div>
              <div>
                <InfoPlayerComponent board={board}/>
                <div className="bard-wrapper__pgns">
                  <PgnTableComponent
                  board={0}
                  onClick={(pos) => goToPosition(pos + 1)}
                  active={position - 1}
                  pgns={board.pgns} 
                  />
                </div>
              </div>
            </div>
            <div className="board-wrapper__actions">
              <MdSkipPrevious size={35} className={"icon-action"} onClick={() => first()} disabled={partida && partida.length === 1} />
              <MdKeyboardArrowLeft size={35} className={"icon-action"} onClick={() => back()} disabled={partida && partida.length === 1} />
              <MdPlayArrow size={35} className={"icon-action"} onClick={() => setLiveHandler()} />
              <MdKeyboardArrowRight size={35} className={"icon-action"} onClick={() => next()} disabled={partida && partida.length === 1} />
              <MdSkipNext size={35} className={"icon-action"} onClick={() => setLiveHandler()} />
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}