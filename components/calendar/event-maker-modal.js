import React from 'react'

export default class EventMakerModal extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {}
  }

  render() {
    return <>
      <div className={'modal' + (this.props.open ? ' active' : '')}
        id="event-maker-modal"
      >
        <a className="modal-overlay"
          onClick={() => this.props.onClose()}
        ></a>
        <div className="modal-container">
          <div className="modal-header">
            <a className="btn btn-clear float-right"
              onClick={() => this.props.onClose()}
            ></a>
            <div className="modal-title h5">New Event</div>
          </div>
          <div className="modal-body">
            <div className="content">
              Content
            </div>
          </div>
          <div className="modal-footer">
            Footer
          </div>
        </div>
      </div>
    </>
  }
}
