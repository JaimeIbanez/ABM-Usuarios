var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('users', { css: './stylesheets/abm.css',
		name: 'hola',
		lastName: 'lalala',
		email: 'a@b.com'
	});
});

module.exports = router;
