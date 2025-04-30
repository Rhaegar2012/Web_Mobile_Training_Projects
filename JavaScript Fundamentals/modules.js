//Modules get their own separate scope and support the import and export keywords ,this is called ES modules
const names=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

export function dayName(number){
    return names[number];
}

export function dayNumber(name){
    return names.indexOf(name);
}


// Module import
const ordinal = require("ordinal");
const {days,months} = require("date-names");

exports.formatDate = function(date,format){
    return format.replace(/YYYY|M(MMM)?|Do?|ddd/g,tag=>{
        if(tag=="YYYY") return date.getFullYear();
        if(tag=="M") return date.getMonth();
        if(tag=="MMMM")return months[date.getMonth()]
        if(tag=="D") return date.getDate();
        if(tag=="Do")return ordinal(date.getDate());
        if(tag=="dddd")return days[date.getDay()];
    });
};

//dijkstrajs
const {find_path} = require("dijkstrajs");
let graph={};
for(let node of Object.keys(roadGraph)){
    let edges=graph[node]={};
    for (let dest of roadGraph[node]){
        edges[dest]=1;
    }
}

