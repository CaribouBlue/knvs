import React from 'react';
import $ from 'jquery';
import _ from 'underscore';


export default class DialogBox extends React.Component {
  componentDidMount() {
    this.props.onMount();
    console.log('mount')
    $('.dialog-box').animate({
      opacity: 1,
      'margin-top': '0px',
    });
  }

  onContainerClick = (e) => {
    if (e.target.className === 'dialog-container')
      this.closeDialog();
  }

  closeDialog = () => {
    $('.dialog-box').animate(
      {
        opacity: 0,
        'margin-top': '50px',
      },
      null,
      null,
      () => {
        this.props.onDialogClose();
      }
    );
  }

  render() {
    return (
      <div
        className="dialog-container"
        onClick={this.onContainerClick}
      >
        <div
          className="dialog-box"
        >
          Dialog
        </div>
      </div>
    );
  }
}
