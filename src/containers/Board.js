import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cell from '../components/Cell';

import './Board.css';

class Board extends Component {
  render() {
    const { board, dispatch } = this.props;

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
  return {
    board: state.board,
  }
}
export default connect(mapStateToProps)(Board);
