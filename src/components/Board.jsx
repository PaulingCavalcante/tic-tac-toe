import React from 'react';
import Square from './Square';
import calculateWinner from '../utils/calculateWinner';

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null); // Verifica se todos os quadrados estão preenchidos

  const status = winner ? (
    <>
      Ganhador: {winner === 'X' ? <i className="bi bi-xbox" style={{ fontSize: '2rem' }}></i> : <i className="bi bi-playstation" style={{ fontSize: '2rem' }}></i>}
    </>
  ) : isDraw ? (
    "O jogo terminou em velha!"
  ) : (
    `Próximo jogador: ${xIsNext ? 'Xbox' : 'PlayStation'}`
  );

  const renderIcon = (value) => {
    if (value === 'X') {
      return <i className="bi bi-xbox" style={{ fontSize: '2rem' }}></i>;
    } else if (value === 'O') {
      return <i className="bi bi-playstation" style={{ fontSize: '2rem' }}></i>;
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