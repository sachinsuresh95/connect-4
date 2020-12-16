export const COLUMN_COUNT = 7
export const ROW_COUNT = 6

export const generateEmptyGrid = columns => {
  let grid = [];
  for (let i = 0; i < columns; i++) {
    grid.push([]);
  }
  return grid;
};

export const gameOver = (grid, colIndex) => {
  return grid.every(
    (column, index) =>
      column.length === 6 || (index === colIndex && column.length === 5)
  );
};

export const checkGameStatus = (column, row, grid, lastPlayer) => {
  let path = [];

  const checkVertical = () => {
    let playerStreak = 0;
    for (let i = Math.max(0, row - 3); i <= Math.min(ROW_COUNT - 1, row + 3); i++) {
      if (grid[column][i] === lastPlayer || i === row) {
        playerStreak += 1;
        path = [...path, [column, i]];
      } else {
        playerStreak = 0;
        path = [];
      }
      if (playerStreak === 4) {
        return true;
      }
    }
    path = [];
    return false;
  };

  const checkHorizontal = () => {
    let playerStreak = 0;
    for (let i = Math.max(0, column - 3); i <= Math.min(COLUMN_COUNT - 1, column + 3); i++) {
      if (grid[i][row] === lastPlayer || i === column) {
        playerStreak += 1;
        path = [...path, [i, row]];
      } else {
        playerStreak = 0;
        path = [];
      }
      if (playerStreak === 4) {
        return true;
      }
    }
    path = [];
    return false;
  };

  const checkDiagonal = () => {
    let playerStreak = 0;
    let currentRow;
    let currentCol;

    //left to right
    currentRow = Math.min(row + (column), row + 3, ROW_COUNT - 1);
    currentCol = Math.max(0, column - 3, column - (ROW_COUNT - 1 - row));
    while (
      currentRow >= Math.max(0, row - 3) &&
      currentCol <= Math.min(COLUMN_COUNT - 1, column + 3)
    ) {
      if (
        grid[currentCol][currentRow] === lastPlayer ||
        (currentCol === column && currentRow === row)
      ) {
        playerStreak += 1;
        path = [...path, [currentCol, currentRow]];
      } else {
        playerStreak = 0;
        path = [];
      }
      if (playerStreak === 4) {
        return true;
      }
      currentRow -= 1;
      currentCol += 1;
    }

    playerStreak = 0;
    path = [];

    //right to left
    currentRow = Math.min(row + (COLUMN_COUNT - 1 - column), row + 3, ROW_COUNT - 1);
    currentCol = Math.min(COLUMN_COUNT - 1, column + 3, column + (ROW_COUNT - 1 - row));
    while (
      currentRow >= Math.max(0, row - 3) &&
      currentCol >= Math.max(0, column - 3)
    ) {
      if (
        grid[currentCol][currentRow] === lastPlayer ||
        (currentCol === column && currentRow === row)
      ) {
        playerStreak += 1;
        path = [...path, [currentCol, currentRow]];
      } else {
        playerStreak = 0;
        path = [];
      }
      if (playerStreak === 4) {
        return true;
      }
      currentRow -= 1;
      currentCol -= 1;
    }

    path = [];
    return false;
  };

  if (checkVertical() || checkHorizontal() || checkDiagonal()) {
    return { winner: lastPlayer, path };
  }

  return { winner: false };
};
