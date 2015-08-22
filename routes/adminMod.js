var express = require('express');
var router = express.Router();

var Mongo = require('mongodb').MongoClient;

var idUser = 0;

Mongo.connect('mongodb://localhost:27017/abm', function(err, db){
	if(err){
		throw new Error('Error: No hay conexión con la base de datos');
	}
	/* GET adminMod. */
	router.get('/:id', function (req, res, next) {
	// traigo de la db la consulta buscando por id y la inyecto en el hbs
		idUser = req.params.id;
		db.collection('users').find({id: Number(req.params.id)}).toArray(function(err,arr){
			res.render('adminMod', { css: '/stylesheets/dashboard.css',
									data: arr
			});
		});
	});

	//POST method route
	router.post('/', function (req, res) {
		var idInput = req.body.inputId;
		var nameInput = req.body.inputNombre;
		var lastNameInput = req.body.inputApellido;
		var emailInput = req.body.inputEmail;
		var passwordInput = req.body.inputContrasena;
		var photoInput = req.body.inputFoto;
		var phoneInput = req.body.inputTelefono;
		var birthdayInput = req.body.inputFechaNac;

		// calcular edad
		var bday = new Date(birthdayInput);
		var cur = new Date();
		var diff = cur-bday;
		var ageInput = Math.floor(diff/31536000000);

		//actualizo sólo los campos que me interesan
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