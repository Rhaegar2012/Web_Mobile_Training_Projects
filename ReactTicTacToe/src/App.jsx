import {useState} from 'react'
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';

function App() {
  
  const [activePlayer,setActivePlayer] =useState('X');
  const [gameTurns,setGameTurns] = useState([]);//Initiates game turns as an empty array

  //Set state for the current active player 
  function handleSelectSquare(rowIndex,colIndex){
    setActivePlayer((curActivePlayer)=>curActivePlayer ==='X'?'O':'X');
    //Takes a look at an array of turns
    setGameTurns((prevTurns)=>{
      //Derives the symbol of the active player by checking the first element on the turns array (assured to be the latest)
      let currentPlayer='X';
      if(prevTurns.length>0 && prevTurns[0].player==='X'){
        currentPlayer='O';
      }
      //Creates an array with an object that stores a square (represented by row and column index) and the player that clicked the square 
    
      //Note the use of the ...spread operator , this adds all the elements of the array prevTurns into the new array updatedTurns
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns];

      return updatedTurns;

    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/** isActive flag true or false depending on the symbol*/}
           <Player name="Player 1" symbol="X" isActive={activePlayer==='X'}/>
           <Player name="Player 2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        {/** Pass handleSelectSquare as an argument this allows the state of activePlayer to be set from GameBoard when a button is pressed*/}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      LOG
    </main>
  );
}

export default App
