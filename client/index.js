const ProgressBar = require("./scripts/ProgressBar");

const Test = require("./scripts/Test");

//

const loading = new ProgressBar();

const test = new Test();

window.test = test;

//

// show loading

loading.showLoading();

// add loading's events

document.addEventListener("pjax:start",()=>{
    loading.showLoading();
})

document.addEventListener("pjax:end",()=>{
    loading.hideLoading();
})

window.onload = ()=>{
    loading.hideLoading();
}