    
function getFugitives(_callback) {

	var url = "http://bountyhunterapp.appspot.com/bounties";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	_callback(JSON.parse(this.responseText));
		}, 
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.debug(e.error);
	        alert('error');
	    }
	});
	xhr.open("GET", url);
	xhr.send();  // request is actually sent with this statement
}
exports.getFugitives = getFugitives;

function bustFugitive(_macAddress, _callback) {
	var url = "http://bountyhunterapp.appspot.com/bounties";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    	_callback(JSON.parse(this.responseText));
	    }, 
	    onerror: function(e) {
			//handle error
	        Ti.API.debug(e.error);
	        alert('error');
	    }
	});
	xhr.open("POST", url);
	xhr.send({
		udid:_macAddress
	});
}
exports.bustFugitive = bustFugitive;