//default map position
let map = L.map('map').setView([0, 0], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// circle to search area for breweries
let circle = L.circle([40.7, -74], {
    color: 'blue',
    fillColor: '#f01',
    fillOpacity: 0.1,
    radius: 500,
}).addTo(map);

//marker pin
let marker = L.marker([40.7, -74]).addTo(map)

//popup for brewery name
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

//event listener for clicking map
map.on('click', onMapClick);

//brewery info 
const breweryList = document.getElementById('brewerylist')
const pages = prompt('# of pages')
const lat = prompt('lat')
const lng = prompt('lng')
const search = prompt('search')

const multiBrew = `https://api.openbrewerydb.org/v1/breweries?per_page=${pages}`
const bySearch = `https://api.openbrewerydb.org/v1/breweries/search?query=${search}`
const byDistance = `https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${lng}&per_page=${pages}`
let options = {
    method: "GET"
}

fetch(multiBrew, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name)
            document.createElement('li')
            $('<li>').text(data[i].name)
            $('brewerylist').append($('<li>'))
        }
    })

// let layerGroup = L.layerGroup().addto(map)

// function displayBrew() {
//     layerGroup.clearLayers();
//     map.closePopup();
//     marker1 = L.marker([#,#]).addTo(layerGroup) //insert coords
//     marker1.bindPopup('test').openPopup
//     marker2 = L.marker([#,#]).addTo(layerGroup)
//     marker2.bindPopup('test2').openPopup
//     marker3 = L.marker([#,#]).addTo(layerGroup)
//     marker3.bindPopup('test3').openPopup
// }
