import{useState} from 'react';
const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

export default function GameBoard(){
    const [gameBoard,setGameBoard] = useState(initialGameBoard);//set initial state to initial gameBoard

    function handleSelectSquare(rowIndex,colIndex){
        setGameBoard((prevGameBoard)=>{
            //Updated state in an immutable way 
            const updatedBoard =[...prevGameBoard.map(innerArray=>[...innerArray])];//copies array
            updatedBoard[rowIndex][colIndex]='X';//updates array with new value
            return updatedBoard;//returns copy as new state 

        });
    }

    return( <ol id="game-board">
        {gameBoard.map((row,rowIndex)=><li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex)=><li key={colIndex}><button onClick={()=>handleSelectSquare(rowIndex,colIndex)}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}

    </ol>);
}