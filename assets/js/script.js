//default map position
let map = L.map('map').setView([40, -95], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//marker pin
const breweryIcon = {
    iconUrl: './assets/js/Brewery.png',
    iconSize: [40, 50]
}

const locationsIcon = {
    iconUrl: './assets/js/searchBeer.png',
    iconSize: [60, 70]
}

const searchIcon = L.icon(locationsIcon)
const beerIcon = L.icon(breweryIcon)

const breweryOptions = {
    icon: beerIcon
}

const searchOptions = {
    icon: searchIcon
}

//leaflet search
// L.Control.geocoder().addTo(map);
const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
})
    .on('markgeocode', function (e) {
        layerGroup.clearLayers();
        console.log(e.lat, e.lon)
        marker = L.marker([20,20], searchOptions).addTo(map) //insert coords
    })
    .addTo(map);
let marker = L.marker([40, -95], searchOptions).addTo(map)

let popup = L.popup()
    .setLatLng([40.7, -74])
    .setContent('test popup')
    .openOn(map)

// function to display a popup with content in it
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map)
    console.log(popup)
}
//latlng.lat latlng.lng
//event listener for clicking map
map.on('click', onMapClick);

let brewArray = []


//brewery info 
const breweryList = document.getElementById('brewery-list')
const pages = prompt('# of pages')
const latInput = $('lat')
const lngInput = $('lng')
const brewName = $('brewery-name')
const brewType = $('brewery-type')
const brewPhone = $('brewery-phone')
const brewAdd = $('brewery-address')
const search = prompt('enter city')

const multiBrew = `https://api.openbrewerydb.org/v1/breweries?per_page=${pages}`
const bySearch = `https://api.openbrewerydb.org/v1/breweries/search?query=${search}`
const byDistance = `https://api.openbrewerydb.org/v1/breweries?by_dist=${latInput},${lngInput}&per_page=${pages}`

function getAndSetBreweryLocation() {
    fetch(byDistance, {
        method: 'GET'
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                displayBrew(data[i])
                displayText(data[i])
                brewArray.push(data[i])
            }
        })
}

//searches for an address with the city name in it
const nominatimSearch = 'https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q='

function addressLookUp() {
    fetch(nominatimSearch + search, {
        method: 'GET'
    })
}

let layerGroup = L.layerGroup().addTo(map)

function displayBrew(data) {
    map.closePopup();
    marker = L.marker([data.latitude, data.longitude], breweryOptions).addTo(layerGroup) //insert coords
    marker.bindPopup(`<p>${data.name}<br /> ${data.brewery_type} <br /> ${data.phone}</p>`).openPopup
    // marker.on('click', onMarkerClick)
}

$('form').on('submit', function (event) {
    event.preventDefault();
    layerGroup.clearLayers();
    getAndSetBreweryLocation();
    addressLookUp()
})

function displayText(data) {
    let breweryName = data.name
    return breweryName
}

// function onMarkerClick(e) {
//     console.log(brewArray)
//     let brewery = e.latlng.lat
//     console.log(brewArray.filter(JSON.stringify(brewery)))
// }

//event listener for clicking map
map.on('click', onMapClick);

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
