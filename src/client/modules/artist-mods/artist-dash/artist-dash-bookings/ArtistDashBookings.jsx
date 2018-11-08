import React from 'react';

import { ArtistBookingsCalendar } from '../../artist-bookings';
import UpdateEventForm from '../../../components/update-event-form/UpdateEventForm';

export default class ArtistDashBookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingBooking: null,
      bookingsDisplay: 'calendar',
      bookings: {
        2018116: [
          {
            id: 0,
            name: 'Joe',
            startTime: {
              hrs: 13,
              min: 30,
            },
            endTime: {
              hrs: 14,
              min: 30,
            },
            desc: '2 tattos. see booking details'
          },
          {
            id: 1,
            name: 'Jim',
            startTime: {
              hrs: 12,
              min: 30,
            },
            endTime: {
              hrs: 13,
              min: 30,
            },
          },
        ],
        2018117: [
          {
            id: 0,
            name: 'Joe',
            startTime: {
              hrs: 13,
              min: 30,
            },
            endTime: {
              hrs: 14,
              min: 30,
            },
          },
          {
            id: 1,
            name: 'Jim',
            startTime: {
              hrs: 12,
              min: 30,
            },
            endTime: {
              hrs: 13,
              min: 30,
            },
          },
        ],
      },
    };
  }

  getDisaplyBtnClass(name) {
    if (this.state.bookingsDisplay === name)
      return 'open';
    return '';
  }

  onDisplayBtnClick = (e) => {
    this.setState({ bookingsDisplay: e.target.innerHTML });
  }

  openUpdateBookings = (name='', date='', startTime='', endTime='', desc='', id='') => {
    if (startTime)
      startTime = `${(startTime.hrs + '').padStart(2, 0)}:${(startTime.min + '').padStart(2, 0)}`;

    if (endTime)
      endTime = `${(endTime.hrs + '').padStart(2, 0)}:${(endTime.min + '').padStart(2, 0)}`;

    this.setState({
      updatingBooking: {
        name,
        date,
        startTime,
        endTime,
        desc,
        id,
      },
    });
  }

  closeUpdateBookings = () => {
    this.setState({
      updatingBooking: null,
    });
  }

  updateBooking = (year, month, day, update, id=null) => {
    month = Number(month);
    day = Number(day);
    const bookings = this.state.bookings;
    if (id) {
      for (let i = 0; i < bookings[year][month][day].length; i++) {
        const currentBook = bookings[year][month][day][i];
        if (currentBook.id === id) {
          bookings[year][month][day][i] = { ...currentBook, ...update };
          this.setState({ bookings });
          break;
        }
      }
    } else {
      if (!bookings[year]) bookings[year] = {};
      if (!bookings[year][month]) bookings[year][month] = {};
      if (!bookings[year][month][day]) bookings[year][month][day] = [];

      bookings[year][month][day].push({ ...update, id: bookings[year][month][day].length });
      this.setState({ bookings })
    }
  }

  render() {
    return (
      <>
        <div id="bookings-display-menu-container">
          <p
            className={this.getDisaplyBtnClass('calendar')}
            onClick={this.onDisplayBtnClick}
          >calendar</p>
          <span><p>/</p></span>
          <p
            className={this.getDisaplyBtnClass('list')}
            onClick={this.onDisplayBtnClick}
          >list</p>
          <span><p>/</p></span>
          <p
            className={this.getDisaplyBtnClass('avalibility')}
            onClick={this.onDisplayBtnClick}
          >avalibility</p>
          <span><p>/</p></span>
          <p
            className={this.getDisaplyBtnClass('settings')}
            onClick={this.onDisplayBtnClick}
          >settings</p>
        </div>
        {
          this.state.updatingBooking &&
            <UpdateEventForm
              {...this.state.updatingBooking}
              closeForm={this.closeUpdateBookings}
              updateEvent={this.updateBooking}
            />
        }
        {
          (
            this.state.bookingsDisplay === 'calendar' ||
            this.state.bookingsDisplay === 'list'
          ) &&
            <ArtistBookingsCalendar
              bookings={this.state.bookings}
              openBookingsForm={this.openUpdateBookings}
              listView={this.state.bookingsDisplay === 'list'}
            />
        }
      </>
    );
  }
}
