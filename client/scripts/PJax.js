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

    appendPartial(url) {

        return new Promise((resolve, reject) => {

            document.dispatchEvent(new Event("pjax:start"));

            // let's fade out current content

            $$(".pjaxFadeItem").style.opacity = 0;

            setTimeout(()=>{

                axios.get(window.location.origin + url, {
                    headers: {
                        'X-pjax': 'true'
                    }
                }).then((result) => {
                    this.wrapperElem.innerHTML = result.data;
                    // execute scripts
                    let codes = this.wrapperElem.getElementsByTagName("script");
                    for (let i = 0; i < codes.length; i++) {
                        eval(codes[i].text);
                    }

                    

                    

                    setTimeout(()=>{

                        // let's fade in content

                        $$(".pjaxFadeItem").style.opacity = 1;

                        // Done;)

                        resolve();
                        
                    },500)

                    
                })

            },500)

            

            document.dispatchEvent(new Event("pjax:end"));

        })


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
        history.pushState({}, title, window.location.origin + "/" + url);
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

        if (/\/result\/.+/.test(e.path[0].location.pathname)) { // if the result page is requested
            window.location.reload();
            return false;
        }

        this.appendPartial(e.path[0].location.pathname)
    }

}

module.exports = PJax;