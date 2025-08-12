import{_ as e,r as c,o as i,c as o,b as n,a as p,w as t,d as s,e as l}from"./app.4c8b15c1.js";const u={},r=n("h1",{id:"uniapp-scss-\u62BD\u79BB-css",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#uniapp-scss-\u62BD\u79BB-css","aria-hidden":"true"},"#"),s(" uniapp scss \u62BD\u79BB css")],-1),d={class:"table-of-contents"},k=s("scss mixin\u4EE3\u7801\u5757"),v=s("pubilc.scss \u516C\u5171\u6587\u4EF6"),b=s("company.vue \u5E94\u7528"),m=l(`<p><strong>uniapp\u62BD\u79BB\u601D\u8DEF\uFF1A</strong></p><ul><li>\u7EC4\u4EF6\u62BD\u79BB</li><li>js: mxins, \u6A21\u5757\u5316</li><li>css, scss\u516C\u5171\u6587\u4EF6\uFF0Cclass\u516C\u5171\u6837\u5F0F\uFF0C\u6837\u5F0F\u5757\uFF0C\u53D8\u91CF\uFF0C\u7EE7\u627F\u7C7B</li></ul><h2 id="scss-mixin\u4EE3\u7801\u5757" tabindex="-1"><a class="header-anchor" href="#scss-mixin\u4EE3\u7801\u5757" aria-hidden="true">#</a> scss mixin\u4EE3\u7801\u5757</h2><h3 id="pubilc-scss-\u516C\u5171\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#pubilc-scss-\u516C\u5171\u6587\u4EF6" aria-hidden="true">#</a> pubilc.scss \u516C\u5171\u6587\u4EF6</h3><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token comment">//\u516C\u5171\u9875\u9762\u548Ccard</span>
<span class="token keyword">@mixin</span> <span class="token selector">public-pages</span><span class="token punctuation">{</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f2f6ff<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 750rpx<span class="token punctuation">;</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span> 100vh <span class="token operator">-</span> 1rpx <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 28rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">@mixin</span> <span class="token selector">public-card</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 695rpx<span class="token punctuation">;</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 100rpx<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 13rpx<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto 16rpx<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 35rpx 30rpx<span class="token punctuation">;</span>
  <span class="token property">line-height</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 29rpx<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #666666<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//\u5361\u7247title\u680F</span>
<span class="token keyword">@mixin</span> <span class="token selector">card-title-box</span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 31rpx<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333333<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token selector">.right</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 174rpx<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 63rpx<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f8faff<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 8rpx<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> solid 2rpx #f3f5fb<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 25rpx<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 63rpx<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #327bf9<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> normal<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>:active</span><span class="token punctuation">{</span>
      <span class="token property">opacity</span><span class="token punctuation">:</span> 0.6<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6269\u5927\u70B9\u51FB\u8303\u56F4</span>
<span class="token keyword">@mixin</span> <span class="token function">click-expand</span><span class="token punctuation">(</span><span class="token variable">$width</span><span class="token punctuation">,</span><span class="token variable">$height</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span>relative<span class="token punctuation">;</span>
  <span class="token selector"><span class="token parent important">&amp;</span>::after </span><span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$width</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$height</span><span class="token punctuation">;</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//\u5BA1\u6838\u72B6\u6001\u680F</span>
<span class="token keyword">@mixin</span> <span class="token selector">status-span-box</span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 29rpx<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #666666<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 40rpx<span class="token punctuation">;</span>
  <span class="token selector">.right</span><span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
    <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 29rpx<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #327bf9<span class="token punctuation">;</span>
    <span class="token property">gap</span><span class="token punctuation">:</span> 28rpx<span class="token punctuation">;</span>
    <span class="token selector">span</span><span class="token punctuation">{</span>
      <span class="token keyword">@include</span> <span class="token function">click-expand</span><span class="token punctuation">(</span>60rpx<span class="token punctuation">,</span> 60rpx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.warn</span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #ff9a1d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.error</span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #fc4546<span class="token punctuation">;</span>
      <span class="token keyword">@include</span> <span class="token function">click-expand</span><span class="token punctuation">(</span>100%<span class="token punctuation">,</span> 60rpx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5E2E\u52A9\u4E0E\u63D0\u95EE\u6A21\u5757</span>
<span class="token keyword">@mixin</span> <span class="token selector">help-question-box</span><span class="token punctuation">{</span>
  <span class="token selector">.min-title</span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 29rpx<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #666666<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40rpx<span class="token punctuation">;</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">.text-box</span><span class="token punctuation">{</span>
    <span class="token property">margin-top</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 639rpx<span class="token punctuation">;</span>
    <span class="token property">min-height</span><span class="token punctuation">:</span> 100rpx<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #f8faff<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 8rpx<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> solid 2rpx #f3f5fb<span class="token punctuation">;</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 29rpx<span class="token punctuation">;</span>
    <span class="token property">line-height</span><span class="token punctuation">:</span> 40rpx<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #999999<span class="token punctuation">;</span>
    <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token property">padding</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="company-vue-\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#company-vue-\u5E94\u7528" aria-hidden="true">#</a> company.vue \u5E94\u7528</h3><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code>&lt;style scoped lang=<span class="token string">&quot;scss&quot;</span>&gt;
<span class="token keyword">@import</span> <span class="token string">&quot;pubilc&quot;</span><span class="token punctuation">;</span>

<span class="token selector">.pages</span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> public-pages<span class="token punctuation">;</span>

  <span class="token selector">.card</span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> public-card<span class="token punctuation">;</span>

    <span class="token selector">.title-box</span><span class="token punctuation">{</span>
      <span class="token keyword">@include</span> card-title-box<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.span-box</span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 40rpx<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #f8faff<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 8rpx<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> solid 2rpx #f3f5fb<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 20rpx<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #333333<span class="token punctuation">;</span>
      <span class="token property">margin-top</span><span class="token punctuation">:</span> 30rpx<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
      <span class="token comment">// ...........</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token selector">.span-title-box</span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> status-span-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector"><span class="token parent important">&amp;</span>2</span><span class="token punctuation">{</span>
    <span class="token keyword">@include</span> help-question-box<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function y(x,h){const a=c("RouterLink");return i(),o("div",null,[r,n("nav",d,[n("ul",null,[n("li",null,[p(a,{to:"#scss-mixin\u4EE3\u7801\u5757"},{default:t(()=>[k]),_:1}),n("ul",null,[n("li",null,[p(a,{to:"#pubilc-scss-\u516C\u5171\u6587\u4EF6"},{default:t(()=>[v]),_:1})]),n("li",null,[p(a,{to:"#company-vue-\u5E94\u7528"},{default:t(()=>[b]),_:1})])])])])]),m])}var g=e(u,[["render",y],["__file","css6.html.vue"]]);export{g as default};
