require('dotenv').config()

/*
 * Most of the code here is based on lib/appSession.js in express-openid-connect module
 */

const { JWK, JWE } = require('jose')
const hkdf = require('futoin-hkdf')

const deriveKey = (secret) =>
  hkdf(secret, 32, { info: 'JWE CEK', hash: 'SHA-256' })

const key = JWK.asKey(deriveKey(process.env.APP_SESSION_SECRET))
const alg = 'dir'
const enc = 'A256GCM'

const epoch = () => (Date.now() / 1000) | 0

const encrypt = (payload, headers) =>
  JWE.encrypt(payload, key, { alg, enc, zip: 'DEF', ...headers })

const userObj = {
  email: 'me@thameera.com',
  sub: 'auth0|1234',
  picture:
    'https://s.gravatar.com/avatar/8b6880a0b9d7f36867eee61241cbef31?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fme.png',
}

module.exports = {
  getCookie: () => {
    const iat = epoch()
    const uat = iat
    const exp = iat + 24 * 60 * 60 * 365 // 1 year - because otherwise we have to re-run `npm test` each time the cookie expires
    return {
      COOKIE: encrypt(JSON.stringify({ claims: userObj }), { iat, uat, exp }),
    }
  },
}
