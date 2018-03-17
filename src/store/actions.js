export const OPEN_CELL = 'OPEN_CELL';
export const TOGGLE_FLAG = 'TOGGLE_FLAG';
export const RESTART_GAME = 'RESTART_GAME';

function openCell(row, col) {
  return {
    type: OPEN_CELL,
    row,
    col,
  }
}

function toggleFlag(row, col) {
  return {
    type: TOGGLE_FLAG,
    row,
    col,
  }
}

function restartGame() {
  return {
    type: RESTART_GAME,
  }
}

export default {
  openCell,
  toggleFlag,
  restartGame,
}
