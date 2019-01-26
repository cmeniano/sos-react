import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
 
    super(props);
    this.moveValue = "";
    this.state = {
      boardSize: 0,
      matrix: [],
      currentStepNumber: 0,
      xIsNext: true,
      inputVal: 8
    };
  }

 
  createBoard = () => {
    const size = this.state.inputVal;
    const board = [];
    for (let row = 0; row < size; row += 1) {
      board.push([]);
      for (let col = 0; col < size; col += 1) {
        board[row].push({
          col,
          move: ""
        });
      }
    }

    this.setState({
      matrix: board,
      boardSize:size
    })
  }

  handleMove = (move) => {
    this.moveValue = move;
  }

  handleClick(rowInput, colInput) {
      let row = rowInput;
      let col = colInput;
      const clickedCell = this.state.matrix[row][col];
      const clickedCellValue = clickedCell.move;
      if(this.moveValue && !clickedCellValue){
        let rowTop = (row - 1) < 0 ? 0: row - 1 ;
        let rowBottom = (row + 1) > this.boardSize ? this.boardSize: row + 1 ;
        let colLeft = (col - 1) < 0 ? 0: col - 1;
        const rowTopValue = this.state.matrix[rowTop][col].move;
        const rowBottomValue = this.state.matrix[rowBottom][col].move;
        // let chainedMoves = [];
        // let hasPossibleAnswer = false;
        // let chain = [];
        // do{ 
        //   console.log('start do');
        //   console.log('rowTop :', rowTop);
          for(let i=rowTop; i< rowTop + 3; i++){
            for(let j = colLeft; j< colLeft + 3; j++){
              const cell = this.state.matrix[i][j];
              const cellValue = cell.move;
              console.log('cellValue :', cellValue);
            }
          }
        //   hasPossibleAnswer = chain.includes(true);
        // }
        // while(hasPossibleAnswer == true)
       
        // const cellsWithValues = this.state.matrix.forEach((row, i) => {
        //   console.log('row :', row);
        //   console.log('i :', i);
        // })
        this.state.matrix[rowInput][colInput].move = this.moveValue;
        this.setState({
          matrix: this.state.matrix
        });
        // if(this.moveValue == "O" && rowBottomValue == "S" && rowTopValue == "S"){
        // }
      }

  }

  handleChange = (event) => {
    this.setState({inputVal: event.target.value});
  }

  render() {
    console.log('this.state.boardSize :', this.state.boardSize);
    return (
      <div style={{textAlign: "center"}}>
        <div className={`overlay ${this.state.boardSize == 0 ? "" : "closed"}`}>
          <div className="content">
            <h1>Enter Board Size</h1>
            <input type="text" value={this.state.inputVal} onChange={this.handleChange}/>
            <button type="button" onClick={() => this.createBoard()}>START</button>
          </div>
        </div>
        <div className="game">
          <div className="game-board">
            {
              this.state.matrix.length != 0 
                ? 
                  <Board
                    size={this.state.boardSize}
                    matrix={this.state.matrix}
                    onClick={(row, col) => this.handleClick(row,col)}
                  /> 
                :
                  ""
            }
          </div>
        </div>
        <button onClick={() => this.handleMove("S")}>S</button>
        <button onClick={() => this.handleMove("O")}>O</button>
      </div>
    );
  }
}

export default Game;
