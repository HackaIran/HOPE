window.$$ = (selector) => {
    return document.querySelector(selector);
}
//

const ProgressBar = require('../ProgressBar');

const Adviser = require('./Adviser');

//

const loading = new ProgressBar();

const adviser = new Adviser();

//

// show loading

loading.showLoading();

// add loading's events

document.addEventListener('pjax:start', () => {
    loading.showLoading();
})

document.addEventListener('pjax:end', () => {
    loading.hideLoading();
})

window.onload = () => {
    loading.hideLoading();
}