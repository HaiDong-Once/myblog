import{_ as s,o as n,c as a,e}from"./app.4c8b15c1.js";const l={},t=e(`<h1 id="style\u4E2Dspcoed\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#style\u4E2Dspcoed\u7684\u95EE\u9898" aria-hidden="true">#</a> style\u4E2Dspcoed\u7684\u95EE\u9898</h1><h3 id="\u4FB5\u5165\u7EC4\u4EF6\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u4FB5\u5165\u7EC4\u4EF6\u95EE\u9898" aria-hidden="true">#</a> \u4FB5\u5165\u7EC4\u4EF6\u95EE\u9898</h3><ul><li><p>\u52A0\u5165scoped, \u5165\u4FB5\u7EC4\u4EF6class\u65F6\u4F1A\u5931\u8D25\uFF1B</p></li><li><p>::v-deep</p></li></ul><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token selector">&lt;style lang=&quot;scss&quot; scoped&gt;
   ::v-deep .van-sticky</span><span class="token punctuation">{</span>
     <span class="token property">background-color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u65B0\u589E\u4E00\u4E2Astyle\u65E0scoped\u6807\u7B7E\u63A7\u5236\u7EC4\u4EF6\u6837\u5F0F</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/*\u6837\u5F0F\u5165\u4FB5*/</span>
<span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
<span class="token punctuation">.</span>tabs <span class="token punctuation">.</span>van<span class="token operator">-</span>sticky<span class="token punctuation">{</span>
  <span class="token literal-property property">overflow</span><span class="token operator">:</span> hidden<span class="token punctuation">;</span>
  border<span class="token operator">-</span>radius<span class="token operator">:</span> 22px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>CSS Modules \u4E2D\u4F7F\u7528 :global \u4F2A\u7C7B\u6765\u5B9A\u4E49\u5168\u5C40\u6837\u5F0F</li></ul><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token comment">/* styles.module.css */</span>
<span class="token selector">.localClass </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">:</span><span class="token function">global</span><span class="token punctuation">(</span>.globalClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6837\u5F0F\u7EE7\u627F\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u6837\u5F0F\u7EE7\u627F\u95EE\u9898" aria-hidden="true">#</a> \u6837\u5F0F\u7EE7\u627F\u95EE\u9898</h3><ul><li>vue\u8DEF\u7531\u8DF3\u8F6C\u65B0\u9875\u9762\u6837\u5F0F\u7EE7\u627F\u4E86\u4E0A\u4E00\u9875</li><li>\u89E3\u51B3\u65B9\u6CD5\uFF1A style\u65B0\u589Escoped\u5C5E\u6027</li></ul><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code>&lt;style lang=<span class="token string">&quot;scss&quot;</span> scoped&gt;

&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u4F7F\u7528 CSS Modules</li></ul>`,12),i=[t];function c(p,o){return n(),a("div",null,i)}var r=s(l,[["render",c],["__file","workApply10.html.vue"]]);export{r as default};
