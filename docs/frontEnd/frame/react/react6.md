

# react曝光埋点解决方案
[[toc]]


## 一、思路
class类与vue封装的保持一致，主要需要解决react中 vue 指令绑定卸载的部分
- 给需要曝光的元素添加特定的id和参数，全局监听dom元素变化，有特定id的dom调用class类添加监听，但是缺点很明显，消耗性能
- 使用HOC高阶组件封装要曝光的元素，缺点：render函数中使用影响性能，外层包裹了div，包裹inline元素可能影响原有UI样式


## 二、代码实现

### 复用vue中相同类
暴露出一个 exposure 实例
```js
/**
 * 曝光埋点class类
 */
class Exposure {
    constructor() {
        this.timer = {}; // 增加定时器对象
        this.exposureList = []; // 记录已经上报过的埋点信息

        // 构造IntersectionObserver观察器
        this.observer = new IntersectionObserver(this.handleIntersection, {
            root: null, // 默认浏览器视窗
            threshold: 1 // 元素完全出现在浏览器视窗内才执行callback函数。
        });
    }

    /**
     * IntersectionObserver callback
     * @param entries
     */
    handleIntersection = (entries) => {
        entries.forEach(entry => {
            let exposureData = null;
            try {
                exposureData = JSON.parse(
                    entry.target.getAttribute('exposure-data')
                );
            } catch (e) {
                exposureData = null;
                console.error('埋点数据格式异常', e);
            }
            // 没有埋点数据取消上报
            if (!exposureData || !exposureData.position) {
                console.error('埋点数据格式异常');
                this.observer.unobserve(entry.target);
                return;
            }

            // 曝光时间超过1秒为有效曝光
            if (entry.isIntersecting) {
                this.timer[exposureData.position] = setTimeout(() => {
                    // 上报埋点信息
                    this.sendPosition(exposureData);

                    // 上报后取消监听
                    this.observer.unobserve(entry.target);
                    this.exposureList.push(exposureData.position);
                    this.timer[exposureData.position] = null;
                }, 1000);
            } else {
                if (this.timer[exposureData.position]) {
                    clearTimeout(this.timer[exposureData.position]);
                    this.timer[exposureData.position] = null;
                }
            }
        });
    };


    /**
     * 上报曝光埋点数据
     * @param exposureData
     * @tips: 利用setTimeout将上报任务放到任务队列末尾，以免占用主进程资源
     */
    sendPosition(exposureData) {
        setTimeout(()=>{
            const { position } = exposureData ?? {};
            console.log(position);
        },0)
    }


    /**
     * 添加监听
     * @param ele
     * @param prams
     */
    addDom = (ele, prams) => {
        // 参数添加到dom中
        if (prams) {
            const exposureData = prams;
            ele.setAttribute(
                'exposure-data',
                JSON.stringify(exposureData)
            );
            const { position } = exposureData ?? {};
            if (this.exposureList.includes(position)) return;
        }

        // dom IntersectionObserver 监听
        this.observer.observe(ele);
    };


    /**
     * 移除监听
     * @param ele
     */
    removeDom = (ele) => {
        // 移除监听
        this.observer.unobserve(ele);
    };
}


// 暴露出一个 exposure 实例
export default new Exposure();
```

### 创建react HOC 高阶组件
```js
import React, { useEffect } from "react";
import exposure from "../utils/exposure";


/**
 * 曝光埋点高阶组件
 * @说明：
 * import ExposureHoc from './components/ExposureHoc'
 *
 * // 使用高阶组件增强函数式组件
 * const ExposureComponent = ExposureHoc((props) => {
 *     return <div>测试曝光组件 {props.position}!</div>;
 * });
 *
 * <ExposureComponent exposureData={{position: 88888889}}/>
 *
 * @传参：exposureData={{position: 88888889}}  position必传且值唯一
 */
const exposureHoc = (WrappedComponent) => (props) => {
    const {exposureData} = props ?? {}
    const {position} = exposureData ?? {}

    // 添加至观察列表
    useEffect(() => {
        const ele = document.getElementById(`exposure-id-${position}`)
        exposure.addDom(ele, exposureData)

        // 组件销毁移除观察
        return () => {
            console.log('Component will unmount');
            exposure.removeDom(ele)
        };
    }, []);

    // 通过dom data 属性设置埋点参数
    return (
        <div id={`exposure-id-${position}`}>
            <WrappedComponent {...props} />
        </div>
    )
}


export default exposureHoc;
```

### 使用方法
```js
import ExposureHoc from './components/ExposureHoc'

// 使用高阶组件增强函数式组件(包裹)
const ExposureHocComponent = ExposureHoc((props) => {
    return <div>测试曝光组件 {props.position}</div>;
});

function Home(){
    return (
        <div>
            <ExposureHocComponent exposureData={{position: 88888889}}/>
        </div>
    );
}

export default Home;
```