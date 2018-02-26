"use strict";

// REQUIRES
let printer = require("./print");
let timeFunc = require("./time");
let search = require("./search");

// VARIABLES
let areasPrint = printer.areasPrint;
let areaDataPrint = printer.areaDataPrint;
let attractionDataPrint = printer.attractionDataPrint;
let attractionDetailsPrint = printer.attractionDetailsPrint;
let attractionDetailsTimePrint = printer.attractionDetailsTimePrint;
let areaSelect = document.getElementById('print').addEventListener('click', check);
let timeButton = document.getElementById("footer-nav").addEventListener('click',check);


function enterKey(event) {
    if (event.keyCode === 13) {
        search.onEnter();
    }
}


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
    if(event.target.className === 'backToTime'){
        console.log(event.target.id);
        timeFunc.timeFunction();
    }
    if(event.target.className === 'areaAttraction'){
        console.log(event.target.className);
        console.log(event.target.id);
        attractionDetailsPrint(event.target.id);
    }
    if(event.target.className === 'timeAttraction'){
        console.log(event.target.className);
        console.log(event.target.id);
        attractionDetailsTimePrint(event.target.id);
    }
    if(event.target.parentElement.id === "clock"){
        timeFunc.timeFunction();
        console.log("ran timeFuc");
    }
    if(event.target.parentElement.id === "search"){
        search.printSearchData();
    }
    if (event.target.id === 'search-btn'){
        search.onEnter();
    }
    if (event.target.id === 'searchField') {
        document.getElementById('searchField').addEventListener("keypress", enterKey);
    }
        if(event.target.id === 'home'){
        areasPrint();
    }
}
