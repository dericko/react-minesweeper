import invariant from 'invariant';
import {
  OPEN_CELL,
  TOGGLE_FLAG,
  RESTART_GAME,
} from './actions';
import {
  setEquals,
  clearSurroundingCells,
  setNumberedCells,
} from './helpers';
import { BOARD } from '../gameConfig';

export const CELL = {
  EMPTY: 0,
  BOMB: 9,
}
export const CELL_STATES = {
  OPEN: 'OPEN',
  HIDDEN: 'HIDDEN',
  FLAGGED: 'FLAGGED',
}
export const GAME_STATES = {
  PLAY: 'PLAY',
  WIN: 'WIN',
  LOSE: 'LOSE',
}

/*
 * Sets up the game:
 *
 * Returns object containing game state:
 * @board: L*W array of Cells: { status:OPEN|HIDDEN|FLAGGED, value:0-9 }
 *  value: 0 indicates empty
 *  value: 9 indicates bomb
 *  other values are calculated # of surrounding bombs
 * @bombCount - number of CELL.BOMBs (value = 9)
 * @gameStatus - PLAY|WIN|LOSE
 * @moves - number of moves made
 */
function initializeGame() {
  const board = []
  let bombSet = new Set();
  const flagSet = new Set();
  for (let row = 0; row < BOARD.H; row++) {
    board[row] = [];
    for (let col = 0; col < BOARD.W; col++) {
      const val = Math.random();
      const isBomb = val < BOARD.BOMB_FACTOR;
      if (isBomb) {
        bombSet.add(`${row}${col}`);
      }
      board[row][col] = {
        status: CELL_STATES.HIDDEN,
        value: isBomb ? CELL.BOMB : CELL.EMPTY,
        row,
        col,
      }
    }
  }
  return {
    board: setNumberedCells(board),
    bombSet,
    flagSet,
    gameStatus: GAME_STATES.PLAY,
    moves: 0,
  }
}

function handleOpenCell(state, row, col) {
  const { board, moves } = state;
  const cell = board[row][col];
  const { value } = cell;
  const didLose = value === CELL.BOMB;

  board[row][col] = {
    ...cell,
    status: CELL_STATES.OPEN,
    losingCell: didLose,
  }
  if (cell.value === CELL.EMPTY) {
    clearSurroundingCells(board, cell);
  }

  return {
    ...state,
    board: board.slice(), // return a copy for re-render
    moves: moves + 1,
    gameStatus: didLose ? GAME_STATES.LOSE : GAME_STATES.PLAY,
  }
}

function handleToggle(state, row, col) {
  const { board, moves, bombSet, flagSet } = state;
  const cell = board[row][col];

  const isAddingFlag = cell.status === CELL_STATES.HIDDEN;
  if (isAddingFlag && flagSet.size === bombSet.size) { // no flags left
    return state;
  }

  let cellStatus;
  if (isAddingFlag) {
    cellStatus = CELL_STATES.FLAGGED;
    flagSet.add(`${row}${col}`);
  } else {
    cellStatus = CELL_STATES.HIDDEN;
    flagSet.delete(`${row}${col}`);
  }
  board[row][col] = {
    ...cell,
    status: cellStatus,
  }

  const didWin = setEquals(bombSet, flagSet);
  return {
    ...state,
    moves: moves + 1,
    board: board.slice(), // return a copy for re-render
    gameStatus: didWin ? GAME_STATES.WIN : GAME_STATES.PLAY,
  }
}

export default function reducer(state = initializeGame(), action) {
  const { board, gameStatus } = state;
  const { row, col } = action;

  if (gameStatus !== GAME_STATES.PLAY) {
    return initializeGame(); // reset game on any action
  }

  switch (action.type) {
    case OPEN_CELL:
      invariant(board[row][col].status === CELL_STATES.HIDDEN, 'Can only open hidden cells');
      return handleOpenCell(state, row, col);
    case TOGGLE_FLAG:
      invariant(board[row][col].status !== CELL_STATES.OPEN, 'Cannot flag open cell');
      return handleToggle(state, row, col)
    case RESTART_GAME:
      return initializeGame();
    default:
      return state;
  }
}
