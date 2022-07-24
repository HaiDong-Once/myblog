import{_ as l,r as i,o as c,c as o,a as n,b as e,w as t,d as s,e as p}from"./app.34716fdc.js";const d={},u=n("h1",{id:"\u4EE3\u7801\u89C4\u8303",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4EE3\u7801\u89C4\u8303","aria-hidden":"true"},"#"),s(" \u4EE3\u7801\u89C4\u8303")],-1),r={class:"table-of-contents"},m=s("\u4E00\u3001\u4EE3\u7801\u6CE8\u91CA\u89C4\u8303"),v=s("html\u6587\u6863"),k=s("css\u6587\u6863"),b=s("js\u6587\u6863"),h=p(`<h2 id="\u4E00\u3001\u4EE3\u7801\u6CE8\u91CA\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u4EE3\u7801\u6CE8\u91CA\u89C4\u8303" aria-hidden="true">#</a> \u4E00\u3001\u4EE3\u7801\u6CE8\u91CA\u89C4\u8303</h2><h3 id="html\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#html\u6587\u6863" aria-hidden="true">#</a> html\u6587\u6863</h3><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>1\u3001\u5934\u90E8
<span class="token comment">&lt;!--
  @description: \u7ECF\u8425\u5F02\u5E38\u63A8\u9001\u843D\u5730\u9875
  @author: hhd (2021-07-05)
  @update: 
--&gt;</span>

2\u3001\u5185\u5BB9
<span class="token comment">&lt;!-- \u81EA\u5B9A\u4E49\u5BFC\u822A\u6A21\u5757--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>wxs</span> <span class="token attr-name">module</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>filter<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>../../../app.wxs<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>wxs</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#css\u6587\u6863" aria-hidden="true">#</a> css\u6587\u6863</h3><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token comment">/*1\u3001\u5C11\u91CF\u5185\u5BB9*/</span>
<span class="token comment">/* \u80CC\u666F\u9876\u90E8\u6491\u8D77\u9AD8\u5EA6 */</span>

<span class="token comment">/*2\u3001\u591A\u91CF\u5185\u5BB9\u5206\u5272\u7EBF*/</span>
<span class="token comment">/******************** start \u5185\u5BB9\u6A21\u5757 ********************/</span>
<span class="token comment">/********************* end \u5185\u5BB9\u6A21\u5757 ********************/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="js\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#js\u6587\u6863" aria-hidden="true">#</a> js\u6587\u6863</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code> <span class="token comment">// 1\u3001\u9876\u90E8\u521D\u59CB\u5316\u4F4D\u7F6E</span>
   <span class="token doc-comment comment">/**
   * \u9875\u9762\u7684\u521D\u59CB\u6570\u636E
   * Created by hhd on 2021-07-05, \u7ECF\u8425\u5F02\u5E38\u6307\u5F15
   */</span>
   <span class="token keyword">let</span> data<span class="token operator">:</span> <span class="token punctuation">{</span>
    loading<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// \u52A0\u8F7D\u52A8\u753B\u63A7\u5236</span>
    datas<span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// \u767B\u5F55\u63A5\u53E3\u63A5\u53C2</span>
    openListFlag<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// \u5F02\u5E38\u5217\u8868\u5C55\u5F00\u6309\u94AE\u63A7\u5236</span>
    headerFlag<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// \u5F02\u5E38\u5217\u8868\u5C55\u5F00\u63A7\u5236</span>
  <span class="token punctuation">}</span>
 
 
 <span class="token comment">// 2\u3001\u65B9\u6CD5\u5C01\u88C5\u6CE8\u91CA</span>
 <span class="token doc-comment comment">/**
   * \u89E6\u53D1\u7528\u6237\u767B\u5F55\u8BF7\u6C42\u9996\u9875\u6570\u636E
   * \u6B64\u5904\u903B\u8F91\u8BF4\u660E\uFF0C\u6216\u5728\u65B9\u6CD5\u5185\u5BF9\u5E94\u4F4D\u7F6E\u903B\u8F91\u8BF4\u660E
   * <span class="token keyword">@function</span> checkManageAbnormal: \u68C0\u67E5\u5F02\u5E38\u60C5\u51B5\u63A5\u53E3
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> datas: \u9996\u9875\u8FD4\u56DE\u6570\u636E
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>boolean<span class="token punctuation">}</span> loading: \u52A0\u8F7D\u52A8\u753B\u5F00\u5173
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> is_login: \u662F\u5426\u767B\u5F55 1\u767B\u5F55\uFF0C0\u672A\u767B\u5F55
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>array<span class="token punctuation">}</span> unnormal_list\uFF1A\u7ECF\u8425\u5F02\u5E38\u5217\u8868
   * <span class="token keyword">@param</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> token\uFF1A\u767B\u5F55\u53C2\u6570token
   */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function _(g,f){const a=i("RouterLink");return c(),o("div",null,[u,n("nav",r,[n("ul",null,[n("li",null,[e(a,{to:"#\u4E00\u3001\u4EE3\u7801\u6CE8\u91CA\u89C4\u8303"},{default:t(()=>[m]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#html\u6587\u6863"},{default:t(()=>[v]),_:1})]),n("li",null,[e(a,{to:"#css\u6587\u6863"},{default:t(()=>[k]),_:1})]),n("li",null,[e(a,{to:"#js\u6587\u6863"},{default:t(()=>[b]),_:1})])])])])]),h])}var w=l(d,[["render",_],["__file","codeStandard.html.vue"]]);export{w as default};
