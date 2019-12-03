import './styles.scss'
import calendarjs from 'calendar'
import Week from './week'
import { CalendarEvent } from '../../utils/calendar-event'

const events = {
  '2019-11-2': [
    new CalendarEvent({
      title: 'Bob arm rose',
      date: new Date(),
    }),
    new CalendarEvent({
      title: '2',
      date: new Date(),
    }),
  ],
  '2019-11-7': [
    new CalendarEvent({
      title: '1',
      date: new Date('2019-11-7'),
    }),
    new CalendarEvent({
      title: '2',
      date: new Date('2019-11-7'),
    }),
    new CalendarEvent({
      title: '3',
      date: new Date('2019-11-7'),
    }),
  ],
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props)
      const cal = new calendarjs.Calendar
      this.monthArr = cal.monthDates(props.year, props.month)
      this.state = {
        openEvent: null,
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

  render() {
    return <>
      <div className="container"
        style={{height: '100%'}}
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
          this.monthArr.map(week =>
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
