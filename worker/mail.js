"use strict";

const pug = require('pug')
const nodemailer = require("nodemailer");
const mailserver = process.env.WORKER_MAILSERVER || "smtp://localhost:25?pool=true&ignoreTLS=true"
const base_url = process.env.BASE_URL || "http://localhost:8080/"
let transporter = nodemailer.createTransport(mailserver);

const confirmationTemplate = pug.compileFile('templates/confirmation.pug');
const paymentConfirmationTemplate = pug.compileFile('templates/paymentConfirmation.pug')

exports.registrationEmail = (participant) => {
    console.log(participant)
    participant.base_url = base_url
    transporter.sendMail({
        from: '"Lauf gegen Rechts" <info@lauf-gegen-rechts.de>', // sender address
        to: participant.email,
        subject: `[${participant.paymentToken}] Lauf gegen Rechts 2021: Anmeldebestätigung`, // Subject line
        text: "Bestätigungsmail vom Lauf gegen Rechts 2021. Infos im HTML.", // plain text body
        html: confirmationTemplate(participant)
    }).then(result => {
        console.log(result.response)
    });
}

exports.confirmationEmail = (participant) => {
    participant.base_url = base_url
    transporter.sendMail({
        from: '"Lauf gegen Rechts" <info@lauf-gegen-rechts.de>', // sender address
        to: participant.email,
        subject: `[${participant.paymentToken}] Lauf gegen Rechts 2021: Zahlung erhalten`, // Subject line
        text: "Bestätigungsmail vom Lauf gegen Rechts 2021. Infos im HTML.", // plain text body
        html: paymentConfirmationTemplate(participant)
    }).then(result => {
        console.log(result.response)
    });
}

exports.bulkmail = (data) => {
        transporter.sendMail({
            from: '"Lauf gegen Rechts" <info@lauf-gegen-rechts.de>', // sender address
            to: data.address,
            subject: data.subject,
            text: "Lauf gegen Rechts 2021. Infos im HTML.", // plain text body
            html: data.html
        })
}