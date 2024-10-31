// src/components/Game.jsx
import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  useEffect(() => {
    if (winner) {
      setShowToast(true);
    }
  }, [winner]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setShowToast(false); // Fecha o toast ao voltar para um movimento anterior
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowToast(false); // Esconde o toast ao reiniciar o jogo
  }

  // const moves = history.map((_, move) => (
  //   <li key={move}>
  //     <button onClick={() => jumpTo(move)}>
  //       {move ? `Go to move #${move}` : 'Go to game start'}
  //     </button>
  //   </li>
  // ));

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* <ol>{moves}</ol> */}
        <button onClick={resetGame} className="reset-button">
          Reiniciar Jogo
        </button>
      </div>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="dark"
        >
          <Toast.Header closeButton={false} className='bg-dark text-white'>
            <img src="" className="rounded me-2" alt="" />
            <strong className="me-auto text-white">Game Over</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Congratulations! {winner} is the winner!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Game;