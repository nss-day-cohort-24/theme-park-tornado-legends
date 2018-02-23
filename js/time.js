"use strict";


let h;
let indHr;
let aNames;
let aLoc;
let namesArray = [];
let locationArray = [];
let indLocArray = [];
let printDiv = document.getElementById("print");
let userHour = "c";
let grab = require("./fetch");
let timeLoc;
let aId;
let indIdArray = [];
let timeHead = `
<div class="header-bkg">
   <div class="select">
       <select id="user-hour">
           <option>
               <p>Current Time</p>
           </option>
           <option value="9">
               <a href="#">
                   <p>9:00 am - 10:00 am</p>
               </a>
           </option>
           <option value="10">
               <a href="#">
                   <p>10:00 am - 11:00 am</p>
               </a>
           </option>
           <option value="11">
               <a href="#">
                   <p>11:00 am - 12:00 pm</p>
               </a>
           </option>
           <option value = "12">
               <a href="#">
                   <p>12:00 pm - 1:00 pm</p>
               </a>
           </option>
           <option value = "13">
               <a href="#">
                   <p>1:00 pm - 2:00 pm</p>
               </a>
           </option>
           <option value="14">
               <a href="#">
                   <p>2:00 pm - 3:00 pm</p>
               </a>
           </option>
           <option value="15">
               <a href="#">
                   <p>3:00 pm - 4:00 pm</p>
               </a>
           </option>
           <option value="16">
               <a href="#">
                   <p>4:00 pm - 5:00 pm</p>
               </a>
           </option>
           <option value="17">
               <a href="#">
                   <p>5:00 pm - 6:00 pm</p>
               </a>
           </option>
           <option value="18">
               <a href="#">
                   <p>6:00 pm - 7:00 pm</p>
               </a>
           </option>
           <option value="19">
               <a href="#">
                   <p>7:00 pm - 8:00 pm</p>
               </a>
           </option>
           <option value="20">
               <a href="#">
                   <p>8:00 pm - 9:00 pm</p>
               </a>
           </option>
           <option value="21">
               <a href="#">
                   <p>9:00 pm - 10:00 pm</p>
               </a>
           </option>
           <option value="22">
               <a href="#">
                   <p>10:00 pm - 11:00 pm</p>
               </a>
           </option>
           <option value="23">
               <a href="#">
                   <p>11:00 pm - 12:00 pm</p>
               </a>
           </option>
       </select>
       <div class="select_arrow">
       </div>
   </div>
</div>`;

function currentTime(){
    let d = new Date();
    let c = d.toLocaleTimeString();
    console.log(c);
    h = d.getHours();

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


function checkTime(checkHour){
  // h = currentTime;

 
  if(userHour !== "c"){
    h = userHour;
  }
  console.log(h);
  if (h == checkHour){
    matchArea();
    console.log("yeaaaaaaaa buddddyyy",aId);


    namesArray.push(aNames);

    indLocArray.push(timeLoc);

    indIdArray.push(aId);









  }
  printTimeData();
  }
function timeFunction(){

namesArray = [];
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
              aLoc = item.area_id;
              aId = item.id;



              


                      for(let i=0;i < aTimes.length;i++){
                      let a = aTimes[i];


                            for(let z=0;z<a.length;z++){

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
                                    checkTime(indHr);
                                    
                            }

                      }
        }
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
  h = parseInt(h);
  let pm = "am";
  if(h>12){
    h=h-12;
    pm="pm";
  }
  printDiv.innerHTML = `${timeHead}`;
  printDiv.innerHTML += `<h1>${h}-${h+1+pm}</h1>`;
    for (let q=0;q<namesArray.length;q++){
    let currentName = namesArray[q];
    let currentLoc = indLocArray[q];
    let currentId = indIdArray[q];
    // let currentLocation = locationArray[q];
    printDiv.innerHTML += `<h3><div className="areaAttraction" id="${currentId}">${currentName}</div><br>`;
    printDiv.innerHTML += `(${currentLoc}</h3>)<br>`;

  }
}



function changeHour(){
userHour = document.getElementById("user-hour").value;

timeFunction();
userHour = document.getElementById("user-hour").value;

}

function matchArea(){
for(let ar=0;ar<locationArray.length;ar++){
  let currentArea = locationArray[ar].id;
  if(aLoc == currentArea){
    timeLoc = locationArray[ar].name;

  }
}
   
}


function fillArea(){
// ATTRACTIONS BY ID PROMISE
grab.areas()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      json_data.forEach((item)=>{
        locationArray.push(item);
      });
      // console.log("array",locationArray);
      //  console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );
}


// console.log(timeHead);

// THIS IS THE ENTIRE FUNCTION! IT WILL WORK WHEN YOU UNCOMMENT IT!

// timeFunction();

// document.body.addEventListener('keypress', timeFunction, true); 


fillArea();
// document.body.addEventListener('keypress', timeFunction, true);
window.addEventListener("change", changeHour);

module.exports = {currentTime, attractionData, checkTime, timeFunction, namesArray, timeHead,fillArea};