/**
 * Created by wayne on 2/16/15.
 */


var express = require('express');
var scheduleRouter = express.Router();
var scheduleController = require('../controllers/scheduleController');

scheduleRouter
  .get('/', function(request, response){
    scheduleController.findSchedules({}, function(error, schedules){
      //TODO fix this
      response.json(schedules);
    });
  })
  .get('/:id/:date', function(request, response){
    scheduleController.findSchedule({ courseId: request.params.id, date: request.params.date }, function(error, schedule){
      if (error) {
        return response.end(error);
      }
      response.json(schedule);
    });
  })
  .get('/:id/:date/:start/:end', function(request, response){
    var data = {
      courseId: request.params.id,
      date: request.params.date,
      start: request.params.start,
      end: request.params.end
    };
    scheduleController.hasTeeTime(data, function(error, schedule){
      if (error) {
        return response.end(error);
      }
      response.json(schedule);
    });
  });



module.exports = scheduleRouter;