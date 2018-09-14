import React from 'react';

import ArtistDashHeader from '../artist-dash-header/ArtistDashHeader';
import ArtistDashMenu from '../artist-dash-menu/ArtistDashMenu';
import ArtistDashBookings from '../artist-dash-bookings/ArtistDashBookings';

import './artist-dashboard.style';

export default class ArtistDashboard extends React.Component {

  render() {
    return (
      <>
        <ArtistDashHeader />
        <ArtistDashMenu />
        <ArtistDashBookings />
      </>
    );
  }
}