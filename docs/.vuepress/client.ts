import { defineClientConfig } from '@vuepress/client'
import LatestPosts from './components/LatestPosts.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('LatestPosts', LatestPosts)
  },
}) 