import React from 'react';

// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from 'assets/images/logo.svg'

const Header = () => (
  <header>
    <div className='left'>
      <Link to='/' className='title'><img alt='Sho Tai Ti' src={logo} /></Link>
    </div>
    <div className='right'>
      <ul>
        <li><a href=''>Menu 1</a></li>
        <li><a href=''>Menu 2</a></li>
      </ul>
      <a className='avatar' href=''>
        <img src='http://i.pravatar.cc/100' />
      </a>
    </div>
  </header>
);

export default Header;
