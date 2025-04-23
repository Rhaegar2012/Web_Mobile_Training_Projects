//Methods
function speak(line){
    console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type:"white",speak};
let hungryRabbit = {type:"hungry", speak};

whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("got any carrots?");

//Prototypes
//The Proto tabbit acts as a container for the properties shared by all rabbits 
let protoRabbit={
    speak(line){
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};

let blackRabbit = Object.create(protoRabbit);
blackRabbit.type ="black";
blackRabbit.speak("I am fear and darkness");
//Classes
//Constructor
function makeRabbit(type){
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit
}

//Class notation
class Rabbit{
    constructor(type){
        this.type=type;
    }
    speak(line){
        console.log(`The ${this.type} rabbit '${line}'`);
    }
}

//Instantiate killerRabbit object from Rabbit class
let killerRabbit = new Rabbit("killer");

//Private properties
//To declare a private method put a #sign in front of its name . such methods can be called only from inside the class declaration that defines them

class SecretiveObject{
    #getSecret(){
        return "I ate all the plums";
    }

    interrogate(){
        let shallISayIt = this.#getSecret();
        return "never";
    }
}

//To use privat einstance properties they must be declared . Regular properties can be created by just assigning them but private properties must be declared in the class
//in the class declaration to be available at all 

class RandomSource{
    #max;
    constructor(max){
        this.#max =max;
    }
    getNumber(){
        return Math.floor(Math.random()*this.#max);
    }
}

//Map or dictionary in javascript 

let ages={
    Boris:39,
    Liang:22,
    Julia:62
};

console.log(`Julia is ${ages["Julia"]}`);
console.log("I Jack's age known?","Jack" in ages);
console.log("Is toString's age known?","toString" in ages);

//Using map class 
let newAges = new Map();
newAges.set("Boris",39);
newAges.set("Liang",22);
console.log(`Julia is $ ${newAges.get("Julia")}`);
console.log("Is jack's age known?",newAges.has("Jack"));
console.log(newAges.has("toString"));


//Getters , Setters and Statics 
let varyingSize ={
    get size(){
        return Math.floor(Math.random()*100);
    }
};

console.log(varyingSize.size);
console.log(varyingSize.size);


class Temperature{
    constructor(celsius){
        this.celsius=celsius;
    }
    get fahrenheit(){
        return this.celsius*1.8+32;
    }
    set fahrenheit(value){
        this.celsius=(value-32)/1.8;
    }
    static fromFahrenheit(value){
        return new Temperature((value-32)/1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
temp.fahrenheit=86;
console.log(temp.celsius);
