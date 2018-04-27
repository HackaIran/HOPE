class Advice{

    constructor(){
        this.initEvents();
    }

    initEvents(){
        $$('.startBtn').onclick = ()=>{

            $$('.startBtn').setAttribute('data-started',true);// so it has been clicked at least once

            $$('.startBtn').querySelector('span').textContent = 'Start Over';

            $$('.startWrapper').onclick = ()=>{
                this.reset();
            }

            $$('.chooserWrapper').style.transform = 'translateX(0px) translateZ(0px)';

            $$('.startWrapper').style.transform = 'rotateY(45deg) translateZ(-500px)';

        };
    }

    reset(){
        
    }

}

module.exports = Advice;