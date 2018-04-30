const LicenseAdviser = require('hope-license-adviser');

const Advice = require('../model/Advice');

const AdviserController = {};

const licenseAdviser = new LicenseAdviser();

AdviserController.advice = (answers) => {
    return new Promise((resolve, reject) => {
        let results = licenseAdviser.advice(answers);
        AdviserController.save(answers, results).then(() => {
            resolve(results);
        })
    })
}

AdviserController.save = (answers, licenses) => {
    return new Promise((resolve, reject) => {
        let newAdvice = new Advice({
            answers,
            licenses
        });
        newAdvice.save().then(() => {
            resolve();
        })
    })
}

module.exports = AdviserController;