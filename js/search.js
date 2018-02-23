"use strict";

let searchDisplay = [];
let searchNames;
let searchLoc;
let searchTerm;
let searchFooter = document.getElementById("footer-nav");
let printDiv = document.getElementById("print");
let searchButton = document.getElementById("search-btn");

let inventory = [];

const searchHead = `
<div class=".headerbkgsearch">
<input id="searchField" type="text" prototype="enter here"></input>
<br>
<button class="btn" id="search-btn">search</button>
</div>`;

function grabData(){
    searchTerm = document.getElementById("searchField").value;

}

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
    loadSearch().then( 
        (json) => {
        
            for (var i = 0; i < json.attractions.length; i++){
                console.log("search term", searchTerm);
                grabData();
                let currentSearch = json.attractions[i].name ;   
                if (currentSearch.includes(searchTerm)){
                    searchDisplay.push(currentSearch);
                    // console.log("search display", searchDisplay);
                }
            }
        },
        (reject) => {
            console.log("SOMETHING WENT REALLY WRONG");
        }

    );
}
function populate() {
    for (let q = 0; q < searchDisplay.length; q++) {
        let currentName = searchDisplay[q];
        // let currentLocation = locationArray[q];
        printDiv.innerHTML += `${currentName}<br>`;  
    } 
}

function printSearchData() {
    printDiv.innerHTML = `${searchHead}`;

}

printSearchData();


// searchButton.addEventListener("click", grabData());