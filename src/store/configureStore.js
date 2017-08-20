import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist'

import history from 'store/history';
import reducers from 'reducers';

import { hasAuthToken } from 'utils/session';
import { getUser } from 'actions/user';

function fetchInitialAppData(store) {
  if (hasAuthToken()) {
    store.dispatch(getUser());
  }
}

export function configureStore(onRehydrate) {
  // const composeEnhancers = composeWithDevTools({ realtime: true });
  const enhancer = composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      ReduxThunk,
    ),
    autoRehydrate(),
  );

  const store = createStore(
    reducers,
    enhancer
  );
  persistStore(
    store,
    {
      blacklist: ['router']
    },
    onRehydrate
  );
  fetchInitialAppData(store);
  return store;
}
