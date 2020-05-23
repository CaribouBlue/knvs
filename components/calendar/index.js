import './styles.scss'
import calendarjs from 'calendar'
import Week from './week'
import { CalendarEvent } from '../../utils/calendar-event'
import { getMonthDetails } from '../../utils/date'
import EventMakerModal from './event-maker-modal'

const events = {
  '2019-11-11': [
    new CalendarEvent({
      title: '1 Lorem ipsum dolor sit amet, non ut erat nibh nec ut dui, rutrum nunc dictum, mattis suscipit varius curabitur et netus, dapibus massa nec purus integer libero',
      desc: 'Lorem ipsum dolor sit amet, non ut erat nibh nec ut dui, rutrum nunc dictum, mattis suscipit varius curabitur et netus, dapibus massa nec purus integer libero. Varius scelerisque lacus id. Magna curabitur nesciunt a, est aenean dolor urna, libero elit ut nunc. Est dui wisi ligula per, justo eros auctor congue posuere, arcu lobortis sagittis at, nisi neque duis. Curabitur volutpat neque vel risus dictum, diam in dictum in ultricies scelerisque, nec leo eu ante aperiam donec, vestibulum malesuada turpis et diam aliquam. Mollis adipiscing ad pellentesque tristique, pellentesque a nunc fusce, phasellus neque mauris tellus tortor velit, tortor morbi.',
      date: new Date(),
    }),
    new CalendarEvent({
      title: '2 Lorem ipsum dolor',
      date: new Date(),
    }),
  ],
  '2019-11-7': [
    new CalendarEvent({
      title: '1 Lorem ipsum dolor',
      date: new Date('2019-11-7'),
      isAllDay: true,
    }),
    new CalendarEvent({
      title: '2 Lorem ipsum dolor',
      date: new Date('2019-11-7'),
    }),
    new CalendarEvent({
      title: '3 Lorem ipsum dolor',
      date: new Date('2019-11-7'),
    }),
  ],
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
      this.cal = new calendarjs.Calendar
      this.state = {
        openEvent: null,
        openEventMaker: false,
      }
  }

  setOpenEvent(openEvent) {
    this.setState({openEvent})
  }

  conditionalCloseOpenEvent(target) {
    if (!target.closest('.event-span'))
      this.setOpenEvent(null)
  }

  onCalendarClick(target) {
    if (this.state.openEvent)
      this.conditionalCloseOpenEvent(target)
  }

  onNewEventClick() {
    this.setState({
      openEventMaker: true,
    })
  }

  onEventMakerModalClose() {
    this.setState({
      openEventMaker: false,
    })
  }

  render() {
    const monthArr = this.cal.monthDates(this.props.year, this.props.month)
    const displayedWeeks = monthArr.length
    const weekColEvenHeight = Math.round(100*(100/displayedWeeks))/100
    const weekColRemainderHeight = weekColEvenHeight * displayedWeeks
    return <>
      <style>{`
        .week-container {
          height: calc(${Math.round(100*(100/monthArr.length))/100}% - ${25/displayedWeeks}px);
        }
      `}</style>
      <div className="container">
        <EventMakerModal
          open={this.state.openEventMaker}
          onClose={this.onEventMakerModalClose.bind(this)}
        ></EventMakerModal>
        <div className="columns col-oneline cal-controls">
          <button className="btn btn-primary"
            onClick={() => this.onNewEventClick()}
          >New Event</button>
          <button className="btn"
            onClick={() => this.props.setCalToDate()}
          >Today</button>
          <button className="btn"
            onClick={() => this.props.decrementCalMonth()}
          >{'<'}</button>
          <div className="date-selector"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <h5
            >{getMonthDetails(this.props.month).abbrv + ' ' + this.props.year}</h5>
          </div>
          <button className="btn"
            onClick={() => this.props.incrementCalMonth()}
          >{'>'}</button>
        </div>
      </div>
      <div className="container cal-container"
        style={{height: 'calc(100% - 58px)'}}
        onClick={({target}) => this.onCalendarClick(target)}
      >
        <div className="columns col-oneline"
          style={{overflowX: 'unset'}}
        >
          {
            ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
              .map(day =>
                <div className="column col day-container"
                  key={day}
                >
                  <div className="tile"
                    style={{display:'block', height: '100%'}}
                  >
                    <div className="tile-content"
                      style={{padding:0, height: '100%'}}
                    >
                      <p
                        style={{textAlign:'center'}}
                      >{day}</p>
                    </div>
                  </div>
                </div>
              )
          }
        </div>
        {
          monthArr.map(week =>
            <Week
              key={week.toString()}
              week={week}
              events={events}
              openEvent={this.state.openEvent}
              setOpenEvent={(oe) => this.setOpenEvent(oe)}
              selectedMonth={this.props.month}
            ></Week>
          )
        }
      </div>
    </>
  }
}
