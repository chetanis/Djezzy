const userService = require('../services/userService');


//function for rendering the login page
async function renderLogin(req, res, next) {
    try {
      // if already logged in send it to the home page
      if (req.session.loggedin) {
        res.redirect('/');
      } else {
        res.render('login');
      }
    } catch (error) {
      next(error);
    }
}

//function for rendering the register page
async function renderRegister(req,res,next){
    try{
        // if alredy logged in send it to the home page
        if(req.session.loggedin){
            res.redirect('/');
        }else{
            res.render('register');
        }
    }catch(error){
        next(error);
    }
}

//login the user
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userService.authenticateUser(email, password);
            if (user) {
                // Authentication successful, set session and redirect
                req.session.loggedin = true;
                req.session.user = user;
                res.redirect('/');
            } else {
                res.send('Incorrect Email or Password!');
            }
        } else {
            res.send('Please enter Email and Password!');
        }
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).send('Internal Server Error');
    }
}

//register the user
async function register(req, res) {
    try {
        const { full_name, email, password, password_confirmed } = req.body;
        if (full_name && email && password && password_confirmed) {
            if (password !== password_confirmed) {
                return res.send('Password and Confirm Password do not match!');
            }
            const user = await userService.registerUser(full_name, email, password);
            res.redirect('/login');
        } else {
            return res.send('Please enter all fields!');
        }
    } catch (e) {
        console.error('Error during registration:', e);
        res.status(500).send('Internal Server Error');
    }
}

//logout the user
async function logout(req, res) {
    try {
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
    } catch (e) {
        console.error('Error during logout:', e);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    login,register,renderLogin,renderRegister,logout
};