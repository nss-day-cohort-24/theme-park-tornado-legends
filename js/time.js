"use strict";


let h;
let indHr;
let aNames;
let namesArray = [];
let printDiv = document.getElementById("print");
let timeHead = `
<div class="header-bkg">
   <div class="select">
       <select>
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
           <option value="14>
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
  console.log("indHr checkTime", indHr);
  if (h == indHr){

    console.log("yeaaaaaaaa buddddyyy");

    console.log("a",aNames);

    namesArray.push(aNames);

    console.log(namesArray);

    printTimeData();



  }
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
                                    checkTime();
                                    
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
  printDiv.innerHTML = `${timeHead}`;
  printDiv.innerHTML += `<h1>Current time</h1>`;
    for (let q=0;q<namesArray.length;q++){
    let currentName = namesArray[q];
    printDiv.innerHTML += `${currentName}<br>`;

  }
}




// console.log(timeHead);

// THIS IS THE ENTIRE FUNCTION! IT WILL WORK WHEN YOU UNCOMMENT IT!
timeFunction();

document.body.addEventListener('mousewheel', timeFunction, true); 

module.exports = {currentTime, attractionData, checkTime, timeFunction, namesArray, timeHead};