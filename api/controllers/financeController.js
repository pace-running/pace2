"use strict";

const csv = require('fast-csv');

const headers = [
    'Buchungstag', 'Valuta', 'Textschl黶sel', 'Auftraggeber/Zahlungsempfänger', 'Empfänger/Zahlungspflichtiger', 'Konto-Nr.', 'IBAN', 'BLZ', 'BIC', 'Vorgang/Verwendungszweck', 'Kundenreferenz', 'Währung', 'Umsatz', 'H'
];
const TOKEN_LENGTH = 9;
const TOKEN_PREFIX = 'LGR-';

const buchungstagPattern = /\d{2}\.\d{2}\.\d{4}/;

function PaymentRow(statement) {
    const reason = statement['Vorgang/Verwendungszweck'];
    const removeUberweisung = (text) => text.replace(/^.*berweisungsgutschr\./, '');
    const removeNewLines = (text) => text.replace(/\n/g, '');
    const removeIBAN = (text) => text.replace(/IBAN:\sDE\d{20}/g, '');
    const removeBIC = (text) => text.replace(/BIC:\s\w{11}/, '');

    const getReason = () => reason;

    const getAmount = () => {
        return parseInt(statement.Umsatz, 10);
    }

    const getPossibleTokens = () => {
        return removeBIC(removeIBAN(removeNewLines(removeUberweisung(reason))))
            .trim()
            .split(' ')
            .filter(text => text.length === TOKEN_LENGTH)
            .filter(text => text.startsWith(TOKEN_PREFIX));
    };

    return {
        getPossibleTokens,
        getReason,
        getAmount
    }
}

function parse(file,res) {
    csv
        .parseFile(file, {delimiter: ';', headers: headers})
        .on('error', error => {
            console.error(error)
            res.end()
        })
        .on("data", statement => {
            if (buchungstagPattern.test(statement.Buchungstag)) {
                let row = new PaymentRow(statement)
                console.log(row.getPossibleTokens())
                res.write(row.getPossibleTokens().toString())
            }
        })
        .on("end", () => {
            console.log('done');
            res.end()
        })
};

exports.importPayments = (req, res, next) => {
    let file = req.file.destination + req.file.filename;
    parse(file, res)
}

