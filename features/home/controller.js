var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var model = require('./index');
  model.title = 'Index Title from home';
  model.message = 'Index Message from home';
  res.render('index', { title: 'Express',message : 'Hello from homeController' });
});

module.exports = router;
