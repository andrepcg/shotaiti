const chai = require('chai');  
const assert = chai.assert;    // Using Assert style 
const expect = chai.expect;    // Using Expect style 
const should = chai.should();

const HandRanker = require('../game/HandRanker');
// S H C D


describe('poker', () => {

  it('.isHigherPair(base, hand) should compare pairs according to rank and suit', () => {
    HandRanker.isHigherPair('2S 2S', '2S 2S').should.equal(0);
    HandRanker.isHigherPair('2S 2S', '2H 2H').should.equal(-1);
    HandRanker.isHigherPair('2H 2H', '2S 2S').should.equal(1);
    HandRanker.isHigherPair('2S 2D', '2S 2C').should.equal(1);
    HandRanker.isHigherPair('2H 2D', '2H 2C').should.equal(1);
    HandRanker.isHigherPair('2H 2C', '2H 2D').should.equal(-1);
    HandRanker.isHigherPair('AH AC', '2H 2D').should.equal(1);
    HandRanker.isHigherPair('2H 2C', 'AH AD').should.equal(-1);
    HandRanker.isHigherPair('KH KC', 'KS KS').should.equal(1);
  });

  it('.isHigherPair(base, hand) should compare pairs according to rank and suit', () => {
    HandRanker.isHigherThreeOfAKind('2S 2S 2S', '2S 2S 2S').should.equal(0);
    HandRanker.isHigherThreeOfAKind('2S 2S 2S', '2H 2H 2H').should.equal(-1);
    HandRanker.isHigherThreeOfAKind('2H 2H 2C', '2S 2S 2H').should.equal(1);
    HandRanker.isHigherThreeOfAKind('2S 2D 2C', '2S 2C 2S').should.equal(1);
    HandRanker.isHigherThreeOfAKind('2H 2D 2C', '2H 2C 2S').should.equal(1);
    HandRanker.isHigherThreeOfAKind('2H 2C 2H', '2H 2D 2D').should.equal(-1);
    HandRanker.isHigherThreeOfAKind('AH AC AD', '2C 2C 2C').should.equal(1);
    HandRanker.isHigherThreeOfAKind('2H 2C 2S', 'AH AD AS').should.equal(-1);
    HandRanker.isHigherThreeOfAKind('QH QC', 'KC KD KH').should.equal(1);
  });

});
