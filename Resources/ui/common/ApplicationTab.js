
function ApplicationTab(_atLarge, _window) {
	var self = Titanium.UI.createTab({  
    	icon: (_atLarge) ? 'images/fugitives.png': 'images/captured.png',
    	title: (_atLarge) ? L('fugitives') : L('captured'),
    	window: _window
	});	
	
	return self;
}	

module.exports = ApplicationTab;
