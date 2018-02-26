"use strict";


// REQUIRES
let firebase = require("../lib/node_modules/firebase");
require("../lib/node_modules/firebase/auth");
require("../lib/node_modules/firebase/database");


// VARIABLES
let database;
let firebaseData;
let attractionsList; 

// AREAS 
function areas(){
  // console.log('get areas individual call'); 
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




// ATTRACTIONS
function attractionDetails(id){
  // console.log('get areas individual call'); 
return new Promise((resolve,reject) => {
  var loader = new XMLHttpRequest();
  
  loader.addEventListener('load', function(){
    var attractionDetails = JSON.parse(this.responseText);
    attractionsList = attractionDetails;
    resolve(attractionsList);
  });
  loader.addEventListener('error', function(){
    reject();
  });
  loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/attractions.json`);
  loader.send();
});
}



// ATTRACTIONS BY ID 
function attractionData(id){
  // console.log('get area call');
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







module.exports = {attractionData, areas, attractionDetails, attractionsList};