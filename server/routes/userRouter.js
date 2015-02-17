/**
 * Created by wayne on 2/14/15.
 */


var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController');


// base route will be /api/user

userRouter
  .get('/', function(request, response){

    userController.findUsers({}, function(error, users){
      if (error) {
        // TODO: pick HTTP status error
        return response.end(error);
      }
      response.json(users);
    });

  })
  .post('/', function(request, response){
    // TODO: error checking Wayne!
    userController.addUser(request.body, function(error, user){
      if (error) {
        response.status(400);
        return response.end(error);
      }
      response.json(user);
    });
  })
  .get('/:cell', function(request, response){
    userController.findUser({ cell: request.params.cell }, function(error, user){
      if (error) {
        return response.end(error);
      }
      response.json(user);
    });
  })
  // route for Toly
  //.get('/name/:name', function(request, response){
  //  userController.findUser({ first: request.params.name }, function(error, user){
  //    if (error) {
  //      response.status(400);
  //      return response.end(error);
  //    }
  //    response.json(user);
  //  });
  //})
  .put('/:cell', function(request, response){
    userController.updateUser({
      cell: request.params.cell
    }, request.body, function(error, rows){
      if (error) {
        return response.end(error);
      }
      response.json(rows);
    });
  });



module.exports = userRouter;