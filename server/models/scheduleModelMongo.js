var mongodb = require('../database/mongoDb');

//Schema for Schedules:
//teeTimes are an array that stores a set of times. 
//Typically, these times be spaced out at 10-20 minute intervals.
var ScheduleSchema = new mongodb.Schema({
  courseId: mongodb.Schema.Types.ObjectId,
  date: String,
  teetimes: [{
    time: String,
    reserved: Boolean,
    numPlayers: Number,
    reservedBy: String,
    players: [String]
  }]
});

var Schedule = mongodb.model('Schedules', ScheduleSchema);

module.exports = Schedule;
