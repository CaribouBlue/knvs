import React from 'react';
import { fadeInUp, fadeOutDown } from 'react-animations'
import Radium, {StyleRoot} from 'radium';


export default class DialogBox extends React.Component {
  constructor() {
    super();

    this.state = {
      animation: 'fadeInUp',
    };
  }

  styles = {
    fadeInUp: {
      animation: 'x 0.5s',
      animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
    },
    fadeOutDown: {
      animation: 'x 0.5s',
      animationName: Radium.keyframes(fadeOutDown, 'fadeOutDown')
    }
  }

  onContainerClick = (e) => {
    if (e.target.className === 'dialog-container')
      this.closeDialog();
  }

  closeDialog = () => {
    this.setState(
      { animation: 'fadeOutDown' },
      () => setTimeout(() => this.props.onDialogClose(), 400),
    );
  }

  render() {
    return (
      <StyleRoot
        className="dialog-container"
        onClick={this.onContainerClick}
      >
        <div
          className="dialog-box"
          style={{
            ...this.props.boxStyle,
            ...this.styles[this.state.animation]
          }}
        >
          {this.props.children}
        </div>
      </StyleRoot>
    );
  }
}
