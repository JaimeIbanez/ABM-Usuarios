var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

var idUser = 0;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	if(err){
		throw new Error('no está corriendo el servidor mongo (mongod) o'
			+ ' no estás llegando a ese puerto o host');
	}
	/* GET user-Mod. */

	router.get('/:id', function (req, res, next) {
	// voy a traer de la db la consulta buscando por id y la voy a inyectar en el hbs de mod
		idUser = req.params.id;
		console.log(idUser);
		db.collection('users').find({id: Number(req.params.id)}).toArray(function(err,arr){
			console.log(arr);
			res.render('adminMod', { css: '/stylesheets/dashboard.css',
									data: arr
			});
		});
	});

//POST method route
	router.post('/', function (req, res) {
		console.log('here');
		console.log(req.body);
		var idInput = req.body.inputId;
		var nameInput = req.body.inputNombre;
		var lastNameInput = req.body.inputApellido;
		var emailInput = req.body.inputEmail;
		var passwordInput = req.body.inputContrasena;
		var photoInput = req.body.inputFoto;
		var phoneInput = req.body.inputTelefono;
		var birthdayInput = req.body.inputFechaNac;

		console.log(idInput, nameInput, lastNameInput, emailInput, passwordInput, photoInput, phoneInput, birthdayInput);

		// calcular edad
		var bday = new Date(birthdayInput);
		var cur = new Date();
		var diff = cur-bday;
		var ageInput = Math.floor(diff/31536000000);

		db.collection('users').update({id: Number(idInput)}, {
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
		res.redirect('/admin');
	});
});

module.exports = router;