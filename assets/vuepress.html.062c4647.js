import{_ as i,r as l,o as p,c as o,a as n,b as e,w as t,d as s,e as c}from"./app.8430cabb.js";var u="/myblog/images/frontEnd/img_18.png",r="/myblog/images/frontEnd/img_19.png",d="/myblog/images/frontEnd/img_20.png",v="/myblog/images/frontEnd/img_21.png",k="/myblog/images/frontEnd/img_22.png",m="/myblog/images/frontEnd/img_23.png",g="/myblog/images/frontEnd/img_24.png";const b={},h=n("h1",{id:"\u535A\u5BA2\u642D\u5EFA",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u535A\u5BA2\u642D\u5EFA","aria-hidden":"true"},"#"),s(" \u535A\u5BA2\u642D\u5EFA")],-1),f={class:"table-of-contents"},_=s("vuepress\u642D\u5EFA\u535A\u5BA2"),y=s("\u4F9D\u8D56\u73AF\u5883"),x=s("\u624B\u52A8\u5B89\u88C5"),q=s("\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55"),E=s("\u5728config.js\u4E2D\u6DFB\u52A0\u914D\u7F6E"),j=s("\u914D\u7F6E\u9996\u9875\u6837\u5F0F"),w=s("\u914D\u7F6E\u81EA\u52A8\u90E8\u7F72\u811A\u672C"),M=s("\u914D\u7F6E\u6267\u884C\u90E8\u7F72\u811A\u672C"),N=s("\u6267\u884C\u90E8\u7F72\u547D\u4EE4"),R=s("\u914D\u7F6Egithub page"),A=s("\u6700\u7EC8\u6548\u679C"),C=c(`<h2 id="vuepress\u642D\u5EFA\u535A\u5BA2" tabindex="-1"><a class="header-anchor" href="#vuepress\u642D\u5EFA\u535A\u5BA2" aria-hidden="true">#</a> vuepress\u642D\u5EFA\u535A\u5BA2</h2><h3 id="\u4F9D\u8D56\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#\u4F9D\u8D56\u73AF\u5883" aria-hidden="true">#</a> \u4F9D\u8D56\u73AF\u5883</h3><ul><li>node.js v14+</li><li>yarn v1 \u6216\u8005 npm</li></ul><h3 id="\u624B\u52A8\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u624B\u52A8\u5B89\u88C5" aria-hidden="true">#</a> \u624B\u52A8\u5B89\u88C5</h3><ul><li>\u521B\u5EFA\u5E76\u8FDB\u5165\u65B0\u76EE\u5F55</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> vuepress-starter
<span class="token builtin class-name">cd</span> vuepress-starter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u521D\u59CB\u5316\u9879\u76EE</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">yarn</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5C06 <code>VuePress</code> \u5B89\u88C5\u4E3A\u672C\u5730\u4F9D\u8D56</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress@next
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u5728<code>package.json</code> \u4E2D\u6DFB\u52A0 <code>scripts</code></li></ul><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u5C06\u9ED8\u8BA4\u7684\u4E34\u65F6\u76EE\u5F55\u548C\u7F13\u5B58\u76EE\u5F55\u6DFB\u52A0\u5230 <code>.gitignore</code> \u6587\u4EF6\u4E2D</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&#39;node_modules&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">&#39;.temp&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
<span class="token builtin class-name">echo</span> <span class="token string">&#39;.cache&#39;</span> <span class="token operator">&gt;&gt;</span> .gitignore
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u521B\u5EFA\u4F60\u7684\u7B2C\u4E00\u7BC7\u6587\u6863</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> docs
<span class="token builtin class-name">echo</span> <span class="token string">&#39;# Hello VuePress&#39;</span> <span class="token operator">&gt;</span> docs/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u542F\u52A8\u9879\u76EE</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u6253\u5F00\u9884\u89C8\u5730\u5740 <code>http://localhost:8080</code></li></ul><h3 id="\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u76EE\u5F55</h3><ul><li>\u65B0\u5EFA<code>.vuepress </code>-&gt; <code>config.js</code></li></ul><p><img src="`+u+`" alt="\u56FE\u7247"></p><h3 id="\u5728config-js\u4E2D\u6DFB\u52A0\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5728config-js\u4E2D\u6DFB\u52A0\u914D\u7F6E" aria-hidden="true">#</a> \u5728config.js\u4E2D\u6DFB\u52A0\u914D\u7F6E</h3><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>defaultTheme<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;vuepress&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>searchPlugin<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">&#39;@vuepress/plugin-search&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    base<span class="token operator">:</span> <span class="token string">&#39;/myblog/&#39;</span><span class="token punctuation">,</span> <span class="token comment">// \u6CE8\u610Fbase\u914D\u7F6E\u4E0E\u9879\u76EE\u540D\u4E00\u81F4</span>
    lang<span class="token operator">:</span> <span class="token string">&#39;zh-CN&#39;</span><span class="token punctuation">,</span>
    title<span class="token operator">:</span> <span class="token string">&#39;\u549A\u549A\u549A&#39;</span><span class="token punctuation">,</span>
    description<span class="token operator">:</span> <span class="token string">&#39;\u549A\u549A\u549A\u7684blog\u7AD9\u70B9&#39;</span><span class="token punctuation">,</span>
    head<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>rel<span class="token operator">:</span> <span class="token string">&#39;icon&#39;</span><span class="token punctuation">,</span> href<span class="token operator">:</span> <span class="token string">&#39;https://vuejs.org/images/logo.png&#39;</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    theme<span class="token operator">:</span> <span class="token function">defaultTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// \u9ED8\u8BA4\u4E3B\u9898\u914D\u7F6E</span>
        navbar<span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                text<span class="token operator">:</span> <span class="token string">&#39;\u524D\u7AEF\u6846\u67B6&#39;</span><span class="token punctuation">,</span>
                children<span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        text<span class="token operator">:</span> <span class="token string">&#39;vue\u5F00\u53D1&#39;</span><span class="token punctuation">,</span>
                        link<span class="token operator">:</span> <span class="token string">&#39;/frontEnd/vue/workApply.md&#39;</span><span class="token punctuation">,</span>
                        activeMatch<span class="token operator">:</span> <span class="token string">&#39;^/foo&#39;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        text<span class="token operator">:</span> <span class="token string">&#39;\u5C0F\u7A0B\u5E8F&#39;</span><span class="token punctuation">,</span>
                        link<span class="token operator">:</span> <span class="token string">&#39;/not-foo/&#39;</span><span class="token punctuation">,</span>
                        activeMatch<span class="token operator">:</span> <span class="token string">&#39;^/foo/&#39;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        text<span class="token operator">:</span> <span class="token string">&#39;php\u539F\u751F&#39;</span><span class="token punctuation">,</span>
                        link<span class="token operator">:</span> <span class="token string">&#39;/not-foo/&#39;</span><span class="token punctuation">,</span>
                        activeMatch<span class="token operator">:</span> <span class="token string">&#39;^/foo/&#39;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    logo<span class="token operator">:</span> <span class="token string">&#39;https://vuejs.org/images/logo.png&#39;</span><span class="token punctuation">,</span>
    repo<span class="token operator">:</span> <span class="token string">&#39;https://github.com/HaiDong-Once&#39;</span><span class="token punctuation">,</span>
    repoLabel<span class="token operator">:</span> <span class="token string">&#39;gitHub&#39;</span><span class="token punctuation">,</span>
    sidebar<span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token function">searchPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token comment">// \u914D\u7F6E\u9879</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E\u9996\u9875\u6837\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u9996\u9875\u6837\u5F0F" aria-hidden="true">#</a> \u914D\u7F6E\u9996\u9875\u6837\u5F0F</h3><ul><li><code>docs</code>\u2014\u2014&gt;<code>md</code> \u4E3A\u535A\u5BA2\u9996\u9875</li></ul><p><img src="`+r+`" alt="\u56FE\u7247"></p><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">heroText</span><span class="token punctuation">:</span> welcome \u549A\u549A\u549A blog
<span class="token key atrule">tagline</span><span class="token punctuation">:</span> \u60F3\u6211\u6240\u60F3\uFF0C\u5C3D\u6211\u6240\u80FD;
<span class="token key atrule">actions</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> \u67E5\u770B\u6700\u8FD1\u66F4\u65B0
  <span class="token key atrule">link</span><span class="token punctuation">:</span> /frontEnd/vue/workApply.md
  <span class="token key atrule">type</span><span class="token punctuation">:</span> primary
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//vuejs.org/images/logo.png
<span class="token key atrule">features</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Calm
  <span class="token key atrule">details</span><span class="token punctuation">:</span> \u8BF7\u8D50\u6211\u5E73\u9759<span class="token punctuation">,</span> \u53BB\u63A5\u53D7\u6211\u65E0\u6CD5\u6539\u53D8\u7684\u4E8B;
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Courage
  <span class="token key atrule">details</span><span class="token punctuation">:</span> \u8BF7\u8D50\u6211\u52C7\u6C14<span class="token punctuation">,</span> \u53BB\u505A\u6211\u80FD\u6539\u53D8\u7684\u4E8B;
<span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Wisdom
  <span class="token key atrule">details</span><span class="token punctuation">:</span> \u8BF7\u8D50\u6211\u667A\u6167<span class="token punctuation">,</span> \u53BB\u5206\u8FA8\u4E24\u8005\u7684\u4E0D\u540C;
  <span class="token key atrule">footer</span><span class="token punctuation">:</span> MIT Licensed <span class="token punctuation">|</span> Copyright \xA9 2018<span class="token punctuation">-</span>present Evan You</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E\u81EA\u52A8\u90E8\u7F72\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u81EA\u52A8\u90E8\u7F72\u811A\u672C" aria-hidden="true">#</a> \u914D\u7F6E\u81EA\u52A8\u90E8\u7F72\u811A\u672C</h3><ul><li>\u5728\u6839\u76EE\u5F55\u4E0B\u65B0\u5EFA<code>scripts</code>\u2014\u2014&gt;<code>deploy-gh.sh</code></li></ul><p><img src="`+d+`" alt="\u56FE\u7247"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u9879\u76EE\u90E8\u7F72\u811A\u672C\u914D\u7F6E</span>
<span class="token comment">#!/usr/bin/env sh</span>

<span class="token comment"># \u786E\u4FDD\u811A\u672C\u629B\u51FA\u9047\u5230\u7684\u9519\u8BEF</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># \u751F\u6210\u9759\u6001\u6587\u4EF6</span>
<span class="token function">yarn</span> run build

<span class="token comment"># \u8FDB\u5165\u751F\u6210\u7684\u6587\u4EF6\u5939</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># \u5982\u679C\u662F\u53D1\u5E03\u5230\u81EA\u5B9A\u4E49\u57DF\u540D</span>
<span class="token comment"># echo &#39;www.example.com&#39; &gt; CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">&#39;deploy&#39;</span>

<span class="token comment"># \u5982\u679C\u53D1\u5E03\u5230 https://&lt;USERNAME&gt;.github.io</span>
<span class="token comment">#git push -f git@github.com:HaiDong-Once/HaiDong-Once.github.io.git master</span>

<span class="token comment"># \u5982\u679C\u53D1\u5E03\u5230 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span>

<span class="token comment"># \u628A\u4E0A\u9762\u7684 &lt;USERNAME&gt; \u6362\u6210\u4F60\u81EA\u5DF1\u7684 Github \u7528\u6237\u540D\uFF0C&lt;REPO&gt; \u6362\u6210\u4ED3\u5E93\u540D\uFF0C</span>
 <span class="token function">git</span> push -f https://github.com/HaiDong-Once/myblog.git master:gh-pages

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E\u6267\u884C\u90E8\u7F72\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6267\u884C\u90E8\u7F72\u811A\u672C" aria-hidden="true">#</a> \u914D\u7F6E\u6267\u884C\u90E8\u7F72\u811A\u672C</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;deploy&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./scripts/deploy-gh.sh&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6267\u884C\u90E8\u7F72\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C\u90E8\u7F72\u547D\u4EE4" aria-hidden="true">#</a> \u6267\u884C\u90E8\u7F72\u547D\u4EE4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> run deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u914D\u7F6Egithub-page" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6Egithub-page" aria-hidden="true">#</a> \u914D\u7F6Egithub page</h3><ul><li>\u9700\u8981\u5F00\u653Egithub\u9879\u76EE</li></ul><p><img src="`+v+'" alt="\u56FE\u7247"></p><p><img src="'+k+'" alt="\u56FE\u7247"></p><p><img src="'+m+'" alt="\u56FE\u7247"></p><h3 id="\u6700\u7EC8\u6548\u679C" tabindex="-1"><a class="header-anchor" href="#\u6700\u7EC8\u6548\u679C" aria-hidden="true">#</a> \u6700\u7EC8\u6548\u679C</h3><p><img src="'+g+'" alt="\u56FE\u7247"></p>',43);function O(P,D){const a=l("RouterLink");return p(),o("div",null,[h,n("nav",f,[n("ul",null,[n("li",null,[e(a,{to:"#vuepress\u642D\u5EFA\u535A\u5BA2"},{default:t(()=>[_]),_:1}),n("ul",null,[n("li",null,[e(a,{to:"#\u4F9D\u8D56\u73AF\u5883"},{default:t(()=>[y]),_:1})]),n("li",null,[e(a,{to:"#\u624B\u52A8\u5B89\u88C5"},{default:t(()=>[x]),_:1})]),n("li",null,[e(a,{to:"#\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55"},{default:t(()=>[q]),_:1})]),n("li",null,[e(a,{to:"#\u5728config-js\u4E2D\u6DFB\u52A0\u914D\u7F6E"},{default:t(()=>[E]),_:1})]),n("li",null,[e(a,{to:"#\u914D\u7F6E\u9996\u9875\u6837\u5F0F"},{default:t(()=>[j]),_:1})]),n("li",null,[e(a,{to:"#\u914D\u7F6E\u81EA\u52A8\u90E8\u7F72\u811A\u672C"},{default:t(()=>[w]),_:1})]),n("li",null,[e(a,{to:"#\u914D\u7F6E\u6267\u884C\u90E8\u7F72\u811A\u672C"},{default:t(()=>[M]),_:1})]),n("li",null,[e(a,{to:"#\u6267\u884C\u90E8\u7F72\u547D\u4EE4"},{default:t(()=>[N]),_:1})]),n("li",null,[e(a,{to:"#\u914D\u7F6Egithub-page"},{default:t(()=>[R]),_:1})]),n("li",null,[e(a,{to:"#\u6700\u7EC8\u6548\u679C"},{default:t(()=>[A]),_:1})])])])])]),C])}var V=i(b,[["render",O],["__file","vuepress.html.vue"]]);export{V as default};