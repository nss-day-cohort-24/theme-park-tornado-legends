"use strict";


// REQUIRES
let printer = require("./print");
let fetchData = require("./fetch");


// VARAIBLES
let areaData = fetchData.areaData; 
let attractionData = fetchData.attractionData;
let attractionDetails =fetchData.attractionDetails;
let areas = fetchData.areas;
let areasList;
let attractionsList;
let areasListIndex;
let attractionsListIndex;
let printDiv = document.getElementById('print');


// let id = 4;
let counter = 5;
let areasListCounter = 1;
let backToAreas;
let printHeader = true;



// Print areas to the page after splash page is clicked on. 
function areasPrint(){
  printDiv.innerHTML = ``;
  areas()
    .then(
      function(areas) {
        areasList = areas;
        console.log("areas list ", areasList);
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


// Print attractions on "back" button from Attraction Details Page
function attractionDataPrint(id){
  attractionData(id)
  .then(
  (attractions) => {

    for( var i = 0; i < areasList.length; i++){
      var index = areasList[i];
        if(id === index.id){
          printDiv.innerHTML = `<h2>${index.name}</h2>`;
        }
      }
    
      // printDiv.innerHTML = `<h2 id="${id}">AREA ${id}</h2>`;
      printDiv.innerHTML = `<div class="area-img${id}-div"><h2 id="${id}">AREA ${id}</h2><button id="backToAreas">&#x25C0; back</button></div>`;
      // console.log("attractions resolve data", data);
      // printDiv.innerHTML += `<button id="backToAreas">&#x25C0; back</button>`;
      console.log("attractions resolve data", attractions);

      Object.keys(attractions).forEach((item) =>{
                var index = (attractions[item]);
                // console.log(index);
                if(index.area_id === id && index.hasOwnProperty('times')){
                    printDiv.innerHTML += `<div class="bkgrnd-color-${id}"><h3 class= "areaAttraction" id=${index.id}>${index.name}</h3><ul><li>Times: ${index.times.join(' // ')}</li></ul></div>`;
                }else if(index.area_id === id){
                    printDiv.innerHTML += `<div class="bkgrnd-color-${id}"><h3 class= "areaAttraction" id=${index.id}>${index.name}</h3></div>`;
                }
            });
  },
  ()=> {
      console.log('attractions data did not load');
  }
  );
}

// After an area has been chosen, this function is ran to show
// the details of the chosen attraction within area. 
function attractionDetailsPrint(id){
  console.log('attraction details print function');
  attractionDetails(id)
    .then(
      function(attractions) {
        console.log("attractions data", attractions);
        Object.keys(attractions).forEach((item)=>{
          var index = (attractions[item]);
          console.log("ID parameter", id);
          console.log("index ID", index.id);
          if(index.id == id){
            if(index.hasOwnProperty('times')){
              printDiv.innerHTML = `<div id="attractions-bkgnd-color-${index.area_id}"><h2 id=${index.area_id}>${index.name}</h2><button class="backToAttractions" id=${index.area_id}>&#x25C0; back</button></div>`;
              // printDiv.innerHTML += `<button class="backToAttractions" id=${index.area_id}>&#x25C0; back</button>`;
              printDiv.innerHTML += `<div id="details-bkgnd-color-${index.area_id}"><h3 class="attractionDetails-${index.area_id}">${index.description}</h3><ul><li>Times: ${index.times.join(' // ')}</li></div>`;
              // printDiv.innerHTML += `<ul><li>Times: ${index.times.join(' // ')}</li>`;
            }else{
              printDiv.innerHTML = `<div id="attractions-bkgnd-color-${index.area_id}"><h2 id=${index.area_id}>${index.name}</h2><button class="backToAttractions" id=${index.area_id}>&#x25C0; back</button></div>`;
              // printDiv.innerHTML += `<button class="backToAttractions" id=${index.area_id}>&#x25C0; back</button>`;
              printDiv.innerHTML += `<div id="details-bkgnd-color-${index.area_id}"><h3 class="attractionDetails-${index.area_id}">${index.description}</h3></div>`;
            }
          }
        });
      },
      function(areas) {
        console.log("attractionsDetails call fucked up");
      }
    );
  }


  // Function to print attractions based on current time. 
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
                printDiv.innerHTML = `<div id="attractions-bkgnd-color-${index.area_id}"><h2 id=${index.area_id}>${index.name}</h2><button class="backToTime" id=${index.area_id}>&#x25C0; back</button></div>`;
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


  module.exports = {printDiv, areasPrint, attractionDataPrint, attractionDetailsPrint,attractionDetailsTimePrint,};