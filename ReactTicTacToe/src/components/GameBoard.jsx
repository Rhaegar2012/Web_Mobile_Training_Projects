import{useState} from 'react';
const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

export default function GameBoard({onSelectSquare,turns}){
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
    let gameBoard = initialGameBoard;
    for(const turn of turns){
        const{square,player}=turn;
        const {row,col}=square;
        gameBoard[row][col] =player;
    }

    return( <ol id="game-board">
        {gameBoard.map((row,rowIndex)=><li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=><li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}

    </ol>);
}