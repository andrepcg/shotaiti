import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Route, Switch } from 'react-router';
import { push } from 'react-router-redux';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { googleLogin, facebookLogin } from 'actions/login';


@connect(() => ({}), { googleLogin, facebookLogin })
export default class Rooms extends Component {
  static propTypes = {
    googleLogin: PropTypes.func.isRequired,
    facebookLogin: PropTypes.func.isRequired
  }

  handleLoginSuccess = (response) => {
    const { googleId, tokenId, accessToken, tokenObj, profileObj: { email, name, imageUrl } } = response;
    // console.log(response);
    // this.props.googleLogin(googleId, email, name, imageUrl, tokenId, accessToken);
    this.props.googleLogin(accessToken);
  }

  handleLoginFailure = ({ error, details }) => {
    
  }

  handleFacebookLogin = (me) => {
    const { accessToken, signedRequest, id, name, email, picture: { data: { url } } } = me;
    // this.props.facebookLogin(id, email, name, url);
    this.props.facebookLogin(accessToken);
  }

  render() {
    return (
      <div className='login'>
        <GoogleLogin
          clientId='915748976217-hpptj80npqg77hu43tebqtnbr10o8cae.apps.googleusercontent.com'
          buttonText='Login with Google'
          onSuccess={this.handleLoginSuccess}
          onFailure={this.handleLoginFailure}
          className='button social google'
        />
        <FacebookLogin
          appId='1405133192910868'
          fields='name,email,picture'
          callback={this.handleFacebookLogin}
          cssClass='button social facebook'
        />
        <button>Click me</button>
      </div>
    );
  }
}
