"use strict";

let fetchData = require("./fetch");
let areaData = fetchData.areaData; 
let attractionData = fetchData.attractionData;
let printDiv = document.getElementById('print');
let timeDiv = require("./time");
// let id = 4;
let counter = 1;

// let area1Print = document.getElementById('area1').addEventListener('click', runPrint);

runPrint();

function runPrint(){
    console.log(event);
    counter++;
    counter = counter % 8;
    areaDataPrint(counter);
    attractionDataPrint(counter);
}

function areaDataPrint(id){
areaData(id)
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(areas) {
      console.log("areas ", areas);
    },
    // The second callback function will be invoked when you reject
    function(areas) {
      console.log("areaData call fucked up");
    }
  );
}

function attractionDataPrint(id){
  attractionData(id)
  .then(
  (data) => {
      printDiv.innerHTML = `<h2>AREA${id}</h2>`;
    //   console.log("attractions resolve data", data);
      Object.keys(data).forEach((item) =>{
                var index = (data[item]);
                console.log(index);
                if(index.area_id === id && index.hasOwnProperty('times')){
                    printDiv.innerHTML += `<div class=areaAttractions${id} id=${index.id}><h3>${index.name}</h3><ul><li>Times: ${index.times.join(' // ')}</li></ul></div>`;
                }else if(index.area_id === id){
                    printDiv.innerHTML += `<div class="area1" id=${index.id}><h3>${index.name}</h3></div>`;
                }
            });
  },
  ()=> {
      console.log('attractions data did not load');
  }
  );
}

function timeDataPrint(){
  timeDiv.timefunction();
}



  module.exports = {areaData, attractionData, printDiv};