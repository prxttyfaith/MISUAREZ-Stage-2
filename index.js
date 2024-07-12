require('dotenv').config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());

const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected");
    }
});

app.get("/", (req, res) => {
    res.send("Javascript");
});

app.post('/', (req, res) => {
    const { favorite } = req.body;
    db.query(`INSERT INTO programming_languages (favorites) VALUES (?)`, [favorite], (err, result) => {
        if (err) {
            res.status(500).send('Failed to insert the favorite programming language.');
            throw err;
        }
        res.status(200).send('Successfully added favorite programing language.');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

/*
CREATE DATABASE sysdev_recruitment;

CREATE TABLE programming_languages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  favorites VARCHAR(255)
);
*/

/*
Test the API using curl:
curl -X POST http://localhost:3000 \
     -H "Content-Type: application/json" \
     -d '{"favorite":"Javascript"}'
*/