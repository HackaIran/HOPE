const questions = require('../../config/adviser/questions.config');

//

const LicenseAdviser = require('hope-license-adviser');

const Advice = require('../model/Advice');

const AdviserController = {};

const licenseAdviser = new LicenseAdviser();

AdviserController.showAdviser = function(res){

    res.render('adviser/index',{'title':'Adviser',questions});
}

AdviserController.advice = function(answers) {
    return new Promise((resolve, reject) => {
        let results = licenseAdviser.advice(answers);
        this.save(answers, results).then(() => {
            resolve(results);
        })
    })
}

AdviserController.save = function(answers, licenses) {
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