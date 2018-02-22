"use strict";


let config = require('./config');
let db = require("./fetch");
<<<<<<< HEAD
let time = require("./time");
=======
let wel = require("./welcome");
>>>>>>> master
// let firebaseCall = db.getFirebaseData();

// console.log(db);

document.addEventListener("DOMContentLoaded", function() {
    wel.welcome();
  });
  
