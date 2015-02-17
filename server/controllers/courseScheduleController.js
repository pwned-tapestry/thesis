/**
 * Created by wayne on 2/16/15.
 */

var Course = require('../models/courseModelMongo');
var Schedule = require('../models/scheduleModelMongo');


var getCourses = function(){

  Course.find({})
    .then()

};