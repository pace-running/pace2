const PDFDocument = require('pdfkit')
const DB = require('../models/index')
const fs = require("fs");
const Participant = DB.Participant
const {Op} = require("sequelize");
const pathToBackgroundImage = '/images/startnumber_background.jpg';
const pathToLogoRight = '/images/fc_st_pauli_marathon_logo.png';

exports.get = (req, res, next) => {
    const startnumber = req.params.startnumber
    Participant.findOne({
        where: {
            startNumber: startnumber
        }
    })
        .then(p => {
            if (req.params.token === p.getDataValue('secretToken')) {
                res.setHeader("content-type", "application/pdf");
                res.setHeader('Content-disposition', 'attachment; filename=startnummer.pdf');
                generatePdf(p).pipe(res)
                res.status(200)
            }
            else {
                res.status(401)
                res.send("Unauthorized")
            }
        }).catch(err => { next(err)})
}


function generatePdf(participant) {
    let doc = new PDFDocument({size: 'A5', layout: 'landscape', margin: 0});
    doc.image(__dirname + "/../" + pathToBackgroundImage,{fit:[630,632] });
    doc.image(__dirname + "/../" + pathToLogoRight, 515, 0, {fit: [80, 80]});
    doc.font('Helvetica-Bold').fontSize(160).fillColor("#bf82d0").text(participant.startNumber, 5, 180, {align: 'right', width: 360});
    doc.font('Helvetica-Bold').fontSize(8).fillColor("white").text("©Stefan Groenveld", 500, 410, {align: 'center'});
    if (participant.firstName) {doc.fontSize(40).fillColor('#a02dc5').text(participant.firstName, 0, 20, {align: 'center'});}
    if (participant.team) {doc.fontSize(40).fillColor('white').text(participant.team, 0, 370, {align: 'center'});}
    if (participant.hasPayed == false) {
        doc.rotate(20)
        doc.font('Helvetica-Bold').fontSize(40).fillColor("yellow").text("Noch nicht bezahlt", 0, 30, {align: 'center'});
        doc.rotate(-20)
    }
    doc.end();
    return doc
}