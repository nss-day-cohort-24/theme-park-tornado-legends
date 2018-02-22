"use strict";

let printer = require("./print");
let areasPrint = printer.areasPrint;
let areaDataPrint = printer.areaDataPrint;
let attractionDataPrint = printer.attractionDataPrint;


function printAreas(){
    areasPrint();
}



function runPrint(id){
    console.log(event);
    areaDataPrint(id);
    attractionDataPrint(id);
}



module.exports = {printAreas, runPrint};