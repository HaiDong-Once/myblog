
function debounce(fun, delay) {
    let timer = null;
    return function (...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this. args)
        }, delay)
    }
}

function throttle(fun, delay) {
    let lastTimeStamp = 0
    return function (){
        let now = Date.now()
        let diff = now - lastTimeStamp
        if(diff >= delay){
            fun.apply(this, arguments)
            lastTimeStamp = now
        }
    }
}