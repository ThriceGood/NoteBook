var express = require('express');
var router = express.Router();

var Project = require('../models/project.model');

// GET home page
router.get('/', function(req, res, next) {
  Project.find({}, function (err, projects) {
    res.render('layout', {view: 'projects', view_data: {projects: projects}});
  });
});

// create project
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
      if (err) {
        res.json({status: false});
      } else {
        res.json({status: true});
      }
  })
});

// update project
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

// delete project
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
