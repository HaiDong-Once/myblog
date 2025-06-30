<template>
  <div class="latest-posts">
    <div class="container">
      <div class="posts-grid">
        <article 
          v-for="(post, index) in latestPosts" 
          :key="index"
          class="post-card"
          @click="navigateToPost(post.path)"
        >
          <div class="post-content">
            <div class="post-category">{{ post.category }}</div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-description">{{ post.description }}</p>
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.lastUpdated) }}</span>
              <span class="read-more">查看详情 →</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LatestPosts',  
  data() {
    return {
      latestPosts: [
        {
          title: '前端弹窗中心化管理方案',
          description: '解决弹窗管理混乱问题，支持优先级控制、状态机管理、数据耦合等',
          category: '前端方案',
          path: '/frontEnd/project/SDK/code3.md',
          lastUpdated: new Date('2025/6/30 12:24:05')
        },
        {
          title: '微前端事件总线通信方案',
          description: '支持事件监听、事件发送、状态管理、生命周期管理等',
          category: '微前端',
          path: '/frontEnd/project/microFrontend/qiankun5.md',
          lastUpdated: new Date('2025/6/30 12:24:05')
        },
        {
          title: 'app通知权限管理',
          description: 'app跨端项目中使用plus api实现通知权限管理',
          category: 'App',
          path: '/frontEnd/frame/app/app.md',
          lastUpdated: new Date('2025/6/19 16:24:05')
        },
        {
          title: 'Vue弹窗组件改造',
          description: 'Vue弹窗组件改造，从模板调用到JS函数调用实现',
          category: 'Vue框架',
          path: '/frontEnd/frame/vue/workApply28.md',
          lastUpdated: new Date('2025/6/12 18:00:05') 
        },
        {
          title: 'SSE客户端封装',
          description: 'SSE客户端封装，打造流畅的AI对话体验',
          category: 'AI应用',
          path: '/AI/apply/SSE.md',
          lastUpdated: new Date('2025/6/12 17:50:05') 
        },
        {
          title: 'qiankun老项目渐进式升级方案',
          description: 'jQuery + React 老项目渐进式升级方案最佳实践',
          category: '微前端',
          path: '/frontEnd/project/microFrontend/qiankun4.md',
          lastUpdated: new Date('2025/6/11 11:20:05') 
        },
        {
          title: 'qiankun JQ老项目升级-组件级微前端扩展',
          description: ' 针对基础方案做了进一步扩展，支持组件级微前端扩展',
          category: '微前端',
          path: '/frontEnd/project/microFrontend/qiankun3.md',
          lastUpdated: new Date('2025/6/11 11:20:05') 
        },
        {
          title: 'qiankun JQ老项目升级-基础方案',
          description: ' 基础方案，通过 URL 路由驱动的方式，动态注入 qiankun 加载子应用',
          category: '微前端',
          path: '/frontEnd/project/microFrontend/qiankun2.md',
          lastUpdated: new Date('2025/6/11 11:20:05') 
        },
        {
          title: 'qiankun微前端快速上手指南',
          description: ' qiankun基本概念, 安装、配置、使用等',
          category: '微前端',
          path: '/frontEnd/project/microFrontend/qiankun1.md',
          lastUpdated: new Date('2025/6/11 11:20:05') 
        },
        {
          title: 'pc端通用新手引导组件最佳实践',
          description: '应用于pc项目用户引导场景，提升产品的易用性',
          category: 'React框架',
          path: '/frontEnd/frame/react/react8.md',
          lastUpdated: new Date('2025/6/6 15:15:36')
        },
        {
          title: '前端基建：小团队前端代码规范基础篇',
          description: '前端规范基础版，用于团队协作开发，提升开发效率',
          category: '前端基建',
          path: '/frontEnd/project/standard/codeStandard2.md',
          lastUpdated: new Date('2025/6/4 18:15:36')
        },
        {
          title: 'Cursor工作流探索第三篇',
          description: 'Project Rules 团队项目应用实践',
          category: 'AI工作流',
          path: '/AI/cursor/cursor-workflow3.md',
          lastUpdated: new Date('2025/6/4 18:15:36')
        },
        {
          title: 'Cursor工作流探索第二篇',
          description: '概念理解到实践技巧',
          category: 'AI工作流',
          path: '/AI/cursor/cursor-workflow2.md',
          lastUpdated: new Date('2025/6/4 18:15:36')
        },
        {
          title: 'Cursor工作流探索第一篇',
          description: '前端开发效率提升，从DTC到全流程AI赋能',
          category: 'AI工作流',
          path: '/AI/cursor/cursor-workflow1.md',
          lastUpdated: new Date('2025/6/4 18:15:36')
        },
        {
          title: 'Vue工作应用实例分享',
          description: 'Vue在实际工作中的应用案例和解决方案',
          category: 'Vue框架',
          path: '/frontEnd/frame/vue/workApply1.md',
          lastUpdated: new Date('2024/9/27 18:03:36')
        },
        {
          title: 'React开发实践',
          description: 'React项目开发中的最佳实践和技巧分享',
          category: 'React框架',
          path: '/frontEnd/frame/react/react.md',
          lastUpdated: new Date('2024/10/15 23:16:31')
        },
        {
          title: 'Webpack5学习文档',
          description: '深入学习Webpack5的配置和优化技巧',
          category: '工程化',
          path: '/frontEnd/project/webpack/Webpack5.md',
          lastUpdated: new Date('2023/5/7 23:18:24')
        },
        {
          title: 'TypeScript学习笔记',
          description: 'TypeScript基础语法和高级特性详解',
          category: '基础技术',
          path: '/frontEnd/base/typeScript/notes.md',
          lastUpdated: new Date('2024/8/23 18:28:24')
        },
        {
          title: '小程序优化实践',
          description: '微信小程序性能优化的实际案例和方法',
          category: '性能优化',
          path: '/frontEnd/performance/wechat/wechat.md',
          lastUpdated: new Date('2023/5/13 00:56:08')
        },
        {
          title: 'Nuxt3应用开发',
          description: 'Nuxt3框架的实际应用和开发技巧',
          category: 'Nuxt框架',
          path: '/frontEnd/frame/nuxt/nuxt1.md',
          lastUpdated: new Date('2023/8/31 19:02:20')
        },
        {
          title: 'CSS应用案例',
          description: 'CSS实用技巧和布局解决方案',
          category: '基础技术',
          path: '/frontEnd/base/css/css6.md',
          lastUpdated: new Date('2024/3/25 18:51:11')
        },
        {
          title: '前端监控SDK实现',
          description: '如何从零开始实现一个前端监控SDK',
          category: '前端方案',
          path: '/frontEnd/project/SDK/monitorSDK.md',
          lastUpdated: new Date('2024/10/15 23:16:31')
        },
        {
          title: '鸿蒙开发入门',
          description: 'HarmonyOS应用开发基础教程',
          category: '移动开发',
          path: '/frontEnd/frame/harmony/harmony.md',
          lastUpdated: new Date('2024/8/13 15:39:37')
        },
        {
          title: 'ChatGPT应用技巧',
          description: 'ChatGPT在开发工作中的实用技巧',
          category: '工具应用',
          path: '/frontEnd/tools/chatGPT/gpt1.md',
          lastUpdated: new Date('2023/7/5 15:43:02')
        }
      ]
    }
  },
  methods: {
    navigateToPost(path) {
      this.$router.push(path)
    },
    formatDate(date) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
      return date.toLocaleDateString('zh-CN', options)
    }
  },
  mounted() {
    // 按更新时间排序，最新的在前面
    this.latestPosts.sort((a, b) => b.lastUpdated - a.lastUpdated)
    // 只保留最新的10条
    this.latestPosts = this.latestPosts.slice(0, 20)
  }
}
</script>

<style scoped>
.latest-posts {
  /* background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
  padding:0 0 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 60px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #3eaf7c, #4abf8a);
  border-radius: 2px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.post-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.post-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-category {
  display: inline-block;
  background: linear-gradient(135deg, #3eaf7c, #4abf8a);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  width: fit-content;
}

.post-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-description {
  color: #718096;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.post-date {
  color: #a0aec0;
  font-size: 0.85rem;
}

.read-more {
  color: #3eaf7c;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.post-card:hover .read-more {
  color: #2d8659;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .latest-posts {
    padding: 20px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .post-card {
    padding: 20px;
  }
  
  .post-title {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style> 