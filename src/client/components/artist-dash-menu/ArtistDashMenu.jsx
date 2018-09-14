import React from 'react';

import './artist-dash-menu.style';

export default class ArtistDashMenu extends React.Component { 
  render () {
    return (
      <div id="menu-container">
        <button
          className="menu-item"
        >bookings</button>
        <button
          className="menu-item"
        >clients</button>
        <button
          className="menu-item"
        >flash</button>
        <button
          className="menu-item"
        >portfolio</button>
      </div>
    );
  }
}