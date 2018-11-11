import React from 'react';
import Dialog from '../../../dialog';

export default props => {
  if (!props.event)
    return <div></div>;

  const { event, date } = props.event;

  return (
    <Dialog
      onDialogClose={props.onDialogClose}
      boxStyle={{}}
    >
      <input
        name="name"
        type="text"
        onChange={props.onInputChange}
        value={event.name}
      />
      <input
        name="date"
        type="date"
        onChange={props.onInputChange}
        value={date.join('-')}
      />
      <input
        name="startTime"
        type="time"
        onChange={props.onInputChange}
        value={event.startTime}
      />
      <input
        name="endTime"
        type="time"
        onChange={props.onInputChange}
        value={event.endTime}
      />
    </Dialog>
  );
}
