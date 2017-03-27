var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , myname :'王爽', qq :'1239257538'});
});

module.exports = router;
