"use strict";


let config = require('./config');
let db = require("./fetch");
let wel = require("./welcome");
require("./print");
require("./interaction");
// let firebaseCall = db.getFirebaseData();

// console.log(db);

document.addEventListener("DOMContentLoaded", function() {
    wel.welcome();
  });
  
