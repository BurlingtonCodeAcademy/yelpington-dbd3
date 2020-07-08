let findHash = window.location.href.indexOf('#')
let getIdString = window.location.href.slice(findHash + 1)
let restInfo = document.getElementById('restInfo')

async function getRestaruantInfo() {  
    fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${getIdString}`)
    .then((res) => res.json())
    .then(jsonObj => {
        console.log(jsonObj)
        restInfo.innerHTML += `<div>Name: ${jsonObj.name}</div>`
        restInfo.innerHTML += `<div>Address: ${jsonObj.address}</div>`
        restInfo.innerHTML += `<div>Website: <a href=${jsonObj.webiste}> Link </a></div>`
        restInfo.innerHTML += `<div>Category: ${jsonObj.category}</div>`
        restInfo.innerHTML += `<div>Hours: ${jsonObj.hours}</div>`
        restInfo.innerHTML += `<div>Phone: ${jsonObj.phone}</div>`
        
    })
}

getRestaruantInfo()
console.log(window.location)
console.log(getIdString)