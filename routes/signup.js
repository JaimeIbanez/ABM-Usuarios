var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/abm', function (err, db) {

	if (err) {
		throw new Error('Error: No hay conexión con la base de datos');
	}

	router.post('/', function (req, res, next) {
		var emailInput = req.body.signupEmail;
		var passwordInput = req.body.signupPassword;
		var nameInput = req.body.signupName;
		var lastNameInput = req.body.signupLastName;
		var phoneInput = req.body.signupPhone;
		var birthdayInput = req.body.signupBirthday;
		var photoInput = req.body.signupPhoto;

		// Calcular edad:
		var bday = new Date(birthdayInput);
		var cur = new Date();
		var diff = cur-bday;
		var ageInput = Math.floor(diff/31536000000);

		db.collection('users').find({email: emailInput}).toArray(function (err, arr) {
			if (err || arr === undefined || arr.length === 0) {
				db.collection('users').find({},{id: 1}).sort({id: -1}).toArray(function (err, arr) {
					var lastId = arr[0].id;
					var newId = lastId + 1;
					db.collection('users').insert({
						id: newId,
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
					res.redirect('/users/' + newId);
				});
			} else {
				res.render('error', {
					message: 'Ya existe un usuario registrado con el correo ' + emailInput + ' . Por favor ingresar con este correo o ingresar con otro correo.',
		 			error: {status: 404, stack: new Error().stack}
		 		});
			}
		});
	});

});

module.exports = router;
