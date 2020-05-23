import React from 'react'
import Event from './event'
import EventsPlaceHolder from './events-placeholder'
import { getMonthDetails } from '../../utils/date'

export default class Day extends React.Component {
  constructor(props) {
    super(props)
    this.day = props.date.getDate().toString()
    this.month = props.date.getMonth()
    this.year = props.date.getFullYear()
    this.eventsKey = `${this.year}-${this.month}-${this.day}`
    this.daysEvents = (props.events && props.events[this.eventsKey]) || []
    this.dayContainerRef = React.createRef()

    this.state = {
      maxDisplayableEvents: null,
    }
  }

  componentDidMount() {
    this.setMaxDisplayableEvents()
    window.addEventListener('resize', () => this.setMaxDisplayableEvents());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setMaxDisplayableEvents());
  }

  setMaxDisplayableEvents() {
    if (!this.dayContainerRef.current) return
    const dayContainerBounds = this.dayContainerRef.current.getBoundingClientRect()
    const maxDisplayableEvents = Math.floor(dayContainerBounds.height / 26) - 1
    this.setState({maxDisplayableEvents})
  }

  sortDisplayableEvents() {
    const displayableEvents = []
    const hiddenEvents = []
    this.daysEvents
      .forEach((event, i, arr) => {
        const eventCount = i + 1
        const eventCountIsGreaterThanDisplayable = eventCount > this.state.maxDisplayableEvents
        const followingEventsWillBeHidden = eventCount === this.state.maxDisplayableEvents && arr.length > eventCount
        if (eventCountIsGreaterThanDisplayable || followingEventsWillBeHidden)
          hiddenEvents.push(event)
        else
          displayableEvents.push(event)
      })
    return [displayableEvents, hiddenEvents]
  }

  getDayDateDisplay() {
    const isToday = this.day === new Date().getDate() + '' && this.month === new Date().getMonth() && this.year === new Date().getFullYear()
    let dayDateDisplay = this.day
    if (this.day === '1')
      dayDateDisplay = `${getMonthDetails(this.month).abbrv} ${dayDateDisplay}`
    let className = 'day-date'
    if (this.props.selectedMonth !== this.month)
      className += ' unselected-month'
    else if (isToday)
      className += ' today'
    return <p className={className}>
      {dayDateDisplay}
    </p>
  }

  render() {
    const [displayableEvents, hiddenEvents] = this.sortDisplayableEvents()
    return <>
      <div className="column col day-container"
        ref={this.dayContainerRef}
      >
        <div className="tile"
          style={{display:'block', height: '100%'}}
        >
          <div className="tile-content"
            style={{padding:0, height: '100%'}}
          >
            <div className="tile-icon">
              {this.getDayDateDisplay()}
            </div>
            {
              displayableEvents.map(event => {
                return <Event
                  key={event.id}
                  event={event}
                  setOpenEvent={this.props.setOpenEvent}
                  open={this.props.openEvent === event.id}
                ></Event>
              })
            }
            <EventsPlaceHolder
              eventsKey={this.eventsKey}
              events={hiddenEvents}
              setOpenEvent={this.props.setOpenEvent}
              open={this.props.openEvent === this.eventsKey}
            ></EventsPlaceHolder>
            {
              hiddenEvents.map(event => {
                return <Event
                  key={event.id}
                  event={event}
                  setOpenEvent={this.props.setOpenEvent}
                  open={this.props.openEvent === event.id}
                  disableChit={true}
                ></Event>
              })
            }
          </div>
        </div>
      </div>
    </>
  }
}
