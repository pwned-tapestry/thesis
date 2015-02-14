/**
 * Created by wayne on 2/14/15.
 */

var Schedule = require('../models/scheduleModelMongo');


var makeSchedule = function(start, end, minutes) {
  var result = [];

  start = nextTime(start, 0);

  while (Number(start) < Number(end)) {
    result.push({ time: start, user: null, players: 4 });
    start = nextTime(start, minutes);
  }

  return result;

};

var nextTime = function(timeIn, timeInc) {

  // must hae 4 dude
  timeIn = ('000' + timeIn).slice(-4);
  // snag hours mins from string
  var hours = Number(timeIn.slice(0,2));
  var minutes = Number(timeIn.slice(2));
  // add timeInc for next teetime
  minutes += timeInc;
  if (minutes > 59) {     // wrap hours
    minutes -= 60;
    hours += 1;
  }
  // return: hours to 2 char + min to 2 char
  return ('0' + hours).slice(-2) + ('0' + minutes).slice(-2);

};

var addSchedule = function(data, callback) {

  // get a schedule for the whoe day
  var teetimes = makeSchedule(data.start, data.end, data.minutes);
  // prep data to save
  var scheduleData = {
    courseId: data.courseId,
    date: data.date,
    teetimes: teetimes
  };

  var schedule = new Schedule(scheduleData);

  schedule.save(function(error, schedule){
    if (error) {
      return callback && callback(error, null);
    }
    return callback && callback(null, schedule);
  });
};


var findSchedule = function(data, callback) {
  Schedule.findOne(data, function(error, schedule){
    if (error) {
      return callback && callback(error);
    }
    return callback && callback(schedule);
  });
};




module.exports = {
  addSchedule: addSchedule,
  findSchedule: findSchedule
};
