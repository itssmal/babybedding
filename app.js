const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const categoryRoute = require('./routes/client-routes/category')
const orderRoute = require('./routes/client-routes/order')
const positionRoute = require('./routes/client-routes/position')
const authRoute = require('./routes/admin-routes/auth')
const editRoute = require('./routes/admin-routes/edit')
const adminCategoryRoute = require('./routes/admin-routes/category')
const adminOrderRoute = require('./routes/admin-routes/order')
const adminPositionRoute = require('./routes/admin-routes/position')

const keys = require('./config/keys')
const app = express()

mongoose.set('useFindAndModify', false)

mongoose.connect(
    keys.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('Mongo connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/category', categoryRoute)
app.use('/api/order', orderRoute)
app.use('/api/position', positionRoute)

app.use('/api/auth', authRoute)
app.use('/api/edit', editRoute)
app.use('/api/admin-category', adminCategoryRoute)
app.use('/api/admin-order', adminOrderRoute)
app.use('/api/admin-position', adminPositionRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('admin/dist/admin'))

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'admin', 'dist', 'index.html'
            )
        )
    })
}

module.exports = app
