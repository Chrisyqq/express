/**
 * Created by Chris on 17/3/28.
 */
var express = require('express');
var router1 = express.Router();
var subrouter = express.Router();

//my middleware 1
function testmiddle(req,res,next) {
    console.log('test middleware');

    next();
}

//my middleware 2
function testmiddle2(req,res,next) {
    console.log('test middleware 2222');

    next();
}

subrouter.get('/',function (req, res) {
    res.send('subrouter ok!!!')
});
router1.use(testmiddle2);
router1.use('/sub',subrouter);

router1.get('/',function (req, res) {
    res.send('router test1');
});
router1.get('/url1',function (req, res) {
    res.send('url1 test1');
});

var app = express();
app.use(testmiddle);
app.use(function (req, res,next) {
    req.myname = 'leo';
    next();
});
app.use('/my',function (req, res, next) {
    req.name = 'qq';
    next();
});

app.get('/',function (req,res) {
    res.send('hello world' + req.myname);

});
app.get('/my',function (req,res) {
    res.send('myname is real' + req.name);
});


app.use('/router1',router1);

app.listen(3000);
