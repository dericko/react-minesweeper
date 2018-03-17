import invariant from 'invariant';
import { CELL, CELL_STATES } from './reducer';

export function setEquals(a, b) {
  if (a.size !== b.size) return false;
  for (let item of Array.from(a)) {
    if (!b.has(item)) {
      return false
    }
  }
  return true;
}

function getSpread(start, limit) {
  if (start === 0) {
    return [start, start+1]
  } else if (start >= limit-1){
    return [start-1, start]
  }
  return [start-1, start, start+1]
}

export function shouldClear(cell) {
  return cell.value === CELL.EMPTY || cell.value === CELL.BOMB;
}

export function shouldAdd(cell) {
  return cell.value === CELL.EMPTY &&
    cell.status === CELL_STATES.HIDDEN
}

export function clearSurroundingCells(board, cell) {
  const H = board.length;
  const W = board[0].length;

  const Q = [];
  const numberNeighbors = [];
  Q.push(cell);
  while (Q.length > 0) {
    const nextCell = Q.shift();
    const { row, col } = nextCell;
    invariant(cell.value === CELL.EMPTY, 'Can only clear empty cells');
    nextCell.status = CELL_STATES.OPEN;

    getSpread(row, H).forEach(a => {
      getSpread(col, W).forEach(b => {
        if (!(a === row && b === col)) {
          const neighbor = board[a][b];
          if (neighbor.value !== CELL.BOMB && neighbor.value !== CELL.EMPTY) {
            numberNeighbors.push(neighbor);
          }
          if (shouldAdd(neighbor)) {
            Q.push(neighbor);
          }
        }
      })
    });
  }
  numberNeighbors.forEach(cell => cell.status = CELL_STATES.OPEN)
}

function incrementCell(board, row, col) {
  if (row === -1 || col === -1) {
    return; // out of bounds
  }
  const cell = board[row][col]
  if (cell.value === CELL.BOMB) {
    return cell;
  }
  cell.value += 1;
}

export function setNumberedCells(board) {
  const H = board.length;
  const W = board[0].length;
  for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
      const cell = board[row][col];
      if  (cell.value === CELL.BOMB) {
        getSpread(row, H).forEach(a => {
          getSpread(col, W).forEach(b => {
            if (!(a === row && b === col)) {
              incrementCell(board, a, b);
            }
          });
        });
      }
    }
  }
  return board;
}
