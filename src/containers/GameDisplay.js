import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestartButton from '../components/RestartButton';

import './GameDisplay.css';

class GameDisplay extends Component {
  colorForStatus = (status) => {
    switch (status) {
      case 'PLAY': return 'lightblue';
      case 'WIN': return 'lightgreen';
      case 'LOSE': return 'red';
      default: return 'lightgray';
    }
  }
  render() {
    const { dispatch, gameStatus, bombSet, flagSet, moves } = this.props;
    return (
      <div
        className="GameDisplay"
        style={{
          background: this.colorForStatus(gameStatus)
        }}>
        <div className="GameInfo">
          <div>Bombs</div>
          {bombSet.size - flagSet.size}
        </div>
        <RestartButton className="RestartButton" dispatch={dispatch} />
        <div className="GameInfo">
          <div>Moves</div>
          {moves}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { gameStatus, bombSet, flagSet, moves } = state;
  return {
    gameStatus,
    bombSet,
    flagSet,
    moves,
  }
}
export default connect(mapStateToProps)(GameDisplay);
