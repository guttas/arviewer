var express = require('express');
var formidable = require('formidable')
var log4js = require('log4js');
var util = require('util');


var router = express.Router();


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/about', function(req, res) {
  res.send('This is the 1.0 API of AR Viewer');
});

router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
    form.uploadDir = "./tmp";
    form.keepExtensions = true;
    form.multiples = false; // we are not ready on multiple support
    form.parse(req, function(err, fields, files) {
		console.log(util.inspect({fields1: fields, files1: files }));
		
    var uploadFile = files.file;

		if (uploadFile == undefined) {
			res.send(err);
			console.log("upload failed.");
			return;
		}

		console.log("upload success: "+uploadFile.path);
		res.send(uploadFile.path.substr(4));
    });
});

module.exports = router;