import invariant from 'invariant';
import {
  OPEN_CELL,
  FLAG_CELL,
  UNFLAG_CELL,
} from './actions';

const BOARD = {
  H: 10,
  W: 20,
  BOMB_FACTOR: 0.2,
}
const CELL = {
  EMPTY: 0,
  BOMB: 9,
}
const CELL_STATES = {
  OPEN: 'OPEN',
  HIDDEN: 'HIDDEN',
  FLAGGED: 'FLAGGED',
}
const GAME_STATES = {
  INIT: 'INIT',
  PLAY: 'PLAY',
  WIN: 'WIN',
  LOSE: 'LOSE',
}

function initializeBoard() {
  const board = []
  for (let i = 0; i < BOARD.H; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD.W; j++) {
      const val = Math.random()
      board[i][j] = {
        status: CELL_STATES.HIDDEN,
        value: val < BOARD.BOMB_FACTOR ? CELL.BOMB : CELL.EMPTY,
      }
    }
  }
  return board;
}

const initialState = {
  /*
   * board:
   * L*W array of Cells: { status:OPEN|HIDDEN|FLAGGED, value:0-9 }
   * value: 0 indicates empty
   * value: 9 indicates bomb
   * other values are calculated # of surrounding bombs
   */
  board: initializeBoard(),
  /*
   * gameStatus:
   * state of game: INIT|PLAY|WIN|LOSE
   */
  gameStatus: GAME_STATES.INIT,
}

function updateSurroundingCells(board, cell) {
  if (cell.status === CELL.EMPTY) {
    console.log(`Update surrounding cells for ${cell.row},${cell.col}`);
    const updatedBoard = board; // TODO bfs update
    return updatedBoard;
  }
  console.log('nothing to update');
  return board;
}

function updateGameStatus(board, cell) {
  // TODO calculate game state
  console.log('Update game status');
  return GAME_STATES.PLAY;
}

export default function reducer(state = initialState, action) {
  const { board } = state;
  const { row, col } = action;
  let cell;

  switch (action.type) {
    case OPEN_CELL:
      cell = board[row][col];
      invariant(cell.status === CELL_STATES.HIDDEN, 'Can only open hidden cells');
      board[row][col] = {
        ...cell,
        status: CELL_STATES.OPEN,
      }
      const updatedBoard = updateSurroundingCells(board, cell);
      return {
        board: updatedBoard,
        gameStatus: updateGameStatus(updatedBoard, cell),
      }
    case FLAG_CELL:
      cell = board[row][col];
      invariant(cell.status === CELL_STATES.HIDDEN, 'Can only flag hidden cells');
      board[row][col] = {
        ...cell,
        status: CELL_STATES.FLAGGED,
      }
      return {
        board,
        gameStatus: updateGameStatus(board, cell),
      }
    case UNFLAG_CELL:
      cell = board[row][col];
      invariant(cell.status === CELL_STATES.FLAGGED, 'Can only unflag flagged cells');
      board[row][col] = {
        ...cell,
        status: CELL_STATES.HIDDEN,
      }
      return {
        board,
        gameStatus: updateGameStatus(board, cell),
      }
    default:
      return state;
  }
}
