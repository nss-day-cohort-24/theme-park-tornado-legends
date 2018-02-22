"use strict";
console.log("welcome.js working");

let printDiv = document.getElementById("print");

function welcome() {
    printDiv.innerHTML=`<div id="welcomeDiv"><h2 id="parkName">VIDEO GAME LAND</h2><h1 id="welcomeCall">TAP TO VIEW THE MAP!</h1><img id="logo" src=../images/logo.png></div>`;
}

module.exports = {welcome};