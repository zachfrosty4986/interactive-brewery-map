//default map position
let map = L.map('map').setView([40.7, -74], 13);

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
}

//event listener for clicking map
map.on('click', onMapClick);