var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ramatYishay = new Schema({
		player: String,
		come: Boolean 
}, {collection: 'ramatyishay'});

exports.ramatYishay = ramatYishay;
