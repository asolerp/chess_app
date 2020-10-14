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




  return (
    <React.Fragment>
      {
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Jugada</th>
              <th>Blancas</th>
              <th>Negras</th>
            </tr>
          </thead>
          <tbody>
            {
              mapPgns && mapPgns.map((item, i) => (
                <tr key={i}>
                  <td key={i+'row'}>{i + 1}</td>
                  {
                      item.map((element, j) => ( 
                        <React.Fragment key={j}>
                        <td style={{cursor: 'pointer'}} onClick={() => onClick(element.pos)}  className={element.pos === active ? 'active' : ''}>
                            <PgnComponent 
                              active={element.pos === active && 'active'}
                              pos={element.pos}    
                              pgn={element.board.split(".").pop()}    
                            />
                        </td>
                        </React.Fragment>
                        ))
                    }
                </tr>
              ))
            }
          </tbody>
        </Table>
      }
    </React.Fragment>
  )
}