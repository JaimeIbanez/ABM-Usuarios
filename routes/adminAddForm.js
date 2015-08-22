var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db) {
	if (err) {
		throw new Error('Error: No hay conexión con la base de datos');
	}

	router.post('/', function(req, res, next) {
		var nameInput = req.body.inputNombre;
		var lastNameInput = req.body.inputApellido;
		var emailInput = req.body.inputEmail;
		var passwordInput = req.body.inputPassword;
		var photoInput = req.body.inputFoto.toString();
		var phoneInput = req.body.inputTelefono;
		var birthdayInput = req.body.inputBirthday;

		// calcular edad
		var bday = new Date(birthdayInput);
		var cur = new Date();
		var diff = cur-bday;
		var ageInput = Math.floor(diff/31536000000);


		db.collection('users').find({email: emailInput}).toArray(function(err, arr) {
			if (err || arr === undefined || arr.length === 0) {
				db.collection('users').find({} ,{id: 1}).sort({id: -1}).toArray(function(err, arr) {
					var lastId = arr[0].id;
					db.collection('users').insert({
						id: lastId+1,
						name: nameInput,
						lastName: lastNameInput,
						email: emailInput,
						password: passwordInput,
						phone: phoneInput,
						birthday: birthdayInput,
						age: ageInput,
						photo: photoInput,
						role: 'user'
					});
				});
			res.redirect('/admin');
			}
			else {
				// falta manejar mejor el error para que este dentro de la misma página
				res.render('error', {
					message: 'Ya existe un usuario registrado con el correo ' + emailInput + ' . Por favor intentar agregar un nuevo usuario con otro correo.',
		 			error: {status: 404, stack: new Error().stack}
		 		});
			}
		});


	});
});


module.exports = router;