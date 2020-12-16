import './Cell.css';

const Cell = ({ player, highlight }) => {
  return (
    <div
      className={`cell ${
        player !== undefined ? (player === 'red' ? 'red' : 'black') : ''
      } ${highlight ? 'highlight' : ''}`}
    >
        
    </div>
  );
};

export default Cell;
