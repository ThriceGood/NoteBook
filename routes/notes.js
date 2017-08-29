var express = require('express');
var router = express.Router();

var Project = require('../models/project.model');
var Note = require('../models/note.model');
var Filter = require('../models/filter.model');


// GET notes page
router.get('/:project_id', function(req, res, next) {
  var project_id = req.params.project_id;
  Note.find({_creator: project_id}, null, {sort: '-createdAt'}, function(err, notes) {
    if (err) console.log(err);
    Filter.find({}, function(err, filters) {
      if (err) console.log(err);
      var types = [];
      var tags = [];
      for (i in filters) {
        if (filters[i].filter_type == 'type') {
          types.push(filters[i]);
        } else {
          tags.push(filters[i]);
        }
      }
      if (notes) {
        res.render('layout', {view: 'notes', view_data: {project_id: project_id, notes: notes, types: types, tags: tags}});
      } else {
        res.redirect('/');
      }
    })
  });
});

router.get('/filter/:project_id/:type_filter/:tag_filter', function(req, res, next) {
  var project_id = req.params.project_id;
  var type_filter = req.params.type_filter;
  var tag_filter = req.params.tag_filter;
  var query = {_creator: project_id};
  if (type_filter != 'all') {
    query.type = type_filter;
  }
  if (tag_filter != 'all') {
    query.tag = tag_filter;
  }
  Note.find(query, null, {sort: '-createdAt'}, function(err, notes) {
    if (err) {
      console.log(err);
      res.json({status: false});
    } else {
      res.json({status: true, data: notes});
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
        res.json({status: true, note: note});
      }
    });
  }
});

router.put('/', function(req, res, next) {
  var note = {
    title: req.body.title,
    type: req.body.type,
    tag: req.body.tag,
    content: req.body.content,
    _creator: req.body.project_id
  };
  if (!note.title || !note.type || !note.content) {
    res.json({status: false});
  } else {
    Note.update({_id: req.body.id}, {$set: note}, function(err, note) {
      if (err) {
        console.log(err);
        res.json({status: false});
      } else {
        res.json({status: true});
      }
    });
  }
});

// delete note
router.delete('/:note_id', function(req, res, next) {
  Note.remove({_id: req.params.note_id}, function(err) {
    if (err) {
        res.json({status: false});
    } else {
        res.json({status: true});
    }
  });
});

// get note view
router.get('/note/:note_id', function(req, res, next) {
  var note_id = req.params.note_id;
  if (!note_id) {
    res.redirect('/');
  } else {
    Filter.find({}, function(err, filters) {
      if (err) console.log(err);
      var types = [];
      var tags = [];
      for (i in filters) {
        if (filters[i].filter_type == 'type') {
          types.push(filters[i]);
        } else {
          tags.push(filters[i]);
        }
      }
      Note.findById(note_id, function(err, note) {
        if (err) console.log(err);
        res.render('layout', {view: 'note', view_data: {note: note, types: types, tags: tags}});
      });
    });
  }
});

// create new filter
router.post('/filter_type', function(req, res, next) {
  var filter_type = req.body.type;
  var filter_value = req.body.value;
  if (!filter_type || !filter_value) {
    res.json({status: false});
  } else {
    var filter = new Filter({name: filter_value, filter_type: filter_type});
    filter.save(function(err, filter) {
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
