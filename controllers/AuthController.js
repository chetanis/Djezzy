const userService = require('../services/userService');


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

module.exports = {
    login
};