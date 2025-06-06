const {defaultTheme} = require('vuepress')
const {searchPlugin} = require('@vuepress/plugin-search')
const path = require('path')

module.exports = {
    base: '/myblog/',
    lang: 'zh-CN',
    title: 'ddd`s blog',
    description: 'ddd`s的blog站点',
    head: [['link', {rel: 'icon', href: '/images/person/header-logo.png'}]],
    
    theme: defaultTheme({
        logo: '/images/person/header-logo.png',
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
                    text: 'scss',
                    children: [
                        '/frontEnd/base/css/scss.md',
                    ],
                },
                {
                    text: 'css应用案例',
                    children: [
                        '/frontEnd/base/css/css6.md',
                        '/frontEnd/base/css/css5.md',
                        '/frontEnd/base/css/css4.md',
                        '/frontEnd/base/css/css3.md',
                        '/frontEnd/base/css/css2.md',
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
                        '/frontEnd/base/javaScript/practice.md',
                        '/frontEnd/base/javaScript/map.md',
                    ],
                }
            ],
            '/frontEnd/base/typeScript': [
                {
                    text: 'typeScript学习笔记',
                    children: [
                        '/frontEnd/base/typeScript/notes.md',
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
                        '/frontEnd/frame/vue/workApply27.md',
                        '/frontEnd/frame/vue/workApply26.md',
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
                        '/frontEnd/frame/vue/workApply25.md',
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
                        '/frontEnd/frame/wechatMini/ciWechatMini.md',
                        '/frontEnd/frame/wechatMini/workApply.md',
                    ],
                }
            ],
            '/frontEnd/frame/react': [
                {
                    text: 'react应用',
                    children: [
                        '/frontEnd/frame/react/react8.md',
                        '/frontEnd/frame/react/react.md',
                        '/frontEnd/frame/react/react6.md',
                        '/frontEnd/frame/react/react5.md',
                        '/frontEnd/frame/react/react2.md',
                        '/frontEnd/frame/react/react3.md',
                        '/frontEnd/frame/react/react4.md',
                        '/frontEnd/frame/react/react7.md',
                    ],
                },
                {
                    text: 'react学习笔记',
                    children: [
                        '/frontEnd/frame/react/notes.md',
                    ],
                },
            ],
            '/frontEnd/frame/nuxt': [
                {
                    text: 'nuxt3应用',
                    children: [
                        '/frontEnd/frame/nuxt/nuxt1.md',
                        '/frontEnd/frame/nuxt/nuxt5.md',
                        '/frontEnd/frame/nuxt/nuxt2.md',
                        '/frontEnd/frame/nuxt/fullpage.md',
                        '/frontEnd/frame/nuxt/hook.md',
                        '/frontEnd/frame/nuxt/nuxt3.md',
                        '/frontEnd/frame/nuxt/nuxt4.md',
                    ],
                }
            ],
            '/frontEnd/frame/uniapp': [
                {
                    text: 'uniapp',
                    children: [
                        '/frontEnd/frame/uniapp/uniapp1.md',
                        '/frontEnd/frame/uniapp/uniapp2.md',
                        '/frontEnd/frame/uniapp/uniapp3.md',
                        '/frontEnd/frame/uniapp/uniapp4.md',
                    ],
                }
            ],
            '/frontEnd/frame/harmony': [
                {
                    text: '鸿蒙开发',
                    children: [
                        '/frontEnd/frame/harmony/harmony.md',
                        '/frontEnd/frame/harmony/harmony2.md',
                    ],
                },
            ],
            '/frontEnd/project/SDK': [
                {
                    text: '前端方案实现',
                    children: [
                        '/frontEnd/project/SDK/monitor.md',
                        '/frontEnd/project/SDK/monitorSDK.md',
                        '/frontEnd/project/SDK/code1.md',
                        '/frontEnd/project/SDK/code2.md',
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
                        '/frontEnd/project/standard/codeStandard2.md',
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
            '/frontEnd/project/package': [
                {
                    text: '包管理工具',
                    children: [
                        '/frontEnd/project/package/package.md',
                        '/frontEnd/project/package/package1.md',
                        '/frontEnd/project/package/package2.md',
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
                        '/frontEnd/performance/application/pay.md',
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
                        '/frontEnd/tools/tool/vercel.md',
                        '/frontEnd/tools/tool/macTool.md',
                    ],
                }
            ],
            '/frontEnd/tools/chatGPT': [
                {
                    text: 'chatGPT',
                    children: [
                        '/frontEnd/tools/chatGPT/gpt1.md',
                        '/frontEnd/tools/chatGPT/gpt2.md',
                        '/frontEnd/tools/chatGPT/gpt3.md',
                        '/frontEnd/tools/chatGPT/gpt4.md'
                    ],
                }
            ],
            '/frontEnd/tools/code': [
                {
                    text: '代码库',
                    children: [
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
            '/reader/classical': [
                {
                    text: '古典文学',
                    children: [
                        '/reader/classical/道德经.md',
                        '/reader/classical/心学.md',
                    ],
                }
            ],
            '/reader/psychology': [
                {
                    text: '心理学',
                    children: [
                        '/reader/psychology/阿德勒.md',
                        '/reader/psychology/社会心理学.md',
                        '/reader/psychology/逆商.md',
                    ],
                }
            ],
            '/other/share': [
                {
                    text: '前端分享',
                    children: [
                        '/other/share/share_6.md',
                        '/other/share/share_5.md',
                        '/other/share/share_4.md',
                        '/other/share/share.md',
                        '/other/share/share_2.md',
                        '/other/share/share_3.md',
                    ],
                }
            ],
            '/AI': [
                {
                    text: 'Cursor',
                    children: [
                        '/AI/cursor/cursor-workflow1.md',
                        '/AI/cursor/cursor-workflow3.md',
                        '/AI/cursor/cursor-workflow2.md',
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
                        link: '/frontEnd/base/css/scss.md'
                    },
                    {   text: 'javaScript',
                        link: '/frontEnd/base/javaScript/js.md'
                    },
                    {   text: 'typeScript',
                        link: '/frontEnd/base/typeScript/notes.md'
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
                        link: '/frontEnd/frame/wechatMini/ciWechatMini.md'
                    },
                    {   text: 'react',
                        link: '/frontEnd/frame/react/react.md'
                    },
                    {   text: 'nuxt',
                        link: '/frontEnd/frame/nuxt/nuxt1.md'
                    },
                    {   text: 'uniapp',
                        link: '/frontEnd/frame/uniapp/uniapp1.md'
                    },
                    {   text: '鸿蒙开发',
                        link: '/frontEnd/frame/harmony/harmony.md'
                    },
                ],
            },
            {   text: '前端工程化',
                children: [
                    {   text: '前端方案实现',
                        link: '/frontEnd/project/SDK/monitor.md'
                    },
                    {   text: 'git相关',
                        link: '/frontEnd/project/git/git.md'
                    },
                    {   text: 'Webpack5',
                        link: '/frontEnd/project/webpack/Webpack5.md'
                    },
                    {   text: '代码规范',
                        link: '/frontEnd/project/standard/codeStandard2.md'
                    },
                    {   text: '前端测试',
                        link: '/frontEnd/project/test/test.md'
                    },
                    {   text: '代码逻辑复用',
                        link: '/frontEnd/project/codeReuse/codeReuse.md'
                    },
                    {   text: '包管理工具',
                        link: '/frontEnd/project/package/package.md'
                    },
                ],
            },
            {   text: 'AI应用',
                children: [
                    {   text: 'Cursor',
                        link: '/AI/cursor/cursor-workflow1.md'
                    }
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
                    {   text: 'chatGPT',
                        link: '/frontEnd/tools/chatGPT/gpt1.md'
                    },
                    {   text: '代码库',
                        link: '/frontEnd/tools/code/toolFun.md'
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
            {   text: '读书笔记',
                children: [
                    {   text: '古典文学',
                        link: '/reader/classical/道德经.md'
                    },
                    {   text: '心理学',
                        link: '/reader/psychology/阿德勒.md'
                    }
                ],
            },
            {   text: '其他',
                children: [
                    {   text: '前端分享',
                        link: '/other/share/share_4.md'
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

};