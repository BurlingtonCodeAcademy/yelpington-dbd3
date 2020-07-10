let findHash = window.location.href.indexOf('#')
let getIdString = window.location.href.slice(findHash + 1)
let restInfo = document.getElementById('restInfo')
let myMap = L.map('map').setView([44, -73], 12) // L is leaflet object

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap) // When copying from leaflet site, be careful that this variable is "myMap"


async function getRestaruantInfo() {  
    fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${getIdString}`)
    .then((res) => res.json())
    .then(jsonObj => {
        console.log(jsonObj)
        restInfo.innerHTML += `<div>Name: ${jsonObj.name}</div>`
        restInfo.innerHTML += `<div>Address: ${jsonObj.address}</div>`
        restInfo.innerHTML += `<div>Website: <a href=${jsonObj.website}> Link </a></div>`
        restInfo.innerHTML += `<div>Category: ${jsonObj.category}</div>`
        restInfo.innerHTML += `<div>Hours: ${jsonObj.hours}</div>`
        restInfo.innerHTML += `<div>Phone: ${jsonObj.phone}</div>`
        
        let coordsArr = [jsonObj.coords[0], jsonObj.coords[1]]
        let newMarker = L.marker(coordsArr)
        newMarker.addTo(myMap)
        myMap.setView(coordsArr)
    })
}

function placeMarker(coords) { // Placemarker takes a json object to perform multiple operations on it like add its address onto the map and get its website
    let array = [coords[0], coords[1]]
    let newMarker = L.marker(array)
    newMarker.addTo(myMap)
    return newMarker
}



getRestaruantInfo()
console.log(window.location)
console.log(getIdString)



