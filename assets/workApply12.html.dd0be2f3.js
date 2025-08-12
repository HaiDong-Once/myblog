import{_ as t,r as p,o as e,c as o,b as n,a as c,d as s,e as l}from"./app.4c8b15c1.js";var i="/myblog/images/frontEnd/vue/img_4.png";const u={},r=n("h1",{id:"vue\u624B\u5199\u7B7E\u540D\u63D2\u4EF6vue-esign",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vue\u624B\u5199\u7B7E\u540D\u63D2\u4EF6vue-esign","aria-hidden":"true"},"#"),s(" vue\u624B\u5199\u7B7E\u540D\u63D2\u4EF6vue-esign")],-1),k=n("li",null,"\u751F\u6210base64\u56FE\u7247\u6587\u4EF6\uFF0C\u81EA\u5B9A\u4E49base64\u56FE\u7247\u65CB\u8F6C\u51FD\u6570",-1),d=s("github\u5730\u5740 "),v={href:"https://github.com/JaimeCheng/vue-esign",target:"_blank",rel:"noopener noreferrer"},m=s("https://github.com/JaimeCheng/vue-esign"),b=l('<p><img src="'+i+`" alt="\u56FE\u7247"></p><h3 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue-esign --save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u6CE8\u5165\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u5165\u7EC4\u4EF6" aria-hidden="true">#</a> \u6CE8\u5165\u7EC4\u4EF6</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> vueEsign <span class="token keyword">from</span> <span class="token string">&#39;vue-esign&#39;</span>
components<span class="token operator">:</span> <span class="token punctuation">{</span> vueEsign <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u7EC4\u4EF6\u5C01\u88C5" tabindex="-1"><a class="header-anchor" href="#\u7EC4\u4EF6\u5C01\u88C5" aria-hidden="true">#</a> \u7EC4\u4EF6\u5C01\u88C5</h3><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token comment">&lt;!--
  @description: \u624B\u5199\u7B7E\u540D\u5F39\u7A97\u7EC4\u4EF6
  @author: hhd (2022-08-16)
  @\u8BF4\u660E\uFF1A
      @getImgBase64\uFF1A \u83B7\u53D6\u7B7E\u540Dbase64\u6587\u4EF6\uFF1B
      @closePop\uFF1A\u5173\u95ED\u5F39\u7A97\u56DE\u8C03\uFF1B
      imgEdg: \u751F\u6210\u7B7E\u540D\u56FE\u7247\u65CB\u8F6C\u89D2\u5EA6\uFF08\u5FC5\u987B\u662F90\u7684\u500D\u6570\uFF09
  @\u4F7F\u7528\u65B9\u5F0F\uFF1A
      import autographPop from &quot;@guanjia/components/autographPop/index.vue&quot;
      components: {autographPop,},

     &lt;autographPop
          v-if=&quot;autographPopFlag&quot;
          @getImgBase64=&quot;getImgBase64&quot;
          @closePop=&quot;autographPopFlag=false&quot;
          imgEdg=&quot;-90&quot;&gt;
      &lt;/autographPop&gt;

      /**
       * \u83B7\u53D6\u624B\u5199img
       * @param url
       */
      getImgBase64(url) {
        this.autographImg = url;
      },
--&gt;</span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pop-page<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pop-box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>close<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>closePop<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@guanjia/assets/imgs/plaque/afterPay/close-icon.png<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>title<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u624B\u5199\u7B7E\u540D<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button1<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleReset<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u91CD\u5199<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button2<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleGenerate<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u4F7F\u7528<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>graph-box<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>vueEsign</span>
            <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>esign<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>500<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>1120<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:isCrop</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isCrop<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:lineWidth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lineWidth<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:lineColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>lineColor<span class="token punctuation">&quot;</span></span>
            <span class="token attr-name">:bgColor.sync</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>bgColor<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>vueEsign</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> vueEsign <span class="token keyword">from</span> <span class="token string">&#39;vue-esign&#39;</span>


<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&quot;index&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>vueEsign<span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">imgEdg</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token comment">// \u751F\u6210\u7B7E\u540D\u56FE\u7247\u65CB\u8F6C\u89D2\u5EA6</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
      <span class="token literal-property property">required</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">{</span>
      <span class="token literal-property property">lineWidth</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token comment">// \u753B\u7B14\u8FB9\u6846\u5BBD\u5EA6</span>
      <span class="token literal-property property">lineColor</span><span class="token operator">:</span> <span class="token string">&#39;#000&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u753B\u7B14\u989C\u8272</span>
      <span class="token literal-property property">bgColor</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u80CC\u666F\u989C\u8272</span>
      <span class="token literal-property property">resultImg</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u751F\u6210\u7B7E\u540D\u56FE\u7247\u6587\u4EF6</span>
      <span class="token literal-property property">isCrop</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u88C1\u5207</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>


  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span><span class="token punctuation">,</span>


  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * \u6E05\u7A7A\u7B7E\u540D\u753B\u677F
     */</span>
    <span class="token function">handleReset</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>esign<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>


    <span class="token doc-comment comment">/**
     * \u521B\u5EFA\u7B7E\u540Dbase64 img\u6587\u4EF6
     */</span>
    <span class="token function">handleGenerate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>esign<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resultImg <span class="token operator">=</span> res<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgEdg<span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">rotateBase64Img</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resultImg<span class="token punctuation">,</span> <span class="token operator">+</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgEdg<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&quot;getImgBase64&quot;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resultImg<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">closePop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token comment">// \u753B\u5E03\u6CA1\u6709\u7B7E\u5B57\u65F6\u4F1A\u6267\u884C\u8FD9\u91CC &#39;Not Signned&#39;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>


    <span class="token doc-comment comment">/**
     * \u5173\u95ED\u7B7E\u540D\u5F39\u7A97\u56DE\u8C03
     */</span>
    <span class="token function">closePop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&#39;closePop&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>


    <span class="token doc-comment comment">/**
     * base64\u56FE\u7247\u65CB\u8F6C
     * <span class="token keyword">@param</span> <span class="token parameter">src</span> base64\u56FE\u7247\u6587\u4EF6
     * <span class="token keyword">@param</span> <span class="token parameter">edg</span> \u56FE\u7247\u65CB\u8F6C\u89D2\u5EA6\uFF1A\u5FC5\u987B\u662F90\u7684\u500D\u6570
     */</span>
    <span class="token function">rotateBase64Img</span><span class="token punctuation">(</span><span class="token parameter">src<span class="token punctuation">,</span> edg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;canvas&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&quot;2d&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">let</span> imgW<span class="token punctuation">;</span><span class="token comment">//\u56FE\u7247\u5BBD\u5EA6</span>
      <span class="token keyword">let</span> imgH<span class="token punctuation">;</span><span class="token comment">//\u56FE\u7247\u9AD8\u5EA6</span>
      <span class="token keyword">let</span> size<span class="token punctuation">;</span><span class="token comment">//canvas\u521D\u59CB\u5927\u5C0F</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>edg <span class="token operator">%</span> <span class="token number">90</span> <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;\u65CB\u8F6C\u89D2\u5EA6\u5FC5\u987B\u662F90\u7684\u500D\u6570!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token punctuation">(</span>edg <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>edg <span class="token operator">=</span> <span class="token punctuation">(</span>edg <span class="token operator">%</span> <span class="token number">360</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">360</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> quadrant <span class="token operator">=</span> <span class="token punctuation">(</span>edg <span class="token operator">/</span> <span class="token number">90</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token number">4</span><span class="token punctuation">;</span> <span class="token comment">//\u65CB\u8F6C\u8C61\u9650</span>
      <span class="token keyword">const</span> cutCoor <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">sx</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">sy</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">ex</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">ey</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">//\u88C1\u526A\u5750\u6807</span>
      <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      image<span class="token punctuation">.</span>crossOrigin <span class="token operator">=</span> <span class="token string">&quot;anonymous&quot;</span>
      image<span class="token punctuation">.</span>src <span class="token operator">=</span> src<span class="token punctuation">;</span>
      image<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        imgW <span class="token operator">=</span> image<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
        imgH <span class="token operator">=</span> image<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
        size <span class="token operator">=</span> imgW <span class="token operator">&gt;</span> imgH <span class="token operator">?</span> imgW <span class="token operator">:</span> imgH<span class="token punctuation">;</span>
        canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> size <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> size <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>quadrant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
            cutCoor<span class="token punctuation">.</span>sx <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>sy <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ex <span class="token operator">=</span> size <span class="token operator">+</span> imgW<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ey <span class="token operator">=</span> size <span class="token operator">+</span> imgH<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
            cutCoor<span class="token punctuation">.</span>sx <span class="token operator">=</span> size <span class="token operator">-</span> imgH<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>sy <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ex <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ey <span class="token operator">=</span> size <span class="token operator">+</span> imgW<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
            cutCoor<span class="token punctuation">.</span>sx <span class="token operator">=</span> size <span class="token operator">-</span> imgW<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>sy <span class="token operator">=</span> size <span class="token operator">-</span> imgH<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ex <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ey <span class="token operator">=</span> size<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
            cutCoor<span class="token punctuation">.</span>sx <span class="token operator">=</span> size<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>sy <span class="token operator">=</span> size <span class="token operator">-</span> imgW<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ex <span class="token operator">=</span> size <span class="token operator">+</span> imgH<span class="token punctuation">;</span>
            cutCoor<span class="token punctuation">.</span>ey <span class="token operator">=</span> size <span class="token operator">+</span> imgW<span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        ctx<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span>size<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span><span class="token function">rotate</span><span class="token punctuation">(</span>edg <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">/</span> <span class="token number">180</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> imgData <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getImageData</span><span class="token punctuation">(</span>cutCoor<span class="token punctuation">.</span>sx<span class="token punctuation">,</span> cutCoor<span class="token punctuation">.</span>sy<span class="token punctuation">,</span> cutCoor<span class="token punctuation">.</span>ex<span class="token punctuation">,</span> cutCoor<span class="token punctuation">.</span>ey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>quadrant <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> imgW<span class="token punctuation">;</span>
          canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> imgH<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> imgH<span class="token punctuation">;</span>
          canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> imgW<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        ctx<span class="token punctuation">.</span><span class="token function">putImageData</span><span class="token punctuation">(</span>imgData<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        that<span class="token punctuation">.</span>resultImg <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        that<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">&quot;getImgBase64&quot;</span><span class="token punctuation">,</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        that<span class="token punctuation">.</span><span class="token function">closePop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.pop-page</span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span>0<span class="token punctuation">,</span> 0.6<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100vh + 1px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token selector">.pop-box</span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 966px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 1858px<span class="token punctuation">;</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 22px<span class="token punctuation">;</span>
    <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
    <span class="token selector">.close</span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
      <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
      <span class="token selector">img</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 34px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 34px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.title</span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 840px<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>90deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 46px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 44px<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #333333<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.button1</span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> -40px<span class="token punctuation">;</span>
      <span class="token property">bottom</span><span class="token punctuation">:</span> 360px<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>90deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 79px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 202px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> solid 3px #1f81f8<span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 79px<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #1f81f8<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
    <span class="token selector">.button1:active</span><span class="token punctuation">{</span>
      <span class="token property">opacity</span><span class="token punctuation">:</span> 0.6<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.button2</span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">right</span><span class="token punctuation">:</span> -40px<span class="token punctuation">;</span>
      <span class="token property">bottom</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
      <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>90deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 79px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 202px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #1f81f8<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> solid 3px #1f81f8<span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 79px<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.button2:active</span><span class="token punctuation">{</span>
      <span class="token property">opacity</span><span class="token punctuation">:</span> 0.6<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.graph-box</span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 787px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 1758px<span class="token punctuation">;</span>
      <span class="token property">background-color</span><span class="token punctuation">:</span> #ffffff<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> dashed 3px #999999<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function g(y,h){const a=p("ExternalLinkIcon");return e(),o("div",null,[r,n("ul",null,[k,n("li",null,[d,n("a",v,[m,c(a)])])]),b])}var q=t(u,[["render",g],["__file","workApply12.html.vue"]]);export{q as default};
