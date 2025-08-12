import{_ as n,o as s,c as a,e as t}from"./app.4c8b15c1.js";const p={},e=t(`<h1 id="\u7EC4\u5408\u5F0Fapi-composition-api" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u5408\u5F0Fapi-composition-api" aria-hidden="true">#</a> \u7EC4\u5408\u5F0Fapi Composition API</h1><h2 id="\u7EC4\u5408\u5F0Fapi\u4F7F\u7528\u903B\u8F91\u590D\u7528\u5B9E\u8DF5" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u5408\u5F0Fapi\u4F7F\u7528\u903B\u8F91\u590D\u7528\u5B9E\u8DF5" aria-hidden="true">#</a> \u7EC4\u5408\u5F0Fapi\u4F7F\u7528\u903B\u8F91\u590D\u7528\u5B9E\u8DF5</h2><h3 id="\u652F\u4ED8\u9875\u903B\u8F91\u590D\u7528" tabindex="-1"><a class="header-anchor" href="#\u652F\u4ED8\u9875\u903B\u8F91\u590D\u7528" aria-hidden="true">#</a> \u652F\u4ED8\u9875\u903B\u8F91\u590D\u7528</h3><h4 id="\u903B\u8F91\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u903B\u8F91\u8BF4\u660E" aria-hidden="true">#</a> \u903B\u8F91\u8BF4\u660E</h4><ol><li>\u6302\u8F7D\u9636\u6BB5\u7684\u6570\u636E\u521D\u59CB\u5316\uFF1A\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 <code>setup()</code> \u51FD\u6570\u6765\u5904\u7406\u8FD9\u90E8\u5206\u903B\u8F91\uFF0C\u5E76\u4F7F\u7528 <code>ref()</code> \u548C <code>reactive()</code> \u6765\u521B\u5EFA\u54CD\u5E94\u5F0F\u6570\u636E\u3002</li><li>\u7528\u6237\u6388\u6743\u534F\u8BAE\uFF1A\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <code>useAuthorization()</code> \u7684\u51FD\u6570\u6765\u5904\u7406\u7528\u6237\u6388\u6743\u76F8\u5173\u7684\u903B\u8F91\u3002</li><li>\u7528\u6237\u53D1\u8D77\u652F\u4ED8\uFF1A\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <code>usePayment()</code> \u7684\u51FD\u6570\u6765\u5904\u7406\u652F\u4ED8\u76F8\u5173\u7684\u903B\u8F91\u3002</li><li>\u8F6E\u64AD\u56FE\u7EC4\u4EF6\u521D\u59CB\u5316\uFF1A\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <code>useCarousel()</code> \u7684\u51FD\u6570\u6765\u5904\u7406\u8F6E\u64AD\u56FE\u76F8\u5173\u7684\u903B\u8F91\u3002</li></ol><h4 id="\u4EE3\u7801\u5B9E\u73B01" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B01" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B01</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// useAuthorization.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useAuthorization</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isAuthorized <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">authorize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u7528\u6237\u6388\u6743\u903B\u8F91</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    isAuthorized<span class="token punctuation">,</span>
    authorize<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// usePayment.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">usePayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isPaymentSuccessful <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">function</span> <span class="token function">initiatePayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u7528\u6237\u53D1\u8D77\u652F\u4ED8\u903B\u8F91</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    isPaymentSuccessful<span class="token punctuation">,</span>
    initiatePayment<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// useCarousel.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">initializeCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8F6E\u64AD\u56FE\u7EC4\u4EF6\u521D\u59CB\u5316\u903B\u8F91</span>
  <span class="token punctuation">}</span>

  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">initializeCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// YourComponent.vue</span>
<span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> your template here <span class="token operator">--</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useAuthorization <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./useAuthorization&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> usePayment <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./usePayment&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useCarousel <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./useCarousel&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> isAuthorized<span class="token punctuation">,</span> authorize <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useAuthorization</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> isPaymentSuccessful<span class="token punctuation">,</span> initiatePayment <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">usePayment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">useCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// \u83B7\u53D6\u7528\u6237\u4FE1\u606F\u903B\u8F91</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// \u83B7\u53D6\u5176\u4ED6\u63A5\u53E3\u6570\u636E\u903B\u8F91</span>
    <span class="token punctuation">}</span>

    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      userInfo<span class="token punctuation">,</span>
      isAuthorized<span class="token punctuation">,</span>
      authorize<span class="token punctuation">,</span>
      isPaymentSuccessful<span class="token punctuation">,</span>
      initiatePayment<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u4EE3\u7801\u5B9E\u8DF52" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u8DF52" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u8DF52</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ref<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// \u6570\u636E\u521D\u59CB\u5316\u903B\u8F91</span>
<span class="token keyword">function</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> userInfo <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> isPaySuccess <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> isAgreementAuthorized <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u8BF7\u6C42\u7528\u6237\u4FE1\u606F\u63A5\u53E3</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    userInfo<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/userInfo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u8BF7\u6C42\u662F\u5426\u652F\u4ED8\u6210\u529F\u63A5\u53E3</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchPayStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isPaySuccess<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/payStatus&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u8BF7\u6C42\u534F\u8BAE\u6388\u6743\u63A5\u53E3</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchAgreementStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isAgreementAuthorized<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/agreementStatus&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u5728\u6570\u636E\u8BF7\u6C42\u5B8C\u6210\u540E\u521D\u59CB\u5316\u8F6E\u64AD\u56FE\u7EC4\u4EF6</span>
  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">initCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">fetchUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">fetchPayStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">fetchAgreementStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// \u8C03\u7528\u8F6E\u64AD\u56FE\u7EC4\u4EF6\u521D\u59CB\u5316\u903B\u8F91</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>

  <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">initCarousel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    userInfo<span class="token punctuation">,</span>
    isPaySuccess<span class="token punctuation">,</span>
    isAgreementAuthorized<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u6237\u6388\u6743\u534F\u8BAE\u903B\u8F91</span>
<span class="token keyword">function</span> <span class="token function">authorizeAgreement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isAgreementAuthorized <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchAgreementStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isAgreementAuthorized<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/agreementStatus&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">authorize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/authorizeAgreement&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">fetchAgreementStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    isAgreementAuthorized<span class="token punctuation">,</span>
    authorize<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7528\u6237\u53D1\u8D77\u652F\u4ED8\u903B\u8F91</span>
<span class="token keyword">function</span> <span class="token function">startPay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isPaySuccess <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchPayStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isPaySuccess<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/payStatus&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">pay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;/api/startPay&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">fetchPayStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    isPaySuccess<span class="token punctuation">,</span>
    pay<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7EC4\u5408\u5F0FAPI</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> userInfo<span class="token punctuation">,</span> isPaySuccess<span class="token punctuation">,</span> isAgreementAuthorized <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">initData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> authorize <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">authorizeAgreement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> pay <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">startPay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      userInfo<span class="token punctuation">,</span>
      isPaySuccess<span class="token punctuation">,</span>
      isAgreementAuthorized<span class="token punctuation">,</span>
      authorize<span class="token punctuation">,</span>
      pay<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6570\u636E\u521D\u59CB\u5316\u903B\u8F91\u590D\u7528" tabindex="-1"><a class="header-anchor" href="#\u6570\u636E\u521D\u59CB\u5316\u903B\u8F91\u590D\u7528" aria-hidden="true">#</a> \u6570\u636E\u521D\u59CB\u5316\u903B\u8F91\u590D\u7528</h3><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in processedData<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.id<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ item.name }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive<span class="token punctuation">,</span> onMounted <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">processedData</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// \u8BF7\u6C42\u6570\u636E</span>
    <span class="token keyword">const</span> <span class="token function-variable function">fetchData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com/api/data&#39;</span><span class="token punctuation">)</span>
      state<span class="token punctuation">.</span>data <span class="token operator">=</span> response<span class="token punctuation">.</span>data
    <span class="token punctuation">}</span>

    <span class="token comment">// \u5904\u7406\u6570\u636E</span>
    <span class="token keyword">const</span> <span class="token function-variable function">processData</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>processedData <span class="token operator">=</span> 
      state<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">&#39;completed&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u5728\u7EC4\u4EF6\u6302\u8F7D\u540E\u8C03\u7528 fetchData \u548C processData</span>
    <span class="token function">onMounted</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">processData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">processedData</span><span class="token operator">:</span> state<span class="token punctuation">.</span>processedData
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>  <span class="token comment">// \u516C\u5171\u51FD\u6570</span>
    getData<span class="token punctuation">.</span>js
     <span class="token comment">// \u8BF7\u6C42\u6570\u636E</span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function-variable function">fetchData</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;https://example.com/api/data&#39;</span><span class="token punctuation">)</span>
      state<span class="token punctuation">.</span>data <span class="token operator">=</span> response<span class="token punctuation">.</span>data
      <span class="token keyword">return</span> <span class="token punctuation">{</span>data<span class="token punctuation">,</span>error<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u5904\u7406\u6570\u636E</span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function-variable function">processData</span> <span class="token operator">=</span> <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>processedData <span class="token operator">=</span> 
      state<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>item <span class="token operator">=&gt;</span> item<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">&#39;completed&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span><span class="token punctuation">{</span>dataProcess<span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// \u5206\u522B\u8C03\u7528\u7EC4\u4EF6\u603B index.vue</span>
    <span class="token keyword">import</span> <span class="token punctuation">{</span>fetchData<span class="token punctuation">,</span>processData<span class="token punctuation">}</span>  <span class="token keyword">from</span> <span class="token string">&#39;./getData.js&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>data<span class="token punctuation">,</span>errot<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u8F91\u5904\u7406\u6848\u4F8B</span>
    <span class="token keyword">let</span> <span class="token punctuation">{</span>dataprocess<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">processData</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[e];function c(i,l){return s(),a("div",null,o)}var k=n(p,[["render",c],["__file","compositionApi.html.vue"]]);export{k as default};
