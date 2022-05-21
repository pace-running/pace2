const PDFDocument = require('pdfkit')
const Archiver = require('archiver')
const DB = require('../models/index')
const fs = require("fs");
const Participant = DB.Participant
const {Op} = require("sequelize");
const pathToBackgroundImage = '/images/startnumber_background.jpg';
const pathToLogoRight = '/images/fc_st_pauli_marathon_logo.png';


let zipDir = process.env.ZIPDIR || '/tmp/';

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

exports.onSiteZip = (req,res,next) => {
    Participant.findAll(
        { order: ['startNumber'] }
    ).then(p => {
        res.status(200);
        createZip(p, res).then(() =>{
            res.send('done')
            }).catch(err => {next(err)})
        }).catch(err => {next(err)})
}

exports.onSiteZipDownload = (req, res, next) => {
    res.setHeader("content-type", "application/zip");
    fs.createReadStream(zipDir + '/startnumbers.zip').pipe(res);
}

async function createZip(participants, res) {
     let zip = Archiver('zip');
    const output = fs.createWriteStream( zipDir + '/startnumbers.zip');
    zip.pipe(output)
    zip.on('error', (err) => {
        console.log(err)
    })
    for (const participant of participants) {
        await appendPDF(participant,zip)
    }
    zip.finalize();
}

function appendPDF(participant, zip) {
    let startnumber = participant.getDataValue('startNumber')
    return new Promise(resolve => {
        zip.on('entry', () => {
           resolve();
        })
        console.log("generating pdf for: ", startnumber)
        zip.append(generatePdf(participant.dataValues), {name: startnumber + ".pdf"})
    })
}

function generatePdf(participant) {
    let doc = new PDFDocument({size: 'A5', layout: 'landscape', margin: 0});
    doc.image(__dirname + "/../" + pathToBackgroundImage,{fit:[630,632] });
    doc.image(__dirname + "/../" + pathToLogoRight, 495, 15, {fit: [80, 80]});
    doc.font('Helvetica-Bold').fontSize(160).fillColor("#bf82d0").text(participant.startNumber, 5, 180, {align: 'right', width: 360});
    doc.font('Helvetica-Bold').fontSize(8).fillColor("white").text("©Stefan Groenveld", 480, 402, {align: 'center'});
    if (participant.firstName) {doc.fontSize(40).fillColor('#a02dc5').text(participant.firstName, 0, 20, {align: 'center'});}
    if (participant.team) {doc.fontSize(40).fillColor('white').text(participant.team, 0, 370, {align: 'center'});}
    if (participant.hasPayed == false) {
        doc.font('Helvetica-Bold').fontSize(8).fillColor("yellow").text("noch nicht bezahlt", 0, 405, {align: 'center'});
    }
    doc.end();
    return doc
}