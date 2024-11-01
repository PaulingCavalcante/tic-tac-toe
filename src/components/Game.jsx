import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showWinnerToast, setShowWinnerToast] = useState(false);
  const [showDrawToast, setShowDrawToast] = useState(false);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  const isDraw = !winner && currentSquares.every(square => square !== null);

  useEffect(() => {
    if (winner) {
      setShowWinnerToast(true);
      setShowDrawToast(false);
    } else if (isDraw) {
      setShowDrawToast(true);
    }
  }, [winner, isDraw]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowWinnerToast(false);
    setShowDrawToast(false);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={resetGame} className="reset-button">
          Reiniciar Jogo
        </button>
      </div>

      {/* Toast Container para exibir vencedor ou empate */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast
          show={showWinnerToast}
          onClose={() => setShowWinnerToast(false)}
          delay={3000}
          autohide
          bg="dark"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-black">Jogo Encerrado</strong>
            <small className="text-muted">agora mesmo</small>
          </Toast.Header>
          <Toast.Body className="text-white">
          Parabéns! {winner === 'X' ? <i className="bi bi-xbox" style={{ fontSize: '2rem' }}></i> : <i className="bi bi-playstation" style={{ fontSize: '2rem' }}></i>} é o vencedor!
          </Toast.Body>
        </Toast>

        <Toast
          show={showDrawToast}
          onClose={() => setShowDrawToast(false)}
          delay={3000}
          autohide
          bg="dark"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-black">Jogo Encerrado</strong>
            <small className="text-muted">agora mesmo</small>
          </Toast.Header>
          <Toast.Body className="text-white">
            Deu velha! Tente novamente.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Game;