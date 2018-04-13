window.$$ = (selector) => {
    return document.querySelector(selector);
}
//

const ProgressBar = require('./scripts/ProgressBar');

const Test = require('./scripts/Test');

//

const loading = new ProgressBar();

window.test = new Test();

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

// let's add some utilities

window.getParameterByName = (name, url)=>{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}