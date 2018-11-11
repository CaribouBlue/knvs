import React from 'react';

export default props => (
  <div
    id="bookings-calendar-current"
  >
    <p
      onClick={props.onResetClick}
      style={{ cursor: 'pointer' }}
    >current</p>
    <span>|</span>
    <input
      type="date"
      value={`${props.date[0]}-${props.date[1]}-${props.date[2]}`}
      onChange={props.onChange}
    />
  </div>
);
