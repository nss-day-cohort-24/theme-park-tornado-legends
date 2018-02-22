"use strict";

function currentTime(){
    let d = new Date();
    let c = d.toLocaleTimeString();
    console.log(c);
    let h = d.getHours();
    console.log("hours",h);
}

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

attractionData()
  // Then gets executed when promise is resolved or rejected
  .then(
    // The first callback function will be invoked when you resolve
    function(json_data) {
      json_data.forEach((item)=>{
        // console.log("times,",item.times);
        var container = document.getElementById("container");
        // aTimes.push(item.times);
        if(item.hasOwnProperty("times")){
              let aTimes = [];
              aTimes.push(item.times);

                      for(let i=0;i < aTimes.length;i++){
                      let a = aTimes[i];

                // console.log(aTimes);
                            console.log("getFuckked",aTimes[i]);
                            for(let z=0;z<a.length;z++){
                                        console.log("individual time",a[z]);
                                        // let a = aTimes[i];
                                        // let hr = a.substring(1, 2);

                            }
                            // console.log(hr);
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




currentTime();

module.exports = {currentTime, attractionData};