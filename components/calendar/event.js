import React from 'react'
import EventPopup from './event-popup'

export default (props) => {
  const {event, setOpenEvent, eventRef, disableChit} = props
  return <>
    <span className="event-span">
      {
        disableChit ?
          null :
          <p className="tile-subtitle cal-event text-primary"
            key={event.id}
            ref={eventRef}
            onClick={() => setOpenEvent(event.id)}
          >{event.getLabel(true)}</p>
      }
      <EventPopup
        {...props}
      ></EventPopup>
    </span>
  </>
}
