//Array
console.log("Array example")
let listOfNumbers =[2,3,5,7,11];
console.log(listOfNumbers[2]);
console.log(listOfNumbers[0]);
console.log(listOfNumbers[2-1]);

//Pushing values to an array
console.log("array manipulation example");
let sequence = [1,2,3];
console.log("push values")
sequence.push(4);
sequence.push(5);
console.log(sequence);
console.log("pop values")
console.log(sequence.pop());
console.log(sequence);

//object definition 

let day1={
    squirrel:false,
    events:["work","touched tree","pizza","running"]
};

console.log(day1.squirrel);
console.log(day1.wolf);
day1.wolf=false;
console.log(day1.wolf);

//Object creation at runtime 
let journal=[];
function addEntry(events,squirrel){
    journal.push({events,squirrel});
}

addEntry(["work","touched tree","pizza","running","telivision"],false);
addEntry(["work","ice cream","cauliflower","lasgna","touched tree","brushed tree"],false);
addEntry(["weekend","cycling","break","peanuts","beer"],true);

//calculates phi correlation coefficient
function phi([n00,n01,n10,n11]){
    return(n11*n00-n10*n01)/
    Math.sqrt((n10+n11)*
              (n00+n01)*
              (n01+n11)*
              (n00+n10));
}


//Extract a table from the journal
function tableFor(event,journal){
    let table =[0,0,0,0];
    for(let i=0;i<journal.length;i++){
        let entry = journal[i],index=0;
        if(entry.events.includes(event)){
            index+=1;
        }
        if(entry.squirrel){
            index+=2
        }
        table[index]+=1;
    }
    return table
}

console.log(tableFor("pizza",journal));

//finds every type of event 
function journalEvents(journal){
    let events=[];
    for(let  entry of journal){
        for(let event of entry.events){
            if(!events.includes(event)){
                events.push(event);
            }
        }
    }
    return events;
}

console.log(journalEvents(journal));
//Creating a table for all the event types
for (let event of journalEvents(journal)){
    console.log(event+": ",phi(tableFor(event,journal)));
}

//filtering for correlations greater than 0.1 or less than -0.1
for(let event of journalEvents(journal)){
    let correlation = phi(tableFor(event,journal));
    if(correlation>0.1 || correlation <-0.1){
        console.log(event+":",correlation)
    }
}


//REST parameters
//Computes  the maximum of all the arguments it is given 
//The function accepts any number of arguments 
console.log("Rest parameters example");
function max(...numbers){
    let result=-Infinity;
    for(let number of numbers){
        if(number>result)result = number;
    }
    return result;
}

console.log(max(1,9,-2));
// can be similarly call a function with an array of arguments 
let numbers=[5,1,7];
//... is the spread operator , passes the values of the array as individual numbers
console.log(max(...numbers));

console.log("spread example with curly braced objects")
let coordinates ={x:10,y:0};
console.log({...coordinates,z:1});

//JSON

//converts data to json format
console.log("JSON example")
let string = JSON.stringify({squirrel:false,events:["weekend"]});
console.log(string);
console.log(JSON.parse(string).events);
