var express = require('express');
var router = express.Router();
var Mongo = require('mongodb').MongoClient;


Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	if(err){
		throw new Error('no está corriendo el servidor mongo (mongod) o'
			+ ' no estás llegando a ese puerto o host');
	}

	/* GET adminRem. */
	router.get('/:id', function (req, res, next) {
	// traigo de la db la consulta buscando por id y la inyecto en el hbs
		db.collection('users').find({id: Number(req.params.id)}).toArray(function(err,arr){
			console.log(arr);
			res.render('adminRem', { css: '/stylesheets/dashboard.css',
									data: arr
			});
		});
	});

	//POST method route
	router.post('/', function (req, res) {
		//console.log(req.body);
		var idInput = req.body.inputId;
		console.log(idInput);

		//quiero ver si el find funciona en este caso
		db.collection('users').remove({id: Number(idInput)});
		console.log("borrado!");
		res.redirect('/admin');
	});
});

module.exports = router;