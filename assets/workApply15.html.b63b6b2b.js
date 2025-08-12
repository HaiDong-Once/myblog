import{_ as n,o as s,c as a,e as t}from"./app.4c8b15c1.js";const p={},e=t(`<h1 id="vue\u79FB\u52A8\u7AEF\u9879\u76EE\u652F\u4ED8\u6A21\u5757\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#vue\u79FB\u52A8\u7AEF\u9879\u76EE\u652F\u4ED8\u6A21\u5757\u5C01\u88C5" aria-hidden="true">#</a> vue\u79FB\u52A8\u7AEF\u9879\u76EE\u652F\u4ED8\u6A21\u5757\u5C01\u88C5</h1><h3 id="\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4EE3\u7801\u5B9E\u73B0</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;./axios&#39;</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">&#39;../store&#39;</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">&#39;../router&#39;</span>


<span class="token doc-comment comment">/**
 * \u652F\u4ED8\u6A21\u5757\u5C01\u88C5
 * <span class="token keyword">@author</span> hhd
 * <span class="token keyword">@time</span> 2022-09-13
 * <span class="token keyword">@update</span> 2022-09-13
 * @\u4F7F\u7528\u65B9\u6CD5\uFF1A
 *  \u5BFC\u5165\uFF1Aimport PayModule from  &quot;@guanjia/public/payModule&quot;;
 *  \u652F\u4ED8\u6A21\u5757\u521D\u59CB\u5316\uFF1A
 *           this.payModule = new PayModule(
 *               <span class="token punctuation">{</span>
 *                 id: this.$store.state.id,
 *                 uid: this.$store.state.uid,
 *                 digest: this.$store.state.digest,
 *                 order_no: this.$route.query.order_no,
 *                 success_url_window: this.success_url,
 *               <span class="token punctuation">}</span>
 *           )
 *   \u53D1\u8D77\u652F\u4ED8\uFF1A
 *       this.payModule.doPay(this.pay_type, this.which).then((res)=&gt;<span class="token punctuation">{</span>
 *         console.log(&#39;\u652F\u4ED8\u6210\u529F&#39;)
 *       <span class="token punctuation">}</span>).catch((err)=&gt;<span class="token punctuation">{</span>
 *         console.log(err)
 *       <span class="token punctuation">}</span>)
 */</span>


<span class="token keyword">class</span> <span class="token class-name">PayModule</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * \u6784\u9020\u57FA\u7840\u6570\u636E
     * <span class="token keyword">@param</span> <span class="token parameter">id</span> \u6279\u6B21id \uFF08\u5FC5\u4F20\uFF09
     * <span class="token keyword">@param</span> <span class="token parameter">uid</span> \u7528\u6237id \uFF08\u5FC5\u4F20\uFF09
     * <span class="token keyword">@param</span> <span class="token parameter">digest</span> \u4F01\u4E1Adigest \uFF08\u5FC5\u4F20\uFF09
     * <span class="token keyword">@param</span> <span class="token parameter">order_no</span> \u8BA2\u5355\u53F7url (\u5FC5\u4F20\uFF0C\u53D6\u81EAurl)
     * <span class="token keyword">@param</span> <span class="token parameter">success_url_window</span> \u652F\u4ED8\u6210\u529F\u8DF3\u8F6C\u5730\u5740 window.href\u8DF3\u8F6C
     * <span class="token keyword">@param</span> <span class="token parameter">success_url_router</span> \u652F\u4ED8\u6210\u529F\u8DF3\u8F6C\u5730\u5740 vue \u8DEF\u7531\u8DF3\u8F6C
     */</span>
    <span class="token function">constructor</span> <span class="token punctuation">(</span>param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u6570\u636E</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> param<span class="token operator">?.</span>id <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>uid <span class="token operator">=</span> param<span class="token operator">?.</span>uid <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>digest <span class="token operator">=</span> param<span class="token operator">?.</span>digest <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>order_no <span class="token operator">=</span> param<span class="token operator">?.</span>order_no <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>success_url_window <span class="token operator">=</span> param<span class="token operator">?.</span>success_url_window <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>success_url_router <span class="token operator">=</span> param<span class="token operator">?.</span>success_url_router <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>

        <span class="token comment">// \u5168\u5C40\u53C2\u6570</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u7C7B\u578B\uFF08\u4EF7\u683C\u63A7\u5236\uFF09</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pay_type <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u65B9\u5F0F\uFF08\u5FAE\u4FE1\uFF0C\u652F\u4ED8\u5B9D\uFF09</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>wxBrower <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u5FAE\u4FE1\u6D4F\u89C8\u5668</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>openid <span class="token operator">=</span>  <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span> <span class="token comment">// \u5FAE\u4FE1openid</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>return_url <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u56DE\u8C03\u5730\u5740</span>

        <span class="token comment">// \u6A21\u5757\u521D\u59CB\u5316</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u6570\u636E\u521D\u59CB\u5316</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkPayStatus</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>order_no<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u8F6E\u8BE2</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u652F\u4ED8\u6570\u636E\u521D\u59CB\u5316
     */</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u83B7\u53D6\u9875\u9762\u57DF\u540D\u548C\u8DEF\u5F84</span>
        <span class="token keyword">let</span> index <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;?&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// string.substring(indexStart\uFF08\u5305\u542B\uFF09, indexEnd\uFF08\u4E0D\u5305\u542B\uFF09) \u622A\u53D6\u5B57\u7B26\u4E32\u5F00\u59CB\u7D22\u5F15\u5230\u7ED3\u675F\u7D22\u5F15\u95F4\u7684\u5185\u5BB9</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>return_url <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span>index<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>return_url <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href
        <span class="token punctuation">}</span>
        <span class="token comment">// \u68C0\u6D4B\u6D4F\u89C8\u5668\u7C7B\u578B</span>
        <span class="token keyword">let</span> ua <span class="token operator">=</span> navigator<span class="token punctuation">.</span>userAgent<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// match(/.../i) i \u662F\u5FFD\u7565\u5927\u5C0F\u5199\u6807\u5FD7</span>
        <span class="token comment">// \`\${[&quot;MicroMessenger&quot;]}\` \u8F93\u51FA\uFF1A&#39;micromessenger&#39; \u6A21\u677F\u5B57\u7B26\u4E32\u5C06\u6570\u7EC4\u7ED3\u679C\u8F6C\u6362\u4E3A\u5B57\u7B26\u4E32\u3002</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>ua<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">MicroMessenger</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">===</span> <span class="token string">&quot;micromessenger&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>wxBrower <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// \u83B7\u53D6openid</span>
        axios<span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/kpuserdetail&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            params<span class="token operator">:</span> <span class="token punctuation">{</span>
                action<span class="token operator">:</span> <span class="token string">&quot;woa_openid&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">+</span>res<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>openid <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>openid<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>wxBrower <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>openid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VUE_APP_SHUIDI</span>
                <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/wx-login-jump?back_url=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>href<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u89E6\u53D1\u652F\u4ED8\uFF0C\u751F\u4EA7\u8BA2\u5355\u53F7
     * <span class="token keyword">@param</span> <span class="token parameter">type</span> \u652F\u4ED8\u7C7B\u578B\uFF08\u4EF7\u683C\u63A7\u5236\uFF09
     * <span class="token keyword">@param</span> <span class="token parameter">pay_type</span> \u652F\u4ED8\u65B9\u5F0F\uFF08\u5FAE\u4FE1\uFF0C\u652F\u4ED8\u5B9D\uFF09
     */</span>
    <span class="token function">doPay</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span>pay_type<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type<span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u7C7B\u578B\uFF08\u4EF7\u683C\u63A7\u5236\uFF09</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>pay_type <span class="token operator">=</span> pay_type<span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u65B9\u5F0F\uFF08\u5FAE\u4FE1\uFF0C\u652F\u4ED8\u5B9D\uFF09</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            axios<span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/pay&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                params<span class="token operator">:</span> <span class="token punctuation">{</span>
                    action<span class="token operator">:</span> <span class="token string">&quot;do_pay&quot;</span><span class="token punctuation">,</span>
                    type<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
                    pay_type<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pay_type<span class="token punctuation">,</span>
                    pay_count<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                    no_need_login<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
                    user_id<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>uid<span class="token punctuation">,</span>
                    assoc_id<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span>
                    digest<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>digest<span class="token punctuation">,</span>
                    t<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">let</span> objParams <span class="token operator">=</span> <span class="token punctuation">{</span>
                        order_no<span class="token operator">:</span> res<span class="token punctuation">.</span>order_no<span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>return_url <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>return_url<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">?</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">objectToUrl</span><span class="token punctuation">(</span>objParams<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">checkPayStatus</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>order_no<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u63D0\u524D\u6253\u5F00\u652F\u4ED8\u8F6E\u8BE2</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pay_type <span class="token operator">===</span> <span class="token string">&#39;weixinpay&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">wxPay</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>order_no<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resWxPay<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                            <span class="token function">resolve</span><span class="token punctuation">(</span>resWxPay<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5FAE\u4FE1\u652F\u4ED8</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">zfbPay</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>order_no<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u652F\u4ED8\u5B9D\u652F\u4ED8</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token operator">?.</span>message<span class="token punctuation">)</span>
                    res<span class="token punctuation">.</span>message <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$toast</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u652F\u4ED8\u5B9D\u652F\u4ED8
     * <span class="token keyword">@param</span> <span class="token parameter">order_no</span>
     */</span>
    <span class="token function">zfbPay</span><span class="token punctuation">(</span>order_no<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            axios<span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/pay&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                params<span class="token operator">:</span> <span class="token punctuation">{</span>
                    action<span class="token operator">:</span> <span class="token string">&quot;get_alipay_h5_pay_url&quot;</span><span class="token punctuation">,</span>
                    order_no<span class="token operator">:</span> order_no<span class="token punctuation">,</span>
                    type<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
                    return_url<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>return_url<span class="token punctuation">,</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    location<span class="token punctuation">.</span>href <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>url<span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u5FAE\u4FE1\u652F\u4ED8
     * <span class="token keyword">@param</span> <span class="token parameter">order_no</span>
     */</span>
    <span class="token function">wxPay</span><span class="token punctuation">(</span>order_no<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token punctuation">{</span>
            order_no<span class="token operator">:</span> order_no<span class="token punctuation">,</span>
            type<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// \u5FAE\u4FE1\u6D4F\u89C8\u5668\u53C2\u6570\u53D8\u66F4</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>wxBrower<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            params<span class="token punctuation">[</span><span class="token string">&quot;return_url&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>return_url<span class="token punctuation">;</span>
            params<span class="token punctuation">[</span><span class="token string">&quot;action&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;get_wechat_h5_pay_url&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            params<span class="token punctuation">[</span><span class="token string">&quot;open_id&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>openid<span class="token punctuation">;</span>
            params<span class="token punctuation">[</span><span class="token string">&quot;action&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;get_weixinpay_js_params&quot;</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            axios<span class="token punctuation">.</span>http
                <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/pay&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                    params<span class="token punctuation">,</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res2<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token comment">// \u5FAE\u4FE1\u6D4F\u89C8\u5668\u652F\u4ED8</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>wxBrower<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
                        WeixinJSBridge<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>
                            <span class="token string">&quot;getBrandWCPayRequest&quot;</span><span class="token punctuation">,</span>
                            res2<span class="token punctuation">,</span>
                            <span class="token keyword">function</span> <span class="token punctuation">(</span>res3<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>res3<span class="token punctuation">.</span>err_msg <span class="token operator">+</span> <span class="token string">&#39;&#39;</span> <span class="token operator">===</span> <span class="token string">&quot;get_brand_wcpay_request:ok&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                    <span class="token keyword">if</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>success_url_window<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                        window<span class="token punctuation">.</span>location <span class="token operator">=</span> that<span class="token punctuation">.</span>success_url_window <span class="token punctuation">;</span>
                                    <span class="token punctuation">}</span>
                                    <span class="token keyword">if</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>success_url_router<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                        router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                                            path<span class="token operator">:</span> that<span class="token punctuation">.</span>success_url_router<span class="token punctuation">,</span>
                                        <span class="token punctuation">}</span><span class="token punctuation">)</span>
                                    <span class="token punctuation">}</span>
                                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;weichat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$toast</span><span class="token punctuation">(</span><span class="token string">&#39;\u652F\u4ED8\u5931\u8D25&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                        <span class="token comment">// \u666E\u901A\u6D4F\u89C8\u5668</span>
                        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        location<span class="token punctuation">.</span>href <span class="token operator">=</span> res2<span class="token punctuation">.</span>data<span class="token punctuation">.</span>url<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u68C0\u67E5\u652F\u4ED8\u72B6\u6001\uFF08\u8BA2\u5355\u53F7\uFF09
     * <span class="token keyword">@param</span> <span class="token parameter">order_no</span> \u8BA2\u5355\u53F7
     */</span>
    <span class="token function">checkPayStatus</span><span class="token punctuation">(</span>order_no<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>order_no<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> timer <span class="token operator">=</span> <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    axios<span class="token punctuation">.</span>http
                        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/pay&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
                            params<span class="token operator">:</span> <span class="token punctuation">{</span>
                                action<span class="token operator">:</span> <span class="token string">&quot;check_pay_status_by_order&quot;</span><span class="token punctuation">,</span>
                                order_no<span class="token operator">:</span> order_no<span class="token punctuation">,</span>
                                t<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                            <span class="token punctuation">}</span><span class="token punctuation">,</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">+</span>res<span class="token punctuation">.</span>payed <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                <span class="token function">clearInterval</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token comment">// \u666E\u901A\u6D4F\u89C8\u5668\u652F\u4ED8\u6210\u529F</span>
                                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>success_url_window<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                    window<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>success_url_window <span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>success_url_router<span class="token punctuation">)</span><span class="token punctuation">{</span>
                                    router<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
                                        path<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>success_url_router<span class="token punctuation">,</span>
                                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
                                <span class="token punctuation">}</span>
                                <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                                <span class="token function">reject</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u5BF9\u8C61\u8F6Curl
     * <span class="token keyword">@param</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span> obj : \u4F20\u5165\u53C2\u6570\u5BF9\u8C61
     * @\u4F7F\u7528\u65B9\u6CD5\uFF1Athis.objectToUrl(obj)
     * <span class="token keyword">@return</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> \uFF08id=21&amp;token=\uFF09
     */</span>
    <span class="token function">objectToUrl</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> tempArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                tempArray<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>obj<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> tempArray<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;&amp;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">default</span> PayModule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(i,l){return s(),a("div",null,o)}var k=n(p,[["render",c],["__file","workApply15.html.vue"]]);export{k as default};
