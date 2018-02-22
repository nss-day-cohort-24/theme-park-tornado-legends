"use strict";


let config = require('./config');
let db = require("./fetch");
let time = require("./time");
let wel = require("./welcome");

// let firebaseCall = db.getFirebaseData();

// console.log(db);

document.addEventListener("DOMContentLoaded", function() {
    wel.welcome();
  });
  
