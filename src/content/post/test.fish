#!/usr/local/bin/fish

# 遍历当前目录下的所有文件
for file in (ls)
    # 检查文件是否是文件夹
    if test -d $file
        continue
    end

    # 提取文件的基础名（去掉扩展名后的文件名），用于对比文件夹名
    set base_name (basename $file .md)

    # 如果存在和文件同名的文件夹，则将文件移动到文件夹下并改名为 index.md
    if test -d $base_name
        mv $file "$base_name/index.md"
        echo "File $file has been moved to folder $base_name and renamed to index.md."
    end
end
