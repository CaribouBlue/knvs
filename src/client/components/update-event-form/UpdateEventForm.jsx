import React from 'react';

export default class UpdateEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id || '',
      name: props.name || '',
      date: props.date || '',
      startTime: props.startTime || '',
      endTime: props.endTime || '',
      desc: props.desc || '',
    };
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    const [year, month, day] = this.state.date.split('-');
    const [sHrs, sMin] = this.state.startTime.split(':');
    const [eHrs, eMin] = this.state.endTime.split(':');

    this.props.updateEvent(year, month, day, {
      name: this.state.name,
      startTime: {
        hrs: Number(sHrs),
        min: Number(sMin),
      },
      endTime: {
        hrs: Number(eHrs),
        min: Number(eMin),
      },
    }, this.state.id);
  }

  render() {
    return (
      <div
        className="form-container"
      >
        <div
          className="input-row"
        >
          <input
            name="name"
            type="text"
            onChange={this.onInputChange}
            value={this.state.name}
          />
          <input
            name="date"
            type="date"
            onChange={this.onInputChange}
            value={this.state.date}
          />
          <input
            name="startTime"
            type="time"
            onChange={this.onInputChange}
            value={this.state.startTime}
          />
          <input
            name="endTime"
            type="time"
            onChange={this.onInputChange}
            value={this.state.endTime}
          />
        </div>
        <div
          className="input-row"
          style={{ padding: 0 }}
        >
          <textarea
            name="desc"
            onChange={this.onInputChange}
            value={this.state.desc}
          />
        </div>
        <div
          className="input-row"
        >
          <button
            onClick={this.onSubmit}
          >submit</button>
          <button
            onClick={this.props.closeForm}
          >close</button>
        </div>

      </div>
    );
  }
}
