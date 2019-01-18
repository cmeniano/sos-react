import React from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
  
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

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};

const getLocation = (move) => {
  const locationMap = {
    0: 'row: 1, col: 1',
    1: 'row: 1, col: 2',
    2: 'row: 1, col: 3',
    3: 'row: 2, col: 1',
    4: 'row: 2, col: 2',
    5: 'row: 2, col: 3',
    6: 'row: 3, col: 1',
    7: 'row: 3, col: 2',
    8: 'row: 3, col: 3',
  };
  return locationMap[move];
};

class Game extends React.Component {
  constructor(props) {
 
    super(props);
    const row = 5;
    const col = 5;
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      matrix: this.createBoard(row,col),
      row: row,
      col: col,
      currentStepNumber: 0,
      xIsNext: true,
    };
    
  }
 
  createBoard = (row, col) => {
    const board = [];
    
    for (let i = 0; i < row; i += 1) {
      board.push([]);
      for (let j = 0; j < col; j += 1) {
        board[i].push({
          col: j,
          move: ""
        });
      }
    }
    return board;
  }

  handleClick(row, col, move = "S") {

    
    //find a way to build matrix with updated value

    
    if(row != 0){
      const rowTop = row - 1;
      const rowBottom = row + 1;
      const colLeft = col - 1;
      const colRight = col+ 1;
      let hasPossibleAnswer = false;
      let myrow= 0;
      let mycol= 0;
      do{
        for(let i=rowTop; i<3; i++){
          for(let j = colLeft; j< 3; j++){
            if(move === "S"){
              const cell = this.state.matrix[i][j];
              if(cell.move === "O"){
                myrow = i;
                mycol = j;
              }
            }
          }
        }
        hasPossibleAnswer = true;
      }
      while(hasPossibleAnswer == false)
      console.log('this.state.matrix :', this.state.matrix);
      this.setState({
        matrix: this.state.matrix
      });
    }
    
    // const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
    // const current = history[history.length - 1];
    // const squares = current.squares.slice();

    // if (calculateWinner(squares).winner || squares[i]) {
    //   return;
    // }
    // squares[i] = this.state.xIsNext ? 'X' : 'O';
    // this.setState({
    //   history: history.concat([
    //     {
    //       squares,
    //       currentLocation: getLocation(i),
    //       stepNumber: history.length,
    //     },
    //   ]),
    //   xIsNext: !this.state.xIsNext,
    //   currentStepNumber: history.length,
    // });
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortMoves() {
    this.setState({
      history: this.state.history.reverse(),
    });
  }

  render() {
    console.log('this.state.matrix :', this.state.matrix);
    const { history } = this.state;
    const current = history[this.state.currentStepNumber];
    const { winner, winnerRow } = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const currentLocation = step.currentLocation ? `(${step.currentLocation})` : '';
      const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : 'Go to game start';
      const classButton = move === this.state.currentStepNumber ? 'button--green' : '';

      return (
        <li key={step.stepNumber}>
          <button className={`${classButton} button`} onClick={() => this.jumpTo(move)}>
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else if (history.length === 10) {
      status = 'Draw. No one won.';
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            row={this.state.row}
            col={this.state.col}
            matrix={this.state.matrix}
            squares={current.squares}
            winnerSquares={winnerRow}
            onClick={(row, col) => this.handleClick(row,col)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" onClick={() => this.sortMoves()}>
            Sort moves
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
