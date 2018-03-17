import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cell from '../components/Cell';
import { GAME_STATES } from '../store/reducer';

import './Board.css';

class Board extends Component {
  render() {
    const { board, dispatch, gameStatus } = this.props;
    const didLose = gameStatus === GAME_STATES.LOSE;

    return (
      <div className="Board">
        {board.map((cellsInRow, row) => {
          return (
            <div className="Row" key={row}>
              {cellsInRow.map((cell, col) => {
                return (
                  <Cell
                    key={col}
                    cell={cell}
                    row={row}
                    col={col}
                    dispatch={dispatch}
                    didLose={didLose}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { board, gameStatus } = state;
  return {
    board,
    gameStatus,
  }
}
export default connect(mapStateToProps)(Board);
