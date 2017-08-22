var express = require('express');
var router = express.Router();

var Project = require('../models/project.model');

// GET home page
router.get('/', function(req, res, next) {

  test_projects = [
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

  Project.find({}, function (err, projects) {
    res.render('layout', {view: 'projects', view_data: {projects: projects}});
  });

});

router.post('/', function(req, res, next) {
  var project = new Project({
    name: req.body.name,
    description: req.body.description,
    colour: req.body.colour
  });
  project.save(function(err, project) {
      if (err) {
        res.json({status: false});
      } else {
        res.json({status: true});
      }
  })
});

module.exports = router;
