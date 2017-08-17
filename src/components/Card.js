import React from 'react';
import PropTypes from 'prop-types';

const suits = {
  spades: '♠',
  hearts: '♥',
  clubs: '♣',
  diamonds: '♥'
}

function Card({ suit, rank, back }) {
  const suitSymbol = suits[suit];
  return (
    <div className={`card ${suit} ${back ? 'back' : ''}`}>
      {!back && [
        <span className='rank'>{rank}</span>,
        <span className='suit'>{suitSymbol}</span>
      ]}
    </div>
  );
}

Card.propTypes = {
  suit: PropTypes.string,
  rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  back: PropTypes.bool
}

export default Card;
