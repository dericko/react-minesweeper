import React, { Component } from 'react';

import actions from '../store/actions';
import { CELL, CELL_STATES } from '../store/reducer';
import { unflaggedBomb } from '../store/helpers';

import './Cell.css';

class Cell extends Component {
  openCell = () => {
    const { dispatch, cell, row, col } = this.props;
    if (cell.status === CELL_STATES.HIDDEN) {
      dispatch(actions.openCell(row, col))
    }
  }
  toggleFlag = e => {
    e.preventDefault();
    const { dispatch, cell, row, col } = this.props;
    if (cell.status !== CELL_STATES.OPEN) {
      dispatch(actions.toggleFlag(row, col))
    }
  }
  renderHiddenCell = () => {
    return (
      <div
        className="Cell Hidden"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
      </div>
    );
  }
  renderFlagCell = () => {
    return (
      <div
        className="Cell Flag"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
        $
      </div>
    );
  }
  renderEmptyCell = () => {
    return (
      <div className="Cell Empty" />
    );
  }
  renderNumberCell = (value) => {
    const tint = (value / 8.0) + 0.5;
    return (
      <div
        style={{ color: `rgba(200, ${150*tint}, ${150*tint})` }}
        className="Cell Number"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
        {value}
      </div>
    );
  }
  renderLosingCell = (cell) => {
    if (cell.losingCell) {
      return (
        <div className="Cell Bomb">X</div>
      );
    } else if (cell.value === CELL.BOMB) {
      return (
        <div className="Cell Bomb">B</div>
      );
    } else {
      return (
        <div className="Cell BadFlag">@</div>
      );
    }
  }
  render() {
    const { cell, didLose } = this.props;

    const { value, status } = cell;
    if (didLose && unflaggedBomb(value, status)) {
      return this.renderLosingCell(cell);
    }

    switch (status) {
      case CELL_STATES.OPEN:
        if (value === CELL.EMPTY) {
          return this.renderEmptyCell();
        } else {
          return this.renderNumberCell(value);
        }
      case CELL_STATES.FLAGGED:
        return this.renderFlagCell();
      default: // CELL_STATES.HIDDEN
        return this.renderHiddenCell();
    }
  }
}

export default Cell;
