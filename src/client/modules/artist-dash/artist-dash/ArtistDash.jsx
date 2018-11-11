import React from 'react';

import ArtistDashHeader from '../artist-dash-header/ArtistDashHeader';
import ArtistDashMenu from '../artist-dash-menu/ArtistDashMenu';
import ArtistDashBookings from '../artist-dash-bookings/ArtistDashBookings';

export default class ArtistDashboard extends React.Component {

  render() {
    return (
      <div
        id="artist-dashboard"
      >
        <ArtistDashHeader />
        <ArtistDashMenu />
        {this.props.children}
      </div>
    );
  }
}
