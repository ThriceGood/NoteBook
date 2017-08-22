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
  if (!project.name && !project.colour) {
    res.json({status: false});
  }
  project.save(function(err, project) {
      if (err || !project) {
        res.json({status: false});
      } else {
        res.json({status: true});
      }
  })
});

router.put('/', function(req, res, next) {
  var project = {
    name: req.body.name,
    description: req.body.description,
    // colour: req.body.colour
  };
  if (!project.name) {
    res.json({status: false});
  }
  Project.update({name: req.body.original_name}, {$set: project}, function(err, project){
    if (err || !project) {
      res.json({status: false});
    } else {
      res.json({status: true});
    }
  });
});

router.delete('/:project_name', function(req, res, next) {
  Project.remove({name: req.params.project_name}, function(err) {
      if (err) {
          res.json({status: false});
      } else {
          res.json({status: true});
      }
  });
});


module.exports = router;
