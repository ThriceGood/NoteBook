var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
  res.render('layout', {view: 'index', view_data: {hello: 'world'}});
});

// GET project page
router.get('/project', function(req, res, next) {
  res.render('layout', {view: 'project', view_data: {hello: 'world'}});
});

module.exports = router;
