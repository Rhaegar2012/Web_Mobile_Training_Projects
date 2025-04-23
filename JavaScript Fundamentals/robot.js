//Village of Meadowfield
const roads=["Alice's House-Bob's House","Alice's House-Post Office","Daria's House-Ernie's House",
             "Ernie's House-Grete's House","Grete's House-Shop","Marketplace-Post Office","Marketplace-Town Hall",
             "Alice's House-Cabin","Bob's House-Town Hall","Daria's House-Town Hall","Grete's House-Farm","Marketplace-Farm",
             "Marketplace-Shop","Shop-Town Hall"];

//Convert the list of string to a graph that indicates what can be reached from each place
//Creates a dictionary that uses each location as a key , with a collection of strings to indicate where each location connects
function buildGraph(edges){
    let graph=Object.create(null);
    function addEdge(from,to){
        if(from in graph){
            graph[from].push(to);
        }else{
            graph[from]=[to];
        }
    }
    for(let[from,to]of edges.map(r=>r.split("-"))){
        addEdge(from,to);
        addEdge(to,from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

//Functionality
//1. Robot can move around the village
//2. Robot picks up parcels when visits a location that has tem
//3. Robot delivers parcels when it arrives to destination
//4. Robot must decide at each point where to go next, finishes the task when all parcels are delivered

//Approach
//Condense the village's state to minimum set of values that describe it
//1. Robot's location
//2. Collection of undelivered parcels - each one has a location and destination address

class VillageState{
    constructor(place,parcels){
        //place is the robot position
         this.place=place
         //parcels is the collection of parcels
         this.parcels=parcels;
    }
    //Checks if a connection is available from the current place to the destination
    //Creates a new state with destination of the robot as the new place
    moveRobot(destination){
        if(!roadGraph[this.place].includes(destination)){
            //returns old state if a connection is not found
            return this;
        }else{
            //Map calls for each parcel
            //if the parcel is not at the robot current location leave it unchanged
            //if it is at the robot current location in means the robot picks it up and carries to the new location
            let parcels=this.parcels.map(p=>{
                //returns parcels if they do not belong to this location
                if(p.place!=this.place) return p;
                //recreates parcels at a new location
                return {place:destination,address:p.address};
            }).filter(p=>p.place!=p.address)//filters out parcels that are delivered after the move p.place==paddress;
            //returns a new state where the robot moved to destination
            return new VillageState(destination,parcels);
        }
    }
}

console.log("Test VillageState");

let first = new VillageState("Post Office",[{place:"Post Office",address:"Alice's House"}]);
let next = first.moveRobot("Alice's House");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

//Simulation
//1. state is an instance of Village state representing where the robot is and what parcels exist
//2. robot is a function that decides what the robot should do next based on state and memory
//3. memory is extra information the robot might need to remember
function runRobot(state,robot,memory){
    for(let turn=0;;turn++){
        if(state.parcels.length ==0){
            console.log(`Done in ${turn}turns`);
            break;
        }
        let action = robot(state,memory);
        state=state.moveRobot(action.direction);
        memory=action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

//Robot functions 
function randomPick(array){
    let choice = Math.floor(Math.random()*array.length);
    return array[choice];
}

function randomRobot(state){
    return {direction:randomPick(roadGraph[state.place])};
}