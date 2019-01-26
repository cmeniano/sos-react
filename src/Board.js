import React from 'react';
import Square from './Square';

class Board extends React.Component {
  constructor(props){
   super(); 
  }

  createBoard() {
    const board = [];
    let cellCounter = 0;
    const size = this.props.size;
    for (let row = 0; row < size; row += 1) {
      const columns = [];
      for (let col = 0; col < size; col += 1) {
        const cellValue = this.props.matrix[row][col].move;
        columns.push(this.renderSquare(cellCounter++, row, col, cellValue));
      }
      board.push(<div key={row} className="board-row">{columns}</div>);
    }

    return board;
  }

  renderSquare(i, row, col, cellValue) {
    return (
      <Square
        key={i}
        value={cellValue}
        onClick={() => this.props.onClick(row, col)}
      />
    );
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}

export default Board;
