/**
 * Created by wayne on 2/13/15.
 */

var mongodb = require('../database/mongoDb');

var ScheduleSchema = new mongodb.Schema({
  courseId: mongodb.Schema.Types.ObjectId,
  date: String,
  teetimes: [{
    time: String,
    user: String,
    players: Number
  }]
});


var Schedule = mongodb.model('Schedules', ScheduleSchema);


module.exports = Schedule;