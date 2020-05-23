import './style.scss'
import React from 'react'
import Books from './'
import Calendar from '../../components/calendar'
import { getMonthDetails } from '../../utils/date'


export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    }

    this.setCalToDate = this.setCalToDate.bind(this)
    this.incrementCalMonth = this.incrementCalMonth.bind(this)
    this.decrementCalMonth = this.decrementCalMonth.bind(this)
  }

  setCalToDate(month=new Date().getMonth(), year=new Date().getFullYear()) {
    this.setState({year, month})
  }

  incrementCalMonth() {
    let { month, year } = this.state
    if (++month > 11) {
      month = 0
      year++
    }
    this.setCalToDate(month, year)
  }

  decrementCalMonth() {
    let { month, year } = this.state
    if (--month < 0) {
      month = 11
      year--
    }
    if (year < 1970) return
    this.setCalToDate(month, year)
  }

  render() {
    return <>
      <Books>
        <div className="container"
          style={{height: '100%'}}
        >
          <div className="columns"
            style={{height: '100%'}}
          >
            <div className="column col-3">
              <div className="panel"
                style={{height: '100%'}}
              >
                <div className="panel-header">
                </div>
                <div className="panel-nav">
                </div>
                <div className="panel-body">
                </div>
                <div className="panel-footer">
                </div>
              </div>
            </div>
            <div className="column col-9">
              <Calendar
                year={this.state.year}
                month={this.state.month}
                incrementCalMonth={this.incrementCalMonth}
                decrementCalMonth={this.decrementCalMonth}
                setCalToDate={this.setCalToDate}
              ></Calendar>
            </div>
          </div>
        </div>
      </Books>
    </>
  }
}
