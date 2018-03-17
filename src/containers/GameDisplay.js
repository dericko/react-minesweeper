import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestartButton from '../components/RestartButton';
import { GAME_STATES } from '../store/reducer';

import './GameDisplay.css';

class GameDisplay extends Component {
  colorForStatus = (status) => {
    switch (status) {
      case GAME_STATES.PLAY: return 'lightblue';
      case GAME_STATES.WIN: return 'lightgreen';
      case GAME_STATES.LOSE: return 'red';
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
