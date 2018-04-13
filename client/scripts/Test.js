const axios = require('axios');

const PJax = require('./PJax');

class Test {

    /**
     * 
     * construtor
     * 
     */

    constructor() {
        this.pjax = new PJax('wrapper');
    }

    /**
     * 
     * @description listens on the search button click event
     * 
     */

    initiateEvents() {

        // onclick search Button

        let searchBtn = $$('#searchBoxCont>div');

        searchBtn.onclick = () => {

            // Let's validate the url

            let repositoryUrl = $$('#searchBoxCont>input[type=search]').value;

            let repositoryUrlRegex = /^(?:http|https):\/\/github\.com\/([\w-]+?)\/([\w-]+?)(?:\.git|)$/i;

            if (!repositoryUrl || !repositoryUrlRegex.test(repositoryUrl)) {

                //error
                return;

            }

            let regResult = repositoryUrlRegex.exec(repositoryUrl);

            let repositoryName = regResult[2];

            searchBtn.style.opacity = 0.5;
            searchBtn.style.pointerEvents = 'none';
            searchBtn.querySelector('i').classList.add('loading');

            this.evaluate(repositoryUrl).then((result) => {

                this.pjax.navigate('evaluate?url=' + repositoryUrl, 'HOPE | Result of ' + repositoryName);

                this.pjax.appendPartial('/evaluate?url=' + repositoryUrl).then(() => {
                    
                    result.repositoryUrl = repositoryUrl;

                    this.appendResult(result);

                });


            })

        }

    }

    /**
     * 
     * @description send a request to server to evaluate the repository
     * 
     * @param {String} url - repositoryUrl
     * 
     */

    evaluate(url) {

        return new Promise((resolve) => {

            axios.post(window.location.origin + '/api/evaluate', {
                repositoryUrl: url
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((result) => {

                resolve(result.data);

            })
        })
    }

    /**
     * 
     * 
     * 
     */

    appendResult(data) {

        // change text of the search bar

        $$('#searchBoxCont>input').value = data.repositoryUrl;

        // change score props

        $$('#scoreText').innerText = data.scoreText;

        $$('#score').innerText = data.quality;

        $$('#score').classList = data.scoreColor;

        $$('#scoreText').classList = data.scoreColor;

        // hide score section loading

        $$('.resultSide:first-of-type .blur').classList.remove('blur');

        $$('.resultSide:first-of-type .loadingOverlay').style.display = 'none';

        // let's add tips

        for (let tip of data.results) {

            let tipCont = document.createElement('div');
            tipCont.classList.add('tip');

            let status = document.createElement('i');
            status.classList.add('tipType');
            status.classList.add(tip.status.toLowerCase());

            let fixIcon = document.createElement('a');
            fixIcon.href = '#';
            fixIcon.classList.add('tipFix');
            fixIcon.classList.add('soon')

            let tipContent = document.createElement('div');
            tipContent.classList.add('tipContent');

            let tipHeading = document.createElement('div');
            tipHeading.classList.add('tipHeading');
            tipHeading.textContent = tip.type;

            let tipHelp = document.createElement('a');
            tipHelp.href = '#';
            tipHelp.classList.add('tipHelp');

            let tipText = document.createElement('div');
            tipText.classList.add('tipText');
            tipText.textContent = tip.message;

            // appending

            tipContent.appendChild(tipHeading);
            tipContent.appendChild(tipHelp);
            tipContent.appendChild(tipText);

            tipCont.appendChild(status);
            tipCont.appendChild(tipContent);
            tipCont.appendChild(fixIcon);

            let father = $$('#tipsSlideCont')
            father.appendChild(tipCont)

        }

        // hideLoading

        $$('#tipsCont.blur').classList.remove('blur');

        $$('.resultSide:last-of-type .loadingOverlay').style.display = 'none';

        $$('.resultSide:last-of-type .blur').classList.remove('blur');
        // set name of the repository

        let repositoryName = data.repositoryUrl.split('/').pop();

        $$('#scoreResultCont>div:first-of-type>span.highlight').textContent = repositoryName;

        $$('.resultSide:nth-of-type(2)>h2>span.highlight').textContent = repositoryName;



    }



}

module.exports = Test;