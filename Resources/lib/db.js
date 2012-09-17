//check for db and create if it does not exist
var db = Ti.Database.open('TiBountyHunter');
db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, image TEXT, capturedLat REAL, capturedLong REAL, captured INTEGER);');
db.close();

var list = function(_atLarge) {
	var db = Ti.Database.open('TiBountyHunter');
	
	//store results array
	var data = []
	//retrieve data
	var result = db.execute('SELECT * FROM fugitives WHERE captured= ? ORDER BY name ASC', (_atLarge) ? 0 : 1);
	while (result.isValidRow()) {
		data.push({
			title: result.fieldByName('name'),
			id: result.fieldByName('id'),
			name: result.fieldByName('name'),
			image: result.fieldByName('image'),
			capturedLat: result.fieldByName('capturedLat'),
			capturedLong: result.fieldByName('capturedLong'),
			atLarge: _atLarge,
			hasChild: true,
			color: '#fff',
			font: {fontSize: '18dp'},
			height:'45dp'
		});
		result.next();
	}
	result.close();
	db.close();
	
	return data;
};
exports.list = list;

var add = function(_name) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute("INSERT INTO fugitives(name,captured) VALUES(?,?)",_name,0);
	db.close();

	Ti.App.fireEvent('db_updated');
};
exports.add = add;

var addPhoto = function(_id, _url) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute("UPDATE fugitives SET image = ? WHERE id=?",_url, _id);
	db.close();

	Ti.App.fireEvent('db_updated');
}
exports.addPhoto = addPhoto;

var del = function(_id) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute("DELETE FROM fugitives WHERE id=?",_id);
	db.close();
	
	Ti.App.fireEvent('db_updated');
}
exports.del = del;

var bust = function(_id, _lat, _long) {
	var db = Ti.Database.open('TiBountyHunter');
	db.execute("UPDATE fugitives SET captured = 1, capturedLat = ?, capturedLong = ? WHERE id=?",_lat,_long,_id);
	db.close();
	
	Ti.App.fireEvent('db_updated');
}
exports.bust = bust;

if(!Ti.App.Properties.hasProperty('seeded')) {
	var network = require('lib/network');
	network.getFugitives(function(results) {
		for(var i=0;i<results.length;i++) {
			add(results[i].name);
		}
	});	
	Ti.App.Properties.setString('seeded', 'Retrieved');
}