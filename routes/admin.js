var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	if(err){
		throw new Error('Error: No hay conexión con la base de datos');
	}
	//las rutas
	router.get('/', function(req, res, next){
		console.log(req.query.s);
		var search={};
		if(typeof req.query.s !="undefined" && req.query.s.length>0){
			search={email: new RegExp(req.query.s)};
		}
		db.collection('users').find(search).sort({id: 1}).toArray(function(err,arr){
			if (err || arr === undefined || arr.length === 0){
				res.render('error',{
					// message: 'El usuario "' + req.params.username + '" no existe! Ponete las pilas!',
					message: 'El usuario consultado no existe. Por favor intentar con una nueva búsqueda',
					error: {
					status: 400,
					stack: new Error().stack // Esto no hace falta
					}
				});
			}
			else {
				res.render('admin',{ css: '/stylesheets/dashboard.css',
					data: arr
				});
			}
		});
	});
});

module.exports = router;