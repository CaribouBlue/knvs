import React from 'react';

import ArtistBookingsCalendar from '../artist-bookings-calendar/ArtistBookingsCalendar';

import './artist-dash-bookings.style';

export default props => (
  <>
    <div id="bookings-display-menu-container">
      <p>calendar</p>
      <span><p>/</p></span>
      <p>list</p>
    </div>
    <ArtistBookingsCalendar />
  </>
);