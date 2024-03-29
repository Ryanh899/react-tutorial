import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 

function Square(props){
    return (
        <button className="square" 
                onClick={props.onClick}
            >
                {props.value}
        </button>
    );
}
      
  
  class Board extends React.Component {
    renderSquare(i, ...coordinates) {
      return (
            <Square 
                coordinates={'(' + coordinates.join(',') + ')'}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, `(${(coordinates.join(','))})`)}
            />
      ); 
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0, 1, 1)}
            {this.renderSquare(1, 1, 2)}
            {this.renderSquare(2, 1, 3)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 2, 1)}
            {this.renderSquare(4, 2, 2)}
            {this.renderSquare(5, 2, 3)}
          </div>
          <div className="board-row">
            {this.renderSquare(6, 3, 1)}
            {this.renderSquare(7, 3, 2)}
            {this.renderSquare(8, 3, 3)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }], 
            stepNumber: 0,
            xIsNext: true,
            lastCoords: [], 
        }; 
    }

    handleClick(i, coordinates) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);  
        const current = history[history.length -1]; 
        const squares = current.squares.slice(); 
        const coords = coordinates
        console.log(coords)
        this.state.lastCoords.push(coords)
        console.log(this.state.lastCoords)
            if(calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? 'X' : 'O'; 
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]), 
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length,
            }); 
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step, 
            xIsNext: (step % 2) === 0, 
        }); 
    }

    render() {
    const history = this.state.history; 
    const current = history[this.state.stepNumber]; 

    const winner = calculateWinner(current.squares); 

    const moves = history.map((step, move) => {
        console.log(move)
        const coordinateDesc = move ? 
        this.state.lastCoords[this.state.lastCoords.length - 1] :
        '';
        const desc = move ? 
            'Go to move #' + move : 
            'Go to game start'; 
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc} {coordinateDesc}</button>
                </li>
            ); 
    }); 

        let status; 
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
        }
    return (
    <div className="game">
        <div className="game-board">
        <Board 
            squares={current.squares}
            onClick={(i, coordinates) => {this.handleClick(i, coordinates)}}
        />

        </div>
        <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        </div>
    </div>
      );
    }
  }
  

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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
  