import React from 'react';

export default props => (
  <div
    id="bookings-calendar-search"
  >
    <p>search</p>
    <span>|</span>
    <input
      type="text"
      value={props.search}
      onChange={props.onSearchChange}
    />
  </div>
);
