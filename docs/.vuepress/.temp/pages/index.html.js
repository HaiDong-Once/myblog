export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroText\":\"welcome ddd`s blog\",\"tagline\":\"个人技术博客\",\"heroImage\":\"/images/person/header-logo.png\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1749034496000,\"contributors\":[{\"name\":\"hhd\",\"email\":\"haohaidong@pingansec.com\",\"commits\":7},{\"name\":\"haohaidong\",\"email\":\"haohaidong@pingansec.com\",\"commits\":1}]},\"filePathRelative\":\"index.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
