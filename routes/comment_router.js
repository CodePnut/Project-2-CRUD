const express = require('express')
const router = express.Router()
const db = require('../db')


router.post('/comments', (req, res) => {
  let content = req.body.content
  let gameId = req.body.game_id

  let sql = `
    INSERT INTO comments 
    (content, game_id) 
    VALUES 
    ($1, $2);
  `

  db.query(sql, [content, gameId], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect(`/games/${gameId}`);
  });
});

module.exports = router
