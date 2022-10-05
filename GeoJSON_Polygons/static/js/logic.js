// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base a layer that holds both maps
let baseMaps = {
    "Satellite Streets": satelliteStreets,
    Streets: streets
};

// Create the map object with a center of Earth and zoom level
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 11,
    layers: [satelliteStreets]
});

//Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Accessing airport GeoJSIN URL
let torontoNeighborhood = "https://raw.githubusercontent.com/Tracari/Mapping_Earthquakes/main/torontoNeighborhoods.json"

// Grabbing our GeoJSON data
d3.json(torontoNeighborhood).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data, {
        color: "#ffffa1",
        weight: 2,
        onEachFeature: function(feature,layer) {
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3><hr><h3> Destination:"
            + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});