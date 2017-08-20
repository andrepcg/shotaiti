import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import history from 'store/history';
import { configureStore } from 'store/configureStore';
import registerServiceWorker from './registerServiceWorker';


import App from './App';
import 'assets/stylesheets/application.scss'

class StoreComponent extends Component {
  state = {
    storeRehydrated: false
  }

  componentDidMount() {
    // this.store = configureStore(this.onHydrate);
  }

  onHydrate = (err, restoredState = {}) => {
    this.setState({ storeRehydrated: true });
  }

  store = configureStore(this.onHydrate)

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
};


ReactDOM.render(
  <StoreComponent />,
  document.getElementById('root')
);

registerServiceWorker();
