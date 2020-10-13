import React from 'react';
import './PgnComponent.css'

export const PgnComponent = ({pos, active, pgn, onClick}) => {
  return (
    <span 
    onClick={onClick} 
    className={active ? 'active' : ''}
    >{pgn.trim() + ' '}
  </span>
  )
}