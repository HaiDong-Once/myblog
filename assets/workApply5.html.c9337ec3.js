import{_ as n,o as s,c as a,e as t}from"./app.4c8b15c1.js";const e={},p=t(`<h1 id="vue\u73AF\u5883\u76D1\u542C\u624B\u673A\u952E\u76D8\u5F39\u51FA\u4E8B\u4EF6" tabindex="-1"><a class="header-anchor" href="#vue\u73AF\u5883\u76D1\u542C\u624B\u673A\u952E\u76D8\u5F39\u51FA\u4E8B\u4EF6" aria-hidden="true">#</a> vue\u73AF\u5883\u76D1\u542C\u624B\u673A\u952E\u76D8\u5F39\u51FA\u4E8B\u4EF6</h1><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code>data<span class="token operator">:</span> <span class="token punctuation">{</span>    
	<span class="token keyword">return</span> <span class="token punctuation">{</span>        
		docmHeight<span class="token operator">:</span> <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>  <span class="token comment">//\u9ED8\u8BA4\u5C4F\u5E55\u9AD8\u5EA6       </span>
		showHeight<span class="token operator">:</span>  <span class="token string">&#39;0&#39;</span><span class="token punctuation">,</span>   <span class="token comment">//\u5B9E\u65F6\u5C4F\u5E55\u9AD8\u5EA6        </span>
		hidshow<span class="token operator">:</span><span class="token boolean">true</span> <span class="token punctuation">,</span> <span class="token comment">//\u663E\u793A\u6216\u8005\u9690\u85CFfooter,      </span>
		isResize<span class="token operator">:</span><span class="token boolean">false</span> <span class="token comment">//\u9ED8\u8BA4\u5C4F\u5E55\u9AD8\u5EA6\u662F\u5426\u5DF2\u83B7\u53D6   </span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>

mounted<span class="token operator">:</span> <span class="token punctuation">{</span>    <span class="token comment">// window.onresize\u76D1\u542C\u9875\u9762\u9AD8\u5EA6\u7684\u53D8\u5316   </span>
	 window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>        
       <span class="token keyword">return</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>                     
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>isResize<span class="token punctuation">)</span> <span class="token punctuation">{</span>                               
			<span class="token comment">// \u9ED8\u8BA4\u5C4F\u5E55\u9AD8\u5EA6                              </span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>docmHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight                                
			<span class="token keyword">this</span><span class="token punctuation">.</span>isResize <span class="token operator">=</span> <span class="token boolean">true</span>                       
		<span class="token punctuation">}</span>                        
		<span class="token comment">// \u5B9E\u65F6\u5C4F\u5E55\u9AD8\u5EA6                       </span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>showHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight         
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
	 <span class="token punctuation">}</span>  
 <span class="token punctuation">}</span>

<span class="token comment">// watch\u76D1\u542C</span>
<span class="token keyword">function</span> <span class="token function">showHeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>        
	<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>docmHeight <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>showHeight<span class="token punctuation">)</span><span class="token punctuation">{</span>    
           <span class="token comment">// \u952E\u76D8\u9876\u8D77        </span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>hidshow<span class="token operator">=</span><span class="token boolean">false</span>        
	<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>            
		<span class="token keyword">this</span><span class="token punctuation">.</span>hidshow<span class="token operator">=</span><span class="token boolean">true</span>        
	<span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),o=[p];function c(i,l){return s(),a("div",null,o)}var r=n(e,[["render",c],["__file","workApply5.html.vue"]]);export{r as default};
