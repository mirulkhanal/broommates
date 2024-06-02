import React from 'react';

interface BoardDetailsProps {
  board: any; // Adjust the type according to your board data structure
  onClose: () => void;
}

const BoardDetails: React.FC<BoardDetailsProps> = ({ board, onClose }) => {
  return (
    <div className='board-details'>
      <h2>Board Details</h2>
      <p>Title: {board.title}</p>
      <p>Type: {board.type}</p>
      <p>Owner: {board.owner}</p>
      {/* Add more details */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default BoardDetails;
