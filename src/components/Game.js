import React from 'react';
import '../index.css';
import Board from './Board';
import RestartGame from './RestartGame';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          gameTitle: 'Tic Tac Toe - React App'
        };
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]; //last square added
        const squares = current.squares.slice();

        if(this.calculateWinner(squares) || squares[i]){
            return;
        }
        
        //set square to read 'X' or 'O'
        squares[i]= this.state.xIsNext ? 'X' : 'O';
         
        this.setState({
            history: history.concat([{
                squares,//squares:squares
            }]),   
            stepNumber: history.length,         
            xIsNext: !this.state.xIsNext,
        }); 

    }
    //travel in the time machine back to a move
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0, //determine the player
        });
    }

    calculateWinner(squares){
        //moves that determine a win
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
    
        //loop through winning combo and chek against entered values
        for(let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i]; //use these to find the required indices to win
            //check locations to see if the values are equal
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                //alert(squares[a]+squares[a]+squares[a]);
                return squares[a];
            }
        }
    
        return null;
    }

    checkMoves(winner, moves){
        let status;
        if(winner){
            status = 'Game Over! Winner: Player '+ winner;
            //create reset game to start/restart a game
        }
        //check if moves completed and no winner
        else if(moves.length === 10){
            status = 'Game Tied';
        }
        else{
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
        }
        
        return status;
    }

    resetGame(){
        this.setState({
            stepNumber: 0,
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null),
            }]
        });        
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        
        const moves = history.map((step, move)=>{
            const moveBy = move % 2 === 0 ? 'O' : 'X';
            const desc = move ? 
                'Go to move #'+ move: 
                'Go to game start';
            return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>{desc}</button> { move > 0 ?'Made by player: '+moveBy :''}
                </li>
            );
        });
        
        
        let status;

        //first play or continue rest of the game
        if(moves.length === 1){
            status = 'First player: '+ (this.state.xIsNext ? 'X' : 'O');
        }
        else{
            status = this.checkMoves(winner, moves);            
        }

        return (
            <>
                <h3 className="game-title">{this.state.gameTitle}</h3>
                <div className="game">           
                    <div className="game-board">
                        <Board  
                        squares={current.squares} 
                        onClick={(i)=> this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <RestartGame onClick={()=> this.resetGame()} />
                        <div><p className="game-status">Game Status</p> {status}</div>
                        <p className="game-status">Moves</p>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </>
        );
    }
}

export default Game;