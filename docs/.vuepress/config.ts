const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
    base: '/',
    lang: 'zh-CN',
    title: '咚咚咚',
    description: '咚咚咚的blog站点',
    head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
    theme: defaultTheme({
        // 默认主题配置
        navbar: [
            {
                text: '前端基础',
                children: [
                    {
                        text: 'javaScript',
                        link: '/',
                        activeMatch: '/',
                    },
                    {
                        text: 'css',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'html',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '前端框架',
                children: [
                    {
                        text: 'vue',
                        link: '/frontEnd/vue/workApply.md',
                        activeMatch: '/',
                    },
                    {
                        text: '小程序',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'php原生',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '个人摄影',
                children: [
                    {
                        text: '摄影分享',
                        link: '/',
                        activeMatch: '/',
                    },
                    {
                        text: '摄像学习',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '摄影后期',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '其他',
                link: '/',
            },
        ],
    }),
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/HaiDong-Once',
    repoLabel: 'gitHub',
    sidebar: "auto",
    plugins: [
        searchPlugin({
            // 配置项
        }),
    ],

}