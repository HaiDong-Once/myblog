import{_ as n,o as s,c as a,e as t}from"./app.4c8b15c1.js";const e={},p=t(`<h1 id="vuex\u6570\u636E\u6301\u4E45\u5316\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#vuex\u6570\u636E\u6301\u4E45\u5316\u5B9E\u73B0" aria-hidden="true">#</a> vuex\u6570\u636E\u6301\u4E45\u5316\u5B9E\u73B0</h1><h3 id="vuex\u72B6\u6001\u7BA1\u7406\u8BBE\u8BA1\u548C\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#vuex\u72B6\u6001\u7BA1\u7406\u8BBE\u8BA1\u548C\u5B9E\u73B0" aria-hidden="true">#</a> vuex\u72B6\u6001\u7BA1\u7406\u8BBE\u8BA1\u548C\u5B9E\u73B0</h3><h4 id="\u5B89\u88C5\u5F15\u7528" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u5F15\u7528" aria-hidden="true">#</a> \u5B89\u88C5\u5F15\u7528</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> vuex@next --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u6784\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFA" aria-hidden="true">#</a> \u6784\u5EFA</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>


<span class="token comment">// \u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 store \u5B9E\u4F8B</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    
  <span class="token function">state</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u6279\u6B21id</span>
      uid<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u7528\u6237id</span>
      token<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u767B\u5F55token </span>
      digest<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u4F01\u4E1Adigest</span>
      phone<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u7535\u8BDD\u53F7\u7801</span>
      kp_signature<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u6279\u6B21id\u7B7E\u540D\u8BA4\u8BC1</span>
      product_type<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u4EA7\u54C1\u7C7B\u578B</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// \u4F7F\u7528set+\u9A7C\u5CF0\u547D\u540D\u8BBE\u7F6E\u72B6\u6001\uFF0C\u672A\u4F7F\u7528\u5B98\u7F51\u63A8\u8350\u7684\u5927\u5199\u65B9\u6848</span>
  mutations<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8BBE\u7F6E\u6279\u6B21id</span>
    <span class="token function">setId</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>id <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u7528\u6237id</span>
    <span class="token function">setUid</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>uid <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u7528\u6237id</span>
    <span class="token function">setToken</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>token <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u4F01\u4E1Adigest</span>
    <span class="token function">setDigest</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>digest <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u7535\u8BDD\u53F7\u7801</span>
    <span class="token function">setPhone</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>phone <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u6279\u6B21id\u7B7E\u540D\u8BA4\u8BC1</span>
    <span class="token function">setKp_signature</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>kp_signature <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    
    <span class="token comment">// \u8BBE\u7F6E\u4EA7\u54C1\u7C7B\u578B</span>
    <span class="token function">setProduct_type</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        state<span class="token punctuation">.</span>product_type <span class="token operator">=</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token comment">/* \u6839\u7EC4\u4EF6 */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u5C06 store \u5B9E\u4F8B\u4F5C\u4E3A\u63D2\u4EF6\u5B89\u88C5</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vuex\u7ED1\u5B9Adata\u6570\u636E\u540C\u6B65\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#vuex\u7ED1\u5B9Adata\u6570\u636E\u540C\u6B65\u65B9\u6848" aria-hidden="true">#</a> vuex\u7ED1\u5B9Adata\u6570\u636E\u540C\u6B65\u65B9\u6848</h4><div class="custom-container tip"><p class="custom-container-title">\u601D\u8DEF\u5206\u6790</p><ul><li><strong>\u95EE\u9898</strong>\uFF1Avuex\u548Cdata\u6570\u636E\u90FD\u662F\u54CD\u5E94\u5F0F\u7684\uFF0C\u72B6\u6001\u540C\u6B65\uFF0C\u4F46\u662Fvuex\u6570\u636E\u8D4B\u503C\u5230data\u4E2D\uFF0Cvuex\u6570\u636E\u66F4\u65B0\uFF0Cdata\u4E2D\u7684\u6570\u636E\u4E0D\u4F1A\u54CD\u5E94\uFF1B</li><li><strong>\u89E3\u51B3\u65B9\u6CD5</strong>\uFF1A\u4F7F\u7528watch\u76D1\u542Cvuex\u72B6\u6001\uFF0C\u7136\u540E\u8D4B\u503C\u7ED9data\uFF0C\u4ECE\u800Cdata\u505A\u51FA\u54CD\u5E94</li><li><strong>\u65B0\u7684\u95EE\u9898</strong>\uFF1Awatch\u76D1\u542C\u6709\u5EF6\u8FDF\uFF0C\u4FEE\u6539vuex\u72B6\u6001\uFF0Cdata\u72B6\u6001\u4E0D\u4F1A\u540C\u6B65\u66F4\u65B0\uFF0C\u83B7\u53D6data\u72B6\u6001\u7684\u4EFB\u52A1\u9700\u8981\u6392\u5217\u5230\u961F\u5217\u6700\u540E\uFF0C\u624D\u80FD\u53D6\u5230\u6570\u636E\u66F4\u65B0\u540E\u7684\u72B6\u6001\uFF0C\u4F53\u9A8C\u4E0D\u4F73\uFF1B</li></ul></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token comment">// \u9ED8\u8BA4id=&quot;&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// id = &quot;&quot;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setId&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// id = 111111</span>
   <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// id = &quot;&quot;</span>
   <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token comment">// id = 111111</span>
   <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
   <span class="token comment">// \u5982\u679C\u540C\u6B65\u4F7F\u7528\u9700\u8981\u628A\u4EFB\u52A1\u6EDE\u540E</span>
<span class="token punctuation">}</span>

watch<span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;$store.state.id&quot;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="vuex\u4E0Edata\u6570\u636E\u72EC\u7ACB\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#vuex\u4E0Edata\u6570\u636E\u72EC\u7ACB\u4F7F\u7528" aria-hidden="true">#</a> vuex\u4E0Edata\u6570\u636E\u72EC\u7ACB\u4F7F\u7528</h4><ul><li><strong>\u7F3A\u70B9</strong>\uFF1A\u65E7\u7248\u672C\u4F7F\u7528\u9700\u8981\u91CD\u65B0\u5199\u5165\u53D8\u91CF</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u72EC\u7ACB\u83B7\u53D6\uFF0C\u72EC\u7ACB\u8D4B\u503C\uFF1B</span>
html\u4F7F\u7528vuex<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>id<span class="token punctuation">}</span><span class="token punctuation">}</span>
html\u4F7F\u7528data<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>id<span class="token punctuation">}</span><span class="token punctuation">}</span>
js\u4E2D\u4F7F\u7528vuex<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span>state<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
js\u4E2D\u4F7F\u7528data<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u7EDF\u4E00\u8BBE\u7F6E\u5168\u5C40\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00\u8BBE\u7F6E\u5168\u5C40\u72B6\u6001" aria-hidden="true">#</a> \u7EDF\u4E00\u8BBE\u7F6E\u5168\u5C40\u72B6\u6001</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// tools\u5DE5\u5177</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;../store&#39;</span>

<span class="token doc-comment comment">/**
 * \u5168\u5C40\u6570\u636E\u5B58\u50A8
 * <span class="token keyword">@param</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> query : \u4F20\u5165\u7528\u6237\u6570\u636E\u5BF9\u8C61
 * \u7528\u4E8Evuex\u5168\u5C40\u6570\u636E\u7EDF\u4E00\u5B58\u50A8
 */</span>
<span class="token function">setUserStore</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>uid<span class="token punctuation">)</span> localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&quot;local_userid&quot;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>token<span class="token punctuation">)</span> localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&quot;local_token&quot;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>id<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setId&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>uid<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setUid&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>token<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setToken&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>digest<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setDigest&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>digest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>phone<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setPhone&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>phone<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>kp_signature<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setKp_signature&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>kp_signature<span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span>product_type<span class="token punctuation">)</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setProduct_type&#39;</span><span class="token punctuation">,</span> query<span class="token punctuation">.</span>product_type<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// \u4F7F\u7528</span>
<span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u5168\u90E8\u66F4\u65B0\u72B6\u6001  </span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$tools<span class="token punctuation">.</span><span class="token function">setUserStore</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u6307\u5B9A\u66F4\u65B0\u72B6\u6001</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>$tools<span class="token punctuation">.</span><span class="token function">setUserStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      uid<span class="token operator">:</span> res<span class="token punctuation">.</span>data<span class="token operator">?.</span>user_id<span class="token punctuation">,</span>
      token<span class="token operator">:</span> res<span class="token punctuation">.</span>data<span class="token operator">?.</span>token<span class="token punctuation">,</span>
      digest<span class="token operator">:</span> res<span class="token punctuation">.</span>data<span class="token operator">?.</span>digest<span class="token punctuation">,</span>
     phone<span class="token operator">:</span> res<span class="token punctuation">.</span>data<span class="token operator">?.</span>phone<span class="token punctuation">,</span>
     product_type<span class="token operator">:</span> res<span class="token punctuation">.</span>data<span class="token operator">?.</span>product_type<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vuex\u6570\u636E\u6301\u4E45\u5316-vuex-persistedstate" tabindex="-1"><a class="header-anchor" href="#vuex\u6570\u636E\u6301\u4E45\u5316-vuex-persistedstate" aria-hidden="true">#</a> vuex\u6570\u636E\u6301\u4E45\u5316\uFF1Avuex-persistedstate</h3><h4 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save vuex-persistedstate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5F15\u7528\u5E76\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5F15\u7528\u5E76\u914D\u7F6E" aria-hidden="true">#</a> \u5F15\u7528\u5E76\u914D\u7F6E</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> persistedState <span class="token keyword">from</span> <span class="token string">&#39;vuex-persistedstate&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Vuex</span><span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token function">persistedState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// \u9ED8\u8BA4\u4E3AlocalStorage</span>
        storage<span class="token operator">:</span> window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u5176\u4ED6\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u914D\u7F6E" aria-hidden="true">#</a> \u5176\u4ED6\u914D\u7F6E</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code> <span class="token comment">// \u5B58\u50A8\u5230 localStorege</span>
 plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">createPersistedState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
 <span class="token comment">// \u6216\u8005</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">createPersistedState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    storage<span class="token operator">:</span>window<span class="token punctuation">.</span>localStorege
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
 

<span class="token comment">// \u5B58\u50A8\u5230  sessionStorage</span>
plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">createPersistedState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  storage<span class="token operator">:</span>window<span class="token punctuation">.</span>sessionStorage
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token comment">// \u7F13\u5B58state\u4E0B\u6307\u5B9A\u7684\u90E8\u5206\u6570\u636E</span>
 plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">createPersistedState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
 storage<span class="token operator">:</span>window<span class="token punctuation">.</span>sessionStorage<span class="token punctuation">,</span>
     <span class="token function">reducer</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>  <span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token punctuation">{</span>
             <span class="token comment">// \u53EA\u50A8\u5B58state\u4E2D\u7684token</span>
             assessmentData<span class="token operator">:</span> val<span class="token punctuation">.</span>token<span class="token punctuation">,</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u7F13\u5B58Vuex\u591A\u4E2A\u6A21\u5757\u4E0B\u7684\u6307\u5B9A\u67D0\u4E2A\u6A21\u5757\u7684state\uFF0C\u901A\u8FC7\u4FEE\u6539path\u914D\u7F6E\u6765\u5B9E\u73B0</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">/* user-module */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  state<span class="token operator">:</span> <span class="token punctuation">{</span>
    token<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    role<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/* profile-module */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> profile <span class="token operator">=</span> <span class="token punctuation">{</span>
  state<span class="token operator">:</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
    company<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/* modules\u76EE\u5F55\u4E0B\u7684index.js */</span>
<span class="token keyword">import</span> user <span class="token keyword">from</span> <span class="token string">&#39;./user&#39;</span>
<span class="token keyword">import</span> profile <span class="token keyword">from</span> <span class="token string">&#39;./profile&#39;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  user<span class="token punctuation">,</span>
  profile
<span class="token punctuation">}</span>

<span class="token comment">/* store.js */</span>
<span class="token keyword">import</span> modules <span class="token keyword">from</span> <span class="token string">&#39;./modules&#39;</span>
<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vuex</span><span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    modules<span class="token punctuation">,</span>
     plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">createPersistedState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      key<span class="token operator">:</span> <span class="token string">&#39;zdao&#39;</span><span class="token punctuation">,</span>
      paths<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span> <span class="token comment">// \u8FD9\u91CC\u4FBF\u53EA\u4F1A\u7F13\u5B58user\u4E0B\u7684state\u503C</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u624B\u52A8\u5728vuex\u4E2D\u7F13\u5B58\u5168\u5C40\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u624B\u52A8\u5728vuex\u4E2D\u7F13\u5B58\u5168\u5C40\u6570\u636E" aria-hidden="true">#</a> \u624B\u52A8\u5728vuex\u4E2D\u7F13\u5B58\u5168\u5C40\u6570\u636E</h3><ul><li><strong>\u7F3A\u70B9</strong>\uFF1A\u53EA\u80FD\u5B9E\u73B0\u7B80\u5355\u7684\u7F13\u5B58\u529F\u80FD\uFF0C\u9700\u8981\u5229\u7528<code>getter</code>\u6765\u83B7\u53D6\u7F13\u5B58\u6570\u636E</li></ul><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    token<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">async</span> <span class="token function">login</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5728\u8FD9\u91CC\u83B7\u53D6\u7528\u6237\u7684\u767B\u5F55\u4FE1\u606F\uFF0C\u8FD4\u56DE\u503C\u5305\u542Btoken\uFF0Cuid\u7B49\u4FE1\u606F</span>
    <span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token keyword">await</span> userService<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;setUser&#39;</span><span class="token punctuation">,</span> userInfo<span class="token punctuation">)</span>
    <span class="token keyword">return</span> userInfo
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setUser</span> <span class="token punctuation">(</span>state<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">.</span>token <span class="token operator">=</span> data<span class="token punctuation">.</span>token
    <span class="token comment">// \u5728\u8FD9\u91CC\u8BBE\u7F6E\u7528\u6237token, \u540C\u6B65\u5B58\u50A8\u6570\u636E</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;user-token&#39;</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>token<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> getter<span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">getUser</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5728\u8FD9\u91CC\u83B7\u53D6\u7528\u6237token, \u4ECE\u7F13\u5B58\u4E2D</span>
    <span class="token keyword">return</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;user-token&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),o=[p];function c(i,l){return s(),a("div",null,o)}var r=n(e,[["render",c],["__file","workApply13.html.vue"]]);export{r as default};
