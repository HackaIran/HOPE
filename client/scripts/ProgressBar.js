class Loading{

    showLoading(){

        this.loadingElem = this._createLoading();

        this.loadingInterval = setInterval(()=>{
            this._progress();
        },1000)

    }

    hideLoading(){

        clearInterval(this.loadingInterval);

        console.log(this.loadingElem)

        this.loadingElem.style.width = "100%";

        setTimeout(this._distructLoading,500);


    }

    _createLoading(){
        let div = document.createElement("div")
        div.setAttribute("id","nprogress");
        div.style.width = "0%";
        document.body.appendChild(div);
        return div;
    }

    _distructLoading(){
        document.body.removeChild(document.querySelector("#nprogress"));
    }

    _progress(){
        if(parseInt(this.loadingElem.style.width) == 95){
            clearInterval(this.loadingInterval)
        }else{
            this.loadingElem.style.width = parseInt(this.loadingElem.style.width) + 5 + "%";
        }
    }

}

module.exports = Loading;