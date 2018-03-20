var express = require('express');
var formidable = require('formidable')
var log4js = require('log4js');
var util = require('util');


var router = express.Router();
var logger = log4js.getLogger();
logger.level = 'debug';


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('Birds home page');
});

router.put('/', function(req, res) {
	console.log('req: ', req.body);

    res.send('Update the book');
});

router.get('/about', function(req, res) {
  res.send('About birds');
});

router.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
	
	
/*     form.uploadDir = "../tmp";
    form.keepExtensions = true;
    form.multiples = false; // we are not ready on multiple support
    form.parse(req, function(err, fields, files) {
		console.log(util.inspect({err:err, fields1: fields, files1: files })); */
		
/*     	var uploadFile = files.file;

		if (uploadFile.name == undefined) {
			res.send(err);
			console.log("upload failed.");
			logger.info('upload failed: invalid file name.');
			return;
		}

		logger.info('upload request: ' + uploadFile.name);
		console.log("upload success: "+uploadFile.path);  */

	//	res.send('upload success');
    //});
});

module.exports = router;