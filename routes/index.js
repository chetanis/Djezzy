var express = require('express');
var router = express.Router();
var database = require('../db');
const authController = require('../controllers/AuthController');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
    res.render('index', { title: 'Express' , session : req.session});
  }else{
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.loggedin){
    res.render('index', { title: 'Express' , session : req.session});
  }else{
    res.render('login', { title: 'Express' , session : req.session});
  }
});

router.post("/login", authController.login);


// Define the logout route handler
router.get('/logout', (req, res) => {
  // Destroy the user's session
  req.session.destroy(err => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
      } else {
          // Redirect the user to the login page
          res.redirect('/login');
      }
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post("/register", async (req, res,next) => {
  try{
    //geting the data
    const {full_name,email , password,password_confirmed} = req.body;

    if(full_name && email && password && password_confirmed){
      //check if the password and password_confirmed are the same
      if(password !== password_confirmed){
        res.send('Password and Confirm Password do not match!');
        res.end();
      }
        //querying the database
        const sql = `INSERT INTO users (email,password,full_name) VALUES ('${email}','${password}','${full_name}')`;
        database.query(sql, (err, result)=>{
            if(err) throw err;
            console.log('User added');
            res.redirect('/login');
            res.end();
        });
      }else{
        res.send('Please enter all fields!');
        res.end();
      }

  }catch(error){
    res.status(500).send(error.message);
  }
});

module.exports = router;
