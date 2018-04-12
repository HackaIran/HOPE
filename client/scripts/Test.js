const axios = require("axios");
const PJax = require('./PJax');

class Test {

    /**
     * 
     * construtor
     * 
     */

    constructor() {
        this.pjax = new PJax("wrapper");
    }

    /**
     * 
     * @description listens on the search button click event
     * 
     */

    inititaEvents() {

        // onclick search Button

        let searchBtn = document.querySelector("#searchBoxCont>div");

        searchBtn.onclick = () => {

            // Let's validate the url

            let url = document.querySelector("#searchBoxCont>input[type=search]").value;

            let urlRegex = /^(?:http|https):\/\/github\.com\/([\w-]+?)\/([\w-]+?)(?:\.git|)$/i;

            if (!url || !urlRegex.test(url)) {

                //error
                return;

            }

            searchBtn.style.opacity = 0.5;
            searchBtn.style.pointerEvents = "none";
            searchBtn.querySelector("i").classList.add("loading");

            this.preInitiateTest(url).then((uniqueName, repositoryName) => {
                this.pjax.navigate('result/' + uniqueName, "HOPE - Result of " + repositoryName);

                this.pjax.appenPatial('/result/' + uniqueName);

                this.getResult(uniqueName).then((result) => {

                    result = result.data;

                    this.appendResult(result);

                })
            })

        }

    }

    /**
     * 
     * @description send a request to server to get a unique name for the test
     * 
     * @param {String} url - repositoryUrl
     * 
     */

    preInitiateTest(url) {

        return new Promise((resolve) => {



            axios.post('api/preInitialTest', {
                repositoryUrl: url
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((result) => {

                let uniqueName = result.data.uniqueName;

                let repositoryName = uniqueName.split("-");

                repositoryName.pop();

                repositoryName = repositoryName.join(" ");

                resolve(uniqueName, repositoryName)

            })
        })
    }

    /**
     * 
     * @description gets the result of the test
     * 
     * @param {String} uniqueName - the unique name that we got from the initialTest
     * 
     */

    getResult(uniqueName) {
        return new Promise((resolve, reject) => {
            axios.post('/api/initiateTest', {
                uniqueName
            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(resolve)
        })
    }

    appendResult(data) {

        $$("#scoreText").innerText = data.scoreText;

        $$("#score").innerText = data.mark;

        $$("#score").classList = data.scoreColor;

        $$("#scoreText").classList = data.scoreColor;

        // hide score section loading

        $$(".resultSide:first-of-type .blur").classList.remove('blur');

        $$(".resultSide:first-of-type .loadingOverlay").style.display = "none";

        // let's add tips

        for (let tip of data.result) {

            let tipCont = document.createElement("div");
            tipCont.classList.add("tip");

            let status = document.createElement("i");
            status.classList.add("tipType");
            status.classList.add(tip.status.toLowerCase());

            let fixIcon = document.createElement("a");
            fixIcon.href = "#";
            fixIcon.classList.add("tipFix");

            let tipContent = document.createElement("div");
            tipContent.classList.add("tipContent");

            let tipHeading = document.createElement("div");
            tipHeading.classList.add("tipHeading");
            tipHeading.textContent = tip.type;

            let tipHelp = document.createElement("a");
            tipHelp.href = "#";
            tipHelp.classList.add("tipHelp");

            let tipText = document.createElement("div");
            tipText.classList.add("tipText");
            tipText.textContent = tip.message;

            // appending

            tipContent.appendChild(tipHeading);
            tipContent.appendChild(tipHelp);
            tipContent.appendChild(tipText);

            tipCont.appendChild(status);
            tipCont.appendChild(tipContent);
            tipCont.appendChild(fixIcon);

            let father = $$("#tipsSlideCont")
            father.appendChild(tipCont)

        }

        // hideLoading

        $$(".resultSide:last-of-type .blur").classList.remove('blur');

        $$(".resultSide:last-of-type .loadingOverlay").style.display = "none";

        // animate scroll

        new window.ScrollAnimate();

    }



}

module.exports = Test;