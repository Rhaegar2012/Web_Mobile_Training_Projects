import{useState} from 'react';


export default function GameBoard({onSelectSquare,board}){
    //set initial state to initial gameBoard
   // const [gameBoard,setGameBoard] = useState(initialGameBoard);

    /*function handleSelectSquare(rowIndex,colIndex){
        setGameBoard((prevGameBoard)=>{
            //Updated state in an immutable way 
            const updatedBoard =[...prevGameBoard.map(innerArray=>[...innerArray])];//copies array
            updatedBoard[rowIndex][colIndex]=activePlayerSymbol;//updates array with new value
            return updatedBoard;//returns copy as new state 

        });
        //onSelectSquare updates the state of the active Player in the player component
        onSelectSquare();
    }*/
    //Derived state 
    

    return( <ol id="game-board">
        {board.map((row,rowIndex)=><li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=><li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}

    </ol>);
}