import{_ as e,r as o,o as c,c as i,a as n,b as t,w as p,d as s,e as l}from"./app.8430cabb.js";const u={},r=n("h1",{id:"react\u66DD\u5149\u57CB\u70B9\u89E3\u51B3\u65B9\u6848",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react\u66DD\u5149\u57CB\u70B9\u89E3\u51B3\u65B9\u6848","aria-hidden":"true"},"#"),s(" react\u66DD\u5149\u57CB\u70B9\u89E3\u51B3\u65B9\u6848")],-1),k={class:"table-of-contents"},d=s("\u4E00\u3001\u601D\u8DEF"),v=s("\u4E8C\u3001\u4EE3\u7801\u5B9E\u73B0"),m=s("\u590D\u7528vue\u4E2D\u76F8\u540C\u7C7B"),b=s("\u521B\u5EFAreact HOC \u9AD8\u9636\u7EC4\u4EF6"),y=s("\u4F7F\u7528\u65B9\u6CD5"),h=l(`<h2 id="\u4E00\u3001\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u601D\u8DEF" aria-hidden="true">#</a> \u4E00\u3001\u601D\u8DEF</h2><p>class\u7C7B\u4E0Evue\u5C01\u88C5\u7684\u4FDD\u6301\u4E00\u81F4\uFF0C\u4E3B\u8981\u9700\u8981\u89E3\u51B3react\u4E2D vue \u6307\u4EE4\u7ED1\u5B9A\u5378\u8F7D\u7684\u90E8\u5206</p><ul><li>\u7ED9\u9700\u8981\u66DD\u5149\u7684\u5143\u7D20\u6DFB\u52A0\u7279\u5B9A\u7684id\u548C\u53C2\u6570\uFF0C\u5168\u5C40\u76D1\u542Cdom\u5143\u7D20\u53D8\u5316\uFF0C\u6709\u7279\u5B9Aid\u7684dom\u8C03\u7528class\u7C7B\u6DFB\u52A0\u76D1\u542C\uFF0C\u4F46\u662F\u7F3A\u70B9\u5F88\u660E\u663E\uFF0C\u6D88\u8017\u6027\u80FD</li><li>\u4F7F\u7528HOC\u9AD8\u9636\u7EC4\u4EF6\u5C01\u88C5\u8981\u66DD\u5149\u7684\u5143\u7D20\uFF0C\u7F3A\u70B9\uFF1Arender\u51FD\u6570\u4E2D\u4F7F\u7528\u5F71\u54CD\u6027\u80FD\uFF0C\u5916\u5C42\u5305\u88F9\u4E86div\uFF0C\u5305\u88F9inline\u5143\u7D20\u53EF\u80FD\u5F71\u54CD\u539F\u6709UI\u6837\u5F0F</li></ul><h2 id="\u4E8C\u3001\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> \u4E8C\u3001\u4EE3\u7801\u5B9E\u73B0</h2><h3 id="\u590D\u7528vue\u4E2D\u76F8\u540C\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u590D\u7528vue\u4E2D\u76F8\u540C\u7C7B" aria-hidden="true">#</a> \u590D\u7528vue\u4E2D\u76F8\u540C\u7C7B</h3><p>\u66B4\u9732\u51FA\u4E00\u4E2A exposure \u5B9E\u4F8B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * \u66DD\u5149\u57CB\u70B9class\u7C7B
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Exposure</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// \u589E\u52A0\u5B9A\u65F6\u5668\u5BF9\u8C61</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>exposureList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// \u8BB0\u5F55\u5DF2\u7ECF\u4E0A\u62A5\u8FC7\u7684\u57CB\u70B9\u4FE1\u606F</span>

        <span class="token comment">// \u6784\u9020IntersectionObserver\u89C2\u5BDF\u5668</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleIntersection<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// \u9ED8\u8BA4\u6D4F\u89C8\u5668\u89C6\u7A97</span>
            <span class="token literal-property property">threshold</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token comment">// \u5143\u7D20\u5B8C\u5168\u51FA\u73B0\u5728\u6D4F\u89C8\u5668\u89C6\u7A97\u5185\u624D\u6267\u884Ccallback\u51FD\u6570\u3002</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * IntersectionObserver callback
     * <span class="token keyword">@param</span> <span class="token parameter">entries</span>
     */</span>
    <span class="token function-variable function">handleIntersection</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">entries</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> exposureData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                exposureData <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>
                    entry<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;exposure-data&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                exposureData <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;\u57CB\u70B9\u6570\u636E\u683C\u5F0F\u5F02\u5E38&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// \u6CA1\u6709\u57CB\u70B9\u6570\u636E\u53D6\u6D88\u4E0A\u62A5</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>exposureData <span class="token operator">||</span> <span class="token operator">!</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;\u57CB\u70B9\u6570\u636E\u683C\u5F0F\u5F02\u5E38&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// \u66DD\u5149\u65F6\u95F4\u8D85\u8FC71\u79D2\u4E3A\u6709\u6548\u66DD\u5149</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">[</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                    <span class="token comment">// \u4E0A\u62A5\u57CB\u70B9\u4FE1\u606F</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">sendPosition</span><span class="token punctuation">(</span>exposureData<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token comment">// \u4E0A\u62A5\u540E\u53D6\u6D88\u76D1\u542C</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>exposureList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">[</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">[</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">[</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">[</span>exposureData<span class="token punctuation">.</span>position<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * \u4E0A\u62A5\u66DD\u5149\u57CB\u70B9\u6570\u636E
     * <span class="token keyword">@param</span> <span class="token parameter">exposureData</span>
     * <span class="token keyword">@tips</span>: \u5229\u7528setTimeout\u5C06\u4E0A\u62A5\u4EFB\u52A1\u653E\u5230\u4EFB\u52A1\u961F\u5217\u672B\u5C3E\uFF0C\u4EE5\u514D\u5360\u7528\u4E3B\u8FDB\u7A0B\u8D44\u6E90
     */</span>
    <span class="token function">sendPosition</span><span class="token punctuation">(</span><span class="token parameter">exposureData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> position <span class="token punctuation">}</span> <span class="token operator">=</span> exposureData <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * \u6DFB\u52A0\u76D1\u542C
     * <span class="token keyword">@param</span> <span class="token parameter">ele</span>
     * <span class="token keyword">@param</span> <span class="token parameter">prams</span>
     */</span>
    <span class="token function-variable function">addDom</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">ele<span class="token punctuation">,</span> prams</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u53C2\u6570\u6DFB\u52A0\u5230dom\u4E2D</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>ele<span class="token punctuation">)</span> <span class="token keyword">return</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>prams<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> exposureData <span class="token operator">=</span> prams<span class="token punctuation">;</span>
            ele<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
                <span class="token string">&#39;exposure-data&#39;</span><span class="token punctuation">,</span>
                <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>exposureData<span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">const</span> <span class="token punctuation">{</span> position <span class="token punctuation">}</span> <span class="token operator">=</span> exposureData <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>exposureList<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// dom IntersectionObserver \u76D1\u542C</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>


    <span class="token doc-comment comment">/**
     * \u79FB\u9664\u76D1\u542C
     * <span class="token keyword">@param</span> <span class="token parameter">ele</span>
     */</span>
    <span class="token function-variable function">removeDom</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">ele</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u79FB\u9664\u76D1\u542C</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>ele<span class="token punctuation">)</span> <span class="token keyword">return</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">// \u66B4\u9732\u51FA\u4E00\u4E2A exposure \u5B9E\u4F8B</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Exposure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521B\u5EFAreact-hoc-\u9AD8\u9636\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFAreact-hoc-\u9AD8\u9636\u7EC4\u4EF6" aria-hidden="true">#</a> \u521B\u5EFAreact HOC \u9AD8\u9636\u7EC4\u4EF6</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> exposure <span class="token keyword">from</span> <span class="token string">&quot;../utils/exposure&quot;</span><span class="token punctuation">;</span>


<span class="token doc-comment comment">/**
 * \u66DD\u5149\u57CB\u70B9\u9AD8\u9636\u7EC4\u4EF6
 * @\u8BF4\u660E\uFF1A
 * import ExposureHoc from &#39;./components/ExposureHoc&#39;
 *
 * // \u4F7F\u7528\u9AD8\u9636\u7EC4\u4EF6\u589E\u5F3A\u51FD\u6570\u5F0F\u7EC4\u4EF6
 * const ExposureComponent = ExposureHoc((props) =&gt; <span class="token punctuation">{</span>
 *     return &lt;div&gt;\u6D4B\u8BD5\u66DD\u5149\u7EC4\u4EF6 <span class="token punctuation">{</span>props.position<span class="token punctuation">}</span>!&lt;/div&gt;;
 * <span class="token punctuation">}</span>);
 *
 * &lt;ExposureComponent exposureData=<span class="token punctuation">{</span><span class="token punctuation">{</span>position: 88888889<span class="token punctuation">}</span><span class="token punctuation">}</span>/&gt;
 *
 * @\u4F20\u53C2\uFF1AexposureData=<span class="token punctuation">{</span><span class="token punctuation">{</span>position: 88888889<span class="token punctuation">}</span><span class="token punctuation">}</span>  position\u5FC5\u4F20\u4E14\u503C\u552F\u4E00
 */</span>
<span class="token keyword">const</span> <span class="token function-variable function">exposureHoc</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>exposureData<span class="token punctuation">}</span> <span class="token operator">=</span> props <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>position<span class="token punctuation">}</span> <span class="token operator">=</span> exposureData <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// \u6DFB\u52A0\u81F3\u89C2\u5BDF\u5217\u8868</span>
    <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> ele <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">exposure-id-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>position<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        exposure<span class="token punctuation">.</span><span class="token function">addDom</span><span class="token punctuation">(</span>ele<span class="token punctuation">,</span> exposureData<span class="token punctuation">)</span>

        <span class="token comment">// \u7EC4\u4EF6\u9500\u6BC1\u79FB\u9664\u89C2\u5BDF</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Component will unmount&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            exposure<span class="token punctuation">.</span><span class="token function">removeDom</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// \u901A\u8FC7dom data \u5C5E\u6027\u8BBE\u7F6E\u57CB\u70B9\u53C2\u6570</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">exposure-id-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>position<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>WrappedComponent <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>


<span class="token keyword">export</span> <span class="token keyword">default</span> exposureHoc<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4F7F\u7528\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u65B9\u6CD5" aria-hidden="true">#</a> \u4F7F\u7528\u65B9\u6CD5</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> ExposureHoc <span class="token keyword">from</span> <span class="token string">&#39;./components/ExposureHoc&#39;</span>

<span class="token comment">// \u4F7F\u7528\u9AD8\u9636\u7EC4\u4EF6\u589E\u5F3A\u51FD\u6570\u5F0F\u7EC4\u4EF6(\u5305\u88F9)</span>
<span class="token keyword">const</span> ExposureHocComponent <span class="token operator">=</span> <span class="token function">ExposureHoc</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>\u6D4B\u8BD5\u66DD\u5149\u7EC4\u4EF6 <span class="token punctuation">{</span>props<span class="token punctuation">.</span>position<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">Home</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
            <span class="token operator">&lt;</span>ExposureHocComponent exposureData<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token literal-property property">position</span><span class="token operator">:</span> <span class="token number">88888889</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Home<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function f(w,x){const a=o("RouterLink");return c(),i("div",null,[r,n("nav",k,[n("ul",null,[n("li",null,[t(a,{to:"#\u4E00\u3001\u601D\u8DEF"},{default:p(()=>[d]),_:1})]),n("li",null,[t(a,{to:"#\u4E8C\u3001\u4EE3\u7801\u5B9E\u73B0"},{default:p(()=>[v]),_:1}),n("ul",null,[n("li",null,[t(a,{to:"#\u590D\u7528vue\u4E2D\u76F8\u540C\u7C7B"},{default:p(()=>[m]),_:1})]),n("li",null,[t(a,{to:"#\u521B\u5EFAreact-hoc-\u9AD8\u9636\u7EC4\u4EF6"},{default:p(()=>[b]),_:1})]),n("li",null,[t(a,{to:"#\u4F7F\u7528\u65B9\u6CD5"},{default:p(()=>[y]),_:1})])])])])]),h])}var _=e(u,[["render",f],["__file","react6.html.vue"]]);export{_ as default};