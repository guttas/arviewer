var express = require('express');
var log4js = require('log4js');
var util = require('util');
var formidable = require('formidable')

var router = express.Router();


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/about', function(req, res) {
  res.send('This is the 1.0 API of AR Viewer');
});

function upload2forge(filePath)
{
  console.log('upload2forge');
}

function translate2dae(filePath)
{
  console.log('translate2dae');
}

router.post('/upload', function(req, res) {
   
  var parser = new Promise(function(resolve, reject) {

    var form = new formidable.IncomingForm();
    form.uploadDir = "./tmp";
    form.keepExtensions = true;
    form.multiples = false; // we are not ready on multiple support
    form.parse(req, function(err, fields, files) {
    console.log(util.inspect({fields1: fields, files1: files }));

    var uploadFile = files.file;
    if (uploadFile != undefined) {

      console.log("formidable upload success.");
      return resolve(uploadFile);
    }

    console.log("formidable upload failed.");
    return reject('error');
    });
  });

  parser.then(function(uploadFile) {

    var upload = filePath => new Promise((resolve, reject) => {
      console.log('filePath is : ' + filePath);
      upload2forge(filePath);

      return resolve(filePath.substr(4));
    });

    var translate = filePath => new Promise((resolve, reject) => {
      console.log('filePath is : ' + filePath);
      translate2dae(filePath);

      return resolve(filePath.substr(4));
    });

    Promise.all([upload(uploadFile.path), translate(uploadFile.path)]).then(v =>{
      res.send(v[0]);
      return;
    }).catch(function(err){
      console.log(err);
      res.send('error');
      return;
    });

  }).catch(function(err){
    console.log(err);
    res.send('error');
    return;
  }); 
});

module.exports = router;