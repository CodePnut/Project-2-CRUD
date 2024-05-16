const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db"); // replace './db' with the path to your db.js file

// GET route for signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// POST route for signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const plainTextPassword = req.body.password;

  // Hash the password
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

  const sql = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3);
    `;

  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.send("Error occurred");
    } else {
      res.redirect("/login");
    }
  });
});

// GET route for login page
router.get("/login", (req, res) => {
  res.render("login");
});

// POST route for login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const plainTextPassword = req.body.password;

// validate the user input
if (email && email.length < 3) {
  return res.render('login', { errorMessage: 'email is too short' })
}

// 2. check if user exists in the database using the email address
const sql = `
  SELECT *
  FROM users
  WHERE email = $1;
`

db.query(sql, [email], (err, result) => {
  if (err) {
    console.log(err)
    return res.render('login')
  }

  if (result.rows.length === 0) {
    console.log('user not found')
    return res.render('login', { errorMessage: 'incorrect email or password' })
  }

  // 3. check password is valid or not
  const hashedPassword = result.rows[0].password

  bcrypt.compare(plainTextPassword, hashedPassword, (err, isCorrect) => {
    if (err) console.log(err)

    if (!isCorrect) {
      console.log('password doesnt match')
      return res.render('login', { errorMessage: 'incorrect email or password' })
    }

    // 4. yay - its time to create a session for this user
    req.session.userId = result.rows[0].id
    res.redirect('/')
  })
})
})

// DELETE route for logout
router.delete("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/login");
});

module.exports = router;
