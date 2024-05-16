const express = require('express');
const router = express.Router();
const db = require('../db'); // replace with your actual db file path

// Middleware to ensure user is logged in
const ensureLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Route to add a game to favourites
router.post('/favourites', ensureLoggedIn, (req, res) => {
  const game_id = req.body.game_id;
  const userId = req.session.userId;

  const sql = `
    INSERT INTO
      favourites
    (game_id, user_id)
      VALUES
    ($1, $2);
  `;

  db.query(sql, [game_id, userId], (err) => {
    if (err) console.log(err);
    res.redirect(`/games/${game_id}`);
  });
});

// Route to view favourite games
router.get('/favourites', ensureLoggedIn, (req, res) => {
  const userId = req.session.userId;

  const sql = `
    SELECT games.*
    FROM games
    INNER JOIN favourites ON games.id = favourites.game_id
    WHERE favourites.user_id = $1;
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) console.log(err);
    res.render('favourite', { favouriteGames: result.rows });
  });
});

// Route to remove a game from favourites
router.delete('/favourites/:id', ensureLoggedIn, (req, res) => {
  const gameId = req.params.id;
  const userId = req.session.userId;

  const sql = `
    DELETE FROM favourites
    WHERE game_id = $1 AND user_id = $2;
  `;

  db.query(sql, [gameId, userId], (err) => {
    if (err) console.log(err);
    res.redirect('/favourites');
  });
});


module.exports = router;