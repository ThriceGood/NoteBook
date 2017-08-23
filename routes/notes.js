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
      project_id = project._id;
      notes = [
        {tite: 'note 1', type: 'text', tag: 'a tag'},
        {tite: 'note 2', type: 'issue', tag: 'a tag'},
        {tite: 'note 3', type: 'link', tag: 'a tag'},
        {tite: 'note 4', type: 'task', tag: 'a tag'},
      ];
    } else {
      project_id = null;
      notes = [];
    }
    res.render('layout', {view: 'notes', view_data: {project_id: project_id, notes: notes}});
  });
});

// save new note
router.post('/', function(req, res, next) {
  var note = new Note({
    title: req.body.title,
    type: req.body.type,
    tag: req.body.tag,
    content: req.body.content
  });
  if (!note.title || !note.type || !note.content) {
    res.json({status: false});
  }
  note.save(function(err, note) {
    if (err) {
      res.json({status: false});
    } else {
      res.json({status: true});
    }
  });
});

module.exports = router;
