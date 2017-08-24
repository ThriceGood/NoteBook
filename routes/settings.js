var express = require('express');
var fs = require('fs');
var router = express.Router();

// set theme
router.post('/theme', function(req, res, next) {
  var settings_string = '';
  var theme_setting = 'theme:' + req.body.theme + '\n';
  fs.readFile('./config/user_settings', 'utf8', function (err, data) {
    if (err) throw err;
    var s = data.split('\n');
    for (i in s) { setting = s[i].split(':');
      if (setting[0] == 'theme') {
        settings_string += theme_setting;
      } else {
        settings_string += s + '\n';
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

router.test = 'TESTESTESTS';
module.exports = router;
