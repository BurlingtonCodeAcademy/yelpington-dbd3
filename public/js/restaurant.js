let findHash = window.location.href.indexOf('#')
let getIdString = window.location.href.slice(findHash + 1)
let restInfo = document.getElementById('restInfo')
let restInfoRightColumn = document.getElementById('restInfoRightColumn')


async function getRestaruantInfo() {
    fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${getIdString}`)
        .then((res) => res.json())
        .then(jsonObj => {
            console.log(jsonObj)
            restInfoRightColumn.innerHTML += `<div>Name: ${jsonObj.name}</div>`
            restInfoRightColumn.innerHTML += `<div>Address: ${jsonObj.address}</div>`
            restInfoRightColumn.innerHTML += `<div>Website: <a href=${jsonObj.website}> Link </a></div>`
            restInfoRightColumn.innerHTML += `<div>Category: ${jsonObj.category}</div>`
            restInfoRightColumn.innerHTML += `<div>Hours: ${jsonObj.hours}</div>`
            restInfoRightColumn.innerHTML += `<div>Phone: ${jsonObj.phone}</div>`

            
            let coordsArr = [jsonObj.coords[0], jsonObj.coords[1]]
            let newMarker = L.marker(coordsArr)
            

            let myMap = L.map('map').setView(coordsArr, 16) // L is leaflet object
            L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 17,
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            }).addTo(myMap) // When copying from leaflet site, be careful that this variable is "myMap"

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



