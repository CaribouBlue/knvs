import Books from './'
import Calendar from '../../components/calendar'
import React from 'react'

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    }
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
                  <div className="panel-title">Tools</div>
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
              ></Calendar>
            </div>
          </div>
        </div>
      </Books>
    </>
  }
}
