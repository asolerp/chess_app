import React from 'react'
import { Row, Col } from 'react-bootstrap'

import './InfoPlayerComponent.css'

export const InfoPlayerComponent = ({board}) => {
  return (
    <Row style={{width: '100%', margin: '0 10px'}}>
      <Col style={{ paddingTop: '10px'}}>
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player">{board.headers.White}</h1>
        <p>Elo: {board.headers.WhiteElo}</p>
      </Col>
      <Col style={{ marginRight: '35px', paddingTop: '10px', background: '#343B40' }}>
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player white">{board.headers.Black}</h1>
        <p className="white">Elo: {board.headers.BlackElo}</p>
      </Col>
    </Row>
  )
}