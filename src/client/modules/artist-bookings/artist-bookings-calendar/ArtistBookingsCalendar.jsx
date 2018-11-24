import React from 'react';
import moment from 'moment';

import CalSearch from './cal-search/CalSearch';
import CalView from './cal-view/CalView';
import CalDate from './cal-date/CalDate';
import EventDialog from './event-dialog/EventDialog';
import EventCalendar from '../../calendar';

export default class ArtistBookingsCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'm',
      date: moment().format('YYYY-MM-DD').split('-'),
      search: '',
      openEvent: null,
    };
  }

  onEventClick = (dateObj, event) => {
    this.setState({
      openEvent: {
        date: [dateObj.year, dateObj.month, dateObj.day],
        event,
      },
    });
  }

  setOpenEvent = (openEvent) => {
    this.setState({ openEvent }, this.setBookingCalCellHeights);
  }

  onBoxClick = (dateObj, events) => {
    this.setState({
      openEvent: {
        date: [dateObj.year, dateObj.month, dateObj.day],
        event: {
          name: '',
          startTime: '',
          endTime: '',
          desc: ''
        }
      },
    });
  }

  onEventDialogInputChange({ target }) {
    console.log(target.name, target.value);
  }

  onViewBtnClick = (e) => {
    this.setState({ view: e.target.innerHTML });
  }

  onCurrentChange =  (e) => {
    this.setState({ date: e.target.value.split('-') });
  }

  resetDate = () => {
    this.setState({ date: moment().format('YYYY-MM-DD').split('-') });
  }

  onSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    return(
      <>
        <div
          id="artist-bookings-menu"
        >
          <CalView
            view={this.state.view}
            onViewBtnClick={this.onViewBtnClick}
          />
          <CalDate
            onResetClick={this.resetDate}
            date={this.state.date}
            onChange={this.onCurrentChange}
          />
          <CalSearch
            search={this.state.search}
            onSearchChange={this.onSearchChange}
          />
        </div>
        <div
          id="bookings-calendar-container"
        >
          <EventCalendar
            month={this.state.date[1]}
            year={this.state.date[0]}
            events={this.props.bookings}
            listView={this.props.listView}
            onEventClick={this.onEventClick}
            onBoxClick={this.onBoxClick}
            onMount={this.setBookingCalCellHeights}
          />
        </div>
        <EventDialog
          event={this.state.openEvent}
          onInputChange={this.onEventDialogInputChange}
          onDialogClose={() => this.setOpenEvent(null)}
        />
      </>
    );
  }
};
