// import { refreshToken } from 'utils/session';
import { push } from 'react-router-redux';

export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
export const LOGIN_FACEBOOK_SUCCESS = 'LOGIN_FACEBOOK_SUCCESS';

export const googleLogin = (googleId, email, name, avatar, tokenId, accessToken) => dispatch => {
  dispatch({ type: LOGIN_GOOGLE_SUCCESS, payload: { googleId, email, name, avatar } });
  localStorage.setItem('userInfo', JSON.stringify({ googleId, email, name, avatar }));
  // localStorage.setItem('googleId', googleId);
  // localStorage.setItem('email', email);
  // localStorage.setItem('name', name);
  // localStorage.setItem('avatar', avatar);
  dispatch(push('/'));
}

export const facebookLogin = (facebookId, email, name, avatar) => dispatch => {
  dispatch({ type: LOGIN_FACEBOOK_SUCCESS, payload: { facebookId, email, name, avatar } });
  localStorage.setItem('userInfo', JSON.stringify({ facebookId, email, name, avatar }));
  dispatch(push('/'));
}
