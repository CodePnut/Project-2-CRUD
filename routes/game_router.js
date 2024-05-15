const express = require('express');
const db = require('../db');
const router = express.Router();



router.get('/games/:id', (req, res) => {
  const sql = `
    SELECT * FROM games WHERE id = $1;
  `
  const commentsSql = `
    SELECT * FROM comments WHERE game_id = $1;
  `


  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    // we are expecting just one record
    const gameObj = result.rows[0]

    db.query(commentsSql, [req.params.id], (err, result) => {
      if (err) console.log(err)

      const comments = result.rows

      // we have the game & the comments
      // now we're ready to send a response back to the client

      res.render('show', { 
        game: gameObj, 
        comments: comments 
      })
    })
  })
})

router.get('/share', (req, res) => {
  res.render('share')
})

router.post('/games', (req, res) => {
  let title = req.body.title
  let imageURL = req.body.image_url
  let description = req.body.description
  let genre = req.body.genre
  let platform = req.body.platform
  let releaseDate = req.body.release_date

  let sql = `
    INSERT INTO games 
    (title, image_url, description, genre, platform, release_date) 
    VALUES 
    ($1, $2, $3, $4, $5, $6);
  `
  // insert the game into the database
  // asychonrous functions
  db.query(sql, [title, imageURL, description, genre, platform, releaseDate], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect('/')
  })
})

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

    res.redirect(`/games/${gameId}`)
  })
})

module.exports = router;