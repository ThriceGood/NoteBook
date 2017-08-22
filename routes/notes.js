var express = require('express');
var router = express.Router();

// GET project page
router.get('/:name', function(req, res, next) {
  var project_name = req.params.name.replace(/-/g, ' ');
  res.render('layout', {view: 'notes', view_data: {hello: 'world'}});
});

module.exports = router;
