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
