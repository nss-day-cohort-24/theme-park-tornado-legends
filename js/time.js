"use strict";


let h;
let indHr;
let aNames;
let namesArray = [];
let printDiv = document.getElementById("print");

function currentTime(){
    let d = new Date();
    let c = d.toLocaleTimeString();
    console.log(c);
    h = d.getHours();
    // console.log("hours",h);
    // return h;
}
currentTime();
function attractionData(){
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
    loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/attractions.json`);
    loader.send();
  });
}

function checkTime(){
  // h = currentTime;
  console.log(h);
  console.log(indHr);
  if (h == indHr){

    console.log("yeaaaaaaaa buddddyyy");

    console.log("a",aNames);

    namesArray.push(aNames);

    console.log(namesArray);

    printTimeData();



  }
  }
function timeFunction(){

attractionData()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      json_data.forEach((item)=>{
        // console.log("times,",item.times);
        // aTimes.push(item.times);
        if(item.hasOwnProperty("times")){
              let aTimes = [];
              aTimes.push(item.times);
              aNames = item.name;

                      for(let i=0;i < aTimes.length;i++){
                      let a = aTimes[i];

                // console.log(aTimes);
                            // console.log("getFuckked",aTimes[i]);
                            for(let z=0;z<a.length;z++){
                                        // console.log("individual time",a[z]);
                                        let a = aTimes[i];
                                        let indTime = a[z];
                                        indHr = indTime.substring(0, 2);

                                        if(indHr.includes(":")){
                                          indHr = indHr.slice(0, 1);
                                          // console.log("new indHr", indHr);
                                        }
                                        if(a[z].includes("PM") && indHr !== "12"){
                                          indHr = parseInt(indHr);
                                          indHr = indHr + 12;
                                          indHr = indHr.toString();
                                      
                                        }
                                    // console.log("indHr",indHr);
                                    // return indHr;
                                    checkTime();
                                    
                            }

                      }
        }
        // let aTimes = item.times;
        // console.log(aTimes);
        // for (let i=0;i < aTimes.length;i++){
        //     console.log("bitch please");
        // }
      });
       console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );
}


function printTimeData() {
  printDiv.innerHTML = `<h1>Current time</h1>`;
    for (let q=0;q<namesArray.length;q++){
    let currentName = namesArray[q];
    printDiv.innerHTML += `${currentName}<br>`;

  }
}




// console.log("this is working bitchh",currentTime());

// checkTime();
timeFunction();
// checkTime();
module.exports = {currentTime, attractionData, checkTime, timeFunction, namesArray};