import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import {ChessBoard} from "react-fen-chess-board";


import {
  useHistory,
} from "react-router-dom";
import './TournamentPage.css'
import { MainBoardComponent } from '../../components/MainBoardComponent/MainBoardComponent';


const TournamentPage = ({tournament}) => {

  const history = useHistory()
  const [boardSelected, setBoardSelected] = useState(0)

  const brownBoardTheme = {
    darkSquare: "#b58863",
    lightSquare: "#f0d9b5"
  };
    
  useEffect(() => {
    if (!tournament.length > 0) {
      history.push('/')
    } 
  },[])

  return (
    <React.Fragment>
      <div style={{display:'flex'}}>
        <div className="board-wrapper">
          <MainBoardComponent board={tournament[boardSelected]} />
        </div>
        <div className="boards-wrapper">
          {
            tournament && tournament.map((game, i) => (
              <div
                onClick={() => setBoardSelected(i)}
                className={boardSelected === i ? 'selected' : ''} 
                style={{ width: '250px', height: '250px', margin: '5px'}}>
                <ChessBoard 
                  fen={game.match[game.match.length - 1]}
                  boardTheme={brownBoardTheme}
                />
              </div>
            ))
          }
        </div>
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
