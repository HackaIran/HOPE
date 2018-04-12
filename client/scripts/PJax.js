const axios = require("axios");

class PJax {

    /**
     * 
     * constructor
     * 
     */

    constructor(wrapperElemId) {

        this.wrapperElem = document.querySelector("#" + wrapperElemId);

        // if the user uses the bckward || forward btn on the browser

        window.onpopstate = (e) => {
            this.backOrForward(e);
        }
    }

    /**
     * 
     * @description appends a partial to the wrapperElem
     * 
     * @param {String} url - the url of the partial
     * 
     */

    appenPatial(url) {

        document.dispatchEvent(new Event("pjax:start"));

        axios.get(url, {
            headers: { 'X-pjax': 'true' }
        }).then((result) => {
            this.wrapperElem.innerHTML = result.data;
            // execute scripts
            let codes =this.wrapperElem.getElementsByTagName("script");
            for (let i = 0; i < codes.length; i++) {
                eval(codes[i].text);
            }
        })

        document.dispatchEvent(new Event("pjax:end"));

    }

    /**
     * 
     * @description push state the url
     * 
     * @param {String} url - the url of the page
     * 
     * @param {String} title - the title of the page
     * 
     */

    navigate(url, title) {
        history.pushState({}, title, url);
        document.title = title;
    }

    /**
     * 
     * @description goes backward or forward(depending on the user's action)
     * 
     * @param {Event} e
     * 
     */

    backOrForward(e) {
        this.appenPatial(e.path[0].location.pathname)
    }

}

module.exports = PJax;