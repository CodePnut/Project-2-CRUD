const db = require('../db')

function setCurrentUser(req, res, next) {
  res.locals.currentUser = {}
  res.locals.isLoggedIn = false

  // Guard condition - if user is not logged in
  if (!req.session.userId) {
    return next()
  }

  // Let's fetch the user record from the db
  const sql = `
    SELECT * FROM users WHERE id = $1;
  `
  db.query(sql, [req.session.userId], (err, result) => {
    if (err) console.log(err)

    let user = result.rows[0]

    // Set the current user
    res.locals.currentUser = user
    req.user = user; // Set req.user to the user object
    res.locals.isLoggedIn = true
    next()
  })
}

module.exports = setCurrentUser