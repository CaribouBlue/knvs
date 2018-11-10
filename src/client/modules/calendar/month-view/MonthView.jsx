import React from 'react';
import _ from 'underscore';

import DayBox from '../day-box/DayBox';

export default props => (
  <div
    className="event-cal"
  >
    <div
      className="row day-header"
    >
      <div>
        <p>s</p>
      </div>
      <div>
        <p>m</p>
      </div>
      <div>
        <p>t</p>
      </div>
      <div>
        <p>w</p>
      </div>
      <div>
        <p>t</p>
      </div>
      <div>
        <p>f</p>
      </div>
      <div>
        <p>s</p>
      </div>
    </div>
    {
      props.weeks.map((week, weekI) =>
        <div
          key={_.uniqueId()}
          className="row"
        >
          {
            week.map((day, dayI) => {
              const date = {
                day,
                month: props.month,
                year: props.year,
              };

              return (
                <DayBox
                  key={_.uniqueId()}
                  date={date}
                  events={props.events[`${date.year}${date.month}${date.day}`]}
                  onBoxClick={props.onBoxClick}
                  onEventClick={props.onEventClick}
                />
              );
            })
          }
        </div>
      )
    }
    </div>
);
