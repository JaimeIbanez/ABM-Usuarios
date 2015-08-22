var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

var userId = 0;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	
	if(err){
		throw new Error('Error: No hay conexión con la base de datos');
	}

	/* GET userMod. */
	router.get('/:id', function (req, res, next) {
	// Traigo de la base de datos la consulta buscando por id y la inyecto en el .hbs
		userId = Number(req.params.id);
		db.collection('users').find({id: userId}).toArray(function(err,arr){
			res.render('usersMod', { css: '/stylesheets/abm.css',
				data: arr
			});
		});
	});

	/* POST method route */
	router.post('/', function (req, res) {
		var idInput = Number(req.body.usermodId);
		var nameInput = req.body.usermodName;
		var lastNameInput = req.body.usermodLastName;
		var emailInput = req.body.usermodEmail;
		var passwordInput = req.body.usermodPassword;
		var phoneInput = req.body.usermodPhone;
		var birthdayInput = req.body.usermodBirthday;
		var photoInput = req.body.usermodPhoto;

		// Calcular edad:
		var bday = new Date(birthdayInput);
		var cur = new Date();
		var diff = cur-bday;
		var ageInput = Math.floor(diff/31536000000);

		// Actualizar sólo los campos que interesan
		db.collection('users').update({id: idInput}, {
			$set: {
				name: nameInput,
				lastName: lastNameInput,
				email: emailInput,
				password: passwordInput,
				phone: phoneInput,
				birthday: birthdayInput,
				age: ageInput,
				photo: photoInput
			}
		});
		res.redirect('/users/' + idInput);
	});
});

module.exports = router;