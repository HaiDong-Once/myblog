
# vue项目引用字体包和压缩

### 字体包引用
- 下载字体包
- 字体包放到静态文件中`src/assets/font`下
- 在项目中新增字体包css文件`@/public/style.css`
```css
@font-face{
  font-family:'Adorable';
  src:url('@/assets/font/Adorable.TTF')
}
```
- 字体包使用
```css
import  '@/public/style.css'
.demo{
  font-family:'Adorable'
}
```

### 字体包压缩
::: tip 原因
字体包太大，导致服务器压力太大
:::

- `font-spider`：手动命令提取字体包（适用静态文字）
- `Fontmin`工具，打包配置生成压缩字体包（使用静态文字）
- 常用基础汉字2500-3000，导出字体包（体积相对较小，部分适用于动态文字）
