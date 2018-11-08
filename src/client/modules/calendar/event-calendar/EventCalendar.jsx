import React from 'react';
import calendar from 'node-calendar';

import CalendarView from '../calendar-view/CalendarView';
import ListView from '../list-view/ListView';

const getWeeksArr = (month, year) => {
  const firstDayOfWeek = calendar.SUNDAY;
  const days = new calendar
    .Calendar(firstDayOfWeek)
    .itermonthdays(year, month);

  const weeks = [];
  let currentWeek = [];
  for (let i = 0; i < days.length; i++) {
    currentWeek.push(days[i]);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return weeks;
}

const getWeekRowClass = (i) => {
  let className = 'week-row';
  if (i === 0)
    className += ' first';
  return className;
};

export default props => {
  const weeks = getWeeksArr(props.month, props.year);

  if (props.listView === true)
    return <ListView {...props} weeksArr={weeks} />
  else
    return <CalendarView {...props} weeks={weeks} />;
};
