export const siteData = JSON.parse("{\"base\":\"/myblog/\",\"lang\":\"zh-CN\",\"title\":\"咚咚咚\",\"description\":\"咚咚咚的blog站点\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"https://vuejs.org/images/logo.png\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
