//High level fuynction to repeatr a number of times 
let labels=[]

function repeat(n,action){
    for(let i=0;i<n;i++){
        action(i);
    }
}

repeat(5,i=>{
    labels.push(`Unit ${i+1}`);
});

console.log(labels);

//High order function to create functions 

function greaterThan(n){
    return m=> m>n;
}

let greaterThan10= greaterThan(10);

//High order functions to change functions 
function noisy(f){
    return(...args)=>{
        console.log("calling with",args);
        let result = f(...args);
        console.log("called with",args,", returned",result);
        return result;
    };
}

noisy(Math.min)(3,2,1);

//the map method transforms an array by applying a function to all of its elements and building a new array from the returned values 

let SCRIPTS={   name: "Coptic",
    ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
    direction: "ltr",
    year: -200,
    living: false,
    link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
};

  function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }
  
  console.log(filter(SCRIPTS, script => script.living));

  function map(array,transform){
    let mapped=[];
    for(let element of array){
        mapped.push(transform(element));
    }
    return mapped;
  }

  let rtlScripts = SCRIPTS.filter(s=>s.direction=="rtl");
  console.log(map(rtlScripts,s=>s.name));