import { combineReducers } from 'redux';

import {
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILED,
  LOGIN_FACEBOOK_SUCCESS,
} from 'actions/login';

import {
  LOGOUT
} from 'actions/user';

const initalSessionState = {
  isLoggedIn: false,
  loggingIn: false,
};

function session(state = initalSessionState, action) {
  switch (action.type) {
    case LOGOUT:
      return initalSessionState;

    case LOGIN_GOOGLE:
      return { ...state, loggingIn: true };

    case LOGIN_GOOGLE_SUCCESS:
    case LOGIN_FACEBOOK_SUCCESS:
      return { ...state, isLoggedIn: true, loggingIn: false };

    case LOGIN_GOOGLE_FAILED:
      return { ...state, isLoggedIn: false, loggingIn: false };

    default:
      return state;
  }
}

const initalUserState = {
  email: null,
  name: null,
  avatar: null,
  googleId: null,
  facebookId: null
};

function user(state = initalUserState, action) {
  switch (action.type) {
    case LOGIN_GOOGLE_FAILED:
    case LOGOUT:
      return initalUserState;

    case LOGIN_FACEBOOK_SUCCESS:
    case LOGIN_GOOGLE_SUCCESS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}


export default combineReducers({
  session,
  user
});
