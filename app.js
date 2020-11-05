const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


// Database
const db = require('./config/database')

// test db
db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log(err))

const app = express()

// Express Handlebars
app.engine('.hbs', exphbs({ defaultLayout:'main', extname : '.hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)}))
app.set('view engine', '.hbs')

// Set Statuc folder
app.use(express.static(path.join(__dirname, 'public')))

// use built in body-parser
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// Home Route
app.get('/', (req,res) => {
    res.render('home')
})

// Gig Routes
app.use('/gigs', require('./routes/gigs'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))