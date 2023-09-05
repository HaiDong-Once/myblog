

# nuxt3 中服务端渲染报错问题解决
[[toc]]


##  问题列举
- window is not defined 
- document is not defined

## 情景1
自己写的代码中包含了window 或者dom操作，因为nuxt为SSR项目，在编译打包时会区分服务端渲染，还是客户端渲染（浏览器端）。
在代码中使用window或dom，打包工具默认将其加入了服务端脚本中，服务端又没有window,dom对象，所以会出现以上报错。

### 解决方法：
#### 1.js代码中process.client判断
```js
if (process.client) {
  ... // 这里就是操作window或dom对象的代码
}
```

#### 2、将window操作或者dom操作的代码放在mounted生命周期内
```js
mounted() {
	// window dom ...
}
```

## 情景2
组件中包含window,dom代码：例如：在使用antDesign a-auto-complete组件时，会报服务端错误，如：window not define, document not define

### 解决方法：
在组件端可以使用 `<ClientOnly>` 标签包裹， 仅在客户端渲染该组件，解决类似问题
```html
<ClientOnly>
  <a-auto-complete>
    。。。。。。。。。。。。。。
  </a-auto-complete>
</ClientOnly>
```

## 情景3
使用的外部插件中包含了window等服务端不支持的内容

### 解决方案
#### plugins导入 设置 ssr:false
在nuxt.config.ts的plugins属性中导入插件时，设置ssr为false,使其仅在客户端渲染。
```ts
module.exports = {
	 //其它配置项...
	plugins: [
	    { 
	    	src: '~/plugins/kafuuchino',
	    	ssr: false // 此处的 ssr:false 就是将其改为非服务器端渲染
	    } 
	],
}
```

#### import 导入使用 await import('') 替换
es6正常导出使用报错： winodw ont define
```ts
import pingansec from 'pingansec-vue-ana';
pingansec.fire(code);
```

解决方法：在客户端调用时在导入 await import('');
```ts
const firePingansec = async (code) => {
    const pingansec = await import('pingansec-vue-ana');
    pingansec.fire(code);
}
```

以pa打点hook封装为案例，解决重复导入问题
```ts
import { ref } from 'vue';


/**
 * Version: pa打点 hook 封装
 * Author: hhd
 * Created: 2023/08/03
 * @return {{firePingansec: ((function(*): Promise<void>)|*)}}
 * @description:
 *  import usePingansec from '~/hooks/usePingansec'
 *  const { firePingansec } = usePingansec();
 *  firePingansec(5342)
 */

export default function usePingansec() {
    const pingansec = ref(null);

    const loadPingansec = async () => {
        if (!pingansec.value) {
            pingansec.value = await import('pingansec-vue-ana');
        }
    };

    const firePingansec = async (code) => {
        await loadPingansec();
        pingansec.value.default.fire(code);
    };

    return {
        firePingansec,
    };
}
```