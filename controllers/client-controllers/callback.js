const mailSender = require('../../services/email-sender')
const fs = require("fs");
const path = require("path");

const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../', '../', '/mail-templates', '/callback.handlebars'), "utf8")

module.exports.requestCall = async function (req, res) {
    try {
        await mailSender(emailTemplateSource, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            message: req.body.message,
        }, {
            to: 'babybedding.chernivtsi@gmail.com',
            subject: 'Новий запит на зворотній дзвінок'
        })

        return res.status(200).send({success: true})
    } catch (error) {
        res.status(500).send(error)
    }
}
