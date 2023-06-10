
# git工作流
[[toc]]

![图片](/images/frontEnd/img_25.png)

## 一、git常用办公操作流程

```shell
拉取远程代码：git clone （远程地址）
git更新代码 ： git pull --rebase origin master
创建分支：git branch issues999
切换分支：git checkout issue999
提交分支到远程：git push
git检查要提交的内容:git status 
添加代码： git add .
再次检查：git status 
提交代码到分支:git commit -m "dev_test"
推送分支到远程：git push
修改代码后，提交再次git commit -m ""
撤销，回退，撤回上一次add,commit:  git reset --soft HEAD~
再次推送到远程：git push
撤销：git push方法：
本地reset到无问题commit：git reset --hard <版本号>
push到相应分支并覆盖：git push origin <分支名>  --force
发送修改好的分支地址给测试人员 
分支代码合并到本地主干在gitLab操作
提交本地主干代码到远程主干git commit -m、git push
切换到主干 git checkout "分支名"
更新主干代码 git pull
bulid到主干代码 npm run bulid
```



## 二、git与svn详解

### Git vs Svn
#### Git是分布式的，SVN是集中式的：
- 这是 Git 和 SVN 最大的区别。
- 因为 Git 是分布式的，所以 Git 支持离线工作，在本地可以进行很多操作，包括分支功能。
- 而 SVN 必须联网才能正常工作。

### Git核心思想
#### Git 最核心的一个概念就是工作流。
- 工作区(Workspace)是电脑中实际的目录。
- 暂存区(Index)类似于缓存区域，临时保存你的改动。
- 仓库区(Repository)，分为本地仓库和远程仓库。
#### Git 最核心的一个概念就是工作流。
- `git add`从工作区提交到暂存区
- `git commit`从暂存区提交到本地仓库
- `git push`或`git svn commit`从本地仓库提交到远程仓库
- ![图片](/images/frontEnd/img_26.png)

### Git-SVN常用命令
```shell
# 下载一个 SVN 项目和它的整个代码历史，并初始化为 Git 代码库
$ git svn clone -s [repository]

# 查看当前版本库情况
$ git svn info

# 取回远程仓库所有分支的变化
$ git svn fetch

# 取回远程仓库当前分支的变化，并与本地分支变基合并
$ git svn rebase 

# 上传当前分支的本地仓库到远程仓库
$ git svn dcommit

# 拉取新分支，并提交到远程仓库
$ svn copy [remote_branch] [new_remote_branch] -m [message]

# 创建远程分支对应的本地分支
$ git checkout -b [local_branch] [remote_branch]
```

### 初始化
```shell
# 在当前目录新建一个Git代码库
$ git init

# 下载一个项目和它的整个代码历史 [Git only]
$ git clone [url]
```

### 配置
```shell
# 列举所有配置
$ git config -l

# 为命令配置别名
$ git config --global alias.co checkout
$ git config --global alias.ci commit
$ git config --global alias.st status
$ git config --global alias.br branch

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

### 增删文件
```shell
# 添加当前目录的所有文件到暂存区
$ git add .

# 添加指定文件到暂存区
$ git add <file1> <file2> ...

# 添加指定目录到暂存区，包括其子目录
$ git add <dir>

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

### 分支
```shell
# 列出所有本地分支
$ git branch

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [new_branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个 commit，合并进当前分支
$ git cherry-pick [commit]

# 删除本地分支，-D 参数强制删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push [remote] :[remote-branch]
```

### 提交
```shell
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交工作区与暂存区的变化直接到仓库区
$ git commit -a

# 提交时显示所有 diff 信息
$ git commit -v

# 提交暂存区修改到仓库区，合并到上次修改，并修改上次的提交信息
$ git commit --amend -m [message]

# 上传本地指定分支到远程仓库
$ git push [remote] [remote-branch]
```

### 拉取
```shell
# 下载远程仓库的所有变动 (Git only)
$ git fetch [remote]

# 显示所有远程仓库 (Git only)
$ git remote -v

# 显示某个远程仓库的信息 (Git only)
$ git remote show [remote]

# 增加一个新的远程仓库，并命名 (Git only)
$ git remote add [remote-name] [url]

# 取回远程仓库的变化，并与本地分支合并，(Git only), 若使用 Git-SVN，请查看第三节
$ git pull [remote] [branch]

# 取回远程仓库的变化，并与本地分支变基合并，(Git only), 若使用 Git-SVN，请查看第三节
$ git pull --rebase [remote] [branch]
```

### 撤销
```shell
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复暂存区当前目录的所有文件到工作区
$ git checkout .

# 恢复工作区到指定 commit
$ git checkout [commit]

# 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次 commit 保持一致
$ git reset --hard

# 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定 commit，同时重置暂存区和工作区，与指定 commit 一致
$ git reset --hard [commit]

# 新建一个 commit，用于撤销指定 commit
$ git revert [commit]

# 将未提交的变化放在储藏区
$ git stash

# 将储藏区的内容恢复到当前工作区
$ git stash pop
```

### 查询
```shell
# 查看工作区文件修改状态
$ git status               

# 查看工作区文件修改具体内容   
$ git diff [file]

# 查看暂存区文件修改内容
$ git diff --cached [file] 

# 查看版本库修改记录
$ git log                  

# 查看某人提交记录
$ git log --author=someone 

# 查看某个文件的历史具体修改内容
$ git log -p [file]        

# 查看某次提交具体修改内容
$ git show [commit]
```


## 三、gitHub配置SSH
### 生成ssh秘钥
- 打开git bash

```shell
ssh-keygen -t rsa
```

- 一路默认回车 然后进入用户目录的`.ssh`文件夹下，复制`rsa.pub`的内容 到`gitHub`的设置`ssh-key`

![图片](/images/frontEnd/other/git/img.png)

### 检查配置
```shell
ssh -T git@github.com
```

- 如果提示：`Hi defnngj You’ve successfully authenticated, but GitHub does not provide shell access`. 说明你连接成功了



## 四、git配置忽略提交文件
### git配置忽略文件
- 根目录新建文件：.gitignore， 配置忽略文件

```shell
node_modules
.temp
.cache
```

### webstorm配置忽略提交文件
- `file`——`setting`——`editor`——`File Types`——`Ignored Files and Folders`添加忽略文件

![图片](/images/frontEnd/other/git/img_1.png)



## 五、github连接失败问题

### 报错内容
```shell
fatal: unable to access 'https://github.com/HaiDong-Once/personal-code.git/'
: Failed to connect to github.com port 443 after 21091 ms: Timed out
```

- 此情况网页可以正常打开Github，但是无法通过Git连接Github。而在电脑上运行了代理程序或使用了其他代理手段导致的。

### 方法一：配置 http 代理
- Windows 中 git 默认不会使用系统代理，所以即使连接代理或者打开代理软件，浏览器仍然可以访问 GitHub 或 Gitee；
- 但是使用 git 命令行连接 GitHub 或 Gitee 远程仓库可能会出现无法访问的现象。通过为 git 配置代理解决出现的问题。
```shell
# 以下 host:port 指定是你当前代理使用的主机及端口号。例如：localhost:7890、127.0.0.1:7890 等

# 配置socks5代理
git config --global http.proxy socks5 host:port
git config --global https.proxy socks5 host:port

# 配置http代理
git config --global http.proxy host:port
git config --global https.proxy host:port
```

#### 注意事项：
- 命令中的主机号(host)是使用的代理的主机号，如果代理软件运行在本机则填入127.0.0.1即可，否则填入代理主机 ip
- 命令中的端口号为代理软件或代理主机的监听IP，可以从代理服务器配置中获得
- socks5和http两种协议由使用的代理软件决定，不同软件对这两种协议的支持有差异，如果不确定可以都尝试一下

#### 查看代理命令：
```shell
git config --global --get http.proxy
git config --global --get https.proxy
```

#### 取消代理命令:
```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

- 参考连接: [https://toflying.com/2022/07/03/2-git-connect-github-with-errors/](https://toflying.com/2022/07/03/2-git-connect-github-with-errors/)

## 六、gitHub提交验证过期
### 报错
```shell
Support for password authentication was removed on August 13, 2021
```
### 解决方法
使用gitToken 替换密码输入
- gitHUb头像点击
- 下拉列表： settings
- 侧边栏：Developer settings
- 侧边栏：person access tokens ——>> Tokens(classic)
- 顶部栏：Generate new token ——>> Generate new token(classic)
- 输入自定义note使用说明
- 配置期限
- 配置scopes
- 点击 Generate token 按钮
- 复制生成的 token 替换提交代码时输入的 password

参考地址：[https://blog.51cto.com/u_15064643/4215363](https://blog.51cto.com/u_15064643/4215363)