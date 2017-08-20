import { WEBSOCKET_URL } from 'utils/config';
import { connecting, connected, disconnected } from 'actions/ws';

export default class Websocket {
  constructor(store) {
    this.store = store;
    this.dispatch(connecting());
    this.socket = new WebSocket(WEBSOCKET_URL);    
    this.socket.addEventListener('message', this.onMessage);
    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('close', this.onClose);
    this.socket.addEventListener('error', this.onError);
  }

  dispatch = (a) => {
    if (this.store) this.store.dispatch(a);
  }

  send = (m) => {
    if (this.socket) this.socket.send(m);
  }

  onOpen = (event) => {
    console.log('Connected to websocket server');
    this.dispatch(connected());
  }

  onClose = (event) => {
    console.log('Disconnected from Websocket server');
    this.dispatch(disconnected());
  }

  onError = (event) => {
    console.error('Websocket error', event);
  }

  onMessage = (message) => {
    
  }
}
