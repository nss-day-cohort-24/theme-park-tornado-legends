"use strict";

// REQUIRES
let printer = require("./print");


// VARIABLES
let areasPrint = printer.areasPrint;
let areaDataPrint = printer.areaDataPrint;
let attractionDataPrint = printer.attractionDataPrint;
let attractionDetailsPrint = printer.attractionDetailsPrint;
let areaSelect = document.getElementById('print').addEventListener('click', check);


// PRINT DIV ID CHECK
function check(){
    console.log(event.target.className);
    console.log(event);
    if(event.target.className === 'areaMap'){
    attractionDataPrint(parseInt(event.target.id));
}
    if(event.target.id === 'backToAreas'){
        areasPrint();
    }
    if(event.target.className === 'backToAttractions'){
        console.log(event.target.id);
        attractionDataPrint(parseInt(event.target.id));
    }
    if(event.target.className === 'areaAttraction'){
        console.log(event.target.className);
        console.log(event.target.id);
        attractionDetailsPrint(event.target.id);
    }
}
