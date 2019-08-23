// server.js
// where your node app starts

// init project
const express = require('express')
const { login, callback, logout } = require('./login')
const app = express()

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// We need to use some session middleware
const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  if (req.session) {
    res.render('index', {
      uid: req.session.uid,
      user: req.session.username,
      picture: req.session.picture,
      accessToken: req.session.access_token
    })
  }
})

// auth methods
app.get('/login', login)
app.get('/callback', callback)
app.get('/logout', logout)

// listen for requests :)
const PORT = process.env.PORT || 7171
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
