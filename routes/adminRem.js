var express = require('express');
var router = express.Router();

var dbConnection = require('../lib/dbConnection');

dbConnection.connectToServer (function (err, db) {
	if(err){
		throw new Error('Error: No hay conexión con la base de datos');
	}

	/* POST method route */
	router.get('/:id', function (req, res) {

		userId = Number(req.params.id);

		db.collection('users').remove({id: userId});

		res.redirect('/admin');

	});
});

module.exports = router;
