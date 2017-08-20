const uuid = require('uuid/v4');
const WebSocket = require('ws');
const cards = require('cards');

const game_status = {
  WAITING_PLAYERS: 'WAITING_PLAYERS',
  INGAME: 'INGAME'
};

class GamesController {
  constructor(wss) {
    this.wss = wss;
    this.games = {};
  }

  createGame(options) {
    const game = new Game(this.wss, options);
    this.games[game.id] = game;
  }

  joinGame(wsClient) {

  }
}

class Game {
  constructor(wss, options) {
    this.id = generateRoomId();
    this.playersOrdered = [];
    this.players = {};
    this.private = options.private || false;
    this.password = options.password || null;
    this.status = game_status.WAITING_PLAYERS;
    this.currentPlayer = 0;
  }

  initGame() {
    this.deck = new cards.PokerDeck();
    this.deck.shuffleAll();

    this.playersOrdered.forEach(p => p.init());
    let playerIndex = 0;

    while (this.deck.deck.length > 0) {
      const card = this.deck.draw();
      this.playersOrdered[playerIndex].dealCard(card);
      playerIndex++;
      if (playerIndex === this.playersOrdered.length) {
        playerIndex = 0;
      }
    }
  }

  addPlayer(ws) {
    const player = new Player(ws.user_id, ws);
    this.players[ws.user_id] = player;
    this.playersOrdered.push(player);

    if (this.playersOrdered.length === 4) {
      this.initGame();
    }
  }

  broadcast(message) {
    this.playersOrdered.forEach((p) => {
      p.sendMessage(message);
    });
  }
}

class Player {
  constructor(id, ws) {
    this.ws = ws;
    this.id = id;
    this.init();
  }

  init() {
    this.hand = [];
  }

  handString() {
    return this.hand.join(' ');
  }

  sendMessage(message) {
    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(message);
  }

  dealCard(card) {
    this.hand.push(`${card.value}${suitStrings[card.suit]}`);
  }
}

const suitStrings = {
  heart:    'H',
  diamond:  'D',
  club:     'C',
  spade:    'S'
};

const generateRoomId = () => {
  const id = uuid().split('-');
  return id[id.length - 1];
}

module.exports = GamesController;