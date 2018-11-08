import React from 'react';
import _ from 'underscore';

import Event from '../event/Event';


export default class DayBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredEvent: null,
    };
  }

  isToday = new Date(`${this.props.date.year}-${this.props.date.month}-${this.props.date.day}`).toDateString() == new Date().toDateString();
  events = this.props.events || [];
  onEventClick = (event) => this.props.onEventClick(this.props.date, event);

  handleBoxClick = e => {
    if (!!e.target.getAttribute('boxclick')) {
      this.props.onBoxClick(this.props.date, this.props.events);
    }
  }

  setTime = hoveredEvent => {
    this.setState({ hoveredEvent });
  }

  render() {
    if (this.props.date.day === 0)
      return <td className="day-cell empty"></td>;

    return (
      <td
        className={'day-cell' + ( this.isToday ? ' today' : '')}
        onClick={this.handleBoxClick}
        boxclick="true"
      >
        <div
          className="day-box"
          boxclick="true"
        >
          <div
            className="day-number-row"
            boxclick="true"
          >
            <p
              boxclick="true"
            >{this.props.date.day}</p>
            {
              this.state.hoveredEvent &&
              <div
                className="time"
              >
                <p
                  boxclick="true"
                >
                  {`
                    ${this.state.hoveredEvent.startTime.hrs}:
                    ${this.state.hoveredEvent.startTime.min} -
                    ${this.state.hoveredEvent.endTime.hrs}:
                    ${this.state.hoveredEvent.endTime.min}
                  `}
                </p>
              </div>
            }
          </div>
          {
            this.events
              .sort((a, b) =>
                a.startTime.hrs - b.startTime.hrs
              )
              .map(event => (
                <Event
                  key={_.uniqueId()}
                  event={event}
                  onHover={this.setTime}
                  onEventClick={this.onEventClick}
                />
              ))
          }
        </div>
      </td>
    );
  }
};
