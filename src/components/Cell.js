import React, { Component } from 'react';

import './Cell.css';

class Cell extends Component {
  render() {
    const { cell } = this.props;
    return (
      <div className="Cell">
        {cell.value}
      </div>
    );
  }
}

export default Cell;
