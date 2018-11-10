import React from 'react';
import _ from 'underscore';


export default class DialogBox extends React.Component {

  onContainerClick = (e) => {
    if (e.target.className === 'dialog-container')
      this.closeDialog();
  }

  closeDialog = () => {
    this.props.onDialogClose();
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
