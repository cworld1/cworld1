---
title: 'Windows 多余输入法删除'
description: '清除多余的输入方式'
publishDate: '2025-06-17'
tags: ['Windows', 'Input-method']
---

注册表路径：`Computer\HKEY_CURRENT_USER\Keyboard Layout\Preload`

![alt text](./image.png)

其中：

- `00000804` - cn-zh
- `00000409` - en-us

保留自己需要的即可。比如笔者只用中文拼音内的英文模式，可以以只留 804 模式。
