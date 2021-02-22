const PDFDocument = require('pdfkit')
const DB = require('../models/index')
const fs = require("fs");
const Participant = DB.Participant
const {Op} = require("sequelize");
const pathToBackgroundImage = '/images/background_light.jpg';
const pathToBlackAndWhiteBackgroundImage = '/images/background_light2.jpg';
const pathToLogoRight = '/images/fc_st_pauli_marathon_logo.png';

exports.get = (req, res, next) => {
    const startnumber = req.params.startnumber
    Participant.findOne({
        where: {
            startNumber: startnumber
        }
    })
        .then(p => {
            res.setHeader("content-type", "application/pdf");
            res.setHeader('Content-disposition', 'attachment; filename=startnummer.pdf');
            generatePdf(p).pipe(res)
            res.status(200)
        }).catch(err => { next(err)})
}


function generatePdf(participant) {
    let doc = new PDFDocument({size: 'A5', layout: 'landscape', margin: 0});
    doc.image(__dirname + "/../" + pathToBackgroundImage,{fit:[630,632] });
    doc.image(__dirname + "/../" + pathToLogoRight, 515, 0, {fit: [80, 80]});
    doc.font('Helvetica-Bold').fontSize(200).fillColor("brown").text(participant.startNumber, 0, 30, {align: 'center'});
    if (participant.firstName) {doc.fontSize(40).fillColor('orange').text(participant.firstName, 0, 190, {align: 'center'});}
    if (participant.team) {doc.fontSize(40).fillColor('white').text(participant.team, 0, 230, {align: 'center'});}
    if (participant.hasPayed == false) {
        doc.rotate(20)
        doc.font('Helvetica-Bold').fontSize(40).fillColor("yellow").text("Noch nicht bezahlt", 0, 30, {align: 'center'});
        doc.rotate(-20)
    }
    doc.addPage();
    doc.image(__dirname + "/../" + pathToBlackAndWhiteBackgroundImage,{fit:[630,632] });
    doc.image(__dirname + "/../" + pathToLogoRight, 515, 0, {fit: [80, 80]});
    doc.font('Helvetica-Bold').fontSize(200).fillColor("black").text(participant.startNumber, 0, 55, {align: 'center'});
    if (participant.hasPayed == false) {
        doc.rotate(20)
        doc.font('Helvetica-Bold').fontSize(40).fillColor("yellow").text("Noch nicht bezahlt", 0, 30, {align: 'center'});
        doc.rotate(-20)
    }
    if (participant.firstName) {doc.fontSize(40).fillColor('black').text(participant.firstName, 0, 323, {align: 'center'});}
    if (participant.team) {doc.fontSize(40).fillColor('black').text(participant.team, 0, 370, {align: 'center'});}
    doc.end();
    return doc
}