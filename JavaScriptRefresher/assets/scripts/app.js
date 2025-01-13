import { read } from "fs";
import {apiKey} from "./util.js"; //import a single variable from an external file
import * as util from "./util.js"; // Imports the complete util.js file
console.log(apiKey); //print to the console , using node command from node.js

let userMessage = "Hello World";//variable declaration in javascript
const userMessageConstant ="My Constant"//constant assignment , cannot have a value reassigned to them
console.log(userMessage);

//Operators

console.log(10+5); //addition
console.log("Hello"+"World"); //concatenation
console.log(10===5);//boolean
console.log(10<100);//boolean less than 
console.log(100>10);//greater than

//functions
function greet(){
    console.log("greet");
}

greet();

function greetWithParameters (userName, message){
    console.log(userName);
    console.log(message);
}

greetWithParameters("Jose","Hi jose");

function greetUser(userName,message ="Hello!")
{
    return "Hi , I am" +userName+". "+message;
}

greetUser("Jose");

//Arrow (lambda functions)
export default (userName,message)=>{
    console.log("Hello arrow function");
    return userName+message;
}

//Class declaration 
//Object declaration
const user ={
    //object attribute
    name:"Max",
    age:34,
    //object behaviors
    greet(){
        console.log("Hello");
        console.log(this.age);
    }
};

console.log(user.name);

class User{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    greet(){
        console.log('Hi!');
    }
}

//constructor call
const user1 = new User("Manuel",35);
console.log(user1);

//Arrays
const hobbies=["Sports","Cooking","Reading"];
console.log(hobbies[0]);
//Adds value to array
hobbies.push("Working");
console.log(hobbies);
//Finds the index of the element sports
const index=hobbies.findIndex((item)=>{
    return item === 'Sports';
})

console.log(index);

//Map function , modifies every item in the collection 
const editedHobbies=hobbies.map((item)=>item+"!");
console.log(editedHobbies);

//Destructuring
//The variables defined within the array declaration map to the values of the array 
const [firstName,lastName] = ["Max","Scuarzmuller"];

console.log(firstName);
console.log(lastName);

// Destructuring for objects, the variable names in curly brackets map to the object attributes , the variable names must be equal to the object attributes names

const {name:userName,age}={
    name:"Max",
    age:34
};

console.log(userName);
console.log(age);

//Spread Operator
const newHobbies =["Reading"];
//Spread operator ... merges two arrays into one WITHOUT nesting
const mergedHobbies =[...hobbies,...newHobbies];
console.log(mergedHobbies);
const nestedHobbies =[hobbies,newHobbies];
console.log(nestedHobbies);

//Spread operator on objects 
const extendedUser ={
    isAdmin:true,
    ...user
};

console.log(extendedUser);

//Control structures
//if statement using readline from node js
(async ()=>{
const readLine = await import('readline');
let password
const rl= readLine.createInterface({
    input: process.stdin,
    output:process.stdout
});

//prompt the user for input 

rl.question('Your password',function(input){
    password=input;
    if(password ==="Hello")
        {
            console.log("Hello Works");
        }
    else if(password ==="hello")
        {
            console.log("hello works");
        }
    else{
        console.log("Access not granted");
    }
    rl.close();
})
})();

///For loops 
for(const hobby of hobbies){
    console.log(hobby);
}

//Functions as values
// pass anonymous function or create it manually in a separate step 
function handleTimeout(){
    console.log("Timed out!");
}

const handleTimeout2=()=>{
    console.log("Timed out....again!");
};

setTimeout(handleTimeout,2000);

setTimeout(()=>{
    console.log('More timing out...');
},4000);

//Primitive vs reference values
let newUserMessage = "Hello!";
newUserMessage = userMessage.concat("!!!");

hobbies.push("Working");
console.log(hobbies);

