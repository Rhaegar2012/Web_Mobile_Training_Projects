var twod=[];
var rows=5;
//Creates a new array for every element of the array
for(var i=0;i<rows;++i){
    twod[i]=[];
}

Array.matrix=function(numrows,numcols,initial){
    var arr=[];
    for(var i=0;i<numrows;++i){
        var columns=[];
        for(var j=0;j<numcols;++j){
            columns[j]=initial;
        }
        arr[i]=columns
    }
    return arr; 
}

//Test definition using Array.matrix(5,5,0);
var nums = Array.matrix(5,5,0);
console.log(nums);

//using map 
var emptyArray=[0,0,0,0,0];
var mapArray= emptyArray.map(item=>{return item= [0,0,0,0,0]});
console.log("map array");
console.log(mapArray);

