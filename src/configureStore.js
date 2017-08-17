import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import history from './history';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers'

export function configureStore() {
  // const composeEnhancers = composeWithDevTools({ realtime: true });
  const enhancer = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
    ),
  );

  return createStore(
    reducers,
    enhancer
  );
}
