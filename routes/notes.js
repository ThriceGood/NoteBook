var express = require('express');
var router = express.Router();

var Project = require('../models/project.model');
var Note = require('../models/note.model');


// GET notes page
router.get('/:name', function(req, res, next) {
  var project_name = req.params.name.replace(/-/g, ' ');
  Project.findOne({name: project_name}, function(err, project) {
    if (err) console.log(err);
    if (project) {
      Note.find({_creator: project._id}, function(err, notes) {
        if (err) console.log(err);
        res.render('layout', {view: 'notes', view_data: {project_id: project._id, notes: notes}});
      });
    } else {
      res.redirect('/');
    }
  });
});

// save new note
router.post('/', function(req, res, next) {
  var note = new Note({
    title: req.body.title,
    type: req.body.type,
    tag: req.body.tag,
    content: req.body.content,
    _creator: req.body.project_id
  });
  if (!note.title || !note.type || !note.content || !note._creator) {
    res.json({status: false});
  } else {
    note.save(function(err, note) {
      if (err) {
        console.log(err);
        res.json({status: false});
      } else {
        res.json({status: true});
      }
    });
  }
});

module.exports = router;
