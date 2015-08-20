var express = require('express');
var router = express.Router();

/* GET user-Mod. */
router.get('/', function(req, res, next) {
	res.render('adminMod', { css: './stylesheets/dashboard.css'});
});


module.exports = router;