

# 浏览器点击滚动到指定位置或距离
[[toc]]

## 点击滚动到指定距离
window.scrollTo
```js
import React from 'react';

function App() {
    /**
     * 点击分数锚点滚动
     */
    const handleAnchorClick = () => {
        window.scrollTo({
            top: 760,  // 滚动距离 单位px
            behavior: 'smooth', // 平滑滚动
        });
    };

    return (
        <div className="page">
            <DetailInfo handleAnchorClick={handleAnchorClick}/>
            <GlobalMessage/>
        </div>

    );
}

export default App;
```

## 点击滚动到指定位置 
myRef.current.scrollIntoView
```js
import React, { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(null); // 使用 ref 来获取元素的引用

  const handleClick = () => 
      // scrollIntoView： 将某个具体的dom元素滚动到可视区域中
    myRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={handleClick}>Scroll to Element</button>
      <div ref={myRef} style={{ marginTop: '1000px' }}>I'm here!</div>
    </div>
  );
}
```

## nuxt中案例（vue3)
element.offsetTop 获取距离顶部距离
```js
/**
 * tab锚点跳转
 * @param id
 */
const scrollToSection = (id) => {
  tabIndex.value = id;

  const element = document.querySelector('#section' + (id+1))
  const top = element.offsetTop ?? 0;
  
  // scrollTo: 将整个页面滚动到指定的坐标位置
  window.scrollTo({
    top: id && top + - 60,
    behavior: 'smooth'
  });
}
```