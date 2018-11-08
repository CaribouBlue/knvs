import React from 'react';
import _ from 'underscore';

import Event from '../event/Event';

export default props => {
  const date = `${props.year}-${(props.month + '').padStart(2,0)}-${(props.day + '').padStart(2,0)}`;
  const openUpdateForm = (name, startTime, endTime, id) => props.openUpdateForm(name, date, startTime, endTime, id)
  return (
    <div
      className="day-row"
    >
      <p
        className="day-number"
        onClick={e => openUpdateForm()}
      >{props.day}</p>
      {
        props.events &&
          props.events
          .sort((a, b) => (
            (a.startTime.hrs + a.startTime.min) - (b.startTime.hrs + b.startTime.min)
          ))
          .map((event, i) =>
            <div
              key={_.uniqueId()}
            >
              <p
                className={'row-event-time' + (i === 0 ? ' first' : '')}
              >{`${event.startTime.hrs}:${event.startTime.min} - ${event.endTime.hrs}:${event.endTime.min}`}</p>
              <Event
                event={event}
                showDesc={true}
                showTime={false}
                onHover={e => e}
                openUpdateForm={openUpdateForm}
              />
            </div>
          )
      }
    </div>
  );
}