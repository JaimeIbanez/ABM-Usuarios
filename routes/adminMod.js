var express = require('express');
var router = express.Router();

/* GET user-Mod. */
// router.get('/', function(req, res, next) {
// 	res.render('adminMod', { css: './stylesheets/dashboard.css'});
// });

router.get('/:id', function (req, res, next) {
	res.render('adminMod', { css: '/stylesheets/dashboard.css'});
});


//POST method route
router.post('/', function (req, res) {
	res.redirect('/admin');
});


module.exports = router;