
# 组合式api Composition API

## 组合式api使用逻辑复用实践
### 支付页逻辑复用
#### 逻辑说明
1. 挂载阶段的数据初始化：我们可以使用 `setup()` 函数来处理这部分逻辑，并使用 `ref()` 和 `reactive()` 来创建响应式数据。
2. 用户授权协议：我们可以创建一个名为 `useAuthorization()` 的函数来处理用户授权相关的逻辑。
3. 用户发起支付：我们可以创建一个名为 `usePayment()` 的函数来处理支付相关的逻辑。
4. 轮播图组件初始化：我们可以创建一个名为 `useCarousel()` 的函数来处理轮播图相关的逻辑。

#### 代码实现1
```ts
// useAuthorization.js
import { ref } from 'vue';

export function useAuthorization() {
  const isAuthorized = ref(false);

  function authorize() {
    // 用户授权逻辑
  }

  return {
    isAuthorized,
    authorize,
  };
}

// usePayment.js
import { ref } from 'vue';

export function usePayment() {
  const isPaymentSuccessful = ref(false);

  function initiatePayment() {
    // 用户发起支付逻辑
  }

  return {
    isPaymentSuccessful,
    initiatePayment,
  };
}

// useCarousel.js
import { onMounted } from 'vue';

export function useCarousel() {
  function initializeCarousel() {
    // 轮播图组件初始化逻辑
  }

  onMounted(() => {
    initializeCarousel();
  });
}

// YourComponent.vue
<template>
  <!-- your template here -->
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthorization } from './useAuthorization';
import { usePayment } from './usePayment';
import { useCarousel } from './useCarousel';

export default {
  setup() {
    const userInfo = ref(null);
    const { isAuthorized, authorize } = useAuthorization();
    const { isPaymentSuccessful, initiatePayment } = usePayment();
    useCarousel();

    async function getUserInfo() {
      // 获取用户信息逻辑
    }

    async function fetchData() {
      await getUserInfo();
      // 获取其他接口数据逻辑
    }

    onMounted(() => {
      fetchData();
    });

    return {
      userInfo,
      isAuthorized,
      authorize,
      isPaymentSuccessful,
      initiatePayment,
    };
  },
};
</script>
```

#### 代码实践2
```ts
import { ref, onMounted } from 'vue';

// 数据初始化逻辑
function initData() {
  const userInfo = ref(null);
  const isPaySuccess = ref(false);
  const isAgreementAuthorized = ref(false);

  // 请求用户信息接口
  async function fetchUserInfo() {
    userInfo.value = await fetch('/api/userInfo');
  }

  // 请求是否支付成功接口
  async function fetchPayStatus() {
    isPaySuccess.value = await fetch('/api/payStatus');
  }

  // 请求协议授权接口
  async function fetchAgreementStatus() {
    isAgreementAuthorized.value = await fetch('/api/agreementStatus');
  }

  // 在数据请求完成后初始化轮播图组件
  async function initCarousel() {
    await Promise.all([fetchUserInfo(), fetchPayStatus(), fetchAgreementStatus()]);
    // 调用轮播图组件初始化逻辑
    // ...
  }

  onMounted(() => {
    initCarousel();
  });

  return {
    userInfo,
    isPaySuccess,
    isAgreementAuthorized,
  };
}

// 用户授权协议逻辑
function authorizeAgreement() {
  const isAgreementAuthorized = ref(false);

  async function fetchAgreementStatus() {
    isAgreementAuthorized.value = await fetch('/api/agreementStatus');
  }

  async function authorize() {
    await fetch('/api/authorizeAgreement');
    fetchAgreementStatus();
  }

  return {
    isAgreementAuthorized,
    authorize,
  };
}

// 用户发起支付逻辑
function startPay() {
  const isPaySuccess = ref(false);

  async function fetchPayStatus() {
    isPaySuccess.value = await fetch('/api/payStatus');
  }

  async function pay() {
    await fetch('/api/startPay');
    fetchPayStatus();
  }

  return {
    isPaySuccess,
    pay,
  };
}

// 组合式API
export default {
  setup() {
    const { userInfo, isPaySuccess, isAgreementAuthorized } = initData();
    const { authorize } = authorizeAgreement();
    const { pay } = startPay();

    return {
      userInfo,
      isPaySuccess,
      isAgreementAuthorized,
      authorize,
      pay,
    };
  },
};
```


### 数据初始化逻辑复用
```vue
<template>
  <div>
    <ul>
      <li v-for="item in processedData" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const state = reactive({
      data: [],
      processedData: []
    })

    // 请求数据
    const fetchData = async () => {
      const response = await axios.get('https://example.com/api/data')
      state.data = response.data
    }

    // 处理数据
    const processData = () => {
      state.processedData = 
      state.data.filter(item => item.status === 'completed')
    }

    // 在组件挂载后调用 fetchData 和 processData
    onMounted(async () => {
      await fetchData()
      processData()
    })

    return {
      processedData: state.processedData
    }
  }
}
</script>
```

```ts
  // 公共函数
    getData.js
     // 请求数据
    export default fetchData = async () => {
      const response = await axios.get('https://example.com/api/data')
      state.data = response.data
      return {data,error}
    }

    // 处理数据
    export default processData = (data) => {
      state.processedData = 
      state.data.filter(item => item.status === 'completed')
      return{dataProcess}
    }
    
    // 分别调用组件总 index.vue
    import {fetchData,processData}  from './getData.js';
    let {data,errot} = await fetchData() // 辑处理案例
    let {dataprocess} = processData(date)
```