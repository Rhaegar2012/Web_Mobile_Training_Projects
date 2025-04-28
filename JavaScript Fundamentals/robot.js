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

//Create a new state with new parcels

VillageState.random = function(parcelCount=5){
    let parcels=[];
    for(let i=0;i<parcelCount;i++){
        let address=randomPick(Object.keys(roadGraph));
        let place;
        do{
            place=randomPick(Object.keys(roadGraph));
        }while(place==address);
        parcels.push({place,address});
    }
    return new VillageState("Post Office",parcels);
}

//run simulation 
console.log("Running simulation");
runRobot(VillageState.random(),randomRobot);

const { JSDOM } = require("jsdom");

// Create a virtual DOM with a basic HTML structure
const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);

// Expose the `window` and `document` objects to your code
global.window = dom.window;
global.document = dom.window.document;


//run robot animation implementation 
// test: no

(function() {
    "use strict"
  
    let active = null
  
    const places = {
      "Alice's House": {x: 279, y: 100},
      "Bob's House": {x: 295, y: 203},
      "Cabin": {x: 372, y: 67},
      "Daria's House": {x: 183, y: 285},
      "Ernie's House": {x: 50, y: 283},
      "Farm": {x: 36, y: 118},
      "Grete's House": {x: 35, y: 187},
      "Marketplace": {x: 162, y: 110},
      "Post Office": {x: 205, y: 57},
      "Shop": {x: 137, y: 212},
      "Town Hall": {x: 202, y: 213}
    }
    const placeKeys = Object.keys(places)
  
    const speed = 2
  
    class Animation {
      constructor(worldState, robot, robotState) {
        this.worldState = worldState
        this.robot = robot
        this.robotState = robotState
        this.turn = 0
  
        let outer = (window.__sandbox ? window.__sandbox.output.div : document.body), doc = outer.ownerDocument
        this.node = outer.appendChild(doc.createElement("div"))
        this.node.style.cssText = "position: relative; line-height: 0.1; margin-left: 10px"
        this.map = this.node.appendChild(doc.createElement("img"))
        this.imgPath = "img/"
        if (/\/code($|\/)/.test(outer.ownerDocument.defaultView.location)) this.imgPath = "../" + this.imgPath
        console.log(outer.ownerDocument.defaultView.location.toString(), /\/code($|\/)/.test(outer.ownerDocument.defaultView.localation), this.imgPath)
        this.map.src = this.imgPath + "village2x.png"
        this.map.style.cssText = "vertical-align: -8px"
        this.robotElt = this.node.appendChild(doc.createElement("div"))
        this.robotElt.style.cssText = `position: absolute; transition: left ${0.8 / speed}s, top ${0.8 / speed}s;`
        let robotPic = this.robotElt.appendChild(doc.createElement("img"))
        robotPic.src = this.imgPath + "robot_moving2x.gif"
        this.parcels = []
  
        this.text = this.node.appendChild(doc.createElement("span"))
        this.button = this.node.appendChild(doc.createElement("button"))
        this.button.style.cssText = "color: white; background: #28b; border: none; border-radius: 2px; padding: 2px 5px; line-height: 1.1; font-family: sans-serif; font-size: 80%"
        this.button.textContent = "Stop"
  
        this.button.addEventListener("click", () => this.clicked())
        this.schedule()
  
        this.updateView()
        this.updateParcels()
  
        this.robotElt.addEventListener("transitionend", () => this.updateParcels())
      }
  
  
      updateView() {
        let pos = places[this.worldState.place]
        this.robotElt.style.top = (pos.y - 38) + "px"
        this.robotElt.style.left = (pos.x - 16) + "px"
  
        this.text.textContent = ` Turn ${this.turn} `
      }
  
      updateParcels() {
        while (this.parcels.length) this.parcels.pop().remove()
        let heights = {}
        for (let {place, address} of this.worldState.parcels) {
          let height = heights[place] || (heights[place] = 0)
          heights[place] += 14
          let node = document.createElement("div")
          let offset = placeKeys.indexOf(address) * 16
          node.style.cssText = `position: absolute; height: 16px; width: 16px; background-image: url(${this.imgPath}parcel2x.png); background-position: 0 -${offset}px`;
          if (place == this.worldState.place) {
            node.style.left = "25px"
            node.style.bottom = (20 + height) + "px"
            this.robotElt.appendChild(node)
          } else {
            let pos = places[place]
            node.style.left = (pos.x - 5) + "px"
            node.style.top = (pos.y - 10 - height) + "px"
            this.node.appendChild(node)
          }
          this.parcels.push(node)
        }
      }
  
      tick() {
        let {direction, memory} = this.robot(this.worldState, this.robotState)
        this.worldState = this.worldState.move(direction)
        this.robotState = memory
        this.turn++
        this.updateView()
        if (this.worldState.parcels.length == 0) {
          this.button.remove()
          this.text.textContent = ` Finished after ${this.turn} turns`
          this.robotElt.firstChild.src = this.imgPath + "robot_idle2x.png"
        } else {
          this.schedule()
        }
      }
  
      schedule() {
        this.timeout = setTimeout(() => this.tick(), 1000 / speed)
      }
  
      clicked() {
        if (this.timeout == null) {
          this.schedule()
          this.button.textContent = "Stop"
          this.robotElt.firstChild.src = this.imgPath + "robot_moving2x.gif"
        } else {
          clearTimeout(this.timeout)
          this.timeout = null
          this.button.textContent = "Start"
          this.robotElt.firstChild.src = this.imgPath + "robot_idle2x.png"
        }
      }
    }
  
    window.runRobotAnimation = function(worldState, robot, robotState) {
      if (active && active.timeout != null)
        clearTimeout(active.timeout)
      active = new Animation(worldState, robot, robotState)
    }
  })()

//Run simulation with mail truck route
//The following route passes all locations in the village , run it towce the robot is guaranteed to be done 
const mailRoute=[
    "Alice's House","Cabin","Alice's House","Bob's House","Town Hall","Daria's House","Ernie's House","Grete's House",
    "Shop","Grete's House","Farm","Marketplace","Post Office"];



//To implement the route-following robot we'll need to make use of robot memory. The robot keeps the rest of its route in its memory and rops the first element every turn

function routeRobot(state,memory){
    if(memory.length==0){
        memory=mailRoute;
    }
    return {direction:memory[0],memory:memory.slice(1)};
}

runRobotAnimation(VillageState.random(),routeRobot,[]);


//Pathfinding
//Shortest route through a graph 
//Grow routs from the starting point exploring every reachable palse that hasn't been visited yet until a route reaches the goal

function findRoute(graph,from,to){
    let work=[{at:from,route:[]}]
    for(let i=0;i<work.length;i++){
        let {at,route}=work[i];
        for(let place of graph[at]){
            if(place==to)return route.concat(place);
            if(!work.some(w=>w.at==place)){
                worl.push({at:place,route:route.concat(place)})
            }
        }
    }
}

//Goal Oriented Robot
function goalOrientedRobot({place,parcels},route){
    if(route.length==0){
        let parcel = parcels[0];
        if(parcel.place!=place){
            route = findRoute(roadGraph, place, parcel.place);
        }else{
            route=findRoute(roadGraph,place, parcel.address);
        }
    }
    return {direction:route[0],memory:route.slice(1)};

}