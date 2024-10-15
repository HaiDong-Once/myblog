
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

function debounce2(fun, delay) {
    let timer = null;
    return function (...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}

function throttle2(fun, delay) {
    let lastTimeStamp = 0;
    return function (){
        const now = Date.now()
        const diff = now - lastTimeStamp
        if(diff >= delay){
            fun.apply(this, arguments)
            lastTimeStamp = now
        }
    }
}

function curry(fun){
    return function curried(...args){
        if(args.length >= fun.length){
            return fun.apply(this, args)
        }else{
            return function (...nextArgs){
                return curried.apply(this, args.concat(nextArgs))
            }
        }
    }
}

function rafThrottle(func){
    let lock = false
    return function (...args){
        if(lock) return
        lock = true
        window.requestAnimationFrame(() => {
            func.apply(this, args)
            lock = false
        })
    }
}


function getMaxNumber(arr){
    let maxNumber = arr[0]
    for(let i = 1; i < arr.length; i++){
        if(maxNumber < arr[i]){
            maxNumber = arr[i]
        }
    }
    return maxNumber
}

const arr2 = []
arr2.push(1,2,3,4)
arr2.unshift(-1,0)
arr2.pop()
arr2.shift()
arr2.splice(0,2)

// 数组筛选
function getSelectArr(arr){
    let newArr = []
    for(let i = 0; i < arr.length; i++){
        if(arr[i] >= 60){
            newArr.push(arr[i])
        }
    }
    return newArr
}


