
//main entry point
(function() {

	//display osname
	Ti.API.log('info',Ti.Platform.osname);

	//setup applicationTabGroup
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup().open();
})();
