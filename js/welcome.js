"use strict";
console.log("welcome.js working");


// REQUIRES
let interaction = require("./interaction");
let printer = require("./print");

// VARIABLES
let areasPrint = printer.areasPrint;
let printDiv = document.getElementById("print");
let areasHomepagePrint;


// POPULATE HOMEPAGE
welcome();

// CREATE WELCOME MESSAGE, RUN EVENT LISTENER FUNCTION
function welcome() {
    printDiv.innerHTML=`<div id="welcomeDiv"><h2 id="parkName">VIDEO GAME LAND</h2><h1 id="welcomeCall">TAP TO VIEW THE MAP!</h1><img id="logo" src=../images/logo.png><p id="copyright">&copy; 2018</p></div>`;
    assignListener();
}


// EVENT LISTENER FUNCTIONS
function assignListener(){
    areasHomepagePrint = document.getElementById('welcomeDiv');
    areasHomepagePrint.addEventListener('click', areasPrint);
}


module.exports = {welcome, areasHomepagePrint};

