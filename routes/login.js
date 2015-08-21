var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function (err, db) {

	if (err) {
		throw new Error('Error: No hay conexión con la base de datos');
	}

	router.post('/', function (req, res, next) {
		var emailInput = req.body.loginEmail;
		var passwordInput = req.body.loginPassword;

		db.collection('users').find({email: emailInput}).toArray(function (err, arr) {
			if (err || arr === undefined || arr.length === 0) {
				res.render('error', {
					message: 'No existe un usuario registrado con el email ' + emailInput + ' . Por favor registrarse o intentar ingresar con otro email',
		 			error: {status: 404, stack: new Error().stack}
		 		});
			} 
			else {
				var array = arr[0];
				if (passwordInput !== array.password) {
					res.render('error', {
						message: 'Contraseña inválida. Intente nuevamente',
		 				error: {status: 401, stack: new Error().stack}
		 			});
				} else {
					
					if (array.role === 'admin') {
						res.redirect('/admin');
					} else {
						res.redirect('/users/'+ array.id);
					}
				}
			}
		});

	});





	// router.get('/', function(req, res, next) {
	// 	var email = req.body.loginEmail;
	// 	var password = req.body.loginPassword;




	// 	db.collection('users').find({name: req.params.username}).toArray(function(err, arr) {
	// 		// si err existe render error, si arr es undefined render error, si arr tiene longitud 0 render error
	// 		if (err || arr === undefined || arr.length === 0) {
	// 			res.render('error', {
	// 				message: 'El usuario ' + req.params.username + ' no existe',
	// 	 			error: {status: 404, stack: new Error().stack}
	// 	 		});
	// 		} else {
	// 			res.render('users', {
	// 				name: arr[0].name,
	// 				email: arr[0].email
	// 			});
	// 		}
	// 	});




	// 	if (users[req.params.userId] === undefined) {
	// 		res.render('error', {
	// 			message: 'El usuario ' + req.params.userId + ' no existe',
	// 			error: {status: 404, stack: new Error().stack}
	// 		});
	// 	} else {
	// 		res.render('users', {
	// 			id: req.params.userId,
	// 			name: users[req.params.userId].name,
	// 			email: users[req.params.userId]['email']
	// 		});
	// 	}
	// });


});

module.exports = router;
