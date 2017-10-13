const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/main')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.port || 3000
const userRoutes = require('./app/routes/users')
const expenseRoutes = require('./app/routes/expenses')
const commonRoutes = require('./app/routes/common')
const blogRoutes = require('./app/routes/common')
const session = require('express-session')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')

require('./config/passport')(passport)


// Connect To Database
mongoose.connect(config.database, (err) => {
	err ? console.log(err) : console.log('Connected database...')
})

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('body-parser').json({type: '*/*'}))

// Set up our express application
app.use(morgan('dev'))

// Enable CORS from client-side
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With. Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
	res.setHeader('Access-Control-Allow-Credentials', 'true')
	next()
})

// Passport Middleware
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./config/passport')(passport)

// API
app.use('/', commonRoutes)
app.use('/api/users', userRoutes)
app.use('/api/expenses', expenseRoutes)



// require('./app/routes/routes')(app, passport);


// Start Server on Port 3000
app.listen(port, () => console.log('Server started on port ' + port))
