const axios = require("axios");
const PJax = require('./PJax');

class Test {

    /**
     * 
     * construtor
     * 
     */

    constructor(){
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

            this.preInitiateTest(url);

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

        axios.post('api/preInitialTest',{repositoryUrl:url},{
            headers: { 'Content-Type': 'application/json' }
        }).then((result)=>{

            let uniqueName = result.data.uniqueName;

            let repositoryName = uniqueName.split("-");

            repositoryName.pop();

            repositoryName = repositoryName.join(" ");

            this.pjax.navigate('result/'+uniqueName,"HOPE - Result of "+repositoryName);

            this.pjax.appenPatial('/result/'+uniqueName);
        })

    }

    /**
     * 
     * @description gets the result of the test
     * 
     * @param {String} uniqueName - the unique name that we got from the initialTest
     * 
     */

    getResult(uniqueName){

    }

    

}

module.exports = Test;