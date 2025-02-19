import {useState} from 'react'
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';


const PLAYERS={
  X:'Player 1',
  O:'Player 2'
};
const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer ='O';
  }
  return currentPlayer;
}


function deriveGameBoard(gameTurns){
   //Adds a brand new array (new pointer in memory) not the original array
   let gameBoard = [...initialGameBoard.map(array=>[...array])];
   for(const turn of gameTurns){
       const{square,player}=turn;
       const {row,col}=square;
       gameBoard[row][col] =player;
   }
   return gameBoard;

}

function deriveWinner(gameBoard, players){
  let winner=null;
  //Check combinations after every turn
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
}

function App() {
  
  //const [activePlayer,setActivePlayer] =useState('X');
  const [players,setPlayers] =useState(PLAYERS);

  const [gameTurns,setGameTurns] = useState([]);//Initiates game turns as an empty array
  
  const gameBoard=deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);

 
  
  const winner= deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length ===9 && !winner;
  //Set state for the current active player 
  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((curActivePlayer)=>curActivePlayer ==='X'?'O':'X');
    //Takes a look at an array of turns
    setGameTurns((prevTurns)=>{
      //Derives the symbol of the active player by checking the first element on the turns array (assured to be the latest)
      const currentPlayer = deriveActivePlayer(prevTurns);
      //Creates an array with an object that stores a square (represented by row and column index) and the player that clicked the square 
    
      //Note the use of the ...spread operator , this adds all the elements of the array prevTurns into the new array updatedTurns
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns];

      return updatedTurns;

    });
  }

function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol,newName){
  setPlayers(prevPlayers =>{
    return{...prevPlayers,
    [symbol]:newName
    };
  });
}

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/** isActive flag true or false depending on the symbol*/}
           <Player name={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
           <Player name={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/** Pass handleSelectSquare as an argument this allows the state of activePlayer to be set from GameBoard when a button is pressed*/}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
