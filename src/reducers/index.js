import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';

import user from './user';

export default combineReducers({
  router,
  user,
});
