var express = require('express');
var bodyParser = require('body-parser');
var courseRouter = require('./routes/courseRouter');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public" ));

app.use('/api/course', courseRouter);




app.listen(8080);
