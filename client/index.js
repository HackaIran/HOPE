window.$$ =(selector)=>{
    return document.querySelector(selector);
}
//

const ProgressBar = require('./scripts/ProgressBar');

const Test = require('./scripts/Test');

const ScrollAnimate = require('./scripts/ScrollAnimate');

//

const loading = new ProgressBar();

window.test = new Test();

window.ScrollAnimate = ScrollAnimate;

//

// show loading

loading.showLoading();

// add loading's events

document.addEventListener('pjax:start',()=>{
    loading.showLoading();
})

document.addEventListener('pjax:end',()=>{
    loading.hideLoading();
})

window.onload = ()=>{
    loading.hideLoading();
}