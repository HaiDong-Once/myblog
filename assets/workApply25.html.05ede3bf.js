import{_ as n,o as s,c as a,e as t}from"./app.4c8b15c1.js";const p={},o=t(`<h1 id="vue-\u5730\u56FE\u9009\u70B9-hooks-\u5C01\u88C5\u5B9E\u8DF5" tabindex="-1"><a class="header-anchor" href="#vue-\u5730\u56FE\u9009\u70B9-hooks-\u5C01\u88C5\u5B9E\u8DF5" aria-hidden="true">#</a> vue \u5730\u56FE\u9009\u70B9 hooks \u5C01\u88C5\u5B9E\u8DF5</h1><h2 id="hoos\u4EE3\u7801\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#hoos\u4EE3\u7801\u5B9E\u73B0" aria-hidden="true">#</a> hoos\u4EE3\u7801\u5B9E\u73B0</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> AMapLoader <span class="token keyword">from</span> <span class="token string">&#39;@amap/amap-jsapi-loader&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> PinganAna <span class="token keyword">from</span> <span class="token string">&quot;pingansec-vue-ana&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> tools <span class="token keyword">from</span> <span class="token string">&#39;@guanjia/public/tools&#39;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;@guanjia/public/axios&#39;</span>


<span class="token doc-comment comment">/**
 * \u5730\u56FE\u62D6\u62FDhooks
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>
 *      positionPickerStart: \u5F00\u542F\u9009\u70B9,
 *      initMap: \u5730\u56FE\u62D6\u62FD\u7EC4\u4EF6\u521D\u59CB\u5316
 *    <span class="token punctuation">}</span><span class="token punctuation">}</span>
 * <span class="token keyword">@description</span>
 *     \u5F00\u542F\u9009\u70B9 positionPickerStart();
 *     \u4F7F\u7528\u8BF4\u660E\uFF1AinitMap(<span class="token punctuation">{</span>
 *             mapDocumentId: &#39;map-container&#39;, // \u5730\u56FEdom box id
 *             mapZoom: 17, // \u5730\u56FE\u7F29\u653E\u6BD4
 *             location: &quot;116.397379,39.909105&quot;,  // \u5730\u56FE\u5750\u6807\u70B9
 *             isShowToolBar: true, // \u662F\u5426\u5C55\u793A\u5730\u56FE\u7F29\u653E\u5DE5\u5177
 *             iconStyle: <span class="token punctuation">{</span>
 *               url: &#39;https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png&#39;,
 *               size:[222,70],
 *               ancher:[111,70],
 *             <span class="token punctuation">}</span>
 *           <span class="token punctuation">}</span>,
 *           (success)=&gt;<span class="token punctuation">{</span>
 *               const <span class="token punctuation">{</span>
 *                    address, // \u9009\u70B9\u5730\u5740\u56DE\u663E
 *                    locationAddress, // \u7701\u5E02\u533A\u5730\u5740\u9017\u53F7\u62FC\u63A5
 *                    location, // \u9009\u70B9\u5750\u6807\u56DE\u663E
 *                    cityOrProvince, // \u57CE\u5E02\u6216\u76F4\u8F96\u5E02
 *               <span class="token punctuation">}</span> = success
 *           <span class="token punctuation">}</span>,
 *          (fail)=&gt;<span class="token punctuation">{</span>
 *               console.log(fail)
 *           <span class="token punctuation">}</span>
 *     )
 */</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useMapDrag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> positionPicker <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5730\u56FE\u9009\u70B9\u5BF9\u8C61</span>

  <span class="token doc-comment comment">/**
   * \u5730\u56FE\u521D\u59CB\u5316
   * <span class="token keyword">@param</span> <span class="token parameter">mapDocumentId</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> \u5730\u56FEbox dom id \u503C
   * <span class="token keyword">@param</span> <span class="token parameter">mapZoom</span> <span class="token punctuation">{</span>number<span class="token punctuation">}</span> \u5730\u56FE\u7F29\u653E
   * <span class="token keyword">@param</span> <span class="token parameter">location</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span> \u5730\u56FE\u5750\u6807
   * <span class="token keyword">@param</span> <span class="token parameter">isShowToolBar</span> <span class="token punctuation">{</span>boolean<span class="token punctuation">}</span>  \u662F\u5426\u5C55\u793A\u7F29\u653Eui\u5DE5\u5177
   * <span class="token keyword">@param</span> <span class="token parameter">iconStyle</span> <span class="token punctuation">{</span>object<span class="token punctuation">}</span>  \u9009\u70B9icon\u914D\u7F6E
   * <span class="token keyword">@param</span> <span class="token parameter">successCallback</span> <span class="token punctuation">{</span>function<span class="token punctuation">}</span> \u9009\u70B9\u6210\u529F\u56DE\u8C03
   * <span class="token keyword">@param</span> <span class="token parameter">failCallback</span> <span class="token punctuation">{</span>function<span class="token punctuation">}</span> \u5931\u8D25\u56DE\u8C03
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>Promise&lt;void&gt;<span class="token punctuation">}</span>
   */</span>
  <span class="token keyword">const</span> initMap <span class="token operator">=</span>  <span class="token keyword">async</span> <span class="token punctuation">(</span>
          <span class="token punctuation">{</span>
            mapDocumentId <span class="token operator">=</span> <span class="token string">&#39;map-container&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u5730\u56FEdom box id</span>
            mapZoom <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token comment">// \u5730\u56FE\u7F29\u653E\u6BD4</span>
            location <span class="token operator">=</span> <span class="token string">&quot;116.397379,39.909105&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// \u5730\u56FE\u5750\u6807\u70B9</span>
            isShowToolBar <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u5C55\u793A\u5730\u56FE\u7F29\u653E\u5DE5\u5177</span>
            iconStyle <span class="token operator">=</span> <span class="token punctuation">{</span>
              url<span class="token operator">:</span> <span class="token string">&#39;https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png&#39;</span><span class="token punctuation">,</span>
              size<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">222</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
              ancher<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">111</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          successCallback<span class="token punctuation">,</span>
          failCallback<span class="token punctuation">,</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> companyKey <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getIsUseCompanyKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span>keyMap<span class="token punctuation">,</span> securityJsCode<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getKeyAndCode</span><span class="token punctuation">(</span>companyKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// \u9AD8\u5FB7\u79D8\u94A5\u914D\u7F6E</span>
    window<span class="token punctuation">.</span>_AMapSecurityConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
      securityJsCode<span class="token operator">:</span> securityJsCode<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// \u52A0\u8F7D\u5730\u56FE\u7EC4\u4EF6</span>
    AMapLoader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      key<span class="token operator">:</span> keyMap<span class="token punctuation">,</span>
      version<span class="token operator">:</span><span class="token string">&quot;2.0&quot;</span><span class="token punctuation">,</span>
      plugins<span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      AMapUI<span class="token operator">:</span> <span class="token punctuation">{</span>
        version<span class="token operator">:</span> <span class="token string">&#39;1.1&#39;</span><span class="token punctuation">,</span>
        plugins<span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&#39;misc/PositionPicker&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>AMap<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token comment">// \u52A0\u8F7D\u5730\u56FEUI\u7EC4\u4EF6</span>
      AMapUI<span class="token punctuation">.</span><span class="token function">loadUI</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;misc/PositionPicker&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>PositionPicker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u9632\u6B62\u7ACB\u5373\u8DF3\u8F6C\u5BFC\u81F4dom\u6E05\u9664\u62A5\u9519</span>
        <span class="token keyword">let</span> mapContainerDom <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;#&#39;</span> <span class="token operator">+</span> mapDocumentId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>mapContainerDom<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">}</span>

        <span class="token comment">// \u5730\u56FE\u914D\u7F6E</span>
        <span class="token keyword">const</span> mapConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AMap</span><span class="token punctuation">.</span><span class="token function">Map</span><span class="token punctuation">(</span>mapDocumentId<span class="token punctuation">,</span> <span class="token punctuation">{</span>
          zoom<span class="token operator">:</span> mapZoom<span class="token punctuation">,</span>
          center<span class="token operator">:</span> <span class="token punctuation">[</span>location<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> location<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// \u5C55\u793A\u5730\u56FE\u5DE5\u5177</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>isShowToolBar<span class="token punctuation">)</span><span class="token punctuation">{</span>
          AMap<span class="token punctuation">.</span><span class="token function">plugin</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
            <span class="token string">&#39;AMap.ToolBar&#39;</span><span class="token punctuation">,</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            mapConfig<span class="token punctuation">.</span><span class="token function">addControl</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AMap</span><span class="token punctuation">.</span><span class="token function">ToolBar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              liteStyle<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
              offset<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">AMap</span><span class="token punctuation">.</span><span class="token function">Pixel</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">140</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// \u521B\u5EFA\u62D6\u62FD\u9009\u70B9</span>
        positionPicker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PositionPicker</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          mode<span class="token operator">:</span> <span class="token string">&quot;dragMap&quot;</span><span class="token punctuation">,</span>
          map<span class="token operator">:</span> mapConfig<span class="token punctuation">,</span>
          center<span class="token operator">:</span> <span class="token punctuation">[</span>location<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> location<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          iconStyle<span class="token operator">:</span> iconStyle
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        positionPicker<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;success&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>positionResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          PinganAna<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span><span class="token number">4961</span><span class="token punctuation">)</span> <span class="token comment">// 360\u5730\u56FE\u8FD0\u8425\u9996\u9875\u5730\u56FE\u62D6\u52A8\u6B21\u6570 \u603B\u548C</span>
          <span class="token keyword">const</span> <span class="token punctuation">{</span> addressComponent <span class="token punctuation">}</span> <span class="token operator">=</span> positionResult<span class="token operator">?.</span>regeocode <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> <span class="token punctuation">{</span> province<span class="token punctuation">,</span> city<span class="token punctuation">,</span> district<span class="token punctuation">,</span>
            township<span class="token punctuation">,</span> street<span class="token punctuation">,</span> streetNumber<span class="token punctuation">}</span> <span class="token operator">=</span> addressComponent <span class="token operator">??</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

          <span class="token keyword">let</span> address <span class="token operator">=</span> province <span class="token operator">+</span> city <span class="token operator">+</span> district <span class="token operator">+</span> township <span class="token operator">+</span> street <span class="token operator">+</span> streetNumber<span class="token punctuation">;</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>street<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">let</span> nearestPOI <span class="token operator">=</span> <span class="token function">getAddress</span><span class="token punctuation">(</span>positionResult<span class="token operator">?.</span>regeocode<span class="token operator">?.</span>pois<span class="token punctuation">)</span><span class="token punctuation">;</span>
            address <span class="token operator">=</span> province <span class="token operator">+</span> city <span class="token operator">+</span> district <span class="token operator">+</span> township <span class="token operator">+</span> nearestPOI<span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">const</span> locationAddress <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>province<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>city <span class="token operator">?</span> city <span class="token operator">:</span> province<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>district<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> location <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>positionResult<span class="token punctuation">.</span>position<span class="token punctuation">.</span>lng<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>positionResult<span class="token punctuation">.</span>position<span class="token punctuation">.</span>lat<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
          <span class="token keyword">const</span> cityOrProvince <span class="token operator">=</span> city <span class="token operator">?</span> city <span class="token operator">:</span> province<span class="token punctuation">;</span>

          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> successCallback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">successCallback</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
              address<span class="token punctuation">,</span>
              locationAddress<span class="token punctuation">,</span>
              location<span class="token punctuation">,</span>
              cityOrProvince
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
          <span class="token punctuation">}</span>

          positionPicker<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        positionPicker<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;fail&quot;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>positionResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">\u5B9A\u4F4D\u5931\u8D25:</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">+</span> positionResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
          PinganAna<span class="token punctuation">.</span><span class="token function">fire</span><span class="token punctuation">(</span><span class="token number">4961</span><span class="token punctuation">)</span> <span class="token comment">// 360\u5730\u56FE\u8FD0\u8425\u9996\u9875\u5730\u56FE\u62D6\u52A8\u6B21\u6570 \u603B\u548C</span>

          <span class="token comment">// \u5F00\u542F\u4F7F\u7528\u4F01\u4E1Akey</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span>positionResult<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token doc-comment comment">/**************/</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">setIsUseCompanyKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token comment">// \u624B\u52A8\u4E0A\u62A5\u9009\u70B9\u5931\u8D25</span>
          tools<span class="token punctuation">.</span><span class="token function">sendTracker</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            selfType<span class="token operator">:</span> <span class="token string">&#39;\u5730\u56FE\u9009\u70B9\u56DE\u8C03\u5931\u8D25&#39;</span><span class="token punctuation">,</span>
            message<span class="token operator">:</span> positionResult
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token comment">// \u5730\u56FE\u9009\u70B9\u5931\u8D25\u56DE\u8C03</span>
          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> failCallback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token function">failCallback</span><span class="token punctuation">(</span>positionResult<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mapConfig<span class="token punctuation">.</span><span class="token function">panBy</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>


  <span class="token doc-comment comment">/**
   * \u83B7\u53D6pois\u62FC\u63A5\u5730\u5740
   * <span class="token keyword">@param</span> <span class="token parameter">pois</span>
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>string<span class="token punctuation">}</span>
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">getAddress</span> <span class="token operator">=</span>  <span class="token keyword">async</span> <span class="token punctuation">(</span>pois<span class="token punctuation">)</span> <span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>pois<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span> <span class="token punctuation">}</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u9910\u996E\u76F8\u5173\u573A\u6240;\u9910\u996E\u76F8\u5173&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u5FEB\u9910\u5385;\u5FEB\u9910\u5385&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u4E2D\u9910\u5385;\u4E2D\u9910\u5385&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u516C\u53F8\u4F01\u4E1A;\u516C\u53F8;\u516C\u53F8&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u4FBF\u6C11\u5546\u5E97/\u4FBF\u5229\u5E97;\u4FBF\u6C11\u5546\u5E97/\u4FBF\u5229\u5E97|\u8D2D\u7269\u670D\u52A1;\u8D85\u7EA7\u5E02\u573A;\u8D85\u5E02&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u4E2D\u9910\u5385;\u7EFC\u5408\u9152\u697C&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u4F4F\u5BBF\u670D\u52A1;\u65C5\u9986\u62DB\u5F85\u6240;\u65C5\u9986\u62DB\u5F85\u6240&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u533B\u7597\u4FDD\u5065\u670D\u52A1;\u533B\u836F\u4FDD\u5065\u9500\u552E\u5E97;\u836F\u623F&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u6C7D\u8F66\u7EF4\u4FEE;\u6C7D\u8F66\u7EF4\u4FEE;\u6C7D\u8F66\u7EF4\u4FEE&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u6469\u6258\u8F66\u670D\u52A1;\u6469\u6258\u8F66\u7EF4\u4FEE;\u6469\u6258\u8F66\u7EF4\u4FEE&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u6469\u6258\u8F66\u670D\u52A1;\u6469\u6258\u8F66\u670D\u52A1\u76F8\u5173;\u6469\u6258\u8F66\u670D\u52A1\u76F8\u5173&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u6C7D\u8F66\u670D\u52A1;\u6C7D\u8F66\u670D\u52A1\u76F8\u5173;\u6C7D\u8F66\u670D\u52A1\u76F8\u5173&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u5BB6\u5C45\u5EFA\u6750\u5E02\u573A;\u5BB6\u5C45\u5EFA\u6750\u5E02\u573A&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u516C\u53F8\u4F01\u4E1A;\u516C\u53F8;\u5EFA\u7B51\u516C\u53F8&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u516C\u53F8\u4F01\u4E1A;\u516C\u53F8;\u673A\u68B0\u7535\u5B50&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u4E2D\u9910\u5385;\u706B\u9505\u5E97&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u8D2D\u7269\u76F8\u5173\u573A\u6240;\u8D2D\u7269\u76F8\u5173\u573A\u6240&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u5BB6\u5C45\u5EFA\u6750\u5E02\u573A;\u5EFA\u6750\u4E94\u91D1\u5E02\u573A&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u4E13\u5356\u5E97;\u81EA\u884C\u8F66\u4E13\u5356\u5E97&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u516C\u53F8\u4F01\u4E1A;\u516C\u53F8\u4F01\u4E1A;\u516C\u53F8\u4F01\u4E1A&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u533B\u7597\u4FDD\u5065\u670D\u52A1;\u533B\u836F\u4FDD\u5065\u9500\u552E\u5E97;\u533B\u7597\u4FDD\u5065\u7528\u54C1&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u4E2D\u9910\u5385;\u6E05\u771F\u83DC\u9986&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u9910\u996E\u670D\u52A1;\u4E2D\u9910\u5385;\u4E1C\u5317\u83DC&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u516C\u53F8\u4F01\u4E1A;\u5DE5\u5382;\u5DE5\u5382&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u8D2D\u7269\u670D\u52A1;\u4FBF\u6C11\u5546\u5E97/\u4FBF\u5229\u5E97;\u4FBF\u6C11\u5546\u5E97/\u4FBF\u5229\u5E97&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u4F53\u80B2\u4F11\u95F2\u670D\u52A1;\u4F53\u80B2\u4F11\u95F2\u670D\u52A1\u573A\u6240;\u4F53\u80B2\u4F11\u95F2\u670D\u52A1\u573A\u6240&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;\u4F53\u80B2\u4F11\u95F2\u670D\u52A1;\u4F11\u95F2\u573A\u6240;\u4F11\u95F2\u573A\u6240&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
    pois <span class="token operator">=</span> pois<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span> <span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">!</span>data<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">)</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> pois<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">??</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">let</span> direction <span class="token operator">=</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> obj<span class="token punctuation">.</span>direction<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token string">&#39;\u4E1C&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>item <span class="token operator">=</span> <span class="token string">&#39;\u897F&#39;</span><span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token string">&#39;\u5357&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>item <span class="token operator">=</span> <span class="token string">&#39;\u5317&#39;</span><span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token string">&#39;\u897F&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>item <span class="token operator">=</span> <span class="token string">&#39;\u4E1C&#39;</span><span class="token punctuation">}</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>item <span class="token operator">===</span> <span class="token string">&#39;\u5317&#39;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>item <span class="token operator">=</span> <span class="token string">&#39;\u5357&#39;</span><span class="token punctuation">}</span>
        direction <span class="token operator">+=</span> item<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>distance <span class="token operator">&amp;&amp;</span> obj<span class="token punctuation">.</span>distance <span class="token operator">&lt;</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">.</span>name <span class="token operator">+</span> direction <span class="token operator">+</span> <span class="token string">&#39;\u9762&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">.</span>name <span class="token operator">+</span> direction <span class="token operator">+</span> <span class="token string">&#39;\u9762&#39;</span> <span class="token operator">+</span> obj<span class="token punctuation">.</span>distance <span class="token operator">+</span> <span class="token string">&#39;\u7C73&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>


  <span class="token doc-comment comment">/**
   * \u83B7\u53D6\u5F53\u524D\u53EF\u7528key\u548Ccode
   * <span class="token keyword">@param</span> <span class="token parameter">companyKey</span>
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token punctuation">{</span>keyMap: string, securityJsCode: string<span class="token punctuation">}</span><span class="token punctuation">}</span>
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">getKeyAndCode</span> <span class="token operator">=</span> <span class="token punctuation">(</span>companyKey<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">return</span><span class="token punctuation">{</span>
      keyMap<span class="token punctuation">,</span>
      securityJsCode
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>


  <span class="token doc-comment comment">/**
   * \u83B7\u53D6\u662F\u5426\u4F7F\u7528\u4F01\u4E1Akey
   * <span class="token keyword">@return</span> <span class="token punctuation">{</span>String<span class="token punctuation">}</span> \u5F53\u524D\u53EF\u7528key
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">getIsUseCompanyKey</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/msg-map-mark&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
      params<span class="token operator">:</span><span class="token punctuation">{</span>
        action<span class="token operator">:</span> <span class="token string">&#39;gd_map_key&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res<span class="token operator">=&gt;</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>res <span class="token operator">&amp;&amp;</span> <span class="token operator">+</span>res<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> key <span class="token punctuation">}</span> <span class="token operator">=</span> res<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
        <span class="token keyword">return</span> key<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * \u8BBE\u7F6E\u662F\u5426\u4F7F\u7528\u4F01\u4E1Akey
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">setIsUseCompanyKey</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> axios<span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/msg-map-mark&#39;</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
      params<span class="token operator">:</span><span class="token punctuation">{</span>
        action<span class="token operator">:</span> <span class="token string">&#39;gd_invalid_key&#39;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * \u5F00\u542F\u7EC4\u4EF6\u9009\u70B9
   */</span>
  <span class="token keyword">const</span> <span class="token function-variable function">positionPickerStart</span> <span class="token operator">=</span>  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    positionPicker<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    positionPickerStart<span class="token punctuation">,</span>
    initMap<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h2><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">description</span></span><span class="token operator">:</span>  \u5730\u56FE\u6574\u5408\u7248\u672C<span class="token number">2.0</span>\u2014\u2014\u9996\u9875
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">author</span></span><span class="token operator">:</span> <span class="token function">hhd</span> <span class="token punctuation">(</span><span class="token number">2023</span><span class="token operator">-</span><span class="token number">06</span><span class="token operator">-</span><span class="token number">02</span><span class="token punctuation">)</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">update</span></span><span class="token operator">:</span>
<span class="token operator">--</span><span class="token operator">&gt;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> onMounted<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> useMapDrag <span class="token keyword">from</span> <span class="token string">&#39;../../AHooks/useMapDrag&#39;</span>


<span class="token keyword">const</span> <span class="token punctuation">{</span>positionPickerStart<span class="token punctuation">,</span> initMap<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useMapDrag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token function">onMounted</span><span class="token punctuation">(</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">initMap</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        mapDocumentId<span class="token operator">:</span> <span class="token string">&#39;map-container&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u5730\u56FEdom box id</span>
        mapZoom<span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token comment">// \u5730\u56FE\u7F29\u653E\u6BD4</span>
        location<span class="token operator">:</span> <span class="token string">&quot;116.397379,39.909105&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// \u5730\u56FE\u5750\u6807\u70B9</span>
        isShowToolBar<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u662F\u5426\u5C55\u793A\u5730\u56FE\u7F29\u653E\u5DE5\u5177</span>
        iconStyle<span class="token operator">:</span> <span class="token punctuation">{</span>
          url<span class="token operator">:</span> <span class="token string">&#39;https://staticcdn.shuidi.cn/shuidi/images/map/drag-blue-icon.png&#39;</span><span class="token punctuation">,</span>
          size<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">222</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          ancher<span class="token operator">:</span><span class="token punctuation">[</span><span class="token number">111</span><span class="token punctuation">,</span><span class="token number">70</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>success<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span>
          address<span class="token punctuation">,</span> <span class="token comment">// \u9009\u70B9\u5730\u5740\u56DE\u663E</span>
          locationAddress<span class="token punctuation">,</span> <span class="token comment">// \u7701\u5E02\u533A\u5730\u5740\u9017\u53F7\u62FC\u63A5</span>
          location<span class="token punctuation">,</span> <span class="token comment">// \u9009\u70B9\u5750\u6807\u56DE\u663E</span>
          cityOrProvince<span class="token punctuation">,</span> <span class="token comment">// \u57CE\u5E02\u6216\u76F4\u8F96\u5E02</span>
        <span class="token punctuation">}</span> <span class="token operator">=</span> success
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>success<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>fail<span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>fail<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">const</span> <span class="token function-variable function">confirmLocation</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">positionPickerStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),e=[o];function c(i,l){return s(),a("div",null,e)}var k=n(p,[["render",c],["__file","workApply25.html.vue"]]);export{k as default};
