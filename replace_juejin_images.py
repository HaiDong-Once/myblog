#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
替换Markdown文件中的掘金图片链接为本地路径
"""

import re
import os
import sys

# 匹配掘金图片的正则表达式
juejin_pattern = r'!\[([^]]*)\]\(https://p0-xtjj-private\.juejin\.cn/tos-cn-i-73owjymdk6/[^)]+\)'

def replace_juejin_images(file_path):
    """替换文件中的掘金图片链接"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 查找所有掘金图片链接
    matches = re.findall(juejin_pattern, content)
    
    if not matches:
        print(f"{file_path}: 未找到掘金图片链接")
        return 0
    
    print(f"找到 {len(matches)} 个掘金图片需要处理")
    
    success_count = 0
    
    def replace_match(match):
        nonlocal success_count
        
        # 提取图片名称并处理转义符
        raw_image_name = match.group(1)
        
        # 处理图片名称
        if raw_image_name.startswith('image_') or raw_image_name.startswith('image\\'):
            image_name = raw_image_name.replace('\\', '')
        elif raw_image_name == '':
            original_url = match.group(0)[match.group(0).find('(') + 1:-1]
            image_name = f"image_{hash(original_url) % 100000}.png"
        else:
            image_name = raw_image_name
            if not image_name.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                image_name += '.png'
        
        # 根据文件路径确定本地路径
        dir_parts = file_path.replace('\\', '/').split('/')
        if len(dir_parts) >= 2:
            category = dir_parts[-2]
            filename_base = os.path.splitext(dir_parts[-1])[0]
            local_path_prefix = f"/images/{category}/{filename_base}"
        else:
            local_path_prefix = "/images/default"
        
        success_count += 1
        
        # 返回新的markdown图片语法
        return f"![{image_name}]({local_path_prefix}/{image_name})"
    
    # 执行替换
    new_content = re.sub(juejin_pattern, replace_match, content)
    
    # 写入文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"处理完成: {success_count}/{len(matches)} 个图片成功")
    return success_count

def batch_process_directory(directory):
    """批量处理目录下的markdown文件"""
    total_processed = 0
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                print(f"\n处理文件: {file_path}")
                processed = replace_juejin_images(file_path)
                total_processed += processed
    
    print(f"\n总计处理: {total_processed} 个图片")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法:")
        print("  python replace_juejin_images.py <文件路径>")
        print("  python replace_juejin_images.py <目录路径> --batch")
        print("")
        print("参数:")
        print("  --batch       批量处理目录下所有markdown文件")
        print("")
        print("示例:")
        print("  python replace_juejin_images.py docs/AI/cursor/cursor-workflow2.md")
        print("  python replace_juejin_images.py docs/AI --batch")
        sys.exit(1)
    
    target_path = sys.argv[1]
    batch_mode = '--batch' in sys.argv
    
    if batch_mode:
        if not os.path.isdir(target_path):
            print(f"目录不存在: {target_path}")
            sys.exit(1)
        batch_process_directory(target_path)
    else:
        if not os.path.isfile(target_path):
            print(f"文件不存在: {target_path}")
            sys.exit(1)
        
        if not target_path.lower().endswith('.md'):
            print("警告: 该文件不是markdown格式")
        
        replace_juejin_images(target_path) 