# Simple Login/Register System using Express and MySQL

This is a simple login/register system built using Express.js and MySQL. It allows users to create an account, log in, and access protected routes.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MySQL

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/chetanis/Login-Register-System.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Login-Register-System
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up the MySQL database:

   - Create a new database.
   - In the database, create a table named `users` with the following structure:

     ```sql
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         full_name VARCHAR(255)
     );
     ```

   - Update the database configuration in `db.js` with your MySQL credentials.


5. Start the application:

    ```bash
    npm start
    ```
