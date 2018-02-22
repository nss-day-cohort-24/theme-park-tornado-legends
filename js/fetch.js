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
      var areas = JSON.parse(this.responseText);
      resolve(areas);
    });
    loader.addEventListener('error', function(){
      reject();
    });
    loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/areas.json?orderBy="id"&equalTo=${id}`);
    loader.send();
  });
}

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