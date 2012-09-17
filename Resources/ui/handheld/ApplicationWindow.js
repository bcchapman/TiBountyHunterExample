
function ApplicationWindow(_atLarge) {
	var AddWindow = require('ui/common/AddWindow');
	var BountyTable = require('ui/common/BountyTable');
	var DetailWindow = require('ui/common/DetailWindow');
	
	//create window based on _atLarge status
	var self = Titanium.UI.createWindow({  
	    title: (_atLarge) ? L('fugitives') : L('captured'),
	    backgroundColor:'transparent',
		backgroundImage: 'images/grain.png',
		barColor: '#6d0a0c',
		activity : {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var m1 = menu.add({ title : L('add') });
				m1.addEventListener('click', function(e) {
					//open in tab group to get free title bar (android)
					self.containingTab.open(new AddWindow);
				});
			}
		}
	});
	
	//create bounty table and add to window
	var bountyTable = new BountyTable(_atLarge);
	self.add(bountyTable);
	
	bountyTable.addEventListener('click', function(_e) {
		self.containingTab.open(new DetailWindow(_e.rowData, self.containingTab));
	})
	
	return self;
}	

module.exports = ApplicationWindow;
