const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const categoryRoute = require('./routes/client-routes/category')
const orderRoute = require('./routes/client-routes/order')
const positionRoute = require('./routes/client-routes/position')
const clientEditRoute = require('./routes/client-routes/edit')

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

app.use('/api/auth', authRoute)
app.use('/api/edit', editRoute)
app.use('/api/admin-category', adminCategoryRoute)
app.use('/api/admin-order', adminOrderRoute)
app.use('/api/admin-position', adminPositionRoute)

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "babybedding.ua@gmail.com",
        pass: "adminBabyBed"
    }
});

transporter.use('compile', hbs({
    viewPath: './'
}))

app.post('/sendMailToUser', function(req, res, next) {
    transporter.sendMail({
        from: '"Baby Bedding" babybedding.ua@gmail.com', // sender address
        to: `its.ssmal@gmail.com, ${req.body.userEmail}`,// list of receivers
        subject: `Дякуємо! Ваше Замовлення на Baby Bedding`, // Subject line
        template: 'main',
        context: {
            positions: req.body.positions,
            sum: req.body.sum,
            userName: req.body.userName,
            userPhone: req.body.userPhoneNumber,
            area: req.body.area,
            city: req.body.city,
            department: req.body.department,
        }
    }, function (err, response) {
        if (err) {
            res.send(err)
        }
        res.send('good email')
    })
})

// app.use(express.static('admin/dist/admin'))
app.use(express.static('client/ng-client/dist/client/browser'))

app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(
            __dirname, 'client', 'ng-client', 'dist', 'client', 'browser', 'index.html'
        )
    )
})
//
// app.get('admin*', (req, res) => {
//     res.sendFile(
//         path.resolve(
//             __dirname, 'admin', 'dist', 'admin', 'index.html'
//         )
//     )
// })

//
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('admin/dist/admin'))
//     app.use(express.static('client/ng-client/dist/client/browser'))
//
//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(
//                 __dirname, 'client', 'ng-client', 'dist', 'client', 'browser', 'index.html'
//             )
//         )
//     })
    // app.get('*', (req, res) => {
    //     res.sendFile(
    //         path.resolve(
    //             __dirname, 'admin', 'dist', 'admin', 'index.html'
    //         )
    //     )
    // })
// }

module.exports = app
