"use strict";

function attractionData(id){
    console.log('get attraction call');
  return new Promise((resolve,reject) => {
    var loader = new XMLHttpRequest();
    
    loader.addEventListener('load', function(){
      var attractionList = JSON.parse(this.responseText);
      resolve(attractionList);
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
        console.log(item.name);
      });
       console.log("API call successful and responded with", json_data);
    },
    // The second callback function will be invoked when you reject
    function(json_data) {
      console.log("API call not successful");
    }
  );

module.exports = {attractionData};