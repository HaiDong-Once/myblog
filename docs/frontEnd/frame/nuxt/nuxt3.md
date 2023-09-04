
# nuxt3 页面初始化案例
[[toc]]


如果直接在onMounted中加载失败，需要使用setTimeout放到任务队尾执行
```ts
/**
 * 初始化页面
 */
const initPage = async () => {
  firePingansec(5366)
  handleScroll()
  try {
    const {data, pending, error, refresh} = await useFetch(apiBase +'/xinbohui_api/。。。。。', {
      query: {
        action: 'display_company',
      }
    })
    companyBoxList.value = data?._rawValue?.data ?? {}
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  setTimeout(()=> initPage() ,0)
})
```