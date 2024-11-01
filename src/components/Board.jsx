import React from 'react';
import Square from './Square';
import calculateWinner from '../utils/calculateWinner';

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'; // Mantemos 'X' e 'O' para o controle do estado
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? (
    <>
    Ganhador: {winner === 'X' ? <i className="bi bi-xbox" style={{ fontSize: '2rem' }}></i> : <i className="bi bi-playstation" style={{ fontSize: '2rem' }}></i>}
    </>
  ) : (
    `Próximo jogador: ${xIsNext ? 'Xbox' : 'PlayStation'}`
  );


  const renderIcon = (value) => {
    if (value === 'X') {
      return <i className="bi bi-xbox" style={{ fontSize: '2rem' }}></i>; // Ícone do Xbox
    } else if (value === 'O') {
      return <i className="bi bi-playstation" style={{ fontSize: '2rem' }}></i>; // Ícone do PlayStation
    }
    return null;
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map((i) => (
          <Square key={i} value={renderIcon(squares[i])} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map((i) => (
          <Square key={i} value={renderIcon(squares[i])} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map((i) => (
          <Square key={i} value={renderIcon(squares[i])} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

export default Board;