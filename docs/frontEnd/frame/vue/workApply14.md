


# vue input输入联想实现
::: tip 分析
- **问题**：input事件输入太快会造成发起请求太多的问题，并且可能上一个请求返回事件比最后一个请求返回事件还慢，导致联想得到的数据不是最最后一次触发接口得到的数据；
- **解决方法**：使用防抖函数，控制接口请求频率；或者使用请求中断，只要发起新请求，上一个请求还没有完成的话，就中断上一个请求，保证列表反显的数据是最后一个请求返回的数据；
  :::

![图片](/images/frontEnd/vue/img_5.png)

### 利用防抖处理@Input请求联想接口
- **缺点**：响应会有些慢，而且不能绝对保证数据没有延迟；

```html
<div class="form-box">
  <input
      type="text"
      placeholder="请输入申请企业名称"
      v-on:input="getCompanyList"
      v-model="companyForm.company_name"
  />
  <div class="company-scroll" v-if="companyScrollFlag">
    <div
        v-for="item of bindSourceList"
        @click="selectCompany(item.company_name)">
        {{item.company_name}}
    </div>
  </div>
</div>
```

```ts
data() {
  return {
    companyForm:{ // 企业信息
      company_name: '', // 企业名
    },
    bindSourceList: [], // 企业联想表单
    timeout: null, // 防抖函数定时器
    companyScrollFlag: false, // 企业联想框控制
    cancel: null, // 取消请求
  }
},

methods: {
    /**
     * 获取企业联想信息（调用防抖函数）
     */
    getCompanyList(){
      this.debounce(()=>{
        this.$http.get('/b-search', {
          params: {
            action: 'company_name_notice',
            key: this.companyForm.company_name,
          },
        }).then(res => {
          if (res && res.status === 0) {
            this.companyScrollFlag = true;
            this.bindSourceList = res.data?.company_list ?? [];
          } else {
            res.message && this.$toast(res.message)
          }
        })
      }, 200)
    },
    
    
    /**
     * 防抖函数
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    debounce(fn, wait) {
       // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时 
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(fn, wait)
    },
    
    
    /**
     * 选中企业
     */
    selectCompany(company){
      this.companyScrollFlag = false;
      this.companyForm.company_name = company;
    },
}
```

### 使用请求中断中断上一个请求
- **缺点**：仅使用请求中断，解决了数据不准确的问题，但请求量还是过于频繁；
- 红色的请求就是中断的请求

![图片](/images/frontEnd/vue/img_6.png)

```ts
import axios from 'axios'
const CancelToken = axios.CancelToken;

/**
 * 获取企业联想信息
 */
getCompanyList(){
    if(typeof this.cancel ==='function'){
      this.cancel();
    }
    let that = this;
    this.$http.get('/b-search', {
      params: {
        action: 'company_name_notice',
        key: this.companyForm.company_name,
      },
      cancelToken: new CancelToken(function executor(c) {
        that.cancel = c;
        console.log(c)
        // c是一个函数
        // cancel(message) {
        //   if (token.reason) {
        //     // Cancellation has already been requested
        //     return;
        //   }
        //
        //   token.reason = new Cancel(message);
        //   resolvePromise(token.reason);
        // }
      })
    }).then(res => {
      if (res && res.status === 0) {
        this.companyScrollFlag = true;
        this.bindSourceList = res.data?.company_list ?? [];
      } else {
        res.message && this.$toast(res.message)
      }
    })
},
```

### 最终方案： 防抖+过期请求中断
- **优点**：解决了数据不准确的问题，也解决了请求量过于频繁的问题；
```ts
import axios from 'axios'
const CancelToken = axios.CancelToken;

data() {
  return {
    timeout: null, // 防抖函数定时器
    companyScrollFlag: false, // 企业联想框控制
    cancel: null, // 取消请求
  }
},


methods: {
    /**
     * 获取企业联想信息
     */
    getCompanyList(){
      this.debounce(()=>{
        if(typeof this.cancel ==='function'){
          this.cancel();
        }
        let that = this;
        this.$http.get('/b-search', {
          params: {
            action: 'company_name_notice',
            key: this.companyForm.company_name,
          },
          cancelToken: new CancelToken(function executor(c) {
            that.cancel = c;
          })
        }).then(res => {
          if (res && res.status === 0) {
            this.companyScrollFlag = true;
            this.bindSourceList = res.data?.company_list ?? [];
          } else {
            res.message && this.$toast(res.message)
          }
        })
      }, 200)
    },
    
    
    /**
     * 函数防抖
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    debounce(fn, wait) {
      // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时 
      if(this.timeout !== null) clearTimeout(this.timeout)
      this.timeout = setTimeout(fn, wait)
    },
}
```
