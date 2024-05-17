require('dotenv').config()

const express = require('express')
const app = express()
const port = 8181
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const homeRouter = require('./routes/home_router')
const gameRouter = require('./routes/game_router')
const commentRouter = require('./routes/comment_router')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const ensureLoggedin = require('./middlewares/ensureLoggedin')
const requestLogger = require('./middlewares/request_logger')
const authRouter = require('./routes/auth_router')
const favouritesRouter = require('./routes/favourites_router')




app.set('view engine', 'ejs')

//Make moment available to all EJS templates
app.locals.moment = require('moment')

app.use(expressLayouts)

app.use(express.static('public'))

app.use(methodOverride('_method'))

// app.use(express.json())
// Review - Solution to my initial problem
app.use(express.urlencoded())

app.use(requestLogger)


app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(setCurrentUser)

app.use((req, res, next) => {
  console.log(req.user);
  next();
});


app.use(homeRouter)
app.use(gameRouter)
app.use(commentRouter)
app.use(authRouter)
app.use(favouritesRouter);


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})