import React from 'react';
import _ from 'underscore';
import moment from 'moment';

import Event from '../event/Event';


export default class DayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredEvent: null,
    };
  }


  isToday = () => {
    const date = this.props.date;
    if (date.day === 0)
      return false;
    const dateStr = `${date.year}-${date.month}-${date.day}`;
    return dateStr === moment().format('YYYY-MM-DD');
  }

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
    if (this.props.date.day === '00')
      return <div className="day-cell empty"></div>;

    return (
      <div
        className={'day-cell' + ( this.isToday() ? ' today' : '')}
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
            >{Number(this.props.date.day)}</p>
            {
              this.state.hoveredEvent &&
              <div
                className="time"
              >
                <p
                  boxclick="true"
                >
                  {`
                    ${this.state.hoveredEvent.startTime} -
                    ${this.state.hoveredEvent.endTime}
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
      </div>
    );
  }
};
