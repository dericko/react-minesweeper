export const OPEN_CELL = 'OPEN_CELL';
export const FLAG_CELL = 'FLAG_CELL';
export const UNFLAG_CELL = 'UNFLAG_CELL';

function openCell(row, col) {
  return {
    type: OPEN_CELL,
    row,
    col,
  }
}

function flagCell(row, col) {
  return {
    type: FLAG_CELL,
    row,
    col,
  }
}

function unflagCell(row, col) {
  return {
    type: UNFLAG_CELL,
    row,
    col,
  }
}

export default {
  openCell, flagCell, unflagCell
}
