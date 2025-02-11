import { useState } from "react";

function Square({ value, onSquareClick, isLastMove }) {
  return (
    <button
      className={`square ${isLastMove ? "last-move" : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "El Ganador es " + winner;
  } else {
    status = "Toca Jugar: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          isLastMove={lastMove === 0}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          isLastMove={lastMove === 1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          isLastMove={lastMove === 2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          isLastMove={lastMove === 3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          isLastMove={lastMove === 4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          isLastMove={lastMove === 5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          isLastMove={lastMove === 6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          isLastMove={lastMove === 7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          isLastMove={lastMove === 8}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [lastMove, setLastMove] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, i) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setLastMove(i);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Movimiento #" + move;
    } else {
      description = "Ha empezado el Juego!";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <h2 className="game-title">TIC-TAC-TOE PLUS</h2>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          lastMove={lastMove}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
