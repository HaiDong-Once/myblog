import{_ as n,o as e,c as s,e as a}from"./app.4c8b15c1.js";const i={},l=a(`<h1 id="\u9879\u76EE\u51CF\u91CD\u6E05\u9664\u65E0\u7528\u4F9D\u8D56" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u51CF\u91CD\u6E05\u9664\u65E0\u7528\u4F9D\u8D56" aria-hidden="true">#</a> \u9879\u76EE\u51CF\u91CD\u6E05\u9664\u65E0\u7528\u4F9D\u8D56</h1><h2 id="\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u8BF4\u660E" aria-hidden="true">#</a> \u8BF4\u660E</h2><ul><li>npm cli \u5DE5\u5177 depcheck \u80FD\u8F85\u52A9\u6211\u4EEC\u627E\u5230\u9879\u76EE\u4E2D Unused dependencies\uFF08\u65E0\u7528\u4F9D\u8D56\uFF09\u548C Phantom dependencies\uFF08\u5E7B\u5F71\u4F9D\u8D56\uFF09\uFF0C \u5206\u522B\u8868\u793A\u5199\u5165 package.json \u4F46\u6CA1\u88AB\u9879\u76EE\u4F7F\u7528\u3001\u88AB\u9879\u76EE\u5F15\u7528\u4E86\u4F46\u6CA1\u6709\u5199\u5165 package.json\u3002</li><li>depcheck \u66F4\u50CF\u662F\u4E00\u4E2A\u7F29\u5C0F\u6392\u67E5\u8303\u56F4\u7684\u8FC7\u6EE4\u5668\uFF0C\u4E0D\u80FD\u8F7B\u4FE1\u5176\u6253\u5370\u7ED3\u679C\u3002\u4F8B\u5982\uFF0Cdepcheck \u9ED8\u8BA4\u65E0\u6CD5\u8BC6\u522B\u7279\u6B8A\u6302\u8F7D\u7684 plugin\u3002</li><li>\u9700\u8981\u8C28\u614E\u4F7F\u7528\uFF1A\u8981\u5220\u9664\u4E00\u4E2A\u65E0\u7528\u4F9D\u8D56\uFF0C\u5FC5\u987B\u719F\u6089\u8BE5 npm \u5305\u7684\u4F7F\u7528\u6027\u8D28\uFF0C\u518D\u7ED3\u5408 grep \u5DE5\u5177\u53CD\u590D\u786E\u8BA4\u3002\u56E0\u4E3A\u9700\u8981\u6D4B\u8BD5\u7684\u5185\u5BB9\u591A\u548C\u9690\u5F62\u98CE\u9669\u9AD8\uFF0C \u53EA\u662F\u51CF\u8F7B\u4E86npm install \u7684\u901F\u5EA6\uFF0C\u6295\u8D44\u56DE\u62A5\u6BD4\u4E0D\u9AD8\uFF1B</li><li>\u9700\u8981node.js &gt;= 10</li></ul><h2 id="\u5B89\u88C5-depcheck" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-depcheck" aria-hidden="true">#</a> \u5B89\u88C5 Depcheck</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> depcheck -g
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528-depcheck" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-depcheck" aria-hidden="true">#</a> \u4F7F\u7528 Depcheck</h2><ol><li>\u627E\u5230 node_global \u5168\u5C40\u4F4D\u7F6E\uFF0C\u6253\u5F00cmd</li><li>\u6267\u884C\u4E00\u4E0B\u547D\u4EE4: \u201CprojectPath\u201D \u6307\u7684\u65F6\u524D\u7AEF\u9879\u76EE package.json \u540C\u7EA7\u76EE\u5F55</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>.<span class="token punctuation">\\</span>depcheck + <span class="token string">&quot;projectPath&quot;</span>
.<span class="token punctuation">\\</span>depcheck <span class="token string">&quot;G:\\wamp64\\www\\web-php<span class="token entity" title="\\a">\\a</span>pp-guanjia<span class="token entity" title="\\v">\\v</span>iew<span class="token entity" title="\\v">\\v</span>ue&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u6267\u884C\u7ED3\u679C</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>C:<span class="token punctuation">\\</span>nodejs<span class="token operator">&gt;</span>.<span class="token punctuation">\\</span>depcheck <span class="token string">&quot;G:\\wamp64\\www\\web-php<span class="token entity" title="\\a">\\a</span>pp-guanjia<span class="token entity" title="\\v">\\v</span>iew<span class="token entity" title="\\v">\\v</span>ue&quot;</span>
Unused dependencies
* @babel/runtime
* Base64
* clipboard
* core-js
* cytoscape
* cytoscape-node-html-label
* d3
* fastclick
* i
* image-tools
* jquery
* lib-flexible
* vue-amap
* vue-pdf
Unused devDependencies
* @babel/eslint-parser
* @vue/cli-plugin-babel
* @vue/cli-plugin-eslint
* babel-plugin-component
* customize-cra
* fs-extra
* <span class="token function">less</span>
* less-loader
* mockjs
* sass
* sass-loader
* sass-resources-loader
* style-resources-loader
Missing dependencies
* @guanjia/components: .<span class="token punctuation">\\</span>src-guanjia<span class="token punctuation">\\</span>views<span class="token punctuation">\\</span>test<span class="token punctuation">\\</span>index.vue
* @guanjia/public: .<span class="token punctuation">\\</span>src-guanjia<span class="token punctuation">\\</span>views<span class="token punctuation">\\</span>plaqueOnline<span class="token punctuation">\\</span>tiktokPlaqueTest<span class="token punctuation">\\</span>pay<span class="token punctuation">\\</span>index.vue
* canvas: .<span class="token punctuation">\\</span>public<span class="token punctuation">\\</span>static<span class="token punctuation">\\</span>pdf<span class="token punctuation">\\</span>build<span class="token punctuation">\\</span>pdf.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),c=[l];function t(d,p){return e(),s("div",null,c)}var o=n(i,[["render",t],["__file","loseRely.html.vue"]]);export{o as default};
