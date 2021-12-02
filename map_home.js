var map = L.map('map').setView([12.378604360053975, -1.5186498726945181], 10);
	
var OSM = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map),
     ESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

   var mylayer = L.layerGroup().addTo( map )
// fill that layer with data from a geojson file
jQuery.getJSON( "burkina.geojson", function( json ){
  L.geoJSON( json, {
    onEachFeature: addMyData,
  })
})
// This function is run for every feature found in the geojson file. It adds the feature to the empty layer we created above
function addMyData( feature, layer ){
  mylayer.addLayer( layer )
  // some other code can go here, like adding a popup with layer.bindPopup("Hello")
  {
        // paramétrage de la popup de la couche "arrondissement"  
        layer.bindPopup( "<b><u>Description de l'arrondissement</u></b><br><b> Département de </b>" + feature.properties.NAME_3 )
        }
}


	var baseMaps = {
    "OSM": OSM,
    "ESRI": ESRI
};

var layerControl = {
  "My Layer": mylayer, // an option to show or hide the layer you created from geojson
}
// Selecteur fonds de carte
                    
L.control.layers(baseMaps, layerControl, {collapsed: false}).addTo(map);

  

//Rechercher

L.Control.geocoder().addTo(map);



// On s'assure que la page est chargée
window.onload = function(){
    // On initialise la carte sur les coordonnée du cameroun
    // Initialiser la carte

    //ajouter l'echelle
    L.control.scale().addTo(map);

    // Cette méthode est à insérer juste après avoir initialisé la carte
    routingControl = L.Routing.control({
        position: 'bottomleft',
    // Nous personnalisons le tracé
    lineOptions: {
        styles: [{color: '#ff8f00', opacity: 1, weight: 7}]
    },

    // Nous personnalisons la langue et le moyen de transport
    router: new L.Routing.osrmv1({
        language: 'fr',
        profile: 'car', // car, bike, foot
    }),
    
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map)

   map.locate({setView: false, watch: true, maxZoom: 6});
        map.once('locationfound', function(ev){
  routingControl.setWaypoints(ev.latlng);
    //    marker = L.marker(ev.latlng);
  
    });
	
}