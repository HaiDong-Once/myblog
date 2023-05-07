const {defaultTheme} = require('vuepress')
const {searchPlugin} = require('@vuepress/plugin-search')

module.exports = {
    base: '/myblog/',
    lang: 'zh-CN',
    title: 'ddd`s blog',
    description: 'ddd`s的blog站点',
    head: [['link', {rel: 'icon', href: 'https://shuziren.fsh.bcebos.com/logo-my.png?authorization=bce-auth-v1/f1c8f888ece111ed9e3fade98bdc1c34/2023-05-07T14%3A17%3A48Z/300/host/6eab3d8686cbe07ef208847ada3baa12bb81ca1dc5a36b00f902114a08c67ec9&x-bce-security-token=ZjkyZmQ2YmQxZTQ3NDcyNjk0ZTg1ZjYyYjlkZjNjODB8AAAAAAYHAACli2a0v5Lb9j0ZbGxigAfyQNmThvMnyMcsaCE416zg/VuZ9EnRhM6Zex7cSQ0C4JMVx9mzmquLwL6Ki8j%2Bpiva409jtwYq%2B%2BK4whb08GvVdt7pGag7X1cSez0BVEmSZbqX4ZXaIVNk30/0q/0YnYKqZ1KYuRMPdboz7p/hKgxTdb3WENeYiLZUh%2BYRTYeE0TAxFPjyBfA1GH62wv3UOPA/8qkD/qxWNTcsLQZg3TIk6x97o5rmJBLppkbX63OWItLUrbhDcp8EiXvBIS7nEZrxpkjItBI937KslFryoJHXx4ib/j%2BmUJt6V2hgN8uAFNPuH6Nz5FOrmI/5zZ4FI7%2Bv/UqtFSOefS/sQ7MFugsAx5WrXs93Kj9NETdmv%2B76fKb0KBJv9GMiGS904pN7aALl//EsRQ/mBwe9oa4IzN8Yk%2BuVFyD8X2AJEGNshpK7pJht8FuAh52HVvf2FrSQAOWl12ZiysjR071j4pp0nEH9fjXKxSU58RUL0sGgiNZDCj5KWpJc1R5LgqgnitS20qJuD9Czwquk78nW7ZW7h1tTi2B2igCPwDRxH6HfwPdrNY04s2LRF2nKh7crl7eyLvOq'}]],
    theme: defaultTheme({
        logo: 'https://shuziren.fsh.bcebos.com/logo-my.png?authorization=bce-auth-v1/f1c8f888ece111ed9e3fade98bdc1c34/2023-05-07T14%3A17%3A48Z/300/host/6eab3d8686cbe07ef208847ada3baa12bb81ca1dc5a36b00f902114a08c67ec9&x-bce-security-token=ZjkyZmQ2YmQxZTQ3NDcyNjk0ZTg1ZjYyYjlkZjNjODB8AAAAAAYHAACli2a0v5Lb9j0ZbGxigAfyQNmThvMnyMcsaCE416zg/VuZ9EnRhM6Zex7cSQ0C4JMVx9mzmquLwL6Ki8j%2Bpiva409jtwYq%2B%2BK4whb08GvVdt7pGag7X1cSez0BVEmSZbqX4ZXaIVNk30/0q/0YnYKqZ1KYuRMPdboz7p/hKgxTdb3WENeYiLZUh%2BYRTYeE0TAxFPjyBfA1GH62wv3UOPA/8qkD/qxWNTcsLQZg3TIk6x97o5rmJBLppkbX63OWItLUrbhDcp8EiXvBIS7nEZrxpkjItBI937KslFryoJHXx4ib/j%2BmUJt6V2hgN8uAFNPuH6Nz5FOrmI/5zZ4FI7%2Bv/UqtFSOefS/sQ7MFugsAx5WrXs93Kj9NETdmv%2B76fKb0KBJv9GMiGS904pN7aALl//EsRQ/mBwe9oa4IzN8Yk%2BuVFyD8X2AJEGNshpK7pJht8FuAh52HVvf2FrSQAOWl12ZiysjR071j4pp0nEH9fjXKxSU58RUL0sGgiNZDCj5KWpJc1R5LgqgnitS20qJuD9Czwquk78nW7ZW7h1tTi2B2igCPwDRxH6HfwPdrNY04s2LRF2nKh7crl7eyLvOq',
        sidebar: {
            '/frontEnd/base/browser': [
                {
                    text: '浏览器概念',
                    children: [
                        '/frontEnd/base/browser/bom.md',
                        '/frontEnd/base/browser/bom2.md'
                    ],
                },
            ],
            '/frontEnd/base/css': [
                {
                    text: 'css基础',
                    children: [
                        '/frontEnd/base/css/css.md',
                    ],
                },
                {
                    text: 'css应用案例',
                    children: [
                        '/frontEnd/base/css/css2.md'
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
                        '/frontEnd/frame/vue/workApply.md',
                    ],
                }
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
                    text: 'webpack项目升级',
                    children: [
                        '/frontEnd/project/webpack/webpackCase.md'
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
                        link: '/frontEnd/base/css/css.md'
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
                        link: '/frontEnd/frame/vue/workApply.md'
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