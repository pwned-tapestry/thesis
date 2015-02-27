var express = require('express');
var db = require('../database/mongoDb');

var User = require('../models/userModelMongo');
var Course = require('../models/courseModelMongo');
//var Schedule = require('../models/scheduleModelMongo');
var scheduleController = require('../controllers/scheduleController');

var seedRouter = express.Router();

var courses = [
  {
    "Course Name": "Bay Club Stonetree",
    "Course Description": "18 holes over 6810 yards with a par of 72 (Daily Fee)",
    "Address": "9 Stonetree Ln Novato, CA 94945-3541",
    "Phone": "(415) 209-6090",
    "Coordinates": [
      38.103661,
      -122.506622
    ]
  },
  {
    "Course Name": "Brentwood Golf Club - Creekside Course",
    "Course Description": "9 holes over 3282 yards with a par of 36 (Daily Fee)",
    "Address": "100 Summerset Dr Brentwood, CA 94513",
    "Phone": "(925) 516-3400",
    "Coordinates": [
      37.924258,
      -121.7276473
    ]
  },
  {
    "Course Name": "Brentwood Golf Club - Hillside Course",
    "Course Description": "9 holes over 3140 yards with a par of 36 (Daily Fee)",
    "Address": "100 Summerset Dr Brentwood, CA 94513",
    "Phone": "(925) 516-3400",
    "Coordinates": [
      37.924258,
      -121.7276473
    ]
  },
  {
    "Course Name": "Blackhawk Country Club - Lakeside Course",
    "Course Description": "18 holes over 6835 yards with a par of 72 (Private Equity Facility)",
    "Address": "599 Blackhawk Club Dr Danville, CA 94506-4522",
    "Phone": "(925) 736-6550",
    "Coordinates": [
      37.8189078,
      -121.9155029
    ]
  },
  {
    "Course Name": "Boundary Oak Golf Course",
    "Course Description": "18 holes over 7063 yards with a par of 72 (Municipal)",
    "Address": "3800 Valley Vista Rd Walnut Creek, CA 94598-4097",
    "Phone": "(925) 934-4775",
    "Coordinates": [
      37.9240901,
      -121.9969088
    ]
  },
  {
    "Course Name": "Blackhawk Country Club - The Falls Course",
    "Course Description": "18 holes over 6738 yards with a par of 72 (Private Equity Facility)",
    "Address": "599 Blackhawk Club Dr Danville, CA 94506-4522",
    "Phone": "(925) 736-6550",
    "Coordinates": [
      37.8189078,
      -121.9155029
    ]
  },
  {
    "Course Name": "Bridges Golf Club",
    "Course Description": "18 holes over 6561 yards with a par of 72 (Daily Fee)",
    "Address": "9000 S Gale Ridge Rd San Ramon, CA 94582-9174",
    "Phone": "(925) 735-4253",
    "Coordinates": [
      37.77124020000001,
      -121.9336616
    ]
  },
  {
    "Course Name": "Burlingame Country Club",
    "Course Description": "18 holes over 6500 yards with a par of 70 (Private Equity Facility)",
    "Address": "80 New Place Rd Hillsborough, CA 94010-6499",
    "Phone": "(650) 343-1843",
    "Coordinates": [
      37.57006,
      -122.366022
    ]
  },
  {
    "Course Name": "Buchanan Fields Golf Course",
    "Course Description": "9 holes over 1982 yards with a par of 31 (Daily Fee)",
    "Address": "1091 Concord Ave Concord, CA 94520-5603",
    "Phone": "(925) 682-1846",
    "Coordinates": [
      37.9789742,
      -122.0603549
    ]
  },
  {
    "Course Name": "California",
    "Course Description": "18 holes over 6735 yards with a par of 72 (Private Equity Facility)",
    "Address": "844 W Orange Ave South San Francisco, CA 94080-3125",
    "Phone": "(650) 589-0144",
    "Coordinates": [
      37.654001,
      -122.439035
    ]
  },
  {
    "Course Name": "Callippe Preserve Golf Course",
    "Course Description": "18 holes over 6755 yards with a par of 72 (Municipal)",
    "Address": "8500 Club House Dr Pleasanton, CA 94566-9848",
    "Phone": "(925) 426-6666 x 17",
    "Coordinates": [
      37.6279557,
      -121.8602364
    ]
  },
  {
    "Course Name": "Castlewood Country Club - Valley Course",
    "Course Description": "18 holes over 6678 yards with a par of 72 (Private Equity Facility)",
    "Address": "707 Country Club Cir Pleasanton, CA 94566-9743",
    "Phone": "(925) 846-5151",
    "Coordinates": [
      37.6370418,
      -121.8948562
    ]
  },
  {
    "Course Name": "Castlewood Country Club - Hill Course",
    "Course Description": "18 holes over 6240 yards with a par of 70 (Private Equity Facility)",
    "Address": "707 Country Club Cir Pleasanton, CA 94566-9743",
    "Phone": "(925) 846-5151",
    "Coordinates": [
      37.6370418,
      -121.8948562
    ]
  },
  {
    "Course Name": "Chuck Corica Golf Complex - Earl Fry Course",
    "Course Description": "18 holes over 6310 yards with a par of 71 (Municipal)",
    "Address": "1 Clubhouse Memorial Rd Alameda, CA 94502-6502",
    "Phone": "(510) 747-7800",
    "Coordinates": [
      37.73955,
      -122.2329
    ]
  },
  {
    "Course Name": "Canyon Lakes Country Club",
    "Course Description": "18 holes over 6431 yards with a par of 71 (Daily Fee)",
    "Address": "640 Bollinger Canyon Way San Ramon, CA 94582-4971",
    "Phone": "(925) 735-6511",
    "Coordinates": [
      37.771785,
      -121.951348
    ]
  },
  {
    "Course Name": "Chuck Corica Golf Complex - Jack Clark Course",
    "Course Description": "18 holes over 6560 yards with a par of 71 (Municipal)",
    "Address": "1 Clubhouse Memorial Rd Alameda, CA 94502-6502",
    "Phone": "(510) 747-7800",
    "Coordinates": [
      37.73955,
      -122.2329
    ]
  },
  {
    "Course Name": "Chuck Corica Golf Complex - Mif Albright Course",
    "Course Description": "9 holes over 1152 yards with a par of 27 (Municipal)",
    "Address": "1 Clubhouse Memorial Rd Alameda, CA 94502-6502",
    "Phone": "(510) 747-7800",
    "Coordinates": [
      37.73955,
      -122.2329
    ]
  },
  {
    "Course Name": "Claremont Country Club",
    "Course Description": "18 holes over 5469 yards with a par of 68 (Private Equity Facility)",
    "Address": "5295 Broadway Ter Oakland, CA 94618-1418",
    "Phone": "(510) 653-6789",
    "Coordinates": [
      37.8365956,
      -122.2473907
    ]
  },
  {
    "Course Name": "Creekside",
    "Course Description": "9 holes over 3088 yards with a par of 36 (Private Equity Facility)",
    "Address": "1010 Stanley Dollar Dr Walnut Creek, CA 94595",
    "Phone": "(925) 988-7861",
    "Coordinates": [
      37.8638187,
      -122.0682048
    ]
  },
  {
    "Course Name": "Contra Costa Country Club",
    "Course Description": "18 holes over 6850 yards with a par of 71 (Private Equity Facility)",
    "Address": "801 Golf Club Rd Pleasant Hill, CA 94523-1101",
    "Phone": "(925) 798-7135",
    "Coordinates": [
      37.973573,
      -122.0806267
    ]
  },
  {
    "Course Name": "Creekside/Hillside",
    "Course Description": "27 holes over 6828 yards with a par of 72 (Daily Fee)",
    "Address": "100 Summerset Dr Brentwood, CA 94513",
    "Phone": "(925) 516-3400",
    "Coordinates": [
      37.924258,
      -121.7276473
    ]
  },
  {
    "Course Name": "Diablo Country Club",
    "Course Description": "18 holes over 6640 yards with a par of 71 (Private Equity Facility)",
    "Address": "1700 Clubhouse Rd Diablo, CA 94528",
    "Phone": "(925) 837-9233",
    "Coordinates": [
      37.83600029999999,
      -121.9583717
    ]
  },
  {
    "Course Name": "Crow Canyon Country Club",
    "Course Description": "18 holes over 6052 yards with a par of 69 (Private Non-Equity)",
    "Address": "711 Silver Lake Dr Danville, CA 94526-6299",
    "Phone": "(925) 735-5700",
    "Coordinates": [
      37.7858329,
      -121.962425
    ]
  },
  {
    "Course Name": "Crystal Springs Golf Course",
    "Course Description": "18 holes over 6515 yards with a par of 72 (Daily Fee)",
    "Address": "6650 Golf Course Dr Burlingame, CA 94010-6543",
    "Phone": "(650) 342-4188",
    "Coordinates": [
      37.5577014,
      -122.3823285
    ]
  },
  {
    "Course Name": "Deer Ridge",
    "Course Description": "18 holes over 6302 yards with a par of 71 (Daily Fee)",
    "Address": "801 Foothill Dr Brentwood, CA 94513-5619",
    "Phone": "(925) 516-6600",
    "Coordinates": [
      37.914573,
      -121.7396581
    ]
  },
  {
    "Course Name": "Diablo Creek Golf Course",
    "Course Description": "18 holes over 6439 yards with a par of 71 (Municipal)",
    "Address": "4050 Port Chicago Hwy Concord, CA 94520-1121",
    "Phone": "(925) 686-6262",
    "Coordinates": [
      38.013481,
      -122.017581
    ]
  },
  {
    "Course Name": "Diablo Hills Golf Course",
    "Course Description": "9 holes over 2302 yards with a par of 34 (Daily Fee)",
    "Address": "1551 Marchbanks Dr Walnut Creek, CA 94598-2158",
    "Phone": "(925) 939-7372",
    "Coordinates": [
      37.9119991,
      -122.0457072
    ]
  },
  {
    "Course Name": "Dollar Ranch",
    "Course Description": "18 holes over 6177 yards with a par of 72 (Private Equity Facility)",
    "Address": "1010 Stanley Dollar Dr Walnut Creek, CA 94595",
    "Phone": "(925) 988-7861",
    "Coordinates": [
      37.8638187,
      -122.0682048
    ]
  },
  {
    "Course Name": "Discovery Bay Country Club",
    "Course Description": "18 holes over 6518 yards with a par of 71 (Private Non-Equity)",
    "Address": "1475 Clubhouse Dr Discovery Bay, CA 94505-9241",
    "Phone": "(925) 634-0704",
    "Coordinates": [
      37.8998859,
      -121.5918587
    ]
  },
  {
    "Course Name": "Dublin Ranch",
    "Course Description": "18 holes over 5079 yards with a par of 63 (Daily Fee)",
    "Address": "5900 Signal Hill Dr Dublin, CA 94568-7795",
    "Phone": "(925) 556-7040",
    "Coordinates": [
      37.7249754,
      -121.8573237
    ]
  },
  {
    "Course Name": "Franklin Canyon Golf Course",
    "Course Description": "18 holes over 6594 yards with a par of 72 (Daily Fee)",
    "Address": "Highway 4 Hercules, CA 94547",
    "Phone": "(510) 799-6191",
    "Coordinates": [
      38.0137579,
      -122.2644005
    ]
  },
  {
    "Course Name": "Lake Chabot Executive Golf Club",
    "Course Description": "",
    "Address": "11450 Golf Links Rd Oakland, CA 94605",
    "Phone": "510-351-5812",
    "Coordinates": [
      37.741916,
      -122.120676
    ]
  },
  {
    "Course Name": "Emerald Hills Golf Course",
    "Course Description": "9 holes over 1205 yards with a par of 27 (Daily Fee)",
    "Address": "938 Wilmington Way Redwood City, CA 94062-4036",
    "Phone": "(650) 368-7820",
    "Coordinates": [
      37.4539071,
      -122.2648751
    ]
  },
  {
    "Course Name": "Fremont Park Golf Course",
    "Course Description": "9 holes over 2191 yards with a par of 29 (Daily Fee)",
    "Address": "39751 Stevenson Pl Fremont, CA 94539-3067",
    "Phone": "(510) 790-1919",
    "Coordinates": [
      37.557348,
      -121.9571957
    ]
  },
  {
    "Course Name": "Gleneagles Int'l Golf Course",
    "Course Description": "9 holes over 3293 yards with a par of 36 (Municipal)",
    "Address": "2100 Sunnydale Ave San Francisco, CA 94134-2614",
    "Phone": "(415) 587-2425",
    "Coordinates": [
      37.7137488,
      -122.4224737
    ]
  },
  {
    "Course Name": "Golden Gate Golf Course",
    "Course Description": "9 holes over 1357 yards with a par of 27 (Municipal)",
    "Address": "970 47th Ave San Francisco, CA 94121",
    "Phone": "(415) 751-8987",
    "Coordinates": [
      37.7704515,
      -122.5078173
    ]
  },
  {
    "Course Name": "Grayson Woods",
    "Course Description": "9 holes over 1182 yards with a par of 27 (Daily Fee)",
    "Address": "400 Iron Hill St Pleasant Hill, CA 94523-5603",
    "Phone": "(925) 935-7277",
    "Coordinates": [
      37.954127,
      -122.100415
    ]
  },
  {
    "Course Name": "Green Hills Country Club",
    "Course Description": "18 holes over 6328 yards with a par of 71 (Private Equity Facility)",
    "Address": "500 Ludeman Ln Millbrae, CA 94030-1391",
    "Phone": "(650) 648-9951",
    "Coordinates": [
      37.603694,
      -122.4093589
    ]
  },
  {
    "Course Name": "Half Moon Bay Golf Links - Ocean Course",
    "Course Description": "18 holes over 6649 yards with a par of 72 (Daily Fee)",
    "Address": "2 Miramontes Point Rd Half Moon Bay, CA 94019-2377",
    "Phone": "(650) 726-4438",
    "Coordinates": [
      37.4348069,
      -122.4402077
    ]
  },
  {
    "Course Name": "Half Moon Bay Golf Links - Old Course Course",
    "Course Description": "18 holes over 7001 yards with a par of 72 (Daily Fee)",
    "Address": "2 Miramontes Point Rd Half Moon Bay, CA 94019-2377",
    "Phone": "(650) 726-4438",
    "Coordinates": [
      37.4348069,
      -122.4402077
    ]
  }
];

var users = [{ cell: "2125551000", first: "Jack", last: "Johnson" },
  { cell: "2125551001", first: "William", last: "Smith" },
  { cell: "2125551002", first: "Peter", last: "Michaels" }];

seedRouter
  .get('/go', function(request, response){
    db.connection.db.dropDatabase();
    populateCourses();
    populateSchedules();
    populateUsers();
    response.end("Almost done");
  })
  .get('/reset', function (request, response) {
    db.connection.db.dropDatabase();
    response.end("Done");
  })
  .get('/collections', function (request, response) {
    db.connection.db.collectionNames(function (error, names) {
      response.json(names);
    });
  })
  .get('/courses', function (request, response) {
    if (populateCourses()) {
      response.end("Errah");
    }
    response.end("Done");
  })
  .get('/schedules', function(request, response){
    populateSchedules();
    response.end('Done');
  })
  .get('/users', function(request, response){
    populateUsers();
    response.end('Done');
  });


function populateUsers(){
  for (var i = 0; i < users.length; i++) {
    var user = new User({
      cell: users[i].cell,
      first: users[i].first,
      last: users[i].last
    });
    console.log(user);
    user.save(function(error, user){
      if (error) {
        return error;
      }

    });
  }
}


function populateCourses() {
  for (var i = 0; i < courses.length; i++) {
    var course = new Course({
      name: courses[i]['Course Name'],
      description: courses[i]['Course Description'],
      location: courses[i]['Coordinates'],
      address: courses[i]['Address'],
      phone: courses[i]['Phone']
    });
    console.log(course);
    course.save(function(error, course){
      if (error) {
        return error;
      }
    });
  }
}

function populateSchedules() {
  Course.find({}, function(error, courses){
    if (error) {
      return error;
    }

    for (var i = 0; i < courses.length; i++) {
      for (var x = 0; x < 28; x++) {
        (function(c,days) {
          var d = new Date();


          d.setDate(d.getDate() - 7 + days);
          var dateString = ("00" + (d.getMonth() + 1)).slice(-2);
          dateString += ("00" + d.getDate()).slice(-2);
          dateString += d.getFullYear();
          var start = ("00" + (600 + (Math.random() * 20) | 0)).slice(-4);

          var end = ("00" + (1330 + (Math.random() * 120) | 0)).slice(-4);
          var interval = 15 + (Math.random() * 10) | 0;

          console.log("Course:", c, " date:", dateString, "start:", start, " end:", end, " interval:", interval);
          var data = {
            courseId: courses[c]._id,
            date: dateString,
            start: start,
            end: end,
            interval: interval
          }

          scheduleController.addSchedule(data, function (error, schedule) {
            if (error) {
              return error;
            }
            console.log(schedule);
          });
        })(i,x);
      }
    }
  });
}


module.exports = seedRouter;

