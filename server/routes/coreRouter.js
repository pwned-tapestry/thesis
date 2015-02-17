/**
 * Created by wayne on 2/16/15.
 */


var express = require('express');
var coreRouter = express.Router();
var courseController = require('../controllers/courseController');
var scheduleController = require('../controllers/scheduleController');


coreRouter
  .get('/coursesWithTeeTimes', function(request, response){
    courseController.findCourses({}, function(error, courses){
      if (error) {
        return response.end(error);
      }
      asyncMap([
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[0]._id,
            date: '02142015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        },
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[1]._id,
            date: '02142015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        },
        function(cb){
          scheduleController.hasTeeTime({
            courseId: courses[2]._id,
            date: '02142015',
            start: '0600',
            end: '1500' }, function(error, schedule){
            cb(schedule);
          })
        }
      ], function(results){
        var back = [];
        for (var i = 0; i < results.length; i++) {
          back[i] = courses[i].toObject();
          back[i].tees = results[i];
        }

        response.json(back);
      });
    });
  });



var asyncMap = function (tasks, callback) {
  var results = [];
  var totalResults = 0;

  for (var i = 0; i < tasks.length; i++) {

    (function (taskNumber) {
      tasks[taskNumber](function(result) {
        results[taskNumber] = result;
        totalResults += 1;
        if (totalResults === tasks.length) callback(results);
      });

    })(i);
  }
};


module.exports = coreRouter;