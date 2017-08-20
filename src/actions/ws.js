export const CONNECTING = 'CONNECTING';
export const CONNECTED = 'CONNECTED';
export const DISCONNECTED = 'DISCONNECTED';

export const connecting = () => ({ type: CONNECTING });
export const connected = () => ({ type: CONNECTED });
export const disconnected = () => ({ type: DISCONNECTED });
