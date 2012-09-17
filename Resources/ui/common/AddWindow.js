
function AddWindow() {
	
	//create window based on _atLarge status
	var self = Titanium.UI.createWindow({  
	    title: L('new_fugitive'),
	    backgroundColor:'transparent',
		backgroundImage: 'images/grain.png',
		barColor: '#6d0a0c',
		layout: 'vertical'
	});
		
	var tf = Ti.UI.createTextField({
		height:(Ti.Platform.osname==='android') ? Ti.UI.SIZE : 40,
		top:50,
		width:250,
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:L('fugitive_name')
	});
	self.add(tf);
	
	
	var save = Ti.UI.createButton({
		title:L('save'),
		height:Ti.UI.SIZE,
		width:120,
		top:10
	});
	save.addEventListener('click', function() {
		var db = require('lib/db');
		db.add(tf.value);
		self.close();
	});
	self.add(save);
	
	return self;
}	

module.exports = AddWindow;
