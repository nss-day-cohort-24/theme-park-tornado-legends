"use strict";

let searchDisplay = [];
let searchNames;
let searchLoc;
let searchTerm;
let searchFooter = document.getElementById("footer-nav");
let printDiv = document.getElementById("print");
let searchButton = document.getElementById("search-btn");
let currentName;

let inventory = [];

const searchHead = `
<div class=".headerbkgsearch">
<input id="searchField" type="text" prototype="enter here"></input>
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

function onEnter(){
    searchTerm = document.getElementById("searchField").value;
    
    loadSearch().then( 
        (json) => {
            let currentSearch;
            let currentSearchId;
            let currentSearchArea;
            for (var i = 0; i < json.attractions.length; i++){
                currentSearch = json.attractions[i].name;
                currentSearchId = json.attractions[i].id;  
                currentSearchArea = json.attractions[i].area_id;
                if (currentSearch.includes(searchTerm)){
                    console.log("match", currentSearch);
                    printDiv.innerHTML += `<li id="${currentSearchId}" class="areaAttraction"><h3>${currentSearch}</h3><br><p>${currentSearchArea}</p></li>`;
                }
            }
        },
        (reject) => {
            console.log("SOMETHING WENT REALLY WRONG");
        }

    );
}

// function populate() {
//     for (let q = 0; q < searchDisplay.length; q++) {
//         currentName = searchDisplay[q];
//         // let currentLocation = locationArray[q];
//     } 
//     printDiv.innerHTML += `${currentName}<br>`;  
// }

function printSearchData() {
    printDiv.innerHTML = `${searchHead}`;

}


// searchButton.addEventListener("click", grabData());

module.exports = {printSearchData, onEnter};