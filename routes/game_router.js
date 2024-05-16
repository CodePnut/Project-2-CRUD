const express = require("express");
const db = require("../db");
const router = express.Router();
// ---------------------------------------------------------------------------------------------------------------------------
router.post("/games", (req, res) => {
  let title = req.body.title;
  let imageURL = req.body.image_url;
  let description = req.body.description;
  let genre = req.body.genre;
  let platform = req.body.platform;
  let releaseDate = req.body.release_date;

  let sql = `
    INSERT INTO games 
    (title, image_url, description, genre, platform, release_date) 
    VALUES 
    ($1, $2, $3, $4, $5, $6);
  `;
  // insert the game into the database
  // asychonrous functions
  db.query(
    sql,
    [title, imageURL, description, genre, platform, releaseDate],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.redirect("/");
    }
  );
});
// ---------------------------------------------------------------------------------------------------------------------------
router.post("/comments", (req, res) => {
  let content = req.body.content;
  let gameId = req.body.game_id;

  let sql = `
    INSERT INTO comments 
    (content, game_id) 
    VALUES 
    ($1, $2);
  `;

  db.query(sql, [content, gameId], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect(`/games/${gameId}`);
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
router.get("/games", (req, res) => {
  //First I need to write an SQL query to get all the games from my DB

  const sql = ` 
  SELECT * FROM games
  `;

  //Then I need to run the query using the db.query method

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err); // if there is an error, log it
    }

    const games = result.rows; // if there is no error, get the games from the result
    res.render("allGames", {
      games: games,
      moment: require("moment"),
    });
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
router.get("/games/:id", (req, res) => {
  const sql = `
    SELECT * FROM games WHERE id = $1;
  `;
  const commentsSql = `
    SELECT * FROM comments WHERE game_id = $1;
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    // we are expecting just one record
    const gameObj = result.rows[0];
    db.query(commentsSql, [req.params.id], (err, result) => {
      if (err) console.log(err);

      const comments = result.rows;
      // we have the game & the comments
      // now we're ready to send a response back to the client

      res.render("show", {
        game: gameObj,
        comments: comments,
      });
    });
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
router.get("/games/:id/edit", (req, res) => {
  const sql = `
  SELECT * FROM games WHERE id = $1;
`;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    const game = result.rows[0];

    if (!game) {
      res.status(404).send('Game not found');
    } else {
      res.render('edit', { game: game });
    }
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
router.get("/share", (req, res) => {
  res.render("share");
});
// ---------------------------------------------------------------------------------------------------------------------------
router.delete("/games/:id", (req, res) => {
  const sql = `
    DELETE FROM games WHERE id = $1;
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/");
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
router.put("/games/:id", (req, res) => {
  const title = req.body.title;
  const imageURL = req.body.image_url;
  const description = req.body.description;
  const genre = req.body.genre;
  const platform = req.body.platform;
  const releaseDate = req.body.release_date;
  const id = req.params.id;

  const sql = `
    UPDATE games
    SET title = $1, image_url = $2, description = $3, genre = $4, platform = $5, release_date = $6
    WHERE id = $7;
  `;

  db.query(
    sql,
    [title, imageURL, description, genre, platform, releaseDate, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      res.redirect(`/games/${id}`);
    }
  );
});
// ---------------------------------------------------------------------------------------------------------------------------
module.exports = router;


// Errors: Cannot update in Edit page
// Solution: Change the name of the input fields in the edit.ejs file to match the names in the database
