import React from 'react'

export default class EventPopup extends React.Component {
  constructor(props) {
    super(props)
    this.eventTileRef = React.createRef()
    this.eventTitleText = React.createRef()
    this.eventTitleTextMock = React.createRef()
    this.state = {
      eventTileRight: 'unset',
      titleIsOverflowing: false,
    }
  }

  componentDidMount() {
    this.setEventTilePosition()
    this.setTitleIsOverflowing()
    window.addEventListener('resize', () => this.setEventTilePosition());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setEventTilePosition());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const openStateHasChanged = this.props.open !== prevProps.open
    if (openStateHasChanged) {
      this.setTitleIsOverflowing()
      this.setEventTilePosition()
    }
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

  setTitleIsOverflowing() {
    if (!this.eventTitleText.current || !this.eventTitleTextMock) return
    const txtWidth = this.eventTitleText.current.getBoundingClientRect().width
    const mockWidth = this.eventTitleTextMock.current.getBoundingClientRect().width
    const titleIsOverflowing =  txtWidth < mockWidth
    this.setState({titleIsOverflowing})
  }

  getEventSubtitle(event) {

  }

  render() {
    const {event, setOpenEvent, open} = this.props
    const titleToolTip = event.getTitleTooltip(true)
    const subtitle = event.getSubtitle(true)
    return <>
      <div className="tile event-popup"
        style={{
          display: open ? 'block' : 'none',
          right: this.state.eventTileRight
        }}
        ref={this.eventTileRef}
      >
        <div className="tile-icon">
        </div>
        <div className="tile-content">
          <div className="container tile-title">
            <div className="columns col-oneline"
              style={{overflow: 'visible'}}
            >
              <div className="col-10 event-title">
                <div className={this.state.titleIsOverflowing ? 'tooltip' : ''}
                  data-tooltip={titleToolTip}
                >
                  <h3 className="text-mock"
                    ref={this.eventTitleTextMock}
                  >{event.title}</h3>
                  <h3 className="text"
                    ref={this.eventTitleText}
                  >{event.title}</h3>
                </div>
              </div>
              <div className="col-ml-auto">
                <button className="btn btn-link"
                  onClick={() => setOpenEvent(null)}
                >X</button>
              </div>
            </div>
          </div>

          <p className="tile-subtitle">{subtitle}</p>
          <p >{event.desc}</p>
        </div>
        <div className="tile-action">
          <button className="btn btn-primary">Join</button>
        </div>
      </div>
    </>
  }
}
