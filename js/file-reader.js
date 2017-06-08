var data;

var locationsFound = {};
var googleMap;
var locationCap = 1000;

var locations;
var searches;

//this is called by the html on 'submit' 
function loadFile( fileType ){
  var input, file, fr;

  // checks if the browser has a filereader function
  if( typeof window.FileReader !== 'function' ) {
    alert( "The file API isn't supported on this browser yet" );
    return;
  }

  input = document.getElementById( "file-upload-" + fileType );

  console.log(input);
  // Check there is an element for the file to be stored in
  if( !input ) {
    alert( "Couldn't find the fileinput element");
    return; 
  } else if ( !input.files ) {
    alert( "This browser doesn't support the 'files' property of inputs" );
    return;
  } else if ( !input.files[0] ) {
    alert( "Please select a file before clicking submit" );
    return;
  } 

  file = input.files[0];

  fr = new FileReader();
  // when the filereader onload event is triggered run this function with
  // e eventhandler
  fr.onload = function( e ){
    lines = e.target.result;
    // takes the string of lines and converts it into a JSON object
    var newArr = JSON.parse( lines );
    data = newArr;
    display();
  };
  fr.readAsText( file );
  data = fr;

  function display(){
    if( fileType === "searches" ) {
      searches = data;

      loadSearches();

    } else if ( fileType === "locations" ) {
      locations = data.locations;
      // loadLocations() is found in overlap-data.js
      loadLocations();

    } else if ( fileType === "profile" ) {
      document.getElementById( "data-content" ).innerHTML = 
      "<div class=\"profile-box\" style=\"padding-left:40px\; padding-right:40px\">" + 
        "<img src=\"img/title.png\" style=\"width:90px\; padding-top:35px\">" +
        "<br>" +
        "<h5>Hi " + data.displayName + "</h5>" +
        "<div class=\"row\">" +
          "<div class=\"col s2\">" +
            "<img src=\"img/" + data.gender + ".png\"  style=\"height:80px\">" +
          "</div>" +
          "<br>" +
          "<br>" +
          "<div class=\"col s6\">" +
            "<h6>" + data.emails[0].value + "</h6>" +
          "</div>" +
        "</div>" +
        "<div class=\"row\">" +
          //"<div class=\"col s4 offset-s1\">" +
          "<br>" +
          "<br>" +
            "<h6 style=\"color:#6a6a6a\">Your age is " + data.ageRange.min + "</h6>" +
            "<div class=\"divider-darker\">" +
          //"</div>" +
        "</div>" +
      "</div>" 
          //"<ul>" + 
            //"<li> Name : " + data.displayName + "</li>" +
            //"<li> Age : " + data.ageRange.min + "<li>" +
            //"<li> Email : " + data.emails[0].value + "</li>" +
            //"<li> Gender : " + "<img src=\"img/" + data.gender + ".png\"></li>"  + 
         // "</ul>"; // this makes it all styled in the html ditrectly
    }
  }

}

