const {defaultTheme} = require('vuepress')
const {searchPlugin} = require('@vuepress/plugin-search')

module.exports = {
    base: '/myblog/',
    lang: 'zh-CN',
    title: 'ddd`s blog',
    description: 'ddd`s的blog站点',
    head: [['link', {rel: 'icon', href: 'https://shuziren.fsh.bcebos.com/logo-my.png?authorization=bce-auth-v1/1224cab966e349de9a27cd0d3bbfa43b/2023-05-07T15%3A41%3A52Z/-1/host/e180ea4a66167e54a4858545b9f06b9f3339e15f820aafe3fc8e6eff8c58e101'}]],
    theme: defaultTheme({
        logo: 'https://shuziren.fsh.bcebos.com/logo-my.png?authorization=bce-auth-v1/1224cab966e349de9a27cd0d3bbfa43b/2023-05-07T15%3A41%3A52Z/-1/host/e180ea4a66167e54a4858545b9f06b9f3339e15f820aafe3fc8e6eff8c58e101',
        sidebar: {
            '/frontEnd/base/browser': [
                {
                    text: '浏览器概念',
                    children: [
                        '/frontEnd/base/browser/bom.md',
                        '/frontEnd/base/browser/postMessage.md',
                        '/frontEnd/base/browser/requestAnimationFrame.md',
                        '/frontEnd/base/browser/bomView.md'
                    ],
                },
            ],
            '/frontEnd/base/css': [
                {
                    text: 'css应用案例',
                    children: [
                        '/frontEnd/base/css/css3.md',
                        '/frontEnd/base/css/css2.md'
                    ],
                },
                {
                    text: 'css基础',
                    children: [
                        '/frontEnd/base/css/css.md',
                    ],
                },
            ],
            '/frontEnd/base/html': [
                {
                    text: 'html',
                    children: [
                        '/frontEnd/base/html/html.md',
                    ],
                }
            ],
            '/frontEnd/base/javaScript': [
                {
                    text: 'javaScript',
                    children: [
                        '/frontEnd/base/javaScript/js.md',
                    ],
                }
            ],
            '/frontEnd/base/nodejs': [
                {
                    text: 'nodejs',
                    children: [
                        '/frontEnd/base/nodejs/node.md',
                    ],
                }
            ],
            '/frontEnd/frame/vue': [
                {
                    text: 'vue应用实例',
                    children: [
                        '/frontEnd/frame/vue/workApply1.md',
                        '/frontEnd/frame/vue/workApply2.md',
                        '/frontEnd/frame/vue/workApply3.md',
                        '/frontEnd/frame/vue/workApply4.md',
                        '/frontEnd/frame/vue/workApply5.md',
                        '/frontEnd/frame/vue/workApply6.md',
                        '/frontEnd/frame/vue/workApply7.md',
                        '/frontEnd/frame/vue/workApply8.md',
                        '/frontEnd/frame/vue/workApply9.md',
                        '/frontEnd/frame/vue/workApply10.md',
                        '/frontEnd/frame/vue/workApply11.md',
                        '/frontEnd/frame/vue/workApply12.md',
                        '/frontEnd/frame/vue/workApply13.md',
                        '/frontEnd/frame/vue/workApply14.md',
                        '/frontEnd/frame/vue/workApply15.md',
                        '/frontEnd/frame/vue/workApply16.md',
                        '/frontEnd/frame/vue/workApply17.md',
                        '/frontEnd/frame/vue/workApply18.md',
                        '/frontEnd/frame/vue/workApply19.md',
                        '/frontEnd/frame/vue/workApply20.md',
                        '/frontEnd/frame/vue/workApply21.md',
                        '/frontEnd/frame/vue/workApply23.md',
                        '/frontEnd/frame/vue/workApply24.md',
                    ],
                },
                {
                    text: 'vue学习笔记',
                    children: [
                        '/frontEnd/frame/vue/notes/vue2-7.md',
                        '/frontEnd/frame/vue/notes/compositionApi.md',
                    ],
                },
            ],
            '/frontEnd/frame/wechatMini': [
                {
                    text: '小程序应用实例',
                    children: [
                        '/frontEnd/frame/wechatMini/workApply.md',
                    ],
                }
            ],
            '/frontEnd/project/git': [
                {
                    text: 'git',
                    children: [
                        '/frontEnd/project/git/git.md',
                    ],
                }
            ],
            '/frontEnd/project/webpack': [
                {
                    text: 'webpack学习文档',
                    children: [
                        '/frontEnd/project/webpack/Webpack5.md',
                    ],
                },
                {
                    text: 'webpack应用于实践',
                    children: [
                        '/frontEnd/project/webpack/application/webpackCase.md',
                        '/frontEnd/project/webpack/application/npmPrams.md'
                    ],
                },
            ],
            '/frontEnd/project/standard': [
                {
                    text: '代码规范',
                    children: [
                        '/frontEnd/project/standard/codeStandard.md',
                    ],
                }
            ],
            '/frontEnd/project/codeReuse': [
                {
                    text: '代码逻辑复用',
                    children: [
                        '/frontEnd/project/codeReuse/codeReuse.md',
                    ],
                }
            ],
            '/frontEnd/project/test': [
                {
                    text: '前端测试',
                    children: [
                        '/frontEnd/project/test/test.md',
                    ],
                }
            ],
            '/frontEnd/performance/image': [
                {
                    text: '图片优化',
                    children: [
                        '/frontEnd/performance/image/image.md',
                    ],
                }
            ],
            '/frontEnd/performance/wechat': [
                {
                    text: '小程序优化',
                    children: [
                        '/frontEnd/performance/wechat/wechat.md',
                    ],
                }
            ],
            '/frontEnd/performance/application': [
                {
                    text: '性能优化实践',
                    children: [
                        '/frontEnd/performance/application/loseCode.md',
                        '/frontEnd/performance/application/loseRely.md',
                        '/frontEnd/performance/application/hotUpdate.md',
                    ],
                }
            ],
            '/frontEnd/tools/blog': [
                {
                    text: 'vuepress',
                    children: [
                        '/frontEnd/tools/blog/vuepress.md',
                    ],
                }
            ],
            '/frontEnd/tools/tool': [
                {
                    text: '开发工具',
                    children: [
                        '/frontEnd/tools/tool/tool.md',
                    ],
                }
            ],
            '/frontEnd/tools/code': [
                {
                    text: '个人代码库',
                    children: [
                        '/frontEnd/tools/code/monitor.md',
                        '/frontEnd/tools/code/toolFun.md',
                    ],
                }
            ],
            '/frontEnd/computer/structure': [
                {
                    text: '数据结构与算法',
                    children: [
                        '/frontEnd/computer/structure/base.md',
                    ],
                }
            ],
            '/art/photo': [
                {
                    text: '摄影分享',
                    children: [
                        '/art/photo/personalShare.md',
                    ],
                }
            ],
            '/other/share': [
                {
                    text: '前端分享',
                    children: [
                        '/other/share/share.md',
                        '/other/share/share_2.md',
                    ],
                }
            ],

        },
        // 默认主题配置
        navbar: [
            {   text: '前端基础',
                children: [
                    {   text: 'html',
                        link: '/frontEnd/base/html/html.md'
                    },
                    {   text: 'css',
                        link: '/frontEnd/base/css/css3.md'
                    },
                    {   text: 'javaScript',
                        link: '/frontEnd/base/javaScript/js.md'
                    },
                    {   text: 'nodejs',
                        link: '/frontEnd/base/nodejs/node.md'
                    },
                    {   text: '浏览器',
                        link: '/frontEnd/base/browser/bom.md'
                    },
                ],
            },
            {   text: '前端框架',
                children: [
                    {   text: 'vue',
                        link: '/frontEnd/frame/vue/workApply1.md'
                    },
                    {   text: '小程序',
                        link: '/frontEnd/frame/wechatMini/workApply.md'
                    },
                    {   text: 'react',
                        link: '/frontEnd/frame/react/react.md'
                    },
                ],
            },
            {   text: '前端工程化',
                children: [
                    {   text: 'git',
                        link: '/frontEnd/project/git/git.md'
                    },
                    {   text: 'Webpack5',
                        link: '/frontEnd/project/webpack/Webpack5.md'
                    },
                    {   text: '代码规范',
                        link: '/frontEnd/project/standard/codeStandard.md'
                    },
                    {   text: '前端测试',
                        link: '/frontEnd/project/test/test.md'
                    },
                    {   text: '代码逻辑复用',
                        link: '/frontEnd/project/codeReuse/codeReuse.md'
                    },
                ],
            },
            {   text: '性能优化',
                children: [
                    {   text: '小程序优化',
                        link: '/frontEnd/performance/wechat/wechat.md'
                    },
                    {   text: '性能优化实践',
                        link: '/frontEnd/performance/application/loseCode.md'
                    },
                    {   text: '图片优化',
                        link: '/frontEnd/performance/image/image.md'
                    }
                ],
            },
            {   text: '工具库',
                children: [
                    {   text: '博客搭建',
                        link: '/frontEnd/tools/blog/vuepress.md'
                    },
                    {   text: '开发工具',
                        link: '/frontEnd/tools/tool/tool.md'
                    },
                    {   text: '个人代码库',
                        link: '/frontEnd/tools/code/monitor.md'
                    }
                ],
            },
            {   text: '计算机基础',
                children: [
                    {   text: '数据结构与算法',
                        link: '/frontEnd/computer/structure/base.md'
                    }
                ],
            },
            {   text: '摄影艺术',
                children: [
                    {   text: '摄影分享',
                        link: '/art/photo/personalShare.md'
                    }
                ],
            },
            {   text: '其他',
                children: [
                    {   text: '前端分享',
                        link: '/other/share/share.md'
                    }
                ],
            },
        ],
    }),
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'https://github.com/HaiDong-Once',
    repoLabel: 'gitHub',
    // sidebar: "auto",
    plugins: [
        searchPlugin({
            // 配置项
        }),
    ],

}