require('dotenv').config()

const express = require('express')
const { auth, requiresAuth } = require('express-openid-connect')

const app = express()

app.set('view engine', 'ejs')

app.use(auth({ required: false }))

app.use((req, res, next) => {
  res.locals.user = req.openid.user
  next()
})

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard')
  }
  res.render('landing')
})

app.get('/dashboard', requiresAuth(), (req, res) => {
  res.render('dashboard')
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => console.log(`App listening in port ${PORT}`))
