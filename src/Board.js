import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props){
   super(); 
  }

  createBoard() {
    this.props.matrix
    const board = [];
    let cellCounter = 0;
    const row = this.props.row;
    const col = this.props.col;
    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(this.renderSquare(cellCounter++, i, j));
      }
      board.push(<div key={i} className="board-row">{columns}</div>);
    }

    return board;
  }

  renderSquare(i, row, col) {
    const winnerClass =
      this.props.winnerSquares &&
      (this.props.winnerSquares[0] === i ||
        this.props.winnerSquares[1] === i ||
        this.props.winnerSquares[2] === i)
        ? 'square--green'
        : '';

    return (
      <Square
        winnerClass={winnerClass}
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(row, col)}
      />
    );
  }

  render() {
    return <div>{this.createBoard(3, 3)}</div>;
  }
}

export default Board;
