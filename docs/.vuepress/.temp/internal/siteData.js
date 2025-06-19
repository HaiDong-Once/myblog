export const siteData = JSON.parse("{\"base\":\"/myblog/\",\"lang\":\"zh-CN\",\"title\":\"ddd`s blog\",\"description\":\"ddd`s的blog站点\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/images/person/header-logo.png\"}]],\"locales\":{}}")

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
