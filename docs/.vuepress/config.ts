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
                text: '前端基础',
                children: [
                    {
                        text: 'javaScript',
                        link: '/frontEnd/javaScript/js.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'css',
                        link: '/frontEnd/css/css.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'html',
                        link: '/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '浏览器',
                        link: '/frontEnd/browser/bom.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'node.js',
                        link: '/frontEnd/nodejs/node.md',
                        activeMatch: '^/foo/',
                    }
                ],
            },
            {
                text: '前端框架',
                children: [
                    {
                        text: 'vue开发',
                        link: '/frontEnd/vue/workApply.md',
                        activeMatch: '^/foo',
                    },
                    {
                        text: '小程序',
                        link: '/frontEnd/wechatMini/workApply.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'php原生',
                        link: '/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '大前端',
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
                    {
                        text: '开发工具',
                        link: '/frontEnd/other/tools.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '代码规范',
                        link: '/frontEnd/other/codeStandard.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: 'Webpack5',
                        link: '/frontEnd/other/Webpack5.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '性能优化',
                        link: '/frontEnd/other/performance.md',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '个人摄影',
                children: [
                    {
                        text: '摄影分享',
                        link: '/art/photo/personalShare.md',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '摄像学习',
                        link: '/',
                        activeMatch: '^/foo/',
                    },
                    {
                        text: '摄影后期',
                        link: '/',
                        activeMatch: '^/foo/',
                    },
                ],
            },
            {
                text: '其他',
                children: [
                    {
                        text: '前端分享会',
                        link: '/other/share.md',
                        activeMatch: '^/foo/',
                    },
                ],
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