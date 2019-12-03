import Day from './day'

export default (props) => {
  return <>
      <div className="columns week-container col-oneline"
        style={{overflowX: 'unset'}}
      >
        {
          props.week.map(date =>
            <Day
              key={date.toString()}
              date={date}
              selectedMonth={props.selectedMonth}
              events={props.events}
              openEvent={props.openEvent}
              setOpenEvent={props.setOpenEvent}
            ></Day>
          )
        }
      </div>
  </>
}
