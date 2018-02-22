"use strict";

console.log('fetch console test');


let firebase = require("../lib/node_modules/firebase");
require("../lib/node_modules/firebase/auth");
require("../lib/node_modules/firebase/database");

let database;
let firebaseData;


function areaData(id){
    console.log('get area call');
  return new Promise((resolve,reject) => {
    var loader = new XMLHttpRequest();
    
      loader.addEventListener('load', function(){
      var areasList = JSON.parse(this.responseText);
      resolve(areasList);
    });
    loader.addEventListener('error', function(){
      reject();
    });
    loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/areas.json?orderBy="id"&equalTo=${id}`);
    loader.send();
  });
}

areaData(1)
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      firebaseData = json_data;
      console.log("API call successful and responded with", firebaseData);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );





  // var config = {
  //   apiKey: "AIzaSyBp7JllmXmYthaiSo7LWqto8VzlvnaT9Ho",
  //   authDomain: "tornado-legends-theme-park.firebaseapp.com",
  //   databaseURL: "https://tornado-legends-theme-park.firebaseio.com",
  //   projectId: "tornado-legends-theme-park",
  //   storageBucket: "tornado-legends-theme-park.appspot.com",
  //   messagingSenderId: "376888521537"
  // };
  // firebase.initializeApp(config);

module.exports = {firebase, areaData};