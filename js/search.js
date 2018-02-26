"use strict";

let searchTerm;
let searchFooter = document.getElementById("footer-nav");
let printDiv = document.getElementById("print");
let searchButton = document.getElementById("search-btn");

const searchHead = `
    <div class="headerbkgsearch">
    <input id="searchField" type="text"></input>
    <br>
    <button class="btn" id="search-btn">search</button>
    </div>`;

// grabs the firebase data, creates a promise and XMLHttpRequest and passes along the json data
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

// sent here either by interaction.js when the search key is pressed or by enterBtn function to run the loadSearch function

// this grabs the data from the resolve, which is the full firebase and loops through the attractions - if the search term is included in the attraction it's printed to the div 
function onEnter(){
    searchTerm = document.getElementById("searchField").value;
    printDiv.innerHTML = `${searchHead}`;
    
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
                    printDiv.innerHTML += `<li><h3 id="${currentSearchId}" class="areaAttraction">${currentSearch}</h3><br><p>Area ${currentSearchArea}</p></li>`;
                }
            }
        },
        (reject) => {
            console.log("SOMETHING WENT REALLY WRONG");
        }
    );
}

// interaction.js sends you here first to display the search header
function printSearchData() {
    printDiv.innerHTML = `${searchHead}`;
}

// interaction.js send you here when you press your enter key in the search field
function enterBtn(event) {
    console.log("working");
        if (event.keyCode === 13) {
            console.log("INSIDE THE THING");
            onEnter();
        }
}


module.exports = {enterBtn, printSearchData, onEnter};