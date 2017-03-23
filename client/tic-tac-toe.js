import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i,x,y) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i,x,y)} />;
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0,1,1)}
          {this.renderSquare(1,1,2)}
          {this.renderSquare(2,1,3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3,2,1)}
          {this.renderSquare(4,2,2)}
          {this.renderSquare(5,2,3)}
        </div>
        <div className="board-row">
          {this.renderSquare(6,3,1)}
          {this.renderSquare(7,3,2)}
          {this.renderSquare(8,3,3)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        element: null
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    const elements = [[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
    this.setState({
      history: history.concat([{
        squares:squares,
        element: elements[i],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
            'move #' + move + ' at (' + history[move].element[0] + ',' + history[move].element[1] + ')':
            'Game Start';
      return (
        <li key={move}>
          {move === this.state.stepNumber ? (<a href="#" onClick={() => this.jumpTo(move)}><b>{desc}</b></a>) : (<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>)}
        </li>
      );
    });


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    return (
      <div className="game-table">
        <h2>Presenting the one and only TIC TAC TOE!!!</h2>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
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

export default Game;
