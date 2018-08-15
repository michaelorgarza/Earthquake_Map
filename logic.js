// query links //////
var eqQueryurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
var faulteqqueryurl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
//////////////////////////////////////////////////////


// various tile layers for map
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
var satellitemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.satellite',
    accessToken: API_KEY
});
////////////////////////////////////////////////////////////


// execute GET requests on queryurls
d3.json(eqQueryurl, function(data){
   var eqFeature = data.features

    // function defining how geojson points spawned in Lf.layers
   var eqMag = L.geoJSON(eqFeature, {
    pointToLayer: function (feature, latlng) {
        return new L.circle(latlng, 
            {radius: magCircle(feature.properties.mag),
            fillColor: getColors(feature.properties.mag),
            fillOpacity: .7,
            stroke: true,
            color: "white",
            weight: .3

        })
        },
    onEachFeature: function (feature, layer){
        layer.bindPopup(feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time)+ "<hr> Magnitude: " + feature.properties.mag)
    }
    });

    //  execute GET requests on queryurls
    d3.json(faulteqqueryurl, function(data){
        var flFeatures = data.features
        var styling = {
            "fillOpacity": 0
        }
        var faultline = L.geoJSON(flFeatures, {
            style: function(feature){
                return styling
            }
        })
        createMap(eqMag, faultline)
    })

    
});
//////////////////////////////////////////////


// earthquake magnitude specifications
function getColors(d) {
    return d > 5  ? '#CC3300' :
           d > 4  ? '#CC6600' :
           d > 3  ? '#CC9900' :
           d > 2  ? '#CCCC00' :
           d > 1  ? '#669900' :
                    '#67FC00';
}
function magCircle(value){
    return value*35000
}
//////////////////////////////////////////////


// create map function by passing in eq and fault layers
function createMap(magLayer, faultLayer){
   var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satelite Map": satellitemap
     };
    var overlayMaps = {
        "Magnitude": magLayer,
        "Fault Lines": faultLayer
     };
    var mymap = L.map('map', {
        center: [42.877742, -120.380979],
        zoom: 3,
        minZoom: 2.5,
        layers: [satellitemap, faultLayer, magLayer],
        maxBounds: L.latLngBounds([90, -180], [-90, 180]),
        maxBoundsViscosity: 1,
        scrollWheelZoom: false
    }); 

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    div.innerHTML += '<p><u>Richter Magnitude Scale</u></p>'

    // loop through grades to create magnitude scale
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColors(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
    };
    legend.addTo(mymap);

    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(mymap);
}
///////////////////////////////////////////