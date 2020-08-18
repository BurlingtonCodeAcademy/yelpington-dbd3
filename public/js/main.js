
// Create Map //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

let myMap = L.map('map').setView([44.478166, -73.214242], 14.3) // L is leaflet object
let restLinks = document.getElementById('restLinks')

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap) // When copying from leaflet site, be careful that this variable is "myMap"





let marker = L.marker([44, -73])
marker.addTo(myMap)

marker.addEventListener('mouseover', () => {
    marker.openPopup()
})

marker.addEventListener('click', () => {
    window.open("https://www.w3schools.com") // This is the code for getting the restaurant websites
    marker.bindPopup('<h1> Or maybe you just need the right answers</h1>')
    marker.openPopup()
})


// This function retrieves the JSON objects, iterates over them, and adds the div class 'linkDiv' to the div class restLinks on index.html
async function getJsonThenPlaceMarkers() {
    fetch('https://yelpingtonapi.herokuapp.com/api/restaurants/').then((res) => res.json()).then(jsonObjs => {
        console.log(jsonObjs)
        for (let object of jsonObjs) {
            let restLink = `<div class="linkDiv"><a href = "/restaurant#${object.id}"> ${object.name}</a></div>`
            // let restLink = `<a href="restaurant#${object.id}><div class="linkDiv>${object.name}</div></a>`
            restLinks.innerHTML += restLink 
            placeMarker(object)
        }   
    })
}



// Placemarker takes a json object to perform multiple operations on it like add its address onto the map and get its website
function placeMarker(object) { 
    let array = [object.coords[0], object.coords[1]]
    let newMarker = L.marker(array)
    newMarker.addEventListener('click', () => {
        // MAKE SURE YOU CLEAR THE BODY
        window.open(`/restaurant.html#${object.id}`) 
        // Send url fragment designated by hash mark to represent the object using the object.id (joes-diner) to /restaurant#joes-diner

        // transfer into restaurant.html(restHTML)  // Transfers HTML into another HTML file using Javascript is something that React could use

    })
    newMarker.addTo(myMap)
    return newMarker
}



getJsonThenPlaceMarkers()


