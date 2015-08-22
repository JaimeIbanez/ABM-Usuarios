var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	if(err){
		throw new Error('no está corriendo el servidor mongo (mongod) o'
			+ ' no estás llegando a ese puerto o host');
	}
	//las rutas
	router.get('/', function(req, res, next){
		console.log(req.query.s);
		//console.log(req);
		var search={};
		if(typeof req.query.s !="undefined" && req.query.s.length>0){
			search={email: new RegExp(req.query.s)};
		}
		db.collection('users').find(search).sort({id: 1}).toArray(function(err,arr){
			if (err || arr === undefined || arr.length === 0){
				res.render('error',{
					message: 'El usuario "' + req.params.username + '" no existe! Ponete las pilas!',
					error: {
					status: 400,
					stack: new Error().stack //esto no hace falta pero me limé :P
					}
				});
			}
			else {
				res.render('admin',{ css: './stylesheets/dashboard.css',
					data: arr
				});
			}
		});
	});
});

module.exports = router;