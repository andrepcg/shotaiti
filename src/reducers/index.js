import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';

import user from 'reducers/user';

export default combineReducers({
  router,
  user,
});
