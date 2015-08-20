var express = require('express');
var router = express.Router();

/* GET user-add. */
router.get('/', function(req, res, next) {
	res.render('adminAdd', { css: './stylesheets/dashboard.css'});
});

module.exports = router;