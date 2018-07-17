const axios = require('axios');

class Advice {

    constructor() {
        this.initEvents();
        this.reprepareQuestionsDesign();
        this.redesignQuestions();

        this._showingResult = false;
    }

    /**
     * 
     * 
     * 
     */

    reprepareQuestionsDesign() {
        let questions = document.querySelectorAll('.questionWrapper');
        let height = 0;
        for (let question of questions) {
            if (/active/i.test(question.classList)) {
                break;
            }
            height += question.offsetHeight;
            console.log(question.offsetHeight)
        }
        height += $$('.questionWrapper.active').offsetHeight / 2;
        if (height < $$('.chooserWrapper').offsetHeight) {
            $$('.chooserSliderWrapper').style.transform = 'translateY(' + (($$('.chooserWrapper').offsetHeight / 2) - height) + 'px)';
        } else {
            console.log(height)
            $$('.chooserSliderWrapper').style.transform = 'translateY(-' + (height - ($$('.chooserWrapper').offsetHeight / 2)) + 'px)';
        }

    }

    /**
     * 
     * 
     * 
     */

    initEvents() {
        $$('.startBtn').onclick = () => {

            $$('.startBtn').setAttribute('data-started', true); // so it has been clicked at least once

            $$('.startBtn').querySelector('span').textContent = 'Start Over';

            $$('.startBtn').style.width = '50%';

            $$('.startWrapper').onclick = () => {
                this.reset();
            }

            $$('.chooserWrapper').style.transform = 'translateX(0px) translateZ(0px)';

            $$('.startWrapper').style.transform = 'rotateY(45deg) translateZ(-500px)';

            let that = this;

            document.querySelectorAll('.questionWrapper').forEach(elem => {
                elem.onclick = function () {
                    if (that._showingResult) {
                        that.hideResults();
                    } else {
                        $$('.questionWrapper.active').classList.remove('active');
                    }

                    this.classList.add('active');
                    that.reprepareQuestionsDesign();
                    that.redesignQuestions();
                }
            })

            document.querySelectorAll('.option').forEach(elem => {
                elem.onclick = function (e) {
                    e.stopPropagation()
                    this.parentNode.querySelector('.option.active').classList.remove('active');
                    this.classList.add('active');
                    let activeElem = $$('.questionWrapper.active');

                    if (activeElem.nextElementSibling) {
                        activeElem.classList.remove('active');
                        activeElem.nextElementSibling.classList.add('active')
                        that.reprepareQuestionsDesign();
                        that.redesignQuestions();
                    }

                }
            })

            // for finishing

            document.querySelectorAll('.questionWrapper:last-of-type .option').forEach(option => {
                option.onclick = function(e) {
                    e.stopPropagation()
                    this.parentNode.querySelector('.option.active').classList.remove('active');
                    this.classList.add('active');
                    let activeElem = $$('.questionWrapper.active');

                    if (activeElem.nextElementSibling) {
                        activeElem.classList.remove('active');
                        activeElem.nextElementSibling.classList.add('active')
                        that.reprepareQuestionsDesign();
                        that.redesignQuestions();
                    }

                    // only advice beside routins

                    that.advice();

                }
            })

        };
    }

    /**
     * 
     * 
     * 
     */

    redesignQuestions() {
        let activeQuestion = $$('.questionWrapper.active');
        let question = activeQuestion;
        // let's go backward
        for (let i = 0; question; i++) {
            question.style.transform = 'scale(' + (1 - (i * 0.1)) + ')';
            question = question.previousElementSibling;
        }
        // let's go forward
        question = activeQuestion;
        for (let i = 0; question; i++) {
            question.style.transform = 'scale(' + (1 - (i * 0.2)) + ')';
            question = question.nextElementSibling;
        }
    }

    /**
     * 
     * 
     * 
     */

    advice() {

        this.showLoading();

        // let's get the answers

        let answerWrappers = document.querySelectorAll('.questionWrapper');

        // let's load the defaults

        let answers = {
            commercialUse: true,
            destribution: true,
            modification: true,
            patentUse: false,
            privateUse: true,
            discloseSource: false,
            licenseAndCopyRightNotice: true,
            sameLicense: false,
            stateChange: false,
            liability: true,
            tradeMarkUse: false,
            warranty: true
        };

        answerWrappers.forEach(question => {
            let questionName = question.getAttribute('data-name');
            let answer = question.querySelector('.option.active');
            answer = answer.getAttribute('data-value');
            if (answer == 1) {
                answer = true;
            } else if (answer == 2) {
                answer = false;
            } else {
                return;
            }
            answers[questionName] = answer;
        })

        this.getResults(answers).then((results) => {

            this.showResults(results.data);

            this.hideLoading();

        }).catch(this.hideLoading)

    }

    getResults(answers) {
        return new Promise((resolve, reject) => {
            axios.post('/api/adviser/advice', {
                answers
            }).then((results) => {
                resolve(results)
            }).catch(reject);
        })
    }

    /**
     * 
     * 
     * 
     */

    showResults(results) {

        // let's slice the results

        results = results.slice(0, 3);

        // let's load the results
        $$('.resultsWrapper ul').innerHTML = '';
        for (let result of results) {
            $$('.resultsWrapper ul').innerHTML += `<li><span class="licenseName">${result.name}</span><i class="help"></i><span class="percent">${result.mark * 100}%</span></li>`;
        }

        $$('.chooserSliderWrapper').style.transform = 'translateY(-' + ($$('.chooserSliderWrapper').offsetHeight - 100) + 'px)';

        $$('.questionWrapper:last-of-type').classList.remove('active');

        $$('.questionWrapper:last-of-type').style.transform = 'scale(0.6)'

        $$('.questionWrapper:last-of-type').style.opacity = '0.8'

        $$('.resultsWrapper').style.top = '50%';

        this._showingResult = true;

    }

    hideResults() {
        this._showingResult = false;
        $$('.resultsWrapper').style.top = '150%';
    }

    /**
     * 
     * 
     * 
     */

    showLoading() {
        $$('.chooserSliderWrapper').classList.add('beingLoaded');
        $$('.chooserWrapper .loading').classList.add('show');
    }

    /**
     * 
     * 
     * 
     */

    hideLoading() {
        $$('.chooserSliderWrapper').classList.remove('beingLoaded');
        $$('.chooserWrapper .loading').classList.remove('show');
    }

    /**
     * 
     * 
     * 
     */

    reset() {
        document.querySelectorAll('.questionWrapper').forEach(elem => {
            elem.querySelector('.option.active').classList.remove('active');
            elem.querySelector('.option[data-value="3"]').classList.add('active')
        })
        if (this._showingResult) {
            this.hideResults();
        } else {
            $$('.questionWrapper.active').classList.remove('active');
        }
        $$('.questionWrapper:first-of-type').classList.add('active');
        this.reprepareQuestionsDesign();
        this.redesignQuestions();
    }

}

module.exports = Advice;