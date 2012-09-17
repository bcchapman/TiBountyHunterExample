
function BountyTable(_atLarge) {
	var db = require('lib/db');
	
	//create Tableview based on _atLarge status
	var self = Titanium.UI.createTableView({  
	    title: (_atLarge) ? L('fugitives') : L('captured'),
	    backgroundColor:'transparent',
		backgroundImage: 'images/grain.png'
	});
	
	function populateData() {
		var results = db.list(_atLarge);
		self.setData(results);
	}
	
	Ti.App.addEventListener('db_updated', populateData);
	
	//initialize data
	populateData();
	
	return self;
}	

module.exports = BountyTable;