const hbs = require("handlebars");
const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const keys = require("../config/keys");

hbs.registerHelper('eq', function (a, b) {
    return a === b;
})

const auth = {
    auth: {
        api_key: keys.mailApi,
        domain: keys.mailDom
    },
    host: 'api.eu.mailgun.net'
}

module.exports = async (emailTemplate, emailData, emailConfig) => {
    const transporter = nodemailer.createTransport(mailgun(auth))

    const template = hbs.compile(emailTemplate)
    const htmlToSend = template(emailData)

    await transporter.sendMail({
        from: 'Baby Bedding babybedding.chernivtsi@gmail.com',
        subject: `Дякуємо! Ваше Замовлення на Baby Bedding`,
        html: htmlToSend,
        ...emailConfig,
        // to: `babybedding.chernivtsi@gmail.com, ${emailConfig.to}`,
    }, (err, info) => {
        console.log(info)
        if (err) {
            console.log('ERROR on mail sending', err)
        }
    })
};
