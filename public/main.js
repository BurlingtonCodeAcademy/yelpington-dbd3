let myMap = L.map('map').setView([44, -73], 12) // L is leaflet object
let restLinks = document.getElementById('restLinks')

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap) // When copying from leaflet site, be careful that this variable is "myMap"





let marker = L.marker([44, -73])
// marker.bindPopup('<h4>It\'s time to start asking the right questions</h4>')
marker.addTo(myMap)

marker.addEventListener('mouseover', () => {
    marker.openPopup()
})

marker.addEventListener('click', () => {
    window.open("https://www.w3schools.com") // This is the code for getting the restaurant websites
    marker.bindPopup('<h1> Or maybe you just need the right answers</h1>')
    marker.openPopup()
})
// async function getLatLong(address) { // This function was changed to placemarker because it's hard to get a value out of a promise, promises return promises so you can't use a promise as a value
//     let urlAddress = encodeURI(address)
//     let latLngArr = []
//     let latLng = await fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`).then((res) => res.json()).then(json => {
//         latLngArr.push(json[0].lat, json[1].lon) // nominatim returns a json collection, not a single json object
//     })

//     return latLngArr
// }
// let latLng = getLatLong()


async function getJsonThenPlaceMarkers() {
    fetch('https://yelpingtonapi.herokuapp.com/api/restaurants/').then((res) => res.json()).then(jsonObjs => {
        console.log(jsonObjs)
        for (let object of jsonObjs) {
            fetch(object.infoUrl)
                .then((res) => res.json())
                .then(restData => {
                    console.log(restData)
                    // let restLink = `<div><a href=${object.infoUrl}>${object.id}</a> </div>`
                    let restLink = `<div><a href = "/restaurant.html#${restData.id}"> ${restData.name}</a></div>`
                    restLinks.innerHTML += restLink //
                    placeMarker(restData.coords)
                })
            // placeMarker(object)
        }
    })
}



function placeMarker(coords) { // Placemarker takes a json object to perform multiple operations on it like add its address onto the map and get its website
    
    //     newMarker.addEventListener('click', () => {
    //         // MAKE SURE YOU CLEAR THE BODY
    //         window.open("/restaurant") // Needs to link to a route, not a file. The server handles the file, not the clientside JS
    //         // Send url fragment designated by hash mark to represent the object using the object.id (joes-diner) to /restaurant#joes-diner

    //         // transfer into restaurant.html(restHTML)  // Transfers HTML into another HTML file using Javascript is something that React could use
    //         // window.open("restaurant.html")            

    // })
    let array = [coords[0], coords[1]]
    let newMarker = L.marker(array)
    newMarker.addTo(myMap)
    return newMarker
}



getJsonThenPlaceMarkers()


// Event lister for marker

// placeMarker('ripton, vt')

// async function sayCoords(){
//     await getLatLong('1250 maston hill red. granville, vt')
//     console.log(latLngArr)
// }