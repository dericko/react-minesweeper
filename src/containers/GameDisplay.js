import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const { gameStatus } = this.props;
    return (
      <div
        className="GameDisplay"
        style={{
          background: this.colorForStatus(gameStatus)
        }}>
        <div className="GameInfo">
          3
        </div>
        <button className="RestartButton">Restart</button>
        <div className="GameInfo">
          99
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    gameStatus: state.gameStatus,
  }
}
export default connect(mapStateToProps)(GameDisplay);
