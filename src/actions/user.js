import { fetchUser } from 'utils/api';
import { setAuthToken, logout } from 'utils/session';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const LOGOUT = 'LOGOUT';

export const logoutUser = () => dispatch => {
  logout();
  dispatch({ type: LOGOUT });
}

export const getUser = () => async dispatch => {
  try {
    dispatch({ type: GET_USER });
    const { err, data } = await fetchUser();
    if (!err) {
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_USER_FAILED, error: err });
      dispatch(logoutUser());
    }
  } catch (err) {
    console.error(err);
    dispatch(logoutUser());
  }
}
