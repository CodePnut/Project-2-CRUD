const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  // req.session only exist when I write app.use(setCurrentUser) in server.js
  // console.log(req.session.userId);
  
  db.query(`SELECT * FROM games ORDER BY id;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    
    const games = result.rows;
    res.render('home', { games: games });
  });
});

module.exports = router;