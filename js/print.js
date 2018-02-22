"use strict";

let fetchData = require("./fetch");
let areaData = fetchData.areaData; 
let attractionData = fetchData.attractionData;
let areas = fetchData.areas;
let printDiv = document.getElementById('print');
// let id = 4;
// let counter = 1;



// Areas By ID
function areasPrint(){
  areas()
    .then(
      function(areas) {
        console.log("areas ", areas);
        Object.keys(areas).forEach((item)=>{
          var index = (areas[item]);
        });
      },
      function(areas) {
        console.log("areas call fucked up");
      }
    );
  }


// Areas By ID
function areaDataPrint(id){
areaData(id)
  .then(
    function(areas) {
      console.log("areas ", areas);
    },
    // The second callback function will be invoked when you reject
    function(areas) {
      console.log("areaData call fucked up");
    }
  );
}


// ATTRACTIONS BY ID 
function attractionDataPrint(id){
  attractionData(id)
  .then(
  (data) => {
      printDiv.innerHTML = `<h2>AREA${id}</h2>`;
      // console.log("attractions resolve data", data);
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



  module.exports = {areaData, attractionData, printDiv, areasPrint};