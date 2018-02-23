"use strict";


// REQUIRES
let printer = require("./print");
let fetchData = require("./fetch");


// VARAIBLES
let areaData = fetchData.areaData; 
let attractionData = fetchData.attractionData;
let attractionDetails =fetchData.attractionDetails;
let areas = fetchData.areas;
let printDiv = document.getElementById('print');
let backToAreas;


// Areas 
function areasPrint(){
  printDiv.innerHTML = `<h2>AREAS</h2>`;
  areas()
    .then(
      function(areas) {
        console.log("areas ", areas);
        Object.keys(areas).forEach((item)=>{
          var index = (areas[item]);
          console.log(index.id);
          printDiv.innerHTML+= `<img src=../images/map_${index.id}.png class="areaMap" id=${index.id}>`;
        });
      },
      function(areas) {
        console.log("areas call fucked up");
      }
    );
  }


// Attractions 
function attractionDataPrint(id){
  attractionData(id)
  .then(
  (attractions) => {
      printDiv.innerHTML = `<h2>AREA${id}</h2>`;
      printDiv.innerHTML += `<h4 id="backToAreas">Back</h4>`;
      // console.log("attractions resolve data", data);
      Object.keys(attractions).forEach((item) =>{
                var index = (attractions[item]);
                // console.log(index);
                if(index.area_id === id && index.hasOwnProperty('times')){
                    printDiv.innerHTML += `<div><h3 class= "areaAttraction" id=${index.id}>${index.name}</h3><ul><li>Times: ${index.times.join(' // ')}</li></ul></div>`;
                }else if(index.area_id === id){
                    printDiv.innerHTML += `<div><h3 class= "areaAttraction" id=${index.id}>${index.name}</h3></div>`;
                }
            });
  },
  ()=> {
      console.log('attractions data did not load');
  }
  );
}

//Attraction Details
function attractionDetailsPrint(id){
  console.log('attraction details print function');
  attractionDetails(id)
    .then(
      function(attractions) {
        Object.keys(attractions).forEach((item)=>{
          var index = (attractions[item]);
          if(id == index.id){
            console.log(index.name);
            console.log(index.description);
            if(index.hasOwnProperty('times')){
              printDiv.innerHTML = `<h2>${index.name}</h2>`;
              printDiv.innerHTML += `<h4 class="backToAttractions" id=${index.area_id}>Back</h4>`;
              printDiv.innerHTML += `<h3 class="attractionDetails">${index.description}</h3>`;
              printDiv.innerHTML += `<ul><li>Times: ${index.times.join(' // ')}</li>`;
            }else{
              printDiv.innerHTML = `<h2>${index.name}</h2>`;
              printDiv.innerHTML += `<h4 class="backToAttractions" id=${index.area_id}>Back</h4>`;
              printDiv.innerHTML += `<h3 class="attractionDetails">${index.description}</h3>`;
            }
          }
        });
      },
      function(areas) {
        console.log("attractionsDetails call fucked up");
      }
    );
  }

  function attractionDetailsTimePrint(id){
    console.log('attraction details print function');
    attractionDetails(id)
      .then(
        function(attractions) {
          Object.keys(attractions).forEach((item)=>{
            var index = (attractions[item]);
            if(id == index.id){
              console.log(index.name);
              console.log(index.description);
              if(index.hasOwnProperty('times')){
                printDiv.innerHTML = `<h2>${index.name}</h2>`;
                printDiv.innerHTML += `<h4 class="backToTime" id=${index.area_id}>Back</h4>`;
                printDiv.innerHTML += `<h3 class="attractionDetails">${index.description}</h3>`;
                printDiv.innerHTML += `<ul><li>Times: ${index.times.join(' // ')}</li>`;
              }else{
                printDiv.innerHTML = `<h2>${index.name}</h2>`;
                printDiv.innerHTML += `<h4 class="backToAttractions" id=${index.area_id}>Back</h4>`;
                printDiv.innerHTML += `<h3 class="attractionDetails">${index.description}</h3>`;
              }
            }
          });
        },
        function(areas) {
          console.log("attractionsDetails call fucked up");
        }
      );
    }


  module.exports = {printDiv, areasPrint, attractionDataPrint, attractionDetailsPrint,attractionDetailsTimePrint};