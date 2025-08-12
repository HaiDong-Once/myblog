import{_ as n,o as s,c as a,e}from"./app.4c8b15c1.js";const t={},p=e(`<h1 id="swiper\u6307\u5B9A\u8DF3\u8F6C\u9875\u548C\u76D1\u542C\u5F53\u524D\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#swiper\u6307\u5B9A\u8DF3\u8F6C\u9875\u548C\u76D1\u542C\u5F53\u524D\u4F4D\u7F6E" aria-hidden="true">#</a> swiper\u6307\u5B9A\u8DF3\u8F6C\u9875\u548C\u76D1\u542C\u5F53\u524D\u4F4D\u7F6E</h1><div class="custom-container tip"><p class="custom-container-title">\u8BF4\u660E\uFF1A</p><ul><li>\u6307\u5B9A\u8DF3\u8F6C\u5230\u6307\u5B9A\u8F6E\u64AD\u9875\uFF1A<code>slideTo</code></li><li>\u76D1\u542C\u5F53\u524D\u8F6E\u64AD\u4F4D\u7F6E\uFF1A<code>slideChange</code></li></ul></div><h2 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * swiper\u521D\u59CB\u5316
 */</span>
<span class="token function">swiperInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>Swiper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Swiper</span> <span class="token punctuation">(</span><span class="token string">&#39;.swiper-container&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    loop<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u5FAA\u73AF\u6A21\u5F0F\u9009\u9879</span>
    autoplay<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//\u81EA\u52A8\u5FAA\u73AF</span>
    disableOnInteraction<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    delay<span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
    <span class="token comment">// \u76D1\u542C\u8F6E\u64AD\u4F4D\u7F6E</span>
    on<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">slideChange</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        that<span class="token punctuation">.</span>activeTabIndex <span class="token operator">=</span> <span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeIndex<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeIndex <span class="token operator">===</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          that<span class="token punctuation">.</span>activeTabIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>


<span class="token doc-comment comment">/**
 * tabSwiper\u70B9\u51FB\u8DF3\u8F6C\u5230\u6307\u5B9A\u8F6E\u64AD\u9875
 */</span>
<span class="token function">clickTabSwiper</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabIndex <span class="token operator">=</span> index
  <span class="token keyword">this</span><span class="token punctuation">.</span>Swiper<span class="token punctuation">.</span><span class="token function">slideTo</span><span class="token punctuation">(</span>index<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[p];function c(i,l){return s(),a("div",null,o)}var r=n(t,[["render",c],["__file","workApply24.html.vue"]]);export{r as default};
