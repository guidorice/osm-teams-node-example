const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 7171
const APP_URL = `http://localhost:${PORT}`

const credentials = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://dev.mapping.team/',
    tokenPath: '/hyauth/oauth2/token',
    authorizePath: '/hyauth/oauth2/auth'
  }
}

const oauth2 = require('simple-oauth2').create(credentials)

var generateState = function (length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function login (req, res) {
  const state = generateState(24)
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${APP_URL}/callback`,
    scope: 'openid offline',
    state
  })
  req.session.login_csrf = state

  res.redirect(authorizationUri)
}

async function callback (req, res) {
  const { code, state } = req.query
  /**
   * Token exchange with CSRF handling
   */
  if (state !== req.session.login_csrf) {
    req.session.destroy(function (err) {
      if (err) console.error(err)
      return res.status(500).json('State does not match')
    })
  } else {
    // Flush csrf
    req.session.login_csrf = null

    // Create options for token exchange
    const options = {
      code,
      redirect_uri: `${APP_URL}/callback`
    }

    try {
      const result = await oauth2.authorizationCode.getToken(options)

      // We get an id token that contains the user information
      // "sub" is the osm id of the user that logged in
      const { sub, preferred_username, picture } = jwt.decode(result.id_token)

      // At this point you should store the access token and refresh token in
      // a database or in memory for the user. We store it here in the session
      // The user id is "sub", and the "result" contains both the access token
      // and the refresh token

      // use the access token to sign requests to the osm teams api
      // and the refresh token to request new access tokens when they expire
      req.session.access_token = result.access_token

      // get information from the id token
      req.session.uid = sub
      req.session.username = preferred_username
      req.session.picture = picture

      return res.redirect(APP_URL)
    } catch (error) {
      console.error(error)
      return res.status(500).json('Authentication failed')
    }
  }
}

/**
 * Logout deletes the session from the manage app
 * @param {*} req
 * @param {*} res
 */
function logout (req, res) {
  req.session.destroy(function (err) {
    if (err) console.error(err)
    res.redirect(APP_URL)
  })
}

module.exports = {
  login,
  callback,
  logout
}
