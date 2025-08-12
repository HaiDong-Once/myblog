import{_ as n,o as s,c as a,e}from"./app.4c8b15c1.js";const p={},t=e(`<h1 id="npm\u6253\u5305\u547D\u4EE4\u4F20\u53C2" tabindex="-1"><a class="header-anchor" href="#npm\u6253\u5305\u547D\u4EE4\u4F20\u53C2" aria-hidden="true">#</a> npm\u6253\u5305\u547D\u4EE4\u4F20\u53C2</h1><h2 id="\u76F4\u63A5\u52A0\u53C2-process-argv\u83B7\u53D6" tabindex="-1"><a class="header-anchor" href="#\u76F4\u63A5\u52A0\u53C2-process-argv\u83B7\u53D6" aria-hidden="true">#</a> \u76F4\u63A5\u52A0\u53C2 process.argv\u83B7\u53D6</h2><ul><li>\u4F7F\u7528 <code>process.argv</code> \u76F4\u63A5\u83B7\u53D6npm\u547D\u4EE4\u884C\u540E\u8DDF\u968F\u7684\u53C2\u6570</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>// shell\u63A7\u5236\u53F0
<span class="token function">npm</span> run test1 guanjia

// \u6253\u5370scriptsArray
<span class="token punctuation">[</span>
  <span class="token string">&#39;C:\\\\nodejs\\\\node.exe&#39;</span>,
  <span class="token string">&#39;G:\\\\wamp64\\\\www\\\\web-php\\\\app-shuidi\\\\view\\\\vue\\\\node_modules\\\\&#39;</span>+
  <span class="token string">&#39;@vue\\\\cli-service\\\\bin\\\\vue-cli-service.js&#39;</span>,
  <span class="token string">&#39;build&#39;</span>,
  <span class="token string">&#39;--mode&#39;</span>,
  <span class="token string">&#39;test&#39;</span>,
  <span class="token string">&#39;guanjia&#39;</span>
<span class="token punctuation">]</span> <span class="token number">111</span>

// \u6253\u5370\u914D\u7F6E\u6587\u4EF6pages
<span class="token punctuation">{</span>
  guanjia: <span class="token punctuation">{</span>
    template: <span class="token string">&#39;public/index.html&#39;</span>,
    entry: <span class="token string">&#39;src-guanjia/main.js&#39;</span>,
    filename: <span class="token string">&#39;guanjia.html&#39;</span>,
    title: <span class="token string">&#39;\u4F01\u4E1A\u4FE1\u7528\u7BA1\u5BB6&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token number">222222</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5206\u5305\u914D\u7F6E</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// vue.config.js</span>
<span class="token keyword">const</span> scriptsArray <span class="token operator">=</span> process<span class="token punctuation">.</span>argv <span class="token operator">??</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// npm\u547D\u4EE4\u884C\u4FE1\u606F</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>scriptsArray<span class="token punctuation">,</span><span class="token number">111</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> pages <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> guanjia <span class="token operator">=</span> <span class="token punctuation">{</span>
    template<span class="token operator">:</span> <span class="token string">&quot;public/index.html&quot;</span><span class="token punctuation">,</span>
    entry<span class="token operator">:</span> <span class="token string">&quot;src-guanjia/main.js&quot;</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">&#39;guanjia.html&#39;</span><span class="token punctuation">,</span>
    title<span class="token operator">:</span> <span class="token string">&#39;\u4F01\u4E1A\u4FE1\u7528\u7BA1\u5BB6&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> shuidi <span class="token operator">=</span> <span class="token punctuation">{</span>
    template<span class="token operator">:</span> <span class="token string">&quot;public/index.html&quot;</span><span class="token punctuation">,</span>
    entry<span class="token operator">:</span> <span class="token string">&quot;src/main.js&quot;</span><span class="token punctuation">,</span>
    filename<span class="token operator">:</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">,</span>
    title<span class="token operator">:</span> <span class="token string">&#39;\u6C34\u6EF4\u4FE1\u7528&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span><span class="token punctuation">(</span> scriptsArray<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;guanjia&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    pages <span class="token operator">=</span> <span class="token punctuation">{</span> guanjia <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span> scriptsArray<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;shuidi&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
    pages <span class="token operator">=</span> <span class="token punctuation">{</span> shuidi <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
    pages <span class="token operator">=</span> <span class="token punctuation">{</span> guanjia<span class="token punctuation">,</span> shuidi <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pages<span class="token punctuation">,</span> <span class="token number">222222</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    pages<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="npm\u811A\u672C\u914D\u7F6E-process-env\u83B7\u53D6" tabindex="-1"><a class="header-anchor" href="#npm\u811A\u672C\u914D\u7F6E-process-env\u83B7\u53D6" aria-hidden="true">#</a> npm\u811A\u672C\u914D\u7F6E p<wbr>rocess.env\u83B7\u53D6</h2><ul><li>\u914D\u7F6E\u811A\u672C</li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token comment">// \u5728 package.json \u4E2D\u5B9A\u4E49\u4E00\u4E2A build \u811A\u672C\uFF0C\u5E76\u5728\u5176\u4E2D\u4F20\u9012\u4E00\u4E2A\u81EA\u5B9A\u4E49\u53C2\u6570 myParam\uFF1A</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;npm run build --myParam=value&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5728\u547D\u4EE4\u884C\u4E2D\u6267\u884C <code>npm run build</code> \u5373\u53EF\u4F20\u9012\u53C2\u6570\uFF0C\u5E76\u5728 <code>vue.config.js</code> \u4E2D\u4F7F\u7528\u3002</li><li>\u5176\u4E2D <code>npm_config</code>_ \u662F <code>npm</code> \u5185\u7F6E\u7684\u73AF\u5883\u53D8\u91CF\u524D\u7F00\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8BE5\u524D\u7F00\u83B7\u53D6\u4F20\u9012\u7684\u53C2\u6570\u3002</li><li>\u5728\u672C\u793A\u4F8B\u4E2D\uFF0C\u53C2\u6570\u540D\u4E3A <code>myParam</code>\uFF0C\u5219\u5728 <code>vue.config.js</code> \u4E2D\u4F7F\u7528\u7684\u53D8\u91CF\u540D\u4E3A <code>npm_config_myParam</code>\u3002</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u5728 vue.config.js \u4E2D\u53EF\u4EE5\u8FD9\u6837\u4F7F\u7528 p<wbr>rocess.env \u83B7\u53D6\u4F20\u9012\u7684\u53C2\u6570\uFF1A</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  configureWebpack<span class="token operator">:</span> <span class="token punctuation">{</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token keyword">new</span> <span class="token class-name">MyPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        myParam<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>npm_config_myParam <span class="token operator">||</span> <span class="token string">&#39;default value&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),i=[t];function c(o,l){return s(),a("div",null,i)}var r=n(p,[["render",c],["__file","npmPrams.html.vue"]]);export{r as default};
