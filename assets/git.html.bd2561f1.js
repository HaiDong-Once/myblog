import{_ as t,r as c,o as l,c as o,a as n,b as i,w as e,d as s,e as p}from"./app.34716fdc.js";var d="/myblog/images/frontEnd/img_25.png",u="/myblog/images/frontEnd/img_26.png";const r={},m=n("h1",{id:"git\u5DE5\u4F5C\u6D41",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#git\u5DE5\u4F5C\u6D41","aria-hidden":"true"},"#"),s(" git\u5DE5\u4F5C\u6D41")],-1),v={class:"table-of-contents"},b=s("\u4E00\u3001git\u5E38\u7528\u529E\u516C\u64CD\u4F5C\u6D41\u7A0B"),k=s("\u4E8C\u3001git\u4E0Esvn\u8BE6\u89E3"),h=s("Git vs Svn"),g=s("Git\u6838\u5FC3\u601D\u60F3"),f=s("Git-SVN\u5E38\u7528\u547D\u4EE4"),_=s("\u521D\u59CB\u5316"),$=s("\u914D\u7F6E"),x=s("\u589E\u5220\u6587\u4EF6"),G=s("\u5206\u652F"),y=s("\u63D0\u4EA4"),N=s("\u62C9\u53D6"),V=s("\u64A4\u9500"),S=s("\u67E5\u8BE2"),q=p('<p><img src="'+d+`" alt="\u56FE\u7247"></p><h2 id="\u4E00\u3001git\u5E38\u7528\u529E\u516C\u64CD\u4F5C\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001git\u5E38\u7528\u529E\u516C\u64CD\u4F5C\u6D41\u7A0B" aria-hidden="true">#</a> \u4E00\u3001git\u5E38\u7528\u529E\u516C\u64CD\u4F5C\u6D41\u7A0B</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u62C9\u53D6\u8FDC\u7A0B\u4EE3\u7801\uFF1Agit clone \uFF08\u8FDC\u7A0B\u5730\u5740\uFF09
git\u66F4\u65B0\u4EE3\u7801 \uFF1A <span class="token function">git</span> pull --rebase origin master
\u521B\u5EFA\u5206\u652F\uFF1Agit branch issues999
\u5207\u6362\u5206\u652F\uFF1Agit checkout issue999
\u63D0\u4EA4\u5206\u652F\u5230\u8FDC\u7A0B\uFF1Agit push
git\u68C0\u67E5\u8981\u63D0\u4EA4\u7684\u5185\u5BB9:git status 
\u6DFB\u52A0\u4EE3\u7801\uFF1A <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
\u518D\u6B21\u68C0\u67E5\uFF1Agit status 
\u63D0\u4EA4\u4EE3\u7801\u5230\u5206\u652F:git commit -m <span class="token string">&quot;dev_test&quot;</span>
\u63A8\u9001\u5206\u652F\u5230\u8FDC\u7A0B\uFF1Agit push
\u4FEE\u6539\u4EE3\u7801\u540E\uFF0C\u63D0\u4EA4\u518D\u6B21git commit -m <span class="token string">&quot;&quot;</span>
\u64A4\u9500\uFF0C\u56DE\u9000\uFF0C\u64A4\u56DE\u4E0A\u4E00\u6B21add,commit:  <span class="token function">git</span> reset --soft HEAD~
\u518D\u6B21\u63A8\u9001\u5230\u8FDC\u7A0B\uFF1Agit push
\u64A4\u9500\uFF1Agit push\u65B9\u6CD5\uFF1A
\u672C\u5730reset\u5230\u65E0\u95EE\u9898commit\uFF1Agit reset --hard <span class="token operator">&lt;</span>\u7248\u672C\u53F7<span class="token operator">&gt;</span>
push\u5230\u76F8\u5E94\u5206\u652F\u5E76\u8986\u76D6\uFF1Agit push origin <span class="token operator">&lt;</span>\u5206\u652F\u540D<span class="token operator">&gt;</span>  --force
\u53D1\u9001\u4FEE\u6539\u597D\u7684\u5206\u652F\u5730\u5740\u7ED9\u6D4B\u8BD5\u4EBA\u5458 
\u5206\u652F\u4EE3\u7801\u5408\u5E76\u5230\u672C\u5730\u4E3B\u5E72\u5728gitLab\u64CD\u4F5C
\u63D0\u4EA4\u672C\u5730\u4E3B\u5E72\u4EE3\u7801\u5230\u8FDC\u7A0B\u4E3B\u5E72git commit -m\u3001git push
\u5207\u6362\u5230\u4E3B\u5E72 <span class="token function">git</span> checkout <span class="token string">&quot;\u5206\u652F\u540D&quot;</span>
\u66F4\u65B0\u4E3B\u5E72\u4EE3\u7801 <span class="token function">git</span> pull
bulid\u5230\u4E3B\u5E72\u4EE3\u7801 <span class="token function">npm</span> run bulid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E8C\u3001git\u4E0Esvn\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001git\u4E0Esvn\u8BE6\u89E3" aria-hidden="true">#</a> \u4E8C\u3001git\u4E0Esvn\u8BE6\u89E3</h2><h3 id="git-vs-svn" tabindex="-1"><a class="header-anchor" href="#git-vs-svn" aria-hidden="true">#</a> Git vs Svn</h3><h4 id="git\u662F\u5206\u5E03\u5F0F\u7684-svn\u662F\u96C6\u4E2D\u5F0F\u7684" tabindex="-1"><a class="header-anchor" href="#git\u662F\u5206\u5E03\u5F0F\u7684-svn\u662F\u96C6\u4E2D\u5F0F\u7684" aria-hidden="true">#</a> Git\u662F\u5206\u5E03\u5F0F\u7684\uFF0CSVN\u662F\u96C6\u4E2D\u5F0F\u7684\uFF1A</h4><ul><li>\u8FD9\u662F Git \u548C SVN \u6700\u5927\u7684\u533A\u522B\u3002</li><li>\u56E0\u4E3A Git \u662F\u5206\u5E03\u5F0F\u7684\uFF0C\u6240\u4EE5 Git \u652F\u6301\u79BB\u7EBF\u5DE5\u4F5C\uFF0C\u5728\u672C\u5730\u53EF\u4EE5\u8FDB\u884C\u5F88\u591A\u64CD\u4F5C\uFF0C\u5305\u62EC\u5206\u652F\u529F\u80FD\u3002</li><li>\u800C SVN \u5FC5\u987B\u8054\u7F51\u624D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</li></ul><h3 id="git\u6838\u5FC3\u601D\u60F3" tabindex="-1"><a class="header-anchor" href="#git\u6838\u5FC3\u601D\u60F3" aria-hidden="true">#</a> Git\u6838\u5FC3\u601D\u60F3</h3><h4 id="git-\u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002" tabindex="-1"><a class="header-anchor" href="#git-\u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002" aria-hidden="true">#</a> Git \u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002</h4><ul><li>\u5DE5\u4F5C\u533A(Workspace)\u662F\u7535\u8111\u4E2D\u5B9E\u9645\u7684\u76EE\u5F55\u3002</li><li>\u6682\u5B58\u533A(Index)\u7C7B\u4F3C\u4E8E\u7F13\u5B58\u533A\u57DF\uFF0C\u4E34\u65F6\u4FDD\u5B58\u4F60\u7684\u6539\u52A8\u3002</li><li>\u4ED3\u5E93\u533A(Repository)\uFF0C\u5206\u4E3A\u672C\u5730\u4ED3\u5E93\u548C\u8FDC\u7A0B\u4ED3\u5E93\u3002</li></ul><h4 id="git-\u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002-1" tabindex="-1"><a class="header-anchor" href="#git-\u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002-1" aria-hidden="true">#</a> Git \u6700\u6838\u5FC3\u7684\u4E00\u4E2A\u6982\u5FF5\u5C31\u662F\u5DE5\u4F5C\u6D41\u3002</h4><ul><li><code>git add</code>\u4ECE\u5DE5\u4F5C\u533A\u63D0\u4EA4\u5230\u6682\u5B58\u533A</li><li><code>git commit</code>\u4ECE\u6682\u5B58\u533A\u63D0\u4EA4\u5230\u672C\u5730\u4ED3\u5E93</li><li><code>git push</code>\u6216<code>git svn commit</code>\u4ECE\u672C\u5730\u4ED3\u5E93\u63D0\u4EA4\u5230\u8FDC\u7A0B\u4ED3\u5E93</li><li><img src="`+u+`" alt="\u56FE\u7247"></li></ul><h3 id="git-svn\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#git-svn\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> Git-SVN\u5E38\u7528\u547D\u4EE4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4E0B\u8F7D\u4E00\u4E2A SVN \u9879\u76EE\u548C\u5B83\u7684\u6574\u4E2A\u4EE3\u7801\u5386\u53F2\uFF0C\u5E76\u521D\u59CB\u5316\u4E3A Git \u4EE3\u7801\u5E93</span>
$ <span class="token function">git</span> svn clone -s <span class="token punctuation">[</span>repository<span class="token punctuation">]</span>

<span class="token comment"># \u67E5\u770B\u5F53\u524D\u7248\u672C\u5E93\u60C5\u51B5</span>
$ <span class="token function">git</span> svn info

<span class="token comment"># \u53D6\u56DE\u8FDC\u7A0B\u4ED3\u5E93\u6240\u6709\u5206\u652F\u7684\u53D8\u5316</span>
$ <span class="token function">git</span> svn fetch

<span class="token comment"># \u53D6\u56DE\u8FDC\u7A0B\u4ED3\u5E93\u5F53\u524D\u5206\u652F\u7684\u53D8\u5316\uFF0C\u5E76\u4E0E\u672C\u5730\u5206\u652F\u53D8\u57FA\u5408\u5E76</span>
$ <span class="token function">git</span> svn rebase 

<span class="token comment"># \u4E0A\u4F20\u5F53\u524D\u5206\u652F\u7684\u672C\u5730\u4ED3\u5E93\u5230\u8FDC\u7A0B\u4ED3\u5E93</span>
$ <span class="token function">git</span> svn dcommit

<span class="token comment"># \u62C9\u53D6\u65B0\u5206\u652F\uFF0C\u5E76\u63D0\u4EA4\u5230\u8FDC\u7A0B\u4ED3\u5E93</span>
$ svn copy <span class="token punctuation">[</span>remote_branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>new_remote_branch<span class="token punctuation">]</span> -m <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># \u521B\u5EFA\u8FDC\u7A0B\u5206\u652F\u5BF9\u5E94\u7684\u672C\u5730\u5206\u652F</span>
$ <span class="token function">git</span> checkout -b <span class="token punctuation">[</span>local_branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote_branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316" aria-hidden="true">#</a> \u521D\u59CB\u5316</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728\u5F53\u524D\u76EE\u5F55\u65B0\u5EFA\u4E00\u4E2AGit\u4EE3\u7801\u5E93</span>
$ <span class="token function">git</span> init

<span class="token comment"># \u4E0B\u8F7D\u4E00\u4E2A\u9879\u76EE\u548C\u5B83\u7684\u6574\u4E2A\u4EE3\u7801\u5386\u53F2 [Git only]</span>
$ <span class="token function">git</span> clone <span class="token punctuation">[</span>url<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5217\u4E3E\u6240\u6709\u914D\u7F6E</span>
$ <span class="token function">git</span> config -l

<span class="token comment"># \u4E3A\u547D\u4EE4\u914D\u7F6E\u522B\u540D</span>
$ <span class="token function">git</span> config --global alias.co checkout
$ <span class="token function">git</span> config --global alias.ci commit
$ <span class="token function">git</span> config --global alias.st status
$ <span class="token function">git</span> config --global alias.br branch

<span class="token comment"># \u8BBE\u7F6E\u63D0\u4EA4\u4EE3\u7801\u65F6\u7684\u7528\u6237\u4FE1\u606F</span>
$ <span class="token function">git</span> config <span class="token punctuation">[</span>--global<span class="token punctuation">]</span> user.name <span class="token string">&quot;[name]&quot;</span>
$ <span class="token function">git</span> config <span class="token punctuation">[</span>--global<span class="token punctuation">]</span> user.email <span class="token string">&quot;[email address]&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u589E\u5220\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u589E\u5220\u6587\u4EF6" aria-hidden="true">#</a> \u589E\u5220\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6DFB\u52A0\u5F53\u524D\u76EE\u5F55\u7684\u6240\u6709\u6587\u4EF6\u5230\u6682\u5B58\u533A</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># \u6DFB\u52A0\u6307\u5B9A\u6587\u4EF6\u5230\u6682\u5B58\u533A</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>file<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token operator">&lt;</span>file<span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span> <span class="token punctuation">..</span>.

<span class="token comment"># \u6DFB\u52A0\u6307\u5B9A\u76EE\u5F55\u5230\u6682\u5B58\u533A\uFF0C\u5305\u62EC\u5176\u5B50\u76EE\u5F55</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>dir<span class="token operator">&gt;</span>

<span class="token comment"># \u5220\u9664\u5DE5\u4F5C\u533A\u6587\u4EF6\uFF0C\u5E76\u4E14\u5C06\u8FD9\u6B21\u5220\u9664\u653E\u5165\u6682\u5B58\u533A</span>
$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>.

<span class="token comment"># \u505C\u6B62\u8FFD\u8E2A\u6307\u5B9A\u6587\u4EF6\uFF0C\u4F46\u8BE5\u6587\u4EF6\u4F1A\u4FDD\u7559\u5728\u5DE5\u4F5C\u533A</span>
$ <span class="token function">git</span> <span class="token function">rm</span> --cached <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># \u6539\u540D\u6587\u4EF6\uFF0C\u5E76\u4E14\u5C06\u8FD9\u4E2A\u6539\u540D\u653E\u5165\u6682\u5B58\u533A</span>
$ <span class="token function">git</span> <span class="token function">mv</span> <span class="token punctuation">[</span>file-original<span class="token punctuation">]</span> <span class="token punctuation">[</span>file-renamed<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5206\u652F" tabindex="-1"><a class="header-anchor" href="#\u5206\u652F" aria-hidden="true">#</a> \u5206\u652F</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5217\u51FA\u6240\u6709\u672C\u5730\u5206\u652F</span>
$ <span class="token function">git</span> branch

<span class="token comment"># \u5217\u51FA\u6240\u6709\u672C\u5730\u5206\u652F\u548C\u8FDC\u7A0B\u5206\u652F</span>
$ <span class="token function">git</span> branch -a

<span class="token comment"># \u65B0\u5EFA\u4E00\u4E2A\u5206\u652F\uFF0C\u4F46\u4F9D\u7136\u505C\u7559\u5728\u5F53\u524D\u5206\u652F</span>
$ <span class="token function">git</span> branch <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># \u65B0\u5EFA\u4E00\u4E2A\u5206\u652F\uFF0C\u5E76\u5207\u6362\u5230\u8BE5\u5206\u652F</span>
$ <span class="token function">git</span> checkout -b <span class="token punctuation">[</span>new_branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote-branch<span class="token punctuation">]</span>

<span class="token comment"># \u5207\u6362\u5230\u6307\u5B9A\u5206\u652F\uFF0C\u5E76\u66F4\u65B0\u5DE5\u4F5C\u533A</span>
$ <span class="token function">git</span> checkout <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># \u5408\u5E76\u6307\u5B9A\u5206\u652F\u5230\u5F53\u524D\u5206\u652F</span>
$ <span class="token function">git</span> merge <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># \u9009\u62E9\u4E00\u4E2A commit\uFF0C\u5408\u5E76\u8FDB\u5F53\u524D\u5206\u652F</span>
$ <span class="token function">git</span> cherry-pick <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># \u5220\u9664\u672C\u5730\u5206\u652F\uFF0C-D \u53C2\u6570\u5F3A\u5236\u5220\u9664\u5206\u652F</span>
$ <span class="token function">git</span> branch -d <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># \u5220\u9664\u8FDC\u7A0B\u5206\u652F</span>
$ <span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> :<span class="token punctuation">[</span>remote-branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u63D0\u4EA4" tabindex="-1"><a class="header-anchor" href="#\u63D0\u4EA4" aria-hidden="true">#</a> \u63D0\u4EA4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u63D0\u4EA4\u6682\u5B58\u533A\u5230\u4ED3\u5E93\u533A</span>
$ <span class="token function">git</span> commit -m <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># \u63D0\u4EA4\u5DE5\u4F5C\u533A\u4E0E\u6682\u5B58\u533A\u7684\u53D8\u5316\u76F4\u63A5\u5230\u4ED3\u5E93\u533A</span>
$ <span class="token function">git</span> commit -a

<span class="token comment"># \u63D0\u4EA4\u65F6\u663E\u793A\u6240\u6709 diff \u4FE1\u606F</span>
$ <span class="token function">git</span> commit -v

<span class="token comment"># \u63D0\u4EA4\u6682\u5B58\u533A\u4FEE\u6539\u5230\u4ED3\u5E93\u533A\uFF0C\u5408\u5E76\u5230\u4E0A\u6B21\u4FEE\u6539\uFF0C\u5E76\u4FEE\u6539\u4E0A\u6B21\u7684\u63D0\u4EA4\u4FE1\u606F</span>
$ <span class="token function">git</span> commit --amend -m <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># \u4E0A\u4F20\u672C\u5730\u6307\u5B9A\u5206\u652F\u5230\u8FDC\u7A0B\u4ED3\u5E93</span>
$ <span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote-branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#\u62C9\u53D6" aria-hidden="true">#</a> \u62C9\u53D6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4E0B\u8F7D\u8FDC\u7A0B\u4ED3\u5E93\u7684\u6240\u6709\u53D8\u52A8 (Git only)</span>
$ <span class="token function">git</span> fetch <span class="token punctuation">[</span>remote<span class="token punctuation">]</span>

<span class="token comment"># \u663E\u793A\u6240\u6709\u8FDC\u7A0B\u4ED3\u5E93 (Git only)</span>
$ <span class="token function">git</span> remote -v

<span class="token comment"># \u663E\u793A\u67D0\u4E2A\u8FDC\u7A0B\u4ED3\u5E93\u7684\u4FE1\u606F (Git only)</span>
$ <span class="token function">git</span> remote show <span class="token punctuation">[</span>remote<span class="token punctuation">]</span>

<span class="token comment"># \u589E\u52A0\u4E00\u4E2A\u65B0\u7684\u8FDC\u7A0B\u4ED3\u5E93\uFF0C\u5E76\u547D\u540D (Git only)</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> <span class="token punctuation">[</span>remote-name<span class="token punctuation">]</span> <span class="token punctuation">[</span>url<span class="token punctuation">]</span>

<span class="token comment"># \u53D6\u56DE\u8FDC\u7A0B\u4ED3\u5E93\u7684\u53D8\u5316\uFF0C\u5E76\u4E0E\u672C\u5730\u5206\u652F\u5408\u5E76\uFF0C(Git only), \u82E5\u4F7F\u7528 Git-SVN\uFF0C\u8BF7\u67E5\u770B\u7B2C\u4E09\u8282</span>
$ <span class="token function">git</span> pull <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># \u53D6\u56DE\u8FDC\u7A0B\u4ED3\u5E93\u7684\u53D8\u5316\uFF0C\u5E76\u4E0E\u672C\u5730\u5206\u652F\u53D8\u57FA\u5408\u5E76\uFF0C(Git only), \u82E5\u4F7F\u7528 Git-SVN\uFF0C\u8BF7\u67E5\u770B\u7B2C\u4E09\u8282</span>
$ <span class="token function">git</span> pull --rebase <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u64A4\u9500" tabindex="-1"><a class="header-anchor" href="#\u64A4\u9500" aria-hidden="true">#</a> \u64A4\u9500</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6062\u590D\u6682\u5B58\u533A\u7684\u6307\u5B9A\u6587\u4EF6\u5230\u5DE5\u4F5C\u533A</span>
$ <span class="token function">git</span> checkout <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># \u6062\u590D\u6682\u5B58\u533A\u5F53\u524D\u76EE\u5F55\u7684\u6240\u6709\u6587\u4EF6\u5230\u5DE5\u4F5C\u533A</span>
$ <span class="token function">git</span> checkout <span class="token builtin class-name">.</span>

<span class="token comment"># \u6062\u590D\u5DE5\u4F5C\u533A\u5230\u6307\u5B9A commit</span>
$ <span class="token function">git</span> checkout <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># \u91CD\u7F6E\u6682\u5B58\u533A\u7684\u6307\u5B9A\u6587\u4EF6\uFF0C\u4E0E\u4E0A\u4E00\u6B21 commit \u4FDD\u6301\u4E00\u81F4\uFF0C\u4F46\u5DE5\u4F5C\u533A\u4E0D\u53D8</span>
$ <span class="token function">git</span> reset <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># \u91CD\u7F6E\u6682\u5B58\u533A\u4E0E\u5DE5\u4F5C\u533A\uFF0C\u4E0E\u4E0A\u4E00\u6B21 commit \u4FDD\u6301\u4E00\u81F4</span>
$ <span class="token function">git</span> reset --hard

<span class="token comment"># \u91CD\u7F6E\u5F53\u524D\u5206\u652F\u7684\u6307\u9488\u4E3A\u6307\u5B9A commit\uFF0C\u540C\u65F6\u91CD\u7F6E\u6682\u5B58\u533A\uFF0C\u4F46\u5DE5\u4F5C\u533A\u4E0D\u53D8</span>
$ <span class="token function">git</span> reset <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># \u91CD\u7F6E\u5F53\u524D\u5206\u652F\u7684HEAD\u4E3A\u6307\u5B9A commit\uFF0C\u540C\u65F6\u91CD\u7F6E\u6682\u5B58\u533A\u548C\u5DE5\u4F5C\u533A\uFF0C\u4E0E\u6307\u5B9A commit \u4E00\u81F4</span>
$ <span class="token function">git</span> reset --hard <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># \u65B0\u5EFA\u4E00\u4E2A commit\uFF0C\u7528\u4E8E\u64A4\u9500\u6307\u5B9A commit</span>
$ <span class="token function">git</span> revert <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># \u5C06\u672A\u63D0\u4EA4\u7684\u53D8\u5316\u653E\u5728\u50A8\u85CF\u533A</span>
$ <span class="token function">git</span> stash

<span class="token comment"># \u5C06\u50A8\u85CF\u533A\u7684\u5185\u5BB9\u6062\u590D\u5230\u5F53\u524D\u5DE5\u4F5C\u533A</span>
$ <span class="token function">git</span> stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2" aria-hidden="true">#</a> \u67E5\u8BE2</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u5DE5\u4F5C\u533A\u6587\u4EF6\u4FEE\u6539\u72B6\u6001</span>
$ <span class="token function">git</span> status               

<span class="token comment"># \u67E5\u770B\u5DE5\u4F5C\u533A\u6587\u4EF6\u4FEE\u6539\u5177\u4F53\u5185\u5BB9   </span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># \u67E5\u770B\u6682\u5B58\u533A\u6587\u4EF6\u4FEE\u6539\u5185\u5BB9</span>
$ <span class="token function">git</span> <span class="token function">diff</span> --cached <span class="token punctuation">[</span>file<span class="token punctuation">]</span> 

<span class="token comment"># \u67E5\u770B\u7248\u672C\u5E93\u4FEE\u6539\u8BB0\u5F55</span>
$ <span class="token function">git</span> log                  

<span class="token comment"># \u67E5\u770B\u67D0\u4EBA\u63D0\u4EA4\u8BB0\u5F55</span>
$ <span class="token function">git</span> log --author<span class="token operator">=</span>someone 

<span class="token comment"># \u67E5\u770B\u67D0\u4E2A\u6587\u4EF6\u7684\u5386\u53F2\u5177\u4F53\u4FEE\u6539\u5185\u5BB9</span>
$ <span class="token function">git</span> log -p <span class="token punctuation">[</span>file<span class="token punctuation">]</span>        

<span class="token comment"># \u67E5\u770B\u67D0\u6B21\u63D0\u4EA4\u5177\u4F53\u4FEE\u6539\u5185\u5BB9</span>
$ <span class="token function">git</span> show <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30);function w(E,B){const a=c("RouterLink");return l(),o("div",null,[m,n("nav",v,[n("ul",null,[n("li",null,[i(a,{to:"#\u4E00\u3001git\u5E38\u7528\u529E\u516C\u64CD\u4F5C\u6D41\u7A0B"},{default:e(()=>[b]),_:1})]),n("li",null,[i(a,{to:"#\u4E8C\u3001git\u4E0Esvn\u8BE6\u89E3"},{default:e(()=>[k]),_:1}),n("ul",null,[n("li",null,[i(a,{to:"#git-vs-svn"},{default:e(()=>[h]),_:1})]),n("li",null,[i(a,{to:"#git\u6838\u5FC3\u601D\u60F3"},{default:e(()=>[g]),_:1})]),n("li",null,[i(a,{to:"#git-svn\u5E38\u7528\u547D\u4EE4"},{default:e(()=>[f]),_:1})]),n("li",null,[i(a,{to:"#\u521D\u59CB\u5316"},{default:e(()=>[_]),_:1})]),n("li",null,[i(a,{to:"#\u914D\u7F6E"},{default:e(()=>[$]),_:1})]),n("li",null,[i(a,{to:"#\u589E\u5220\u6587\u4EF6"},{default:e(()=>[x]),_:1})]),n("li",null,[i(a,{to:"#\u5206\u652F"},{default:e(()=>[G]),_:1})]),n("li",null,[i(a,{to:"#\u63D0\u4EA4"},{default:e(()=>[y]),_:1})]),n("li",null,[i(a,{to:"#\u62C9\u53D6"},{default:e(()=>[N]),_:1})]),n("li",null,[i(a,{to:"#\u64A4\u9500"},{default:e(()=>[V]),_:1})]),n("li",null,[i(a,{to:"#\u67E5\u8BE2"},{default:e(()=>[S]),_:1})])])])])]),q])}var L=t(r,[["render",w],["__file","git.html.vue"]]);export{L as default};
