//basic function definition 
const square = function(x){
    return x*x;
}

console.log(square(12));

const makeNoise =function(){
    console.log("Pling!");
}

makeNoise();

const roundTo=function(n,step){
    let remainder = n%step;
    return n- remainder +(remainder<step/2?0:step)
};

console.log(roundTo(23,10));

//Nested scope 
console.log("Nested scope example")

const hummus = function(factor){
    const ingredient = function(amount,unit,name){
        let ingredientAmount = amount*factor;
        if(ingredientAmount>1){
            unit+="s"
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };

    ingredient(1,"can","chickpeas");
    ingredient(0.25,"cup","tahini");
    ingredient(0.25,"cup","lemon juice");
    ingredient(1,"clove","garlic");
    ingredient(2,"tablespoon","olive oil");
    ingredient(0.5,"teaspoon","cumin");
};

//Arrow functions 
console.log("This is an example of an arrow function")

const roundToArrow =(n,step)=>{
    let remainder = n%step;
    return n- remainder +(remainder <step/2?0:step);
};

roundToArrow(23,10);

//Call stack and Recursion 

console.log("Recursion example")
console.log("by starting from the number 1 and repeatedly either adding 5 or multiplying by 3 , an infinite set of numbers can be produced how would you");
console.log("write a function that , given a number , tries to find a sequence of such additions and multiplications that produce that number?");

function findSolution(target){
    function find(current,history){
        if(current == target){
            return history;
        }else if(current>target){
            return null;
        }else{
            return find(current+5,`(${history}+5)`)??
                   find(current*3,`(${history}*3)`);
        }
    }
    return find(1,"1");
}

console.log(findSolution(24));