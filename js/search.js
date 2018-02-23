"use strict";

let searchDisplay = [];
let searchNames;
let searchLoc;
let searchTerm = "Meet";
// document.getElementById("searchField").value;
let searchFooter = document.getElementById("footer-nav");
let printDiv = document.getElementById("print");

let inventory = [];

const searchHead = `
    <div class=".headerbkgsearch">
    <input id="searchField" type="text" value="enter query here..."></input>
    <br>
    <button class="btn" id="search-btn">search</button>
    </div>`;


function loadSearch() {
    console.log('search call');
    return new Promise((resolve, reject) => {
        var loader = new XMLHttpRequest();

        loader.addEventListener('load', function () {
            var jsonData = JSON.parse(this.responseText);
            resolve(jsonData);
        });
        loader.addEventListener('error', function () {
            reject();
        });
        loader.open("GET", `https://tornado-legends-theme-park.firebaseio.com/.json`);
        loader.send();
    });
}

loadSearch().then( 
    (json) => {
    
        for (var i = 0; i < json.attractions.length; i++){

            let currentSearch = json.attractions[i].name ;   
            if (currentSearch.includes(searchTerm)){
                searchDisplay.push(currentSearch);
                // console.log("search display", searchDisplay);
                printSearchData();
            }
        }
    },
    (reject) => {
        console.log("SOMETHING WENT REALLY WRONG");
    }
    // function searchData(data){
    //     let keys = Object.keys(data);
    //     keys.forEach((item) => {
    //         data[item].firebaseID = item;
    //         inventory.push(data[item]);
    //         console.log("inventory", inventory);
    //         search(searchTerm);
    //     });
    // }
);


function printSearchData() {
    printDiv.innerHTML = `${searchHead}`;
    for (let q = 0; q < searchDisplay.length; q++) {
        let currentName = searchDisplay[q];
        // let currentLocation = locationArray[q];
        printDiv.innerHTML += `${currentName}<br>`;



    }
}

// document.body.addEventListener('click', timeFunction, true);