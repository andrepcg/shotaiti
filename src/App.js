import React, { Component } from 'react';

import { Route, Switch } from 'react-router';
import AuthRoute from 'components/AuthRoute';

// import { isFirstLogin } from 'utils/session';

import Login from 'containers/Login';
import Header from 'components/Header';
import Footer from 'components/Footer';
import NoMatch from 'components/NoMatch';

// eslint-disable-next-line
export default class App extends Component {

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <AuthRoute exact path='/' component={() => <h1>Home</h1>} />
          <AuthRoute path='/login' component={Login} />
          {/*<AuthRouter path='/profile' component={} />*/}
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    );
  }
};
