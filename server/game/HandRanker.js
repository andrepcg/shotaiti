

// http://whitey.net/en/big-two-card-game-rules.htm
// https://github.com/dsernst/poker-hands/blob/master/index.js

const _ = require('lodash');


const cardOrder = ['2', 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3'];
const suitOrder = ['S', 'H', 'C', 'D'];

const getRankValue = (card) => cardOrder.indexOf(card.charAt(0));
const getSuitValue = (card) => cardOrder.indexOf(card.charAt(1));

function countCards(indexToCount, hand) {
  return _.countBy(hand.split(' '), indexToCount);
}

const countValues = _.curry(countCards)(0);
const countSuits = _.curry(countCards)(1);

const suitsValue = (hand) => hand.split(' ').reduce((acc, card) => suitOrder.indexOf(card.toUpperCase().charAt(1)), 0);

function hasAKind(count, hand) {
  return _.findKey(countValues(hand), _.curry(_.eq)(count));
}

const hasPair = _.curry(hasAKind)(2);
const hasThreeOfAKind = _.curry(hasAKind)(3);
const hasFourOfAKind = _.curry(hasAKind)(4);

const isHigherCard = (base, card) => {
  const baseRankValue = getRankValue(base);
  const cardRankValue = getRankValue(card);
  const baseSuitValue = getSuitValue(base);
  const cardSuitValue = getSuitValue(card);

  if (cardRankValue < baseRankValue) {
    return 1;
  } else if (cardRankValue > baseRankValue) {
    return -1;
  } else {
    if (cardSuitValue < baseSuitValue) {
      return 1;
    } else if (cardSuitValue > baseSuitValue) {
      return -1;
    }
  }
  return 0;
};

const isHigher = (compareFunc, base, hand) => {
  if (!compareFunc(hand)) return false;

  if (getRankValue(hand) < getRankValue(base)) return 1;
  if (getRankValue(hand) > getRankValue(base)) return -1;

  const handSuitsValue = suitsValue(hand);
  const baseSuitsValue = suitsValue(base);

  if (handSuitsValue < baseSuitsValue) {
    return 1;
  } else if (handSuitsValue > baseSuitsValue) {
    return -1;
  }
    return 0;
}

const isHigherPair = (base, hand) => isHigher(hasPair, base, hand.toUpperCase());
const isHigherThreeOfAKind = (base, hand) => isHigher(hasThreeOfAKind, base, hand.toUpperCase());
const isHigherFourOfAKind = (base, hand) => isHigher(hasFourOfAKind, base, hand.toUpperCase());



module.exports = {
  isHigherPair: isHigherPair,
  isHigherThreeOfAKind: isHigherThreeOfAKind,
  isHigherFourOfAKind: isHigherFourOfAKind
};