import { getAuthToken } from 'utils/session';
import { API_URL } from 'utils/config';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function objectToQuerystring(obj) {
  return Object.keys(obj).reduce((str, key, i) => {
    const delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    const val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, '=', val].join('');
  }, '');
}

function parseJSON(response) {
  return response.json()
}

const fetchJson = (method, url, data = {}) =>
  fetch(`${API_URL}${url}${method === 'GET' ? objectToQuerystring(data) : ''}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getAuthToken(),
    },
    // credentials: 'include',
    body: method === 'GET' ? null : JSON.stringify(data)
  })
    .then(checkStatus)
    .then(parseJSON);

const getJson = (url, data = {}) => fetchJson('GET', url, data);
const postJson = (url, data = {}) => fetchJson('POST', url, data);

export const googleAuth = (accessToken) => postJson('auth/google', { accessToken });
export const facebookAuth = (accessToken) => postJson('auth/facebook', { accessToken });

// ----------
//  USER
// ----------

export const fetchUser = () => getJson('auth/user');
