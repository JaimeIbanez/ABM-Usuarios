var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function (err, db) {

	if (err) {
		throw new Error('Error: No hay conexión con la base de datos');
	}

	router.get('/:userId', function (req, res, next) {
		
		var userId = Number(req.params.userId);

		db.collection('users').find({id: userId}).toArray(function (err, arr) {
			
			var array = arr[0];
			res.render('users', { css: '/stylesheets/abm.css',
				id: userId,
				photo: array.photo,
				name: array.name,
				lastName: array.lastName,
				email: array.email,
				phone: array.phone,
				age: array.age,
			});
		});

	});

});

module.exports = router;
