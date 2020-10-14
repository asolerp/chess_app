import React from 'react'
import { Row, Col } from 'react-bootstrap'

import './InfoPlayerComponent.css'

export const InfoPlayerComponent = ({board}) => {
  return (
    <Row style={{width: '100%', height: '22%', justifyContent: "center", alignItems: 'center', margin: 0}}>
      <Col style={{ paddingTop: '10px', borderRadius: '10px', border: '1px solid #343B40', marginRight: '10px'}}>
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player">{board.headers.White}</h1>
        <p>Elo: {board.headers.WhiteElo}</p>
      </Col>
      <Col style={{ paddingTop: '10px', background: '#343B40', borderRadius: '10px'}}>
        <img className="player_img" src={'/img/profile.png'} />
        <h1 className="player white">{board.headers.Black}</h1>
        <p className="white">Elo: {board.headers.BlackElo}</p>
      </Col>
    </Row>
  )
}