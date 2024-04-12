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