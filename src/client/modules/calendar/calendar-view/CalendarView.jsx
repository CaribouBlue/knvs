import React from 'react';
import _ from 'underscore';

import DayBox from '../day-box/DayBox';

export default props => (
  <table
    className="event-cal"
  >
    <tbody>
        <tr
          className="day-header"
        >
          <td
            width="14.28%"
          >
            <p>s</p>
          </td>
          <td
            width="14.28%"
          >
            <p>m</p>
          </td>
          <td
            width="14.28%"
          >
            <p>t</p>
          </td>
          <td
            width="14.28%"
          >
            <p>w</p>
          </td>
          <td
            width="14.28%"
          >
            <p>t</p>
          </td>
          <td
            width="14.28%"
          >
            <p>f</p>
          </td>
          <td
            width="14.28%"
          >
            <p>s</p>
          </td>
        </tr>
        <tr
          className="day-header-spacer"
        >
          <td
            style={{ height: '5px' }}
          >
          </td>
        </tr>
        {
          props.weeks.map((week, weekI) =>
            <tr
              key={_.uniqueId()}
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
                      onBoxClick={(...inputs) => console.log('box click', inputs)}
                      onEventClick={props.onEventClick}
                    />
                  );
                })
              }
            </tr>
          )
        }
      </tbody>
    </table>
);
