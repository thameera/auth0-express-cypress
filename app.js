require('dotenv').config()

const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('landing')
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => console.log(`App listening in port ${PORT}`))
