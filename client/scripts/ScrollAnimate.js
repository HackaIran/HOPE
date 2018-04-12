class ScrollAnimate {

    /**
     * 
     * @description initiates events and elements
     * 
     */

    constructor() {

        this.wrapperElem = document.querySelector("#tipsCont");

        this.slidingElem = document.querySelector("#tipsSlideCont");

        this.lock = false;

        this.slidingElem.onwheel = (e) => {
            if (this.lock) {// to prevent instance sliding
                return false;
            }
            if (e.deltaY > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            this.lock = true;
            setTimeout(() => {
                this.lock = false;
            }, 500)
        }

        this.items = this.wrapperElem.querySelectorAll(".tip");

        this.init();

        window.onresize = () => {
            // restart
            this.slidingElem.style.transform = "translateY(0px)";
            this.init();
        }

    }

    /**
     * 
     * @description sets the margin of the elements and paginates the elements
     * 
     */

    init() {

        this.slide = 0;

        this.maxSlide = 0;

        this.startIndex = 0

        this.endIndex = 0;

        let height = this.wrapperElem.offsetHeight;

        // let's order and give margin to each element

        while (this.endIndex < this.items.length) {
            let temp = 0;
            let i = 0;
            for (i = this.endIndex; i < this.items.length; i++) {
                if (this.items[i].offsetHeight + temp >= height) {
                    break;
                } else {
                    temp += this.items[i].offsetHeight;
                }
            }

            this.startIndex = this.endIndex;

            this.endIndex = i;

            let availableHeight = height - temp;

            let space = availableHeight / (this.endIndex - this.startIndex + 1);

            for (i = this.startIndex; i < this.endIndex; i++) {

                this.items[i].style.marginTop = space + "px";

            }
            this.maxSlide++;
        }

        this.maxSlide--;

    }

    /**
     * 
     * @description navigates to the next slide
     * 
     */

    nextSlide() {

        if (this.slide < this.maxSlide) {
            let translate = (++this.slide) * this.wrapperElem.offsetHeight;
            this.slidingElem.style.transform = "translateY(-" + translate + "px)";
        }



    }

    /**
     * 
     * @description navigates to the previous slide
     * 
     */

    prevSlide() {
        if (this.slide > 0) {
            let translate = (--this.slide) * this.wrapperElem.offsetHeight;
            this.slidingElem.style.transform = "translateY(-" + translate + "px)";
        }
    }

}

module.exports = ScrollAnimate;