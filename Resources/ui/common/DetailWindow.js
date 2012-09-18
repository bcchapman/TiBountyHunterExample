var DetailWindowGlobals = {};

function DetailWindow(_person, containingTab) {
	var db = require('lib/db');
	
	//create window based on _atLarge status
	var self = Titanium.UI.createWindow({  
	    title: _person.title,
	    backgroundColor:'transparent',
		backgroundImage: 'images/grain.png',
		barColor: '#6d0a0c',
		layout:'vertical'
	});
	
	//set up protected globals
	DetailWindowGlobals.person = _person;
	DetailWindowGlobals.window = self;
	
	self.add(Ti.UI.createLabel( {
			text:(_person.atLarge) ? L('still_at_large') : L('busted'),
			top:10,
			textAlign:'center',
			font: {
				fontWeight:'bold',
				fontSize:'18dp'
			},
			color: '#fff',
			height:Ti.UI.SIZE
		})
	);
	
	var burglarPhoto = Ti.UI.createImageView({
		image: _person.image ? _person.image : '/images/burglar.png',
		height: '50%',
		width: '50%',
		top:10
	});
	self.add(burglarPhoto);
	
	var takePhotoButton = Ti.UI.createButton({
		title:L('add_photo'),
		top:10,
		height:Ti.UI.SIZE,
		width:300
	});
	takePhotoButton.addEventListener('click',function(e) {
		
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: 'Photo capture?',
		    message: 'How would you like to retrieve photo?',
		    buttonNames: ['Camera','Gallery']
		});
 
		alertDialog.addEventListener('click',function(e){
		    if (e.index === 0) {
		        takePhoto(burglarPhoto, _person);
		    }else if(e.index === 1){
		        browseGallery(burglarPhoto, _person);
		    }
		});
		
		alertDialog.show();
	})
	self.add(takePhotoButton);
	
	
	if (_person.atLarge) {
		var captureButton = Ti.UI.createButton({
			title:L('capture'),
			top:10,
			height:Ti.UI.SIZE,
			width:300
		});
		
		captureButton.addEventListener('click', function() {
			if(Ti.Geolocation.locationServicesEnabled) {
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
				
				if(Ti.Platform.osname === "android"){
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
				}
				else {
					Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
					Ti.Geolocation.purpose = "Track those criminals";
				}
				
				Ti.Geolocation.getCurrentPosition(function(e) {
					//do nothing
				});
				Ti.Geolocation.addEventListener('location', updatePosition);
			}
			else {
				Ti.UI.createAlertDialog({
						title:L('geo_error'), 
						message:L('geo_error_details')
					}).show();
			}
		});

		self.add(captureButton);
	}
	else {
		var mapButton = Ti.UI.createButton({
			title:L('show_on_map'),
			top:10,
			height:Ti.UI.SIZE,
			width:300
		});
		
		mapButton.addEventListener('click', function() {
			var MapView = require('ui/common/MapView');
			var mapView = new MapView(_person);
			//open map view as modal window
			mapView.open({modal:true});
		});
		
		self.add(mapButton);
	}
	
	var deleteButton = Ti.UI.createButton({
		title:L('delete'),
		top:10,
		height:Ti.UI.SIZE,
		width:300
	});
	deleteButton.addEventListener('click', function() {
			db.del(_person.id);
			self.close();	
		});
		
	self.add(deleteButton);
	
	return self;
}

function updatePosition(e) {
    if (e.error)
    {
        Ti.UI.createAlertDialog({
            title:L('geo_error'), 
            message:L('geo_error_details')
            }).show();
        return;
    }
    
    var db = require('lib/db');
    db.bust(DetailWindowGlobals.person.id, e.coords.latitude, e.coords.longitude);
            
    var net = require('lib/network');
    net.bustFugitive(Ti.Platform.id, function(_data) {
        Ti.UI.createAlertDialog({
            message:_data.message
        }).show();

        //Delay closing for android
        if (Ti.Platform.osname == 'android') {
            setTimeout(function() {
                DetailWindowGlobals.window.close();
            },2000);                                                                        
        }
        else {
            DetailWindowGlobals.window.close();
        }
    });
    
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'audio/Jail.mp3');
	// load from file object
	var sound = Titanium.Media.createSound({
		url:file,
		preload:true,
		allowBackground:true
	});
	sound.play();
   
    Ti.Geolocation.removeEventListener('location', updatePosition);	
}	

function takePhoto(_burglarPhoto, _person) {
	var db = require('lib/db');
	
	Ti.Media.showCamera({
	    showControls:true,  
	    mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
	    autohide:true, 
	    allowEditing:true,
	    saveToGallery:false,
	    success:function(event) {
	        _burglarPhoto.stop();
	        _burglarPhoto.images = null;
	        var image = event.media;;
	        var f = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'photo' + _person.id+'.png');
	        f.write(image);
	        _burglarPhoto.image = f.nativePath;
	        _burglarPhoto.borderWidth = 1;
	        
	        db.addPhoto(_person.id, f.nativePath);
	    },
	    cancel: function() { },
	    error:function(error) {}
	});
}

function browseGallery(_burglarPhoto, _person) {
	var db = require('lib/db');
	
	Ti.Media.openPhotoGallery({
	    showControls:true,  
	    mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
	    autohide:true, 
	    allowEditing:true,
	    success:function(event) {
	        _burglarPhoto.stop();
	        _burglarPhoto.images = null;
	        var image = event.media;
	        var path = Titanium.Filesystem.applicationDataDirectory + _person.title + '.png';
	        var f = Titanium.Filesystem.getFile(path);
	        f.write(image);
	        _burglarPhoto.image = f.nativePath;
	        _burglarPhoto.borderWidth = 1;
	        
	        db.addPhoto(_person.id,path);
	    },
	    cancel: function() { },
	    error:function(error) {}
	});
}


module.exports = DetailWindow;
