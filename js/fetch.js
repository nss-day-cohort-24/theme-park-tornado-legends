"use strict";

console.log('fetch console test');


let firebase = require("../lib/node_modules/firebase");
require("../lib/node_modules/firebase/auth");
require("../lib/node_modules/firebase/database");

require("./listall");

let database;
let firebaseData;


function areaData(id){
    console.log('get area call');
  return new Promise((resolve,reject) => {
    var loader = new XMLHttpRequest();
    
    loader.addEventListener('load', function(){
      var areas = JSON.parse(this.responseText);
      resolve(areas);
    });
    loader.addEventListener('error', function(){
      reject();
    });
    loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/areas.json`);
    loader.send();
  });
}

areaData()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      json_data.forEach((item)=>{
        console.log(item.id);
      });
       console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );
function attractionData(id){
  console.log('get area call');
return new Promise((resolve,reject) => {
  var loader = new XMLHttpRequest();
  
  loader.addEventListener('load', function(){
    var attractions = JSON.parse(this.responseText);
    resolve(attractions);
  });
  loader.addEventListener('error', function(){
    reject();
  });
  loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/attractions.json?orderBy="area_id"&equalTo=${id}`);
  loader.send();
});
}







module.exports = {areaData, attractionData};