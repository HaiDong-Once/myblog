import{_ as t,r as o,o as c,c as i,a as n,b as e,w as p,d as s,e as l}from"./app.8430cabb.js";const u={},r=n("h1",{id:"\u68C0\u6D4B\u6D4F\u89C8\u5668\u7C7B\u578B\u5DE5\u5177\u5C01\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u68C0\u6D4B\u6D4F\u89C8\u5668\u7C7B\u578B\u5DE5\u5177\u5C01\u88C5","aria-hidden":"true"},"#"),s(" \u68C0\u6D4B\u6D4F\u89C8\u5668\u7C7B\u578B\u5DE5\u5177\u5C01\u88C5")],-1),k={class:"table-of-contents"},d=s("\u4E00\u3001\u51FD\u6570\u5C01\u88C5"),v=s("\u4E8C\u3001\u4F7F\u7528\u6D4F\u89C8\u5668\u68C0\u6D4B\u51FD\u6570"),m=l(`<div class="custom-container tip"><p class="custom-container-title">\u8BF4\u660E\uFF1A</p><p>\u9700\u8981\u8003\u8651\u5230\u53EF\u9760\u6027\uFF0C\u517C\u5BB9\u6027\uFF0C\u56E0\u4E3A navigator.userAgent \u53EF\u4EE5\u88AB\u624B\u52A8\u4FEE\u6539\uFF0C\u4ECE\u800C\u5BFC\u81F4\u5224\u65AD\u8BBE\u5907\u7C7B\u578B\u7684\u65B9\u6CD5\u4E0D\u53EF\u9760\u3002 \u4E3A\u4E86\u66F4\u53EF\u9760\u5730\u5224\u65AD\u8BBE\u5907\u7C7B\u578B\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5176\u4ED6\u65B9\u6CD5\u517C\u5BB9\u5904\u7406\uFF0C\u5982\u5A92\u4F53\u67E5\u8BE2\u548C\u89E6\u6478\u4E8B\u4EF6</p></div><h2 id="\u4E00\u3001\u51FD\u6570\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u51FD\u6570\u5C01\u88C5" aria-hidden="true">#</a> \u4E00\u3001\u51FD\u6570\u5C01\u88C5</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">detectDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isMobile <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> isTablet <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(iPad|Android|Tablet)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> isTouchDevice <span class="token operator">=</span> <span class="token string">&#39;ontouchstart&#39;</span> <span class="token keyword">in</span> window <span class="token operator">||</span> navigator<span class="token punctuation">.</span>maxTouchPoints <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">||</span> navigator<span class="token punctuation">.</span>msMaxTouchPoints <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> isMobileOrTablet <span class="token operator">=</span> isMobile <span class="token operator">||</span> isTablet<span class="token punctuation">;</span>
  <span class="token keyword">const</span> isDesktop <span class="token operator">=</span> <span class="token operator">!</span>isMobileOrTablet<span class="token punctuation">;</span>

  <span class="token keyword">const</span> mediaQueryList <span class="token operator">=</span> window<span class="token punctuation">.</span><span class="token function">matchMedia</span><span class="token punctuation">(</span><span class="token string">&#39;(max-width: 768px)&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6839\u636E\u9700\u8981\u8C03\u6574\u5A92\u4F53\u67E5\u8BE2\u7684\u5BBD\u5EA6</span>
  <span class="token keyword">const</span> isMobileMediaQuery <span class="token operator">=</span> mediaQueryList<span class="token punctuation">.</span>matches<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">isMobile</span><span class="token operator">:</span> isMobile <span class="token operator">||</span> isMobileMediaQuery<span class="token punctuation">,</span>
    <span class="token literal-property property">isTablet</span><span class="token operator">:</span> isMobileOrTablet <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isMobileMediaQuery<span class="token punctuation">,</span>
    isDesktop<span class="token punctuation">,</span>
    isTouchDevice
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E8C\u3001\u4F7F\u7528\u6D4F\u89C8\u5668\u68C0\u6D4B\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u4F7F\u7528\u6D4F\u89C8\u5668\u68C0\u6D4B\u51FD\u6570" aria-hidden="true">#</a> \u4E8C\u3001\u4F7F\u7528\u6D4F\u89C8\u5668\u68C0\u6D4B\u51FD\u6570</h2><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> deviceInfo <span class="token operator">=</span> <span class="token function">detectDeviceType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>deviceInfo<span class="token punctuation">.</span>isMobile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5728\u79FB\u52A8\u8BBE\u5907\u4E0A\u6267\u884C\u7279\u5B9A\u64CD\u4F5C</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>deviceInfo<span class="token punctuation">.</span>isTablet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5728\u5E73\u677F\u8BBE\u5907\u4E0A\u6267\u884C\u7279\u5B9A\u64CD\u4F5C</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>deviceInfo<span class="token punctuation">.</span>isDesktop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5728\u684C\u9762\u8BBE\u5907\u4E0A\u6267\u884C\u7279\u5B9A\u64CD\u4F5C</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>deviceInfo<span class="token punctuation">.</span>isTouchDevice<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5BF9\u4E8E\u652F\u6301\u89E6\u6478\u7684\u8BBE\u5907\u6267\u884C\u7279\u5B9A\u64CD\u4F5C</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">var</span> DeviceDetector <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">checkPlatform</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Android</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;Android&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">iPhone|iPad|iPod</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;iOS&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Windows</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;Windows&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Mac OS X</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;MacOS&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Linux</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;Linux&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;Unknown&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">checkDevice</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> isMobile <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> isTablet <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Tablet|iPad</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMobile <span class="token operator">&amp;&amp;</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Android</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>ua<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> isDesktop <span class="token operator">=</span> <span class="token operator">!</span>isMobile <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isTablet<span class="token punctuation">;</span>
    <span class="token keyword">return</span> isMobile <span class="token operator">?</span> <span class="token string">&#39;Mobile&#39;</span> <span class="token operator">:</span> isTablet <span class="token operator">?</span> <span class="token string">&#39;Tablet&#39;</span> <span class="token operator">:</span> isDesktop <span class="token operator">?</span> <span class="token string">&#39;Desktop&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;Unknown&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> <span class="token function-variable function">checkTouch</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;ontouchstart&#39;</span> <span class="token keyword">in</span> window <span class="token operator">||</span> navigator<span class="token punctuation">.</span>maxTouchPoints <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">||</span> navigator<span class="token punctuation">.</span>msMaxTouchPoints <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">platform</span><span class="token operator">:</span> <span class="token function">checkPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">device</span><span class="token operator">:</span> <span class="token function">checkDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">isTouchDevice</span><span class="token operator">:</span> <span class="token function">checkTouch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Platform: &#39;</span> <span class="token operator">+</span> DeviceDetector<span class="token punctuation">.</span>platform<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Device: &#39;</span> <span class="token operator">+</span> DeviceDetector<span class="token punctuation">.</span>device<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Is Touch Device: &#39;</span> <span class="token operator">+</span> DeviceDetector<span class="token punctuation">.</span>isTouchDevice<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function g(b,x){const a=o("RouterLink");return c(),i("div",null,[r,n("nav",k,[n("ul",null,[n("li",null,[e(a,{to:"#\u4E00\u3001\u51FD\u6570\u5C01\u88C5"},{default:p(()=>[d]),_:1})]),n("li",null,[e(a,{to:"#\u4E8C\u3001\u4F7F\u7528\u6D4F\u89C8\u5668\u68C0\u6D4B\u51FD\u6570"},{default:p(()=>[v]),_:1})])])]),m])}var y=t(u,[["render",g],["__file","code1.html.vue"]]);export{y as default};