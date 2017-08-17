import React from 'react';

// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Header = () => (
  <header>
    <div className='menu'>
      <Link to='/' className='title'>Home</Link>
      <ul>
        <li><a href=''>Menu 1</a></li>
        <li><a href=''>Menu 2</a></li>
      </ul>
    </div>
  </header>
);

export default Header;
