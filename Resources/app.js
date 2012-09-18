var MainEntry = {};

//main entry point
MainEntry.MainEntryPoint = function() {

	//display osname
	Ti.API.log('info',Ti.Platform.osname);

	//setup applicationTabGroup
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var applicationTabGroup = new ApplicationTabGroup();	
	applicationTabGroup.open();
};

MainEntry.MainEntryPoint();
