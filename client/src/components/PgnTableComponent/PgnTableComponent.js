import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import './PgnTableComponent.css'

import { PgnComponent } from '../PgnComponent/PgnComponent'

export const PgnTableComponent = ({pgns, onClick, active}) => {

  const [ mapPgns, setMapPgns] = useState()
  const [ table, setTable ] = useState()

  useEffect(() => {
    const newArr2 = []
    let newArr = pgns.map((elem, i) => ({board: elem, pos: i}));
    while(newArr.length) {
      newArr2.push(newArr.splice(0,2));
    } 
    setMapPgns(newArr2)
  },[pgns])

  useEffect(() => {
    const rows = mapPgns && mapPgns.map(function (item, i){
      let entry = item.map(function (element, j) {
          return ( 
              <React.Fragment key={j}>
              <td style={{cursor: 'pointer'}} onClick={() => onClick(element.pos)}  className={element.pos === active && 'active'}>
                  <PgnComponent 
                    active={element.pos === active && 'active'}
                    pos={element.pos}    
                    pgn={element.board.split(".").pop()}    
                  />
              </td>
              </React.Fragment>
              );
      });
      return (
          <tr key={i}>
            <td key={i+'row'}>{i + 1}</td>
            {entry}
          </tr>
       );
    });
    setTable(rows)
  },[pgns])



  return (
    <React.Fragment>
      {
        table && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Jugada</th>
                <th>Blancas</th>
                <th>Negras</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </Table>
        )
      }
    </React.Fragment>
  )
}