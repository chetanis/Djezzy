var express = require('express');
var router = express.Router();
var database = require('../db');
const authController = require('../controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
    res.render('index', {session : req.session});
  }else{
    res.redirect('/login');
  }
});

// route handler for rendering the login page
router.get('/login', authController.renderLogin);

// route handler for rendering the register page
router.get('/register', authController.renderRegister);

// route handler for logging in the user
router.post("/login", authController.login);

//route hundler for registering the user
router.post("/register", authController.register);


// route handler for logging out the user
router.get('/logout', authController.logout);

module.exports = router;
