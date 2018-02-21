"use strict";

console.log('fetch console test');


let firebase = require("../lib/node_modules/firebase");
let config = require('./config');

// var config = {
//   apiKey: "AIzaSyBe3OAcqFN_W0Pkv5WxU7Ky1MTAQs9vwaw",
//   authDomain: "fir-test-run.firebaseapp.com",
//   databaseURL: "https://fir-test-run.firebaseio.com"
// };


function getFirebaseData(){
    console.log('get firebase call');
  return new Promise((resolve,reject) => {
    var loader = new XMLHttpRequest();
    
    loader.addEventListener('load', function(){
      var areasList = JSON.parse(this.responseText);
      resolve(areasList);
    });
    loader.addEventListener('error', function(){
      reject();
    });
    loader.open("GET", "https://fir-test-run.firebaseio.com/areas/.json");
    loader.send();
  });
}

getFirebaseData()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );


firebase.initializeApp(config);
module.exports = {firebase, getFirebaseData};