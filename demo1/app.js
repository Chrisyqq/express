/**
 * Created by Chris on 17/3/27.
 */
 var express = require('express');

var app = express();

app.get('/',function (req,res) {
    res.send(
        `<div style="color: blue;">
            hello express
        </div>`
    );
});

app.listen(3000);