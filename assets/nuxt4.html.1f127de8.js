import{_ as i,r as p,o,c,a as n,b as e,w as t,d as s,e as l}from"./app.8430cabb.js";const u={},d=n("h1",{id:"nuxt3-\u4E2D\u670D\u52A1\u7AEF\u6E32\u67D3\u62A5\u9519\u95EE\u9898\u89E3\u51B3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nuxt3-\u4E2D\u670D\u52A1\u7AEF\u6E32\u67D3\u62A5\u9519\u95EE\u9898\u89E3\u51B3","aria-hidden":"true"},"#"),s(" nuxt3 \u4E2D\u670D\u52A1\u7AEF\u6E32\u67D3\u62A5\u9519\u95EE\u9898\u89E3\u51B3")],-1),r={class:"table-of-contents"},k=s("\u95EE\u9898\u5217\u4E3E"),v=s("\u60C5\u666F1"),m=s("\u89E3\u51B3\u65B9\u6CD5\uFF1A"),h=s("\u60C5\u666F2"),b=s("\u89E3\u51B3\u65B9\u6CD5\uFF1A"),g=s("\u60C5\u666F3"),f=s("\u89E3\u51B3\u65B9\u6848"),w=l(`<h2 id="\u95EE\u9898\u5217\u4E3E" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u5217\u4E3E" aria-hidden="true">#</a> \u95EE\u9898\u5217\u4E3E</h2><ul><li>window is not defined</li><li>document is not defined</li></ul><h2 id="\u60C5\u666F1" tabindex="-1"><a class="header-anchor" href="#\u60C5\u666F1" aria-hidden="true">#</a> \u60C5\u666F1</h2><p>\u81EA\u5DF1\u5199\u7684\u4EE3\u7801\u4E2D\u5305\u542B\u4E86window \u6216\u8005dom\u64CD\u4F5C\uFF0C\u56E0\u4E3Anuxt\u4E3ASSR\u9879\u76EE\uFF0C\u5728\u7F16\u8BD1\u6253\u5305\u65F6\u4F1A\u533A\u5206\u670D\u52A1\u7AEF\u6E32\u67D3\uFF0C\u8FD8\u662F\u5BA2\u6237\u7AEF\u6E32\u67D3\uFF08\u6D4F\u89C8\u5668\u7AEF\uFF09\u3002 \u5728\u4EE3\u7801\u4E2D\u4F7F\u7528window\u6216dom\uFF0C\u6253\u5305\u5DE5\u5177\u9ED8\u8BA4\u5C06\u5176\u52A0\u5165\u4E86\u670D\u52A1\u7AEF\u811A\u672C\u4E2D\uFF0C\u670D\u52A1\u7AEF\u53C8\u6CA1\u6709window,dom\u5BF9\u8C61\uFF0C\u6240\u4EE5\u4F1A\u51FA\u73B0\u4EE5\u4E0A\u62A5\u9519\u3002</p><h3 id="\u89E3\u51B3\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6CD5" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6CD5\uFF1A</h3><h4 id="_1-js\u4EE3\u7801\u4E2Dprocess-client\u5224\u65AD" tabindex="-1"><a class="header-anchor" href="#_1-js\u4EE3\u7801\u4E2Dprocess-client\u5224\u65AD" aria-hidden="true">#</a> 1.js\u4EE3\u7801\u4E2Dprocess.client\u5224\u65AD</h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>client<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span> <span class="token comment">// \u8FD9\u91CC\u5C31\u662F\u64CD\u4F5Cwindow\u6216dom\u5BF9\u8C61\u7684\u4EE3\u7801</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2\u3001\u5C06window\u64CD\u4F5C\u6216\u8005dom\u64CD\u4F5C\u7684\u4EE3\u7801\u653E\u5728mounted\u751F\u547D\u5468\u671F\u5185" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u5C06window\u64CD\u4F5C\u6216\u8005dom\u64CD\u4F5C\u7684\u4EE3\u7801\u653E\u5728mounted\u751F\u547D\u5468\u671F\u5185" aria-hidden="true">#</a> 2\u3001\u5C06window\u64CD\u4F5C\u6216\u8005dom\u64CD\u4F5C\u7684\u4EE3\u7801\u653E\u5728mounted\u751F\u547D\u5468\u671F\u5185</h4><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// window dom ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u60C5\u666F2" tabindex="-1"><a class="header-anchor" href="#\u60C5\u666F2" aria-hidden="true">#</a> \u60C5\u666F2</h2><p>\u7EC4\u4EF6\u4E2D\u5305\u542Bwindow,dom\u4EE3\u7801\uFF1A\u4F8B\u5982\uFF1A\u5728\u4F7F\u7528antDesign a-auto-complete\u7EC4\u4EF6\u65F6\uFF0C\u4F1A\u62A5\u670D\u52A1\u7AEF\u9519\u8BEF\uFF0C\u5982\uFF1Awindow not define, document not define</p><h3 id="\u89E3\u51B3\u65B9\u6CD5-1" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6CD5-1" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6CD5\uFF1A</h3><p>\u5728\u7EC4\u4EF6\u7AEF\u53EF\u4EE5\u4F7F\u7528 <code>&lt;ClientOnly&gt;</code> \u6807\u7B7E\u5305\u88F9\uFF0C \u4EC5\u5728\u5BA2\u6237\u7AEF\u6E32\u67D3\u8BE5\u7EC4\u4EF6\uFF0C\u89E3\u51B3\u7C7B\u4F3C\u95EE\u9898</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ClientOnly</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a-auto-complete</span><span class="token punctuation">&gt;</span></span>
    \u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002\u3002
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a-auto-complete</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ClientOnly</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u60C5\u666F3" tabindex="-1"><a class="header-anchor" href="#\u60C5\u666F3" aria-hidden="true">#</a> \u60C5\u666F3</h2><p>\u4F7F\u7528\u7684\u5916\u90E8\u63D2\u4EF6\u4E2D\u5305\u542B\u4E86window\u7B49\u670D\u52A1\u7AEF\u4E0D\u652F\u6301\u7684\u5185\u5BB9</p><h3 id="\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> \u89E3\u51B3\u65B9\u6848</h3><h4 id="plugins\u5BFC\u5165-\u8BBE\u7F6E-ssr-false" tabindex="-1"><a class="header-anchor" href="#plugins\u5BFC\u5165-\u8BBE\u7F6E-ssr-false" aria-hidden="true">#</a> plugins\u5BFC\u5165 \u8BBE\u7F6E ssr:false</h4><p>\u5728nuxt.config.ts\u7684plugins\u5C5E\u6027\u4E2D\u5BFC\u5165\u63D2\u4EF6\u65F6\uFF0C\u8BBE\u7F6Essr\u4E3Afalse,\u4F7F\u5176\u4EC5\u5728\u5BA2\u6237\u7AEF\u6E32\u67D3\u3002</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	 <span class="token comment">//\u5176\u5B83\u914D\u7F6E\u9879...</span>
	plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
	    <span class="token punctuation">{</span> 
	    	src<span class="token operator">:</span> <span class="token string">&#39;~/plugins/kafuuchino&#39;</span><span class="token punctuation">,</span>
	    	ssr<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// \u6B64\u5904\u7684 ssr:false \u5C31\u662F\u5C06\u5176\u6539\u4E3A\u975E\u670D\u52A1\u5668\u7AEF\u6E32\u67D3</span>
	    <span class="token punctuation">}</span> 
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="import-\u5BFC\u5165\u4F7F\u7528-await-import-\u66FF\u6362" tabindex="-1"><a class="header-anchor" href="#import-\u5BFC\u5165\u4F7F\u7528-await-import-\u66FF\u6362" aria-hidden="true">#</a> import \u5BFC\u5165\u4F7F\u7528 await import(&#39;&#39;) \u66FF\u6362</h4><p>es6\u6B63\u5E38\u5BFC\u51FA\u4F7F\u7528\u62A5\u9519\uFF1A winodw ont define</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> pingansec <span class="token keyword">from</span> <span class="token string">&#39;pingansec-vue-ana&#39;</span><span class="token punctuation">;</span>
pingansec<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u51B3\u65B9\u6CD5\uFF1A\u5728\u5BA2\u6237\u7AEF\u8C03\u7528\u65F6\u5728\u5BFC\u5165 await import(&#39;&#39;);</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">firePingansec</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>code<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> pingansec <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;pingansec-vue-ana&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pingansec<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE5pa\u6253\u70B9hook\u5C01\u88C5\u4E3A\u6848\u4F8B\uFF0C\u89E3\u51B3\u91CD\u590D\u5BFC\u5165\u95EE\u9898</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * Version: pa\u6253\u70B9 hook \u5C01\u88C5
 * Author: hhd
 * Created: 2023/08/03
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>firePingansec: ((function(*): Promise&lt;void&gt;)|*)<span class="token punctuation">}</span><span class="token punctuation">}</span>
 * <span class="token keyword">@description</span>:
 *  import usePingansec from &#39;~/hooks/usePingansec&#39;
 *  const <span class="token punctuation">{</span> firePingansec <span class="token punctuation">}</span> = usePingansec();
 *  firePingansec(5342)
 */</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">usePingansec</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> pingansec <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">loadPingansec</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pingansec<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pingansec<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&#39;pingansec-vue-ana&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">firePingansec</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>code<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">await</span> <span class="token function">loadPingansec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pingansec<span class="token punctuation">.</span>value<span class="token punctuation">.</span>default<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        firePingansec<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27);function _(y,x){const a=p("RouterLink");return o(),c("div",null,[d,n("nav",r,[n("ul",null,[n("li",null,[e(a,{to:"#\u95EE\u9898\u5217\u4E3E"},{default:t(()=>[k]),_:1})]),n("li",null,[e(a,{to:"#\u60C5\u666F1"},{default:t(()=>[v]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#\u89E3\u51B3\u65B9\u6CD5"},{default:t(()=>[m]),_:1})])])]),n("li",null,[e(a,{to:"#\u60C5\u666F2"},{default:t(()=>[h]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#\u89E3\u51B3\u65B9\u6CD5-1"},{default:t(()=>[b]),_:1})])])]),n("li",null,[e(a,{to:"#\u60C5\u666F3"},{default:t(()=>[g]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#\u89E3\u51B3\u65B9\u6848"},{default:t(()=>[f]),_:1})])])])])]),w])}var j=i(u,[["render",_],["__file","nuxt4.html.vue"]]);export{j as default};