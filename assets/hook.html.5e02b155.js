import{_ as t,r as e,o as p,c as o,b as n,a as c,w as i,d as s,e as l}from"./app.4c8b15c1.js";const u={},r=n("h1",{id:"nuxt3-\u8F6E\u64ADhook\u52A8\u753B\u62BD\u79BB\u6848\u4F8B",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nuxt3-\u8F6E\u64ADhook\u52A8\u753B\u62BD\u79BB\u6848\u4F8B","aria-hidden":"true"},"#"),s(" nuxt3 \u8F6E\u64ADhook\u52A8\u753B\u62BD\u79BB\u6848\u4F8B")],-1),d={class:"table-of-contents"},k=s("hooks \u62BD\u79BB"),v=l(`<h2 id="hooks-\u62BD\u79BB" tabindex="-1"><a class="header-anchor" href="#hooks-\u62BD\u79BB" aria-hidden="true">#</a> hooks \u62BD\u79BB</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onUnmounted<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * Version: tab\u52A8\u753B\u63A7\u5236
 * Author: hhd
 * Created: 2023/08/03
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>firePingansec: ((function(*): Promise&lt;void&gt;)|*)<span class="token punctuation">}</span><span class="token punctuation">}</span>
 * <span class="token keyword">@description</span>:
 *  import useTabAnimation from &#39;./hooks/useTabAnimation&#39;
 *  const <span class="token punctuation">{</span> startAnimationTab, tabsIcon <span class="token punctuation">}</span> = useTabAnimation();
 *  startAnimationTab(0, 8000)
 */</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useTabAnimation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tabs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">]</span> <span class="token comment">// tab \u6570\u7EC4\u96C6\u5408</span>
  <span class="token keyword">const</span> tabsIndex <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5F53\u524D\u5C55\u793Atab index\u503C</span>
  <span class="token keyword">let</span> tabsId <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// tab\u52A8\u753B\u5B9A\u65F6\u5668</span>
  <span class="token keyword">const</span> tabsIcon <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// \u5F53\u524D\u5C55\u793Atab \u5BF9\u5E94\u6570\u7EC4\u503C</span>
    <span class="token keyword">return</span> tabs<span class="token punctuation">[</span>tabsIndex<span class="token punctuation">.</span>value<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token doc-comment comment">/**
   * \u5F00\u59CBtab\u52A8\u753B
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">startAnimationTab</span> <span class="token operator">=</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> time<span class="token operator">=</span> <span class="token number">8000</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    tabsIndex<span class="token punctuation">.</span>value <span class="token operator">=</span> index
    tabsId <span class="token operator">&amp;&amp;</span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>tabsId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    tabsId <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      tabsIndex<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">(</span>tabsIndex<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> tabs<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">startAnimationTab</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


  <span class="token function">onUnmounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    tabsId <span class="token operator">&amp;&amp;</span> <span class="token function">clearInterval</span><span class="token punctuation">(</span>tabsId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    startAnimationTab<span class="token punctuation">,</span>
    tabsIcon<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function m(b,h){const a=e("RouterLink");return p(),o("div",null,[r,n("nav",d,[n("ul",null,[n("li",null,[c(a,{to:"#hooks-\u62BD\u79BB"},{default:i(()=>[k]),_:1})])])]),v])}var _=t(u,[["render",m],["__file","hook.html.vue"]]);export{_ as default};
