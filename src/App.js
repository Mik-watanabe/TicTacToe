import { useState } from 'react';

function Square({value, onClickSquare}) {
  return <button className="square" onClick={onClickSquare}>{value}</button>;
}

function determineWinner(squaresState) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let  index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];

    if (squaresState[a] && squaresState[a] === squaresState[b] && squaresState[a] === squaresState[c]) {
      return squaresState[a];
    }
  }
  return null;
}

function Board({xIsCurrent, squaresState, onPlay}) {

  function handleClick(i) {
    if (squaresState[i] || determineWinner(squaresState)) {
      return;
    }
    const tmpSquares = squaresState.slice();
    tmpSquares[i] = xIsCurrent ? "X" : "O";
    onPlay(tmpSquares);
  }

  const winner = determineWinner(squaresState);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsCurrent ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squaresState[0]} onClickSquare={() => handleClick(0) }/>
        <Square value={squaresState[1]} onClickSquare={() => handleClick(1) }/>
        <Square value={squaresState[2]} onClickSquare={() => handleClick(2) }/>
      </div>
      <div className="board-row">
        <Square value={squaresState[3]} onClickSquare={() => handleClick(3) }/>
        <Square value={squaresState[4]} onClickSquare={() => handleClick(4) }/>
        <Square value={squaresState[5]} onClickSquare={() => handleClick(5) }/>
      </div>
      <div className="board-row">
        <Square value={squaresState[6]} onClickSquare={() => handleClick(6) }/>
        <Square value={squaresState[7]} onClickSquare={() => handleClick(7) }/>
        <Square value={squaresState[8]} onClickSquare={() => handleClick(8) }/>
      </div>
    </>
  );
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentBoard = history[currentMove];
  const xIsCurrent = currentMove % 2 === 0;

  function handlePlay(nextBoard) {
    const updatedHistory = [...history.slice(0, currentMove + 1), nextBoard];
    setHistory(updatedHistory);
    setCurrentMove(updatedHistory.length - 1);
  }

  function jumpTo(moveTo) {
    setCurrentMove(moveTo);
  }

  const historyDisplayedList = history.map((el, move) => {
    let text = `Go to move # ${move}`
    return move > 0 && (
        <li key={`move_${move}`}>
          <button onClick={() => jumpTo(move)}>{text}</button>
        </li>
      )
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsCurrent={xIsCurrent} squaresState={currentBoard} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {historyDisplayedList}
        </ol>
      </div>
    </div>
  )
}
