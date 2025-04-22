const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create a database connection pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10
});

// @desc    Submit a player rating
// @route   POST /api/v1/rating/submit
// @access  Public
router.post('/submit', async (req, res) => {
    console.log('eiei')
    const { player1, player2, ratings } = req.body;
    const { kills, damageDealt, timeSurvived, teamwork, headshotAccuracy} = ratings;

    const sql = `
        INSERT INTO pubs (playerName1, playerName2, kills, damageDealt, survivalTime, teamWork, headShortAcc)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [player1, player2, kills, damageDealt, timeSurvived, teamwork, headshotAccuracy];

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        connection.query(sql, values, (error, results) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
                console.error('Error inserting rating:', error);
                return res.status(500).json({ error: 'Failed to save rating' });
            }

            console.log('Rating saved successfully:', results);
            res.status(200).json({ message: 'Rating submitted successfully' });
        });
    });
});

module.exports = router;