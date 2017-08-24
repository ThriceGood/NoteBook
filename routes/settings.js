var express = require('express');
var fs = require('fs');
var router = express.Router();

var theme = '';
router.theme = theme;

// set theme and write to settings file
router.post('/theme', function(req, res, next) {
  router.theme = req.body.theme;
  var settings_string = '';
  var theme_setting = 'theme:' + req.body.theme;
  fs.readFile('./config/user_settings', 'utf8', function (err, data) {
    if (err) throw err;
    var s = data.split('\n');
    for (i in s) { setting = s[i].split(':');
      if (setting[0] == 'theme') {
        settings_string += theme_setting + '\n';
      } else {
        if (s[i] && s[i] != '\n') {
          settings_string += s[i] + '\n';
        }
      }
    }
    fs.writeFile('./config/user_settings', settings_string, 'utf8', function(err) {
      if (err) {
        res.json({status: false});
      } else {
        res.json({status: true});
      }
    });
  });
});


module.exports = router;
