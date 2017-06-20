var procLocations = [];
var procSearches = []
var dataCap = 300;

var loadedLocations = false;;
var loadedSearches = false;

function loadLocations(){

	// using a fancy '?' operator, if dataCap < amountOfLocations, trueCap=dataCap else trueCap=amountOfLocations
	var trueCap = dataCap < locations.length ? dataCap : locations.length;

	// loop dataCap amount of times
	for( var i = 0; i < trueCap; i++){
		
		// add a new location to processedLocations variable using the random index generated above
		procLocations[ i ] = {
			timestamp : locations[i].timestampMs,
			lat : ((locations[i].latitudeE7*0.0001)/1000),
			lng : ((locations[i].longitudeE7*0.0001)/1000),
		};
	}
	localStorage.setItem(  "locations", procLocations);
	loadedLocations = true;

	// ensures both searches and locations have been loaded
	if( loadedSearches ) {
		getOverlap();
	}
}

function loadSearches(){

	var trueCap = dataCap < searches.event.length ? dataCap : searches.event.length;
	for( var i = 0; i < trueCap; i++ ) {
		
		// Code below needs to be adjusted
		//var index = Math.floor((Math.random() * ( searches.event.length-1 ) + 1));
		var index = i;
		procSearches[ i ] = {
			timestamp : searches.event[index].query.id[0].timestamp_usec,
			queryText :  searches.event[index].query.query_text
		};
	}

	localStorage.setItem(  searches, procSearches );
	loadedSearches = true;

	// ensures both searches and locations have been loaded
	if( loadedLocations ) {
		getOverlap();
	}
}

function falsifyData(){
	for( var i = 0; i < procLocations.length; i++ ) {
		var currentLocation = procLocations[i];

		if( (Math.floor( Math.random() * 10 ) === 3) ) {
			var searchIndex = Math.floor( Math.random() * procSearches.length );
			var currentSearch = procSearches[ searchIndex ];

			var locStamp = Number.parseInt( currentLocation.timestamp )/1000;

			console.log( "falsify" );

			var difference = Math.random() < 0.5 ? ( -1 * Math.floor( Math.random()*900 ) ) : ( Math.floor( Math.random()*900 )); 
			procSearches[searchIndex].timestamp = ( (locStamp + difference)*1000000 ).toString();

		}
	}
}


var overlappingData = {};

function getOverlap(){
	// TO:DO GET BETTER DATA SO FALSIFY IS NOT NEEDED
	if( document.getElementById("data-type").checked ) {
    falsifyData();
}


	//falsifyData(); //makes it falsify the data to prove functionality 
	var overlapCount = 0;
	for( var i = 0; i < procLocations.length; i++ ) {
		var currentLocation = procLocations[i];
		for( var searchIndex = 0; searchIndex < procSearches.length; searchIndex++ ){
			var currentSearch = procSearches[searchIndex];

			var locStamp = Number.parseInt( currentLocation.timestamp )/1000;
			var searchStamp = Number.parseInt( currentSearch.timestamp )/1000000;

			var difference = locStamp - searchStamp;

			if( Math.abs(difference) < 9000 && currentSearch.used != true){
				overlappingData[overlapCount] = {
					location : currentLocation,
					search : currentSearch
				}
				// A hacky way to fix duplicate searches
				procSearches[searchIndex].used = true;
				overlapCount++;
			}

		}
	}
	reInitMap();
}