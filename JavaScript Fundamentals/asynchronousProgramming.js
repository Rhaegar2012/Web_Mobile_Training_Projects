//Callbacks
//Functions that need to wait for something take an extra argument call the callback function 
//The asynchronous function starts a process sets things up so that the callback function is called when the process finishes returns

setTimeout(()=>console.log("Tick"),500);

//Promises
//A slightly different way to build an asynchronous program is to have asynchronous functions return an object that reprets its future result instead of passing
//callback functions

//A promise is a reciept representing a value that may not be available yet. It provides a then method that allows you to register a function that should be called
//When the action for which it is waiting finishes. When the promise is resolved , the functions are called with the result value

let fifteen = Promise.resolve(15);
fifteen.then(value =>console.log(`Got ${value}`));
//Asynchronous function using proise 

function textFile(filename){
    return new Promise(resolve =>{
        readTextFile(filename,text=>resolve(text));
    });
}
//This function reads a file full of filenames and returns the content of a random file in that list . It is asynchronous because the last function called to textFile is asynchronous
function randomFile(listFile){
    return textFile(listFile)
    .then(content=>content.trim().split("\n"))
    .then(ls=>ls[Math.floor(Math.random()*ls.length)])
    .then(filename=>textFile(filename));
}