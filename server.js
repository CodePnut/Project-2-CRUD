require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const homeRouter = require('./routes/home_router')


app.set('view engine', 'ejs')

app.use(expressLayouts)

app.use(express.static('public'))

app.use(methodOverride('_method'))






app.use(homeRouter)
// app.use(sessionRouter)
// app.use(gameRouter)
// app.use(commentRouter)


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})