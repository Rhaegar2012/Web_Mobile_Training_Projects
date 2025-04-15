//Conditional Execution
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

rl.question("Pick a number: ",(input)=>{
    const theNumber = Number(input)
    if(!Number.isNaN(theNumber))
    {
        console.log("Your number is the square root of "+(theNumber *theNumber));
    }
    rl.close();
});
//While Loop
console.log("This is a while loop");
let result  =1;
let counter =0;

while(counter<10){
    result=result*2;
    counter=counter+1
}
console.log(result);

//For loops
console.log("This is a for loop");
let forResult=1;
for(let counter =0;counter<10;counter = counter+1){
    result=result*2;
}

console.log(result);


//Breaking out of a loop 
console.log("Breaking out of a loop example")
for (let current=20;;current=current+1){
    if(current %7==0){
        console.log(current);
        break;
    }
}

//Switch statement 
console.log("this is a switch statement example");

const readline2 = require('readline');
const inputPrompt = readline2.createInterface({
    input: process.stdin,
    output:process.stdout
});

inputPrompt.question("What's the weather like", (input)=>{
    const prompt = input; 
    switch (prompt){
        case "rainy":
            console.log("Remember to bring an umbrella");
            break;
        case "sunny":
            console.log("Dress lightly");
            break;
        case "cloudy":
            console.log("Go outside");
            break;
        default:
            console.log("Unknown weather type!");
            break;
    }
    inputPrompt.close();
})