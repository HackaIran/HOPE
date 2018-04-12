const axios = require("axios");

class Test {

    constructor() {

        // initiating events

        this.inititaEvents();

    }

    inititaEvents() {

        // onclick search Button

        let searchBtn = document.querySelector("#searchBoxCont>div");

        searchBtn.onclick = () => {

            searchBtn.style.opacity = 0.5;
            searchBtn.style.pointerEvents = "none";
            searchBtn.querySelector("i").classList.add("loading");

            this.preInitiateTest(document.querySelector("#searchBoxCont>input[type=search]").value);

        }

    }

    showLoading() {

    }

    preInitiateTest(url) {



    }

}

module.exports = Test;