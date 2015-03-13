var temp_now = window.tempNow;

$('.show_bg_pic').click(function(){
  $('.bg').addClass('with_pic');
});

/*
$({ value: 0 }).animate({ value: temp_now }, {
  duration: 900,
  easing: 'swing',
  step: function() {
  }
});
*/

var mapContainer = $( "#mapContainer" );
 
var map = new google.maps.Map(
  mapContainer[ 0 ], {
    zoom: 15,
    center: new google.maps.LatLng(
      25.04,
      121.5119444
    ),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
);

/*
var weatherLayer = new google.maps.weather.WeatherLayer({
  temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
});

weatherLayer.setMap(map);
 */

 
function addMarker( latitude, longitude, label ){

  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(
      latitude,
      longitude
    ),
    title: (label || "")
  });
   
  return( marker );

}
 
 
function updateMarker( marker, latitude, longitude, label ){
// Update the position.
  marker.setPosition(
    new google.maps.LatLng(
      latitude,
      longitude
    )
  );
 
// Update the title if it was provided.
  if (label){
    marker.setTitle( label );
  }
}

function moveToLocation(lat, lng){
  var center = new google.maps.LatLng(lat, lng);
  map.panTo(center);
}
 
 
// -------------------------------------------------- //
 
 
if (navigator.geolocation) {
   
  var locationMarker = null;
   
   
  // Get the location of the user's browser using the
  // native geolocation service. When we invoke this method
  // only the first callback is requied. The second
  // callback - the error handler - and the third
  // argument - our configuration options - are optional.
  navigator.geolocation.getCurrentPosition(function( position ){
   
    // Check to see if there is already a location.
    // There is a bug in FireFox where this gets
    // invoked more than once with a cahced result.
    if (locationMarker){
      return;
    }
     
    console.log( "Initial Position Found" );
    console.log(position.coords.latitude, position.coords.longitude);
    moveToLocation(position.coords.latitude, position.coords.longitude );

    // Add a marker to the map using the position.
    locationMarker = addMarker(
      position.coords.latitude,
      position.coords.longitude,
      "Initial Position"
    );
   
  }, function( error ){

    console.log( "Something went wrong: ", error );

  }, {

    timeout: (5 * 1000),
    maximumAge: (1000 * 60 * 15),
    enableHighAccuracy: true

  });
   
   
  // will be called automatically each time the position of the device changes
  var positionTimer = navigator.geolocation.watchPosition(function( position ){
     
    updateMarker(
      locationMarker,
      position.coords.latitude,
      position.coords.longitude,
      "Updated / Accurate Position"
    );
   
  });
 
 
  setTimeout(function(){

    navigator.geolocation.clearWatch( positionTimer );

  },(1000 * 60 * 5));
 
} else {
  
  console.log('not support navgator geo');

}
