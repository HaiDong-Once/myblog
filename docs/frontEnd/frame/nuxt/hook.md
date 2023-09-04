
# nuxt3 轮播hook动画抽离案例
[[toc]]


## hooks 抽离
```ts

import { ref, onUnmounted, onMounted } from 'vue';


/**
 * Version: tab动画控制
 * Author: hhd
 * Created: 2023/08/03
 * @return {{firePingansec: ((function(*): Promise<void>)|*)}}
 * @description:
 *  import useTabAnimation from './hooks/useTabAnimation'
 *  const { startAnimationTab, tabsIcon } = useTabAnimation();
 *  startAnimationTab(0, 8000)
 */

export default function useTabAnimation() {
  const tabs = ['1', '2', '3'] // tab 数组集合
  const tabsIndex = ref(0); // 当前展示tab index值
  let tabsId = null; // tab动画定时器
  const tabsIcon = computed(() => { // 当前展示tab 对应数组值
    return tabs[tabsIndex.value];
  });

  /**
   * 开始tab动画
   */
  const startAnimationTab = (index = 0, time= 8000) => {
    tabsIndex.value = index
    tabsId && clearInterval(tabsId);
    tabsId = setInterval(() => {
      tabsIndex.value = (tabsIndex.value + 1) % tabs.length;
    }, time);
  }


  onMounted(() => {
    startAnimationTab()
  });


  onUnmounted(() => {
    tabsId && clearInterval(tabsId);
  });

  
  return {
    startAnimationTab,
    tabsIcon,
  };
}
```