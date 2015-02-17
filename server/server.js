var express = require('express');
var bodyParser = require('body-parser');

var userRouter = require('./routes/userRouter');
var courseRouter = require('./routes/courseRouter');
var scheduleRouter = require('./routes/scheduleRouter');
var coreRouter = require('./routes/coreRouter');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public" ));


app.use('/api', coreRouter);
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/schedule', scheduleRouter);





app.listen(8080);
