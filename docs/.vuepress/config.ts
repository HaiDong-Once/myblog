const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')

module.exports = {
    base: '/myblog/',
    lang: 'zh-CN',
    title: '咚咚咚',
    description: '咚咚咚的blog站点',
    head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
    theme: defaultTheme({
        // 默认主题配置
        navbar: [
            {
                text: '前端框架',
                children: [
                    {
                        text: 'vue开发',
                        link: '/frontEnd/vue/workApply.md',
                        activeMatch: '^/foo',
                    },
                    {
                        text: '小程序开发',
                        link: '/frontEnd/wechatMini/workApply.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'jquery开发',
                        link: '/not-foo/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '前端周边',
                children: [
                    {
                        text: '博客搭建',
                        link: '/frontEnd/other/blog.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'git工作流',
                        link: '/frontEnd/other/git.md',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '前端基础',
                children: [
                    {
                        text: 'javaScript',
                        link: '/',
                        activeMatch: '^/foo/',
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
                text: '个人摄影',
                children: [
                    {
                        text: '摄影分享',
                        link: '/',
                        activeMatch: '^/foo/',
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
                link: '^/foo/',
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