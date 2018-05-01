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

        document.onkeydown = (e) => {
            if (e.key.toLocaleLowerCase() == 'enter') {
                this.processEvaluation();
            }
        }

        searchBtn.onclick = () => {

            this.processEvaluation();

        }

    }

    /**
     * 
     * @description processes the process of evaluation
     * 
     */

    processEvaluation() {
        // Let's validate the url

        let repositoryUrl = $$('#searchBoxCont>input[type=search]').value;

        let repositoryUrlRegex = /^(?:http|https):\/\/github\.com\/([\w-.]+?)\/([\w-.]+?)(?:\.git|)$/i;

        if (!repositoryUrl || !repositoryUrlRegex.test(repositoryUrl)) {

            //error -> invalid url

            Snackbar.show({text: 'URL is invalid!',actionTextColor: '#fec10b'}); 

            return;

        }

        let regResult = repositoryUrlRegex.exec(repositoryUrl);

        let repositoryName = regResult[2];

        let searchBtn = $$('#searchBoxCont>div');

        searchBtn.style.opacity = 0.5;
        searchBtn.style.pointerEvents = 'none';
        searchBtn.querySelector('i').classList.add('loading');

        this.evaluate(repositoryUrl).then((result) => {

            if(result.hasOwnProperty("error")){
                Snackbar.show({text: 'Repository not found!',actionTextColor: '#fec10b'});
                searchBtn.querySelector('i').classList.remove('loading');
                searchBtn.style.opacity = 1;
                searchBtn.style.pointerEvents = 'auto';
                return;
            }

            this.pjax.navigate('evaluate?url=' + repositoryUrl, 'HOPE | Result of ' + repositoryName);

            this.pjax.appendPartial('/evaluate?url=' + repositoryUrl).then(() => {

                result.repositoryUrl = repositoryUrl;

                this.appendResult(result);

            });


        })

    }

    /**
     * 
     * @description send a request to server to evaluate the repository
     * 
     * @param {String} url - repositoryUrl
     * 
     */

    evaluate(url) {

        return new Promise((resolve,reject) => {

            axios.post(window.location.origin + '/api/evaluate', {
                repositoryUrl: url
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((result) => {

                resolve(result.data);

            }).catch(reject)
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

        for (let tipGroup in data.results) {
            for (let tip of data.results[tipGroup]) {

                let tipCont = document.createElement('div');
                tipCont.classList.add('tip');

                let status = document.createElement('i');
                status.classList.add('tipType');
                status.classList.add(tip.type.toLowerCase());

                let fixIcon = document.createElement('a');
                fixIcon.href = '#';
                fixIcon.classList.add('tipFix');
                fixIcon.setAttribute("target","_blank");
                // fixIcon.classList.add('soon')
                if(/license/i.test(tip.heading)){
                    fixIcon.href = '/adviser';
                }else{
                    fixIcon.style.display = 'none'
                }

                let tipContent = document.createElement('div');
                tipContent.classList.add('tipContent');

                let tipHeading = document.createElement('div');
                tipHeading.classList.add('tipHeading');
                tipHeading.textContent = tip.heading;

                let tipHelp = document.createElement('a');
                tipHelp.href = '#';
                tipHelp.classList.add('tipHelp');

                let tipText = document.createElement('div');
                tipText.classList.add('tipText');
                tipText.textContent = tip.message;

                // appending

                tipContent.appendChild(tipHeading);
                tipHeading.appendChild(tipHelp);
                tipContent.appendChild(tipText);

                tipCont.appendChild(status);
                tipCont.appendChild(tipContent);
                tipCont.appendChild(fixIcon);

                let father = $$('#tipsSlideCont')
                father.appendChild(tipCont)

            }


        }

        // hideLoading

        $$('#tipsCont.blur').classList.remove('blur');

        $$('.resultSide:last-of-type .loadingOverlay').style.display = 'none';

        $$('.resultSide:last-of-type .blur').classList.remove('blur');
        // set name of the repository

        let repositoryName = data.repositoryUrl.split('/').pop();

        // if .git url

        if (/^(.+)\.git$/i.test(repositoryName)) {
            repositoryName = /^(.+)\.git$/i.exec(repositoryName)[1];
        }

        $$('#scoreResultCont>div:first-of-type>span.highlight').textContent = repositoryName;

        $$('.resultSide:nth-of-type(2)>h2>span.highlight').textContent = repositoryName;

    }



}

module.exports = Test;