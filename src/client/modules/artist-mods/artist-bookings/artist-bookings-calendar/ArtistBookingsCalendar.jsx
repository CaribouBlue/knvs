import React from 'react';
import $ from 'jquery';
import Dialog from '../../../dialog';

import EventCalendar from '../../../calendar';

export default class ArtistBookingsCalendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const day = `${today.getDate()}`.padStart(2, 0);
    const month = `${(today.getMonth() + 1)}`.padStart(2, 0);
    const year = today.getFullYear();

    this.state = {
      view: 'm',
      date: { day, month, year },
      search: '',
      openEvent: null,
    };

    $('document').ready(() => {
      this.setBookingCalCellHeights();
      $('#bookings-calendar-container').resize(() => console.log('cal0resize'));
    });
    $(window).resize(() => {
      this.setBookingCalCellHeights();
    });
  }

  setBookingCalCellHeights = () => {
    $.map(
      $('#bookings-calendar-container').find('td').slice(8),
      el => {
        $(el).innerHeight(0)
      });
    const calRows = $('#bookings-calendar-container').find('tr').length - 2;
    const tableHeight =
      $('#bookings-calendar-container').height() -
      $('.day-header').innerHeight() -
      $('.day-header-spacer').innerHeight();
    const cellHeight = tableHeight / calRows;
    $.map(
      $('#bookings-calendar-container').find('td').slice(8),
      el => {
        $(el).innerHeight(cellHeight)
    });
    this.showBookingCal();
  }

  showBookingCal = () => {
    $('.event-cal').css('visibility', 'visible');
  }

  setOpenEvent = (openEvent) => {
    this.setState({ openEvent }, this.setBookingCalCellHeights);
  }

  getViewBtnClass(name) {
    if (this.state.view === name)
      return 'open';
    return '';
  }

  openEventDialog = (date, event) => {
    this.setState({
      openEvent: { event },
    });
  }

  onViewBtnClick = (e) => {
    this.setState({ view: e.target.innerHTML });
  }

  onCurrentChange =  (e) => {
    this.setState({ current: e.target.value });
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
          <div
            id="bookings-calendar-view"
          >
            <p>view</p>
            <span>|</span>
            <div
              id="bookings-calendar-view-button-container"
            >
              <button
                className={this.getViewBtnClass('d')}
                onClick={this.onViewBtnClick}
              >d</button>
              <button
                className={this.getViewBtnClass('w')}
                onClick={this.onViewBtnClick}
              >w</button>
              <button
                className={this.getViewBtnClass('m')}
                onClick={this.onViewBtnClick}
              >m</button>
              <button
                className={this.getViewBtnClass('y')}
                onClick={this.onViewBtnClick}
              >y</button>
            </div>
          </div>
          <div
            id="bookings-calendar-current"
          >
            <p
              onClick={() => this.setState({ current: this.today })}
              style={{ cursor: 'pointer' }}
            >current</p>
            <span>|</span>
            <input
              type="date"
              value={`${this.state.date.year}-${this.state.date.month}-${this.state.date.day}`}
              onChange={this.onCurrentChange}
            />
          </div>
          <div
            id="bookings-calendar-search"
          >
            <p>search</p>
            <span>|</span>
            <input
              type="text"
              value={this.state.search}
              onChange={this.onSearchChange}
            />
          </div>
        </div>
        <div
          id="bookings-calendar-container"
        >
          <EventCalendar
            month={Number(this.state.date.month)}
            year={Number(this.state.date.year)}
            events={this.props.bookings}
            listView={this.props.listView}
            onEventClick={this.openEventDialog}
            onMount={this.setBookingCalCellHeights}
          />
        </div>
        {
          this.state.openEvent &&
          <Dialog
            onDialogClose={() => this.setOpenEvent(null)}
            onMount={this.setBookingCalCellHeights}
          />
        }
      </>
    );
  }
};
