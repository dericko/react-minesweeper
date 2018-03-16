import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cell from '../components/Cell';

import './Board.css';

class Board extends Component {
  render() {
    const { board } = this.props;
    return (
      <div className="Board">
        {board.map((row, i) => {
          return (
            <div className="Row" key={i}>
              {row.map((cell, j) => {
                return (
                  <Cell key={j} cell={cell} />
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
  console.log(state)
  return {
    board: state.board,
  }
}
export default connect(mapStateToProps)(Board);
