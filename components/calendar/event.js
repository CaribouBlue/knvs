import React from 'react'

export default class Event extends React.Component {
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
    if (eventTileBounds.left + 500 > window.innerWidth)
      eventTileRight = '0'
    if (eventTileRight !== this.state.eventTileRight)
      this.setState({eventTileRight})
  }

  onEventClick() {
    this.props.setOpenEvent(this.props.event.id)
  }

  render() {
    return <>
      <span className="event-span">
        {
          this.props.disableChit ?
            null :
            <p className="tile-subtitle cal-event text-primary"
              key={this.props.event.id}
              ref={this.props.eventRef}
              onClick={() => this.onEventClick()}
            >{this.props.event.getLabel(true)}</p>
        }
        <div className="tile"
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
                <div className="col-6">
                  <h3>{this.props.event.title}</h3>
                </div>
                <div className="col-ml-auto">
                  <button className="btn btn-link"
                    onClick={() => this.props.setOpenEvent(null)}
                  >X</button>
                </div>
              </div>
            </div>
            <p className="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
          </div>
          <div className="tile-action">
            <button className="btn btn-primary">Join</button>
          </div>
        </div>
      </span>
    </>
  }
}
