import React from "react";
import {useState} from "react";

export default function Player({initialName,symbol,isActive,onChangeName}){

    const[playerName,setPlayerName] =useState(initialName);
    const [isEditing,setIsEditing]=useState(false);

    function setEditing(){
        setIsEditing((editing)=>!editing);//react recommended pattern , transmits the latest state value
        if(isEditing){
          onChangeName(symbol,playerName);
        }
        
    }

    function handleChange(event){
      setPlayerName(event.target.value);
    }

    let buttonCaption = "Edit";

    if(isEditing){
        buttonCaption ="Save";
    }

    return(
        <li className={isActive?'active':undefined}>
        <span>
          {isEditing?<input className="player input" type="text" required value={playerName} onChange={handleChange}></input>:<span className='player-name'>{playerName}</span>}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={setEditing}>{buttonCaption}</button>
      </li>
    );
}