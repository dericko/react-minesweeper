import React, { Component } from 'react';

import actions from '../store/actions';

class RestartButton extends Component {
  restartGame = () => {
    this.props.dispatch(actions.restartGame());
  }
  render() {
    return (
      <button onClick={this.restartGame}>Restart</button>
    );
  }
}

export default RestartButton;
