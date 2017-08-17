import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Route, Switch } from 'react-router';
import { push } from 'react-router-redux';

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';

import RoomEntry from 'components/RoomEntry';

// @connect
// @sizeMe()
export default class Rooms extends Component {
  static propTypes = {
  }

  state = {
    rooms: [1, 2, 3]
  }

  rowRenderer = (properties) => {
    const { key, ...rest } = properties;
    const room = this.state.rooms[properties.index % this.state.rooms.length];
    return <RoomEntry key={key} {...rest} />;
    // return (
    //   <div className='room-entry' key={key} style={style}>
    //     <div className='cover'>
    //       <span className='users-count'>18</span>
    //       <img alt='' src='https://geo-media.beatport.com/image/11106437.jpg' />
    //     </div>
    //     <div className='room-entry-details'>
    //       <div className='name'>
    //         Os Lindos Grande Grupo
    //       </div>
    //       <div className='playing'>
    //         cenas
    //       </div>
    //       <div className='next'>
    //         coisas
    //       </div>
    //     </div>
    //   </div>
    // );
  }

  render() {
    return [
      <div key='rooms-list' className='rooms-list'>
        <div className='header'>
          <span className='title'>Rooms</span>
          <div className='buttons'>
            <button className='orange'>Create room</button>
          </div>
        </div>

        <div className='list-wrapper'>
          <AutoSizer>
            {({ width, height }) => (
              <List
                height={height}
                width={width}
                overscanRowCount={5}
                // noRowsRenderer={this._noRowsRenderer}
                rowCount={50}
                rowHeight={130}
                rowRenderer={this.rowRenderer}
              />)}
          </AutoSizer>
        </div>
        
      </div>,
      <div key='rightside' className='right'>
        direita
      </div>
    ];
  }
}
