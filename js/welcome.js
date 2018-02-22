"use strict";
console.log("welcome.js working");

let interaction = require("./interaction");
let printAreas = interaction.printAreas;

let printDiv = document.getElementById("print");
let areasHomepagePrint;

function welcome() {
    printDiv.innerHTML=`<div id="welcomeDiv"><h2 id="parkName">VIDEO GAME LAND</h2><h1 id="welcomeCall">TAP TO VIEW THE MAP!</h1><img id="logo" src=../images/logo.png><p id="copyright">&copy; 2018</p></div>`;
    assignListener();
}

function assignListener(){
    areasHomepagePrint = document.getElementById('welcomeDiv');
    areasHomepagePrint.addEventListener('click', printAreas);
}


module.exports = {welcome, areasHomepagePrint};