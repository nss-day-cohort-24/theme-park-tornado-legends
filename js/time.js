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
               <p>Choose A Time</p>
           </option>
           <option value = "c">
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
// Finds The Current Time
function currentTime(){
    let d = new Date();
    
// Puts time in workable format
    let c = d.toLocaleTimeString();
    console.log(c);
    // Grabs only the hours
    h = d.getHours();
    return h;

}
currentTime();


// Retrieves the Firebase Data

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

// Compares the selected Time with each attraction times, then pushes matching times to a separate array.


function checkTime(checkHour){
  // h = currentTime;

  //  If the value of the select box is "current time", then the function will grab the current time and use it for the parameter
 
  if(userHour !== "c"){
    h = userHour;
  }

  

  
//   compares either the current hour or the selected hour to the attractions hour that we are currently examining
  if (h == checkHour){
    matchArea();
    console.log("yeaaaaaaaa buddddyyy",aId);

// If the times match then we push the associated names, times, and location to an array that we will print later on
    namesArray.push(aNames);

    indLocArray.push(timeLoc);

    indIdArray.push(aId);









  }
  printTimeData();
  }

//   The entire Function. Creates an array of arrays, then goes through each times and runs the checkTime function on each.
function timeFunction(){
currentTime();
namesArray = [];
attractionData()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      json_data.forEach((item)=>{
        // console.log("times,",item.times);
        // aTimes.push(item.times);
        
 // Runs through each attraction and determines if it has a "times" property
        if(item.hasOwnProperty("times")){
                        //   If it does then it pushes the times into an array of arrays called aTimes
              let aTimes = [];
                          // Additionally, stores the names, locations, and Id of those attractions into variables for later use
              aTimes.push(item.times);
              aNames = item.name;
              aLoc = item.area_id;
              aId = item.id;


// Some time properties have more than one time, so in order to grab each one, I loop through each array
              


                      for(let i=0;i < aTimes.length;i++){
                      let a = aTimes[i];
// Originally "a" will grab the first array to examine, then will continue through the rest of the arrays, 
// as the function runs and resets

                            for(let z=0;z<a.length;z++){
// To grab each time in the arrays, we do another loop through each individual array
                                        let a = aTimes[i];

                                        let indTime = a[z];
                                        indHr = indTime.substring(0, 2);
                                    // grab first two digits (the time) and if its a one digit hour, then it removes the colon
                                        if(indHr.includes(":")){
                                          indHr = indHr.slice(0, 1);
                                          // console.log("new indHr", indHr);
                                        }
                                        // converts it to military time
                                        if(a[z].includes("PM") && indHr !== "12"){
                                          indHr = parseInt(indHr);
                                          indHr = indHr + 12;
                                          indHr = indHr.toString();
                                      
                                        }
                                        // Runs the check time function for every single time that we examine
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

// Formats time header and then prints each attraction, and location according to selected time

function printTimeData() {
  h = parseInt(h);
// We present it in the format "hour - hour" so h2 is the second hour
  let h2 = h+1;
  let hdisp = h;
  let h2disp = h2;
  let pm ="am";
//   turns the time from military to standard
  if (h>12){
      hdisp = hdisp- 12;
  }
  if (h2>12){
      h2disp = h2disp - 12;
      pm = "pm";
  }
// This is the loop that prints all the content within the the arrays
  printDiv.innerHTML = `${timeHead}`;
  printDiv.innerHTML += `<h1>${hdisp}-${h2disp+pm}</h1>`;
    for (let q=0;q<namesArray.length;q++){
    let currentName = namesArray[q];
    let currentLoc = indLocArray[q];
    let currentId = indIdArray[q];
    // let currentLocation = locationArray[q];
    printDiv.innerHTML += `<h3 class="timeAttraction" id="${currentId}">${currentName}<br>`;
    printDiv.innerHTML += `(${currentLoc}</h3>)<br>`;

  }
}


// Determines selected hour and then runs the main timeFunction


function changeHour(){
userHour = document.getElementById("user-hour").value;
if (document.getElementById("user-hour").value == "c"){
    userHour = currentTime();
    console.log("currentTime", userHour);
}

timeFunction();


}

// Finds the appropriate name for each location associated with an attraction

function matchArea(){
for(let ar=0;ar<locationArray.length;ar++){
  let currentArea = locationArray[ar].id;
  if(aLoc == currentArea){
    timeLoc = locationArray[ar].name;

  }
}
   
}

// creates an array of area objects for use with finding correct area_id

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