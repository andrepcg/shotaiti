// import { refreshToken } from 'utils/session';
import { push } from 'react-router-redux';
import { googleAuth, facebookAuth } from 'utils/api';
import { logout, setAuthToken } from 'utils/session';

export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const LOGIN_GOOGLE_FAILED = 'LOGIN_GOOGLE_FAILED';
export const LOGIN_FACEBOOK_SUCCESS = 'LOGIN_FACEBOOK_SUCCESS';
export const LOGIN_FACEBOOK_FAILED = 'LOGIN_FACEBOOK_FAILED';


export const googleLogin = (accessToken) => async dispatch => {
  try {
    dispatch({ type: LOGIN_GOOGLE });
    const { err, data, token } = await googleAuth(accessToken);
    if (!err) {
      dispatch({ type: LOGIN_GOOGLE_SUCCESS, payload: data });
      setAuthToken(token);
      dispatch(push('/'));
    } else {
      dispatch({ type: LOGIN_GOOGLE_FAILED });
    }
  } catch (error) {
    dispatch({ type: LOGIN_GOOGLE_FAILED });
    logout();
  }

}

export const facebookLogin = (facebookId, email, name, avatar) => dispatch => {
  dispatch({ type: LOGIN_FACEBOOK_SUCCESS, payload: { facebookId, email, name, avatar } });
  localStorage.setItem('userInfo', JSON.stringify({ facebookId, email, name, avatar }));
  dispatch(push('/'));
}
