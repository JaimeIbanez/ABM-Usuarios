var express = require('express');
var router = express.Router();

var dbConnection = require('../lib/dbConnection');

dbConnection.connectToServer (function (err, db) {

	if (err) {
		throw new Error('Error: No hay conexión con la base de datos');
	}

	router.post('/', function (req, res, next) {
		var emailInput = req.body.loginEmail;
		var passwordInput = req.body.loginPassword;

		db.collection('users').find({email: emailInput}).toArray(function (err, arr) {
			if (err || arr === undefined || arr.length === 0) {
				res.render('error', {
					message: 'No existe un usuario registrado con el correo ' + emailInput + ' . Por favor registrarse o intentar ingresar con otro correo',
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

});

module.exports = router;
