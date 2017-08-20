import {
  CONNECTED,
  DISCONNECTED,
  CONNECTING,
} from 'actions/ws';

const initalUserState = {
  isConnecting: false,
  connected: false,
};

export default function ws(state = initalUserState, action) {
  switch (action.type) {
    case CONNECTING:
      return { ...state, isConnecting: true };

    case CONNECTED:
      return { ...state, isConnecting: false, connected: true };

    case DISCONNECTED:
      return { ...state, isConnecting: false, connected: false };

    default:
      return state;
  }
}

