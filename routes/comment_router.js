const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedin = require('../middlewares/ensureLoggedin')


router.post('/comments', ensureLoggedin, (req, res) => {
  const content = req.body.content;
  const game_id = req.body.game_id;
  const userId = req.session.userId;

  console.log(`game_id: ${game_id}, userId: ${userId}, content: ${content}`);

  if (!userId) {
    return res.status(400).send('User not logged in');
  }

  const sql = `
    INSERT INTO comments (content, game_id, user_id)
    VALUES ($1, $2, $3);
  `;

  db.query(sql, [content, game_id, userId], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database error');
    }

    res.redirect(`/games/${game_id}`);
  });
});

module.exports = router;
