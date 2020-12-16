import { useEffect, useState } from 'react';

import './Grid.css';
import Cell from './Cell';

import { generateEmptyGrid, gameOver, checkGameStatus } from '../boardUtils';

const Grid = ({ columns, rows }) => {
  const [grid, setGrid] = useState(generateEmptyGrid(columns));
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState(false);
  const [gameStatus, setGameStatus] = useState('playing');
  const [winPath, setWinPath] = useState([]);

  useEffect(() => {
    if (winner) {
      setGameStatus('finished');
    }
  }, [winner]);

  const handleColumnClick = column => {
    let row = grid[column].length;
    if (row < rows) {
      let newColumn = [...grid[column], player];
      setGrid(grid => [
        ...grid.slice(0, column),
        newColumn,
        ...grid.slice(column + 1)
      ]);
      checkIfGameFinished(column, row, player);
      setPlayer(player => (player === 'red' ? 'black' : 'red'));
    }
  };

  const checkIfGameFinished = (column, row, player) => {
    const { winner, path } = checkGameStatus(column, row, grid, player);
    if (winner) {
      setWinner(winner);
      setWinPath(path);
    } else if (gameOver(grid, column)) {
      setGameStatus('tied');
    }
  };

  const renderGrid = () => {
    let board = [];
    for (let i = 0; i < columns; i++) {
      //create empty array for each column
      let column = [];
      for (let j = 0; j < rows; j++) {
        column.push(
          <Cell
            player={grid[i][j]}
            key={j}
            highlight={winPath.some(a => a.toString() === [i, j].toString())}
          />
        ); //insert cell for each row
      }
      board.push(
        <div
          className='column'
          key={i}
          onClick={() => !winner && handleColumnClick(i)}
        >
          {column}
        </div>
      );
    }
    return board;
  };

  return (
    <div className='grid-container'>
      {gameStatus === 'finished' ? (
        <div>{winner} wins!</div>
      ) : gameStatus === 'tied' ? (
        <div>Game tied!</div>
      ) : (
        <div>Current player: {player}</div>
      )}
      <div className='grid'>{renderGrid()}</div>
    </div>
  );
};

export default Grid;
