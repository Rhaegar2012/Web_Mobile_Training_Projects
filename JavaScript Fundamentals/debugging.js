//Strict mode
//Use to make javascript 
function canYouSpotTheProblem(){
    "use strict";
    for(let counter=0;counter<10;counter++){
        console.log("Happy Happy");
    }
}
canYouSpotTheProblem();

//Exceptions
function promptDirection(question){
    let result=prompt(question);
    if(result.toLowerCase()=="left") return "L";
    if(result.toLowerCase()=="right") return "R";
    throw new Error("Invalid direction: "+result);
}

function look(){
    if(promptDirection("Which way?")=="L"){
        return "a house";
    }else{
        return "two angry bears";
    }
}

try{
    console.log("You see",look());
}catch(error){
    console.log("Something went wrong: "+error);
}
