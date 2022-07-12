export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"heroText\":\"welcome 咚咚咚 blog\",\"tagline\":\"想我所想，尽我所能;\",\"actions\":[{\"text\":\"查看最近更新\",\"link\":\"/frontEnd/vue/workApply.md\",\"type\":\"primary\"}],\"heroImage\":\"https://vuejs.org/images/logo.png\",\"features\":[{\"title\":\"Calm\",\"details\":\"请赐我平静, 去接受我无法改变的事;\"},{\"title\":\"Courage\",\"details\":\"请赐我勇气, 去做我能改变的事;\"},{\"title\":\"Wisdom\",\"details\":\"请赐我智慧, 去分辨两者的不同;\",\"footer\":\"MIT Licensed | Copyright © 2018-present Evan You\"}]},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1657560615000,\"contributors\":[{\"name\":\"hhd\",\"email\":\"haohaidong@pingansec.com\",\"commits\":1}]},\"filePathRelative\":\"index.md\"}")

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
