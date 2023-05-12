
# 项目部署脚本配置
#!/usr/bin/env sh

# myblog下执行

# 确保脚本抛出遇到的错误
set -e

# 拉去最新代码
git pull

# 生成静态文件
npm run build

# 进入生成的文件夹
#cd docs\\.vuepress\\dist

# cd ../
 cd docs
 cd .vuepress
 cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
#git push -f git@github.com:HaiDong-Once/HaiDong-Once.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，
 git push -f https://github.com/HaiDong-Once/myblog.git master:gh-pages

cd -