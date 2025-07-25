const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const next = require('next');

const mode = process.env.MODE || 'build';

const categoryRoute = require('./routes/client-routes/category')
const orderRoute = require('./routes/client-routes/order')
const positionRoute = require('./routes/client-routes/position')
const clientEditRoute = require('./routes/client-routes/edit')
const callbackRoute = require('./routes/client-routes/callback')

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
app.use('/api/client-edit', clientEditRoute)
app.use('/api/request-call', callbackRoute)

app.use('/api/auth', authRoute)
app.use('/api/edit', editRoute)
app.use('/api/admin-category', adminCategoryRoute)
app.use('/api/admin-order', adminOrderRoute)
app.use('/api/admin-position', adminPositionRoute)

if (mode === 'build') {
    app.use('/admin', express.static('admin/dist/admin'))

    app.get('/admin/*', (req,res) =>
        res.sendFile(
            path.resolve(
                __dirname, 'admin', 'dist', 'admin', 'index.html'
            )
        )
    )
} else {
    const nextApp = next({ dev: false, dir: '../../babybedding-client-next' });
    const handle = nextApp.getRequestHandler();

    nextApp.prepare().then(() => {
        app.use('/admin', express.static('admin/dist/admin'))

        app.get('/admin/*', (req,res) =>
            res.sendFile(
                path.resolve(
                    __dirname, 'admin', 'dist', 'admin', 'index.html'
                )
            )
        )

        app.all('*', (req, res) => {
            return handle(req, res);
        });
    })
}



module.exports = app
