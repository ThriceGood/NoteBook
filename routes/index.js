var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {

  projects = [
    {
      name: 'My Project 1',
      description: 'Project Description Project Description Project Description',
      colour: 'success'
    },
    {
      name: 'My Project 2',
      description: 'Project Description Project Description Project Description',
      colour: 'info'
    },
    {
      name: 'My Project 3',
      description: 'Project Description Project Description Project Description',
      colour: 'danger'
    },
    {
      name: 'My Project 4',
      description: 'Project Description Project Description Project Description',
      colour: 'primary'
    },
    {
      name: 'My Project 6',
      description: 'Project Description Project Description Project Description',
      colour: 'warning'
    },
  ]

  res.render('layout', {view: 'index', view_data: {projects: projects}});
});

// GET project page
router.get('/project/:name', function(req, res, next) {
  var project_name = req.params.name.replace(/-/g, ' ');
  res.render('layout', {view: 'project', view_data: {hello: 'world'}});
});

module.exports = router;
