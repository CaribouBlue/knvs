import React from 'react'

export default class EventsPlaceHolder extends React.Component {
  constructor(props) {
    super(props)
    this.eventTileRef = React.createRef()
    this.state = {
      eventTileRight: 'unset'
    }
  }

  componentDidMount() {
    this.setEventTilePosition()
    window.addEventListener('resize', () => this.setEventTilePosition());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setEventTilePosition());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.eventTileRef !== prevState.eventTileRef || this.props.open !== prevProps.open)
      this.setEventTilePosition()
  }

  setEventTilePosition() {
    let eventTileRight = 'unset'
    if (!this.eventTileRef.current) return
    const eventTileBounds = this.eventTileRef.current.getBoundingClientRect()
    if (eventTileBounds.left + 200 > window.innerWidth)
      eventTileRight = '0'
    if (eventTileRight !== this.state.eventTileRight)
      this.setState({eventTileRight})
  }

  onEventClick() {
    this.props.setOpenEvent(this.props.eventsKey)
  }

  render() {
    return <>
      <span className="event-span">
        <p className="tile-subtitle cal-event"
            style={{
              backgroundColor: 'unset',
              display: this.props.events.length ? 'unset' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => this.onEventClick()}
        ><b>{`${this.props.events.length} more`}</b></p>
        <div className="tile event-popup"
          style={{
            display: this.props.open ? 'block' : 'none',
            right: this.state.eventTileRight
          }}
          ref={this.eventTileRef}
        >
          <div className="tile-icon">
          </div>
          <div className="tile-content">
            <div className="container tile-title">
              <div className="columns">
                <div className="col-10 events-list">
                  <h5>More</h5>
                    {
                      this.props.events
                        .map(event =>
                          <p
                            key={event.id}
                            className="cal-event text-primary"
                            onClick={() => this.props.setOpenEvent(event.id)}
                          >
                            {event.getLabel(true)}
                          </p>
                        )
                    }
                </div>
                <div className="col-ml-auto">
                  <button className="btn btn-link"
                    onClick={() => this.props.setOpenEvent(null)}
                  >X</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  }
}
