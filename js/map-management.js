function initMap() {
  var centrePoint = {lat: ((-433025396* 0.0001)/1000), lng: (( 1726028045* 0.0001)/1000)};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 4,
  center: centrePoint
  });
  googleMap = map;
}

function reInitMap(){
  googleMap.panTo(overlappingData[0].location);

  var markers = [];

  var i =0;
  while( overlappingData[i] !== undefined ){

      markers[i] = new google.maps.Marker({
          position: overlappingData[i].location,
          map: googleMap,
//          Custom marker: (do not use as conflicts with google aesthetics)
//          icon: {
//            url : "img/marker.png", 
//              //above url gives map custom image for marker (use png not jpg)
//              //size: new google.maps.Size(64,64),
//            symbol :{
//              anchor: (16.5,0), //sets the anchor to the pin point
//              scale: 1 
//            }
//          },
          dateLocation: new Date ( Number.parseInt( overlappingData[i].location.timestamp ) ),
          dateSearch: new Date ( Number.parseInt( overlappingData[i].search.timestamp/1000 ) ),
          queryText: overlappingData[i].search.queryText
    });
    i++;
  }    
  
  for( i = 0; i < markers.length; i++){

    markers[i].addListener('click', function() {

//if a time is under ten minutes, then a "0" needs to be placed in front of it
      var hoursSearch = this.dateSearch.getHours();
      hoursSearch = hoursSearch < 10 ? ( "0" + hoursSearch) : hoursSearch;
      var minutesSearch = this.dateSearch.getMinutes();
      minutesSearch = minutesSearch < 10 ? ( "0" + minutesSearch) : minutesSearch;

      var hoursLocation = this.dateLocation.getHours();
      hoursLocation = hoursLocation < 10 ? ( "0" + hoursLocation ) : hoursLocation;
      var minutesLocation = this.dateLocation.getMinutes();
      minutesLocation = minutesLocation < 10 ? ( "0" + minutesLocation ) : minutesLocation;


//this info needs to be created and linked to each marker specifically
      contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h6 id="firstHeading" class="firstHeading"> You searched: ' + this.queryText + '</h6>'+
      '<div id="bodyContent">'+
        "<p> Location check-in time: " + this.dateLocation.getDate() + "/" + Number.parseInt(this.dateLocation.getMonth()+1) + "/" + this.dateLocation.getFullYear()+ " at " + ( hoursLocation ) + ":" + ( minutesLocation )+
        "<br>Time search was performed: " + this.dateSearch.getDate() + "/" + Number.parseInt(this.dateSearch.getMonth()+1) + "/" + this.dateSearch.getFullYear() + " at " + ( hoursSearch ) + ":" + ( minutesSearch )+  "</p>" +
      '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      
      infowindow.open(googleMap, this);

      console.log ("marker is clicked");
    });
  }

  googleMap.setZoom(15);
}


