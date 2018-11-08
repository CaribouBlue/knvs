import React from 'react';
import _ from 'underscore';

import DayRow from '../day-row/DayRow';

export default ({ events, year, month, day, weeksArr, openUpdateForm }) => {
  let monthsEvents = {};
  if (events[year])
    monthsEvents = events[year][month] || {};

  const days = _.flatten(weeksArr).filter(num => num !== 0);

  return (
    <div>
      {
        days.reduce((memo, day) => {
          if (!monthsEvents[day])
            return memo;

          memo.push(
            <DayRow
              key={_.uniqueId()}
              day={day}
              month={month}
              year={year}
              events={monthsEvents[day]}
              openUpdateForm={openUpdateForm}
            />
          );
          return memo;
        }, [])
      }
    </div>
  );
}
