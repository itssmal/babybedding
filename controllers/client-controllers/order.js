const Order = require('../../models/Order')
const errorhandler = require('../../utils/errorhandler')
const fs = require('fs')
const mailSender = require("../../services/email-sender");
const path = require("path");

const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../', '../', "/main.handlebars"), "utf8")

module.exports.create = async function (req, res) {
    fs.writeFile( __dirname + '/ip_addresses.txt', `
        IP_ADDRESS: ${req.connection.remoteAddress}. 
        Date: ${new Date(Date.now())}
        `,
        {'flag': 'a+'},
        (err) => {
            if (err) return console.log(err)
        })

    try {
        const lastOrder = await Order.findOne().sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            order: maxOrder + 1,
            positions: req.body.positions,
            userName: req.body.userName,
            userPhoneNumber: req.body.userPhoneNumber,
            userEmail: req.body.userEmail,
            area: req.body.area,
            city: req.body.city,
            department: req.body.department,
            paymentMethod: req.body.paymentMethod,
            notes: req.body.notes,
            done: false
        }).save()

        mailSender(emailTemplateSource, req.body, {to: req.body.userEmail})

        res.status(200).json('Замовлення створено!')
    } catch (e) {
        errorhandler(res, e)
    }
}


