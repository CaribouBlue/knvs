import React from 'react';

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onHover(event) {
    if (this.props.onHover);
      this.props.onHover(event);
  }

  render() {
    const { event } = this.props;
    return (
      <>
        <div
          className="event-container"
          onMouseEnter={() => this.onHover(this.props.event)}
          onMouseLeave={() => this.onHover(null)}
          onClick={() => this.props.onEventClick(this.props.event)}
        >
          <div>
            <span>.</span>
            <p>{event.name}</p>
          </div>
            {
              this.props.showTime &&
                <div>
                  <span>.</span>
                  <p>{`${event.startTime.hrs}:${event.startTime.min} - ${event.endTime.hrs}:${event.endTime.min}`}</p>
                </div>
            }
          <div>
            {
              this.props.showDesc && event.desc &&
                <>
                  <span>.</span>
                  <p>{event.desc}</p>
                </>
            }
          </div>
        </div>
      </>
    );
  }
}
