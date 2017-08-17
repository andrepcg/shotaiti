import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

const isAuthenticated = () => {
  const { googleId, email, name, avatar, facebookId } = JSON.parse(localStorage.getItem('userInfo')) || {};
  return email && avatar && name && (googleId || facebookId);
};

const LOGIN_ROUTE = '/login';

const AuthRoute = ({ component, ...props }) => {
  // const { isPrivate } = component;
  if (isAuthenticated()) {
    if (props.path === LOGIN_ROUTE) {
      return <Redirect to='/' />;
    }
    return <Route {...props} component={component} />;
  }
  else {
    if (props.path === LOGIN_ROUTE) {
      return <Route {...props} component={component} />;
    }
    return <Redirect to={LOGIN_ROUTE} />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  path: PropTypes.string
};

export default AuthRoute;
