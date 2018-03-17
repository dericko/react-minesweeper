import React, { Component } from 'react';

import actions from '../store/actions';

import './Cell.css';

class Cell extends Component {
  openCell = () => {
    const { dispatch, cell, row, col } = this.props;
    if (cell.status === 'HIDDEN') {
      dispatch(actions.openCell(row, col))
    }
  }
  toggleFlag = e => {
    e.preventDefault();
    const { dispatch, cell, row, col } = this.props;
    if (cell.status !== 'OPEN') {
      dispatch(actions.toggleFlag(row, col))
    }
  }
  renderHiddenCell = () => {
    const { cell } = this.props
    return (
      <div
        className="Cell Hidden"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
        {cell.value}
      </div>
    );
  }
  renderFlagCell = () => {
    return (
      <div
        className="Cell Flag"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
        x
      </div>
    );
  }
  renderEmptyCell = () => {
    return (
      <div className="Cell Empty" />
    );
  }
  renderNumberCell = (cell) => {
    const tint = (cell.value / 8.0) + 0.5;
    return (
      <div
        style={{ color: `rgba(200, ${150*tint}, ${150*tint})` }}
        className="Cell Number"
        onClick={this.openCell}
        onContextMenu={this.toggleFlag}>
        {cell.value}
      </div>
    );
  }
  render() {
    const { cell } = this.props;
    switch (cell.status) {
      case 'OPEN':
        if (cell.value === 0) {
          return this.renderEmptyCell();
        } else {
          return this.renderNumberCell(cell);
        }
      case 'FLAGGED':
        return this.renderFlagCell();
      default: // 'HIDDEN'
        return this.renderHiddenCell();
    }
  }
}

export default Cell;
