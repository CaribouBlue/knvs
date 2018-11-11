import React from 'react';

export default props => (
  <div
    id="bookings-calendar-view"
  >
    <p>view</p>
    <span>|</span>
    <div
      id="bookings-calendar-view-button-container"
    >
      <button
        className={'d' === props.view ? 'open' : ''}
        onClick={props.onViewBtnClick}
      >d</button>
      <button
        className={'w' === props.view ? 'open' : ''}
        onClick={props.onViewBtnClick}
      >w</button>
      <button
        className={'m' === props.view ? 'open' : ''}
        onClick={props.onViewBtnClick}
      >m</button>
      <button
        className={'y' === props.view ? 'open' : ''}
        onClick={props.onViewBtnClick}
      >y</button>
    </div>
  </div>
);
