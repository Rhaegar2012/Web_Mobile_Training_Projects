import React from "react";
import {useState} from "react";

export default function Player({name,symbol}){

    const [isEditing,setIsEditing]=useState(false);

    function setEditing(){
        setIsEditing(!isEditing);
    }

    let buttonCaption = "Edit";

    if(isEditing){
        buttonCaption ="Save";
    }

    return(
        <li>
        <span>
          {isEditing?<input className="player input" type="text" required value={name}></input>:<span className='player-name'>{name}</span>}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={setEditing}>{buttonCaption}</button>
      </li>
    );
}