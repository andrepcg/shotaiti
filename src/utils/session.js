import Cookies from 'js-cookie';

export const hasAuthToken = () => {
  // const { googleId, email, name, avatar, facebookId } = JSON.parse(localStorage.getItem('userInfo')) || {};
  // return email && avatar && name && (googleId || facebookId);
  const token = Cookies.get('token');
  return token && token.length > 0;
};

export const getAuthToken = () => Cookies.get('token');
export const setAuthToken = (token) => Cookies.set('token', token);

export const logout = () => {
  Cookies.remove('token');
  localStorage.clear();
}
