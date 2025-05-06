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
//Asynchronous function using promise that does not automatically resolve 

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

//Failure 
function textFileWithErrorHandling(filename){
    return new Promise((resolve,reject)=>{
        readTextFile(filename,(text,error)=>{
            if(error) reject (error);
            else resolve(text);
        });
    });
}

function withTimeout(promise,time){
    return new Promise((resolve,reject)=>{
        promise.then(resolve,reject);
        setTimeout(()=>reject("Timed out"),time);
    });
}

//Recursive function to guess a password when a digit is found the function continues searching for a new digit
function crackPasscode(networkID){
    function nextDigit(code,digit){
        let newCode = code+digit;
        return withTimeout(joinWifi(networkID,newCode),50)
            .then(()=>newCode)
            .catch(failure =>{
                if(failure =="Timed out"){
                    return nextDigit(newCode,0);
                }else if(digit<9){
                    return nextDigit(code,digit+1);
                }else{
                    throw failure;
                }
            });
    }
    return nextDigit("",0);
}

//An async function implicitly returns a promise and can await other promises that look synchronous
//When an async promise returns the promise is resolved , if the body throw an exception the promise is rejected
//rewriting crack passcode to use async

async function crackPasscode(networkID){
    for(let code="";;){
        for(let digit =0;;digit++){
            let newCode = code+digit;
            try{
                await withTimeout(joinWifi(networkID,newCode),50);
                return newCode;
            }catch (failure){
                if(failure == "Timed out"){
                    code = newCode;
                    break;
                }else if(digit ==9){
                    throw failure;
                }
            }
        }
    }
}