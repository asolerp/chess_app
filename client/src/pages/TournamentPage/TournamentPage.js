import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'



import {
  useHistory,
} from "react-router-dom";
import './TournamentPage.css'
import { MainBoardComponent } from '../../components/MainBoardComponent/MainBoardComponent';


const TournamentPage = ({tournament}) => {

  const history = useHistory()
  const [boardSelected, setBoardSelected] = useState(0)
  const [ options, setOptions ] = useState()
  const [ optionSelected, setOptionSelected ] = useState(0)
  // const [ showInfo, setShowInfo ] = useState([])

  const brownBoardTheme = {
    darkSquare: "#b58863",
    lightSquare: "#f0d9b5"
  };
    
  useEffect(() => {
    if (!tournament.length > 0) {
      history.push('/')
    } 
  },[])

  useEffect(() => {
    const options = tournament.map((game, i) => ({ value: i, label: `${game.headers.White} | ${game.headers.Black}` }))
    setOptions(options)
  }, [tournament])

  // const handleShow = (index, status) => {
  //   const shows = [...showInfo]
  //   shows[index] = status
  //   setShowInfo(shows)
  // }

  return (
    <React.Fragment>
      <Row className="p-0 mt-3 mb-3">
        <Col xl={{span: 4, offset: 4 }}>
          {
            options && (
              <Select 
                defaultValue={options[0]}
                onChange={(e) => setOptionSelected(e.value)}
                options={options} 
              />
            )
          }
        </Col>
      </Row>    
      <Row style={{display:'flex'}} className="p-0">
        <Col xl={{span: 8, offset: 2 }} className="board-wrapper p-0">
          <MainBoardComponent board={tournament[optionSelected]} />
        </Col>
        {/* <Col xl="12" className="boards-wrapper p-0 pt-2" style={{justifyContent: 'center'}}>
          {
            tournament && tournament.map((game, i) => (
              <div                  
                key={`board-${i}`}
                style={{position: 'relative', width: '250px', height: '250px', margin: '5px'}}>
                <div
                  onClick={() => setBoardSelected(i)}   
                  style={{ width: '100%', height: '100%'}}>
                  <ChessBoard 
                    fen={game.match[game.match.length - 1]}
                    boardTheme={brownBoardTheme}
                  />
                  <div 
                    className={`boards-info ${boardSelected === i ? 'selected' : ''}`}>
                      <p>{game.headers.White} | {game.headers.Black}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </Col> */}
      </Row>
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
