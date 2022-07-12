export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"前端基础\",\"children\":[{\"text\":\"javaScript\",\"link\":\"/\",\"activeMatch\":\"/\"},{\"text\":\"css\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"},{\"text\":\"html\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"}]},{\"text\":\"前端框架\",\"children\":[{\"text\":\"vue\",\"link\":\"/frontEnd/vue/workApply.md\",\"activeMatch\":\"/\"},{\"text\":\"小程序\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"},{\"text\":\"php原生\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"}]},{\"text\":\"个人摄影\",\"children\":[{\"text\":\"摄影分享\",\"link\":\"/\",\"activeMatch\":\"/\"},{\"text\":\"摄像学习\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"},{\"text\":\"摄影后期\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"}]},{\"text\":\"其他\",\"link\":\"/\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
