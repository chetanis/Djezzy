const pool = require('../db');

async function authenticateUser(email, password) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0 ) {

            const user = { ...rows[0] };

            if (password === user.password) {
                delete user.password; // Remove the password field from the user object
                return user; // User found and password matched
            } else {
                return null; // Password didn't match
            }
        }
    } catch (error) {
        console.error('Error in authenticateUser:', error);
        throw error; // Propagate the error to the caller
    }
}

module.exports = {
    authenticateUser
};
