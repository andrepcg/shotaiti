import { LOGIN_GOOGLE_SUCCESS, LOGIN_FACEBOOK_SUCCESS } from 'actions/login';

const initalState = {
  isLoggedIn: false,
  email: null,
  name: null,
  avatar: null,
  googleId: null,
  facebookId: null
};

export default function session(state = initalState, action) {
  switch (action.type) {
    case LOGIN_GOOGLE_SUCCESS:
      return { isLoggedIn: true, ...action.payload };

    case LOGIN_FACEBOOK_SUCCESS:
      return { isLoggedIn: true, ...action.payload };

    default:
      return state;
  }
}
