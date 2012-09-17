
function MapView(_person) {
	
	//create window based on _atLarge status
	var self = Titanium.UI.createWindow({  
	    title: L('busted_location'),
	    backgroundColor:'transparent',
		backgroundImage: 'images/grain.png',
		barColor: '#6d0a0c',
		layout:'vertical'
	});

	var pin = Titanium.Map.createAnnotation({
    	latitude:_person.capturedLat,
    	longitude:_person.capturedLong,
    	title:_person.name,
    	subtitle:L('busted'),
    	animate:true
	});
	
	var mapview = Ti.Map.createView({
		//mapType: Ti.Map.STANDARD_TYPE,
		mapType: Ti.Map.SATELLITE_TYPE,
		region:{latitude:_person.capturedLat, longitude:_person.capturedLong, latitudeDelta:0.1, longitudeDelta:0.1},
		animate:true,
		regionFit:true,
		userLocation:false,
		annotations:[pin]
	});
	
	self.add(mapview);
	
	return self;
}

module.exports = MapView;
