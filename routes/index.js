var express = require('express');
var router = express.Router();
var database = require('../db');

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

router.post("/login", async (req, res,next) => {
  try{
      //geting the data
      const {email , password} = req.body;

      if(email && password){
          //querying the database
          const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
          database.query(sql, (err, result)=>{
              if(err) throw err;
              if(result.length > 0){
                console.log('login success');
                  req.session.loggedin = true;
                  req.session.email = email;
                  res.redirect('/');
              }else{
                  res.send('Incorrect Email or Password!');
              }
              res.end();
          });
        }else{
          res.send('Please enter Email and Password!');
          res.end();
        }
      
  }catch(e){
      res.status(500).send(e.message);
  }
});


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


module.exports = router;
