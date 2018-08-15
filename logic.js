// api endpoint 
var queryurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// execute GET request on queryurl 
d3.json(queryurl, function(data){
    createFeatures(data.features);
});
var mag = L.geoJSON(earthquakeData, {
     pointToLayer: function(feature, latlng){
        return new L.circle(latlng, {
            radius: circleMag(feature.properties.mag),
            fillColor: colorBins(feature.properties.mag),
            fillOpacity: .7,
            stroke: true,                
            color: "black",
            weight: .5
        })
    }
});

function colorBins(c) {
    return c > 5 ? '#CC6600':
           c > 4 ? '#CC6600':
           c > 3 ? '#CC9900':
           c > 2 ? '#CCCC00':
           c > 1 ? '#00FF66':
                    '#FFEDA0';  
};

function circleMag(value){
    return value * 5000
}

function createFeatures(earthquakeData){
    function onEachFeature(feature, layer){
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"+ "<hr><p>Magnitude</p>" + feature.properties.mag);
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
         
    });

    createMap(earthquakes);
}


function createMap(earthquakes) {
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    }); 
    var baseLayers = {
        "Street Map": streetmap, 
        "Dark Map": darkmap, 
        "Satellite": satellitemap
    };
    var overlays = {
        EarthQuakes: earthquakes
    };
    var myMap = L.map('map', {
        zoom: 13, 
        center: [45.52, -122.67]
    });
    L.control.layers(baseLayers, overlays, {
        collapsed: false
    }).addTo(myMap);
    L.control.scale(maxWidth)
}





  