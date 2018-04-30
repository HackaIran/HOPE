class Advice {

    constructor() {
        this.initEvents();
        this.reprepareQuestionsDesign();
        this.redesignQuestions();
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
                    $$('.questionWrapper.active').classList.remove('active');
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

    reset() {
        document.querySelectorAll('.questionWrapper').forEach(elem => {
            elem.querySelector('.option.active').classList.remove('active');
            elem.querySelector('.option[data-value="3"]').classList.add('active')
        })
        $$('.questionWrapper.active').classList.remove('active');
        $$('.questionWrapper:first-of-type').classList.add('active');
        this.reprepareQuestionsDesign();
        this.redesignQuestions();
    }

}

module.exports = Advice;