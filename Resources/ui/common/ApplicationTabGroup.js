
function ApplicationTabGroup() {
	var ApplicationWindow = require('ui/handheld/ApplicationWindow');
	var ApplicationTab = require('ui/common/ApplicationTab');
		
	//create tab group
	var self = Ti.UI.createTabGroup();

	//create windows
	var fugitiveWindow = new ApplicationWindow(true),
		capturedWindow = new ApplicationWindow(false);
	
	//create tabas
	var fugitiveTab = new ApplicationTab(true, fugitiveWindow),
		capturedTab = new ApplicationTab(false, capturedWindow);
		
	fugitiveWindow.containingTab = fugitiveTab;
	capturedWindow.containingTab = capturedTab;
	
	//add tabs to tab group
	self.addTab(fugitiveTab);
	self.addTab(capturedTab);
	
	return self;
}

module.exports = ApplicationTabGroup;
