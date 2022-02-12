---
title: 使用 Gitee 和 Hexo 框架搭建个人博客教程
date: 2019-06-22 21:11:00
categories: 
 - 教程
tags: 
 - Gitee
 - Hexo
thumbnail: 'http://image.coolapk.com/feed/2018/1229/22/685100_1546094801_479@1600x719.jpg #4781a6'
---

## 前言

### 搭建效果

看一下我花了一点时间的搭建效果

我的博客:[查看链接>>](http://zenggit.gitee.io/hexo)

### 为何使用 Gitee 搭建个人博客

免费，不用自己花钱买空间域名，代码托管平台，不用太担心后台挂了，目前国内访问GitHub速度慢，还可能被墙，所以 Gitee 来构建个人博客。 Gitee 类似国内版的 GitHub ，访问速度有保证。

### 什么是 Hexo

官网:查看链接>>
Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown （或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## 搭建准备工作

- 安装 Node.js (本地编译生成静态网页) [查看链接>>](https://m.runoob.com/nodejs/nodejs-install-setup.html)
- 安装 Git (用来将本地数据提交到Gitee服务端) [查看链接>>](https://m.runoob.com/git/git-install-setup.html)
- 注册一个 [查看链接>>](Gitee:https://gitee.com/)

## 开启搭建

### 注册登入 Gitee 新建一个仓库

![新建仓库](http://image.coolapk.com/feed/2018/1229/22/685100_1546094803_7241@1366x768.jpg.m.jpg)

### 开启 Gitee Pages 服务以后就可以用这个地址作为你的博客地址

![启用pages服务](http://image.coolapk.com/feed/2018/1229/22/685100_1546094806_5471@1092x612.jpg.m.jpg)

![启用](http://image.coolapk.com/feed/2018/1229/22/685100_1546094808_6552@635x345.jpg.m.jpg)

![你的博客地址](http://image.coolapk.com/feed/2018/1229/22/685100_1546094810_7866@656x371.jpg.m.jpg)

## Note.js(npm) 执行本地安装 Hexo 框架

打开 Note.js 命令窗口

![打开命令窗口](http://image.coolapk.com/feed/2018/1229/22/685100_1546094812_9106@249x223.jpg.m.jpg)

输入一键安装命令：

```cmd
npm install -g hexo-cli
```

![一键安装](http://image.coolapk.com/feed/2018/1229/22/685100_1546094815_0487@654x512.jpg.m.jpg)

大概等待2～3分钟后就安装好了，确定是否安装可使用命令:

```hexo
hexo v 查看版本信息
```

![查看hexo版本信息](http://image.coolapk.com/feed/2018/1229/22/685100_1546094817_2239@649x512.gif)

### 初始化 Hexo

选择本地 hexo 数据目录：

```cmd
hexo init "E:\文档\My Hexo"
```

(我是自己定义的位置，可自己修改)

![选择数据目录位置](http://image.coolapk.com/feed/2018/1229/22/685100_1546094820_4058@643x475.gif)

开始初始化 hexo ，依次执行下命令:

```cmd
进入数据目录:cd "E:\文档\My Hexo"
初始化:npm install
```

![初始化hexo](http://image.coolapk.com/feed/2018/1229/22/685100_1546094823_1651@643x475.gif)

初始化成功后，在数据目录下会有以下文件夹，记住你的数据目录路径，以后要用得到的！

![数据目录](http://image.coolapk.com/feed/2018/1229/22/685100_1546094825_6677@732x591.jpg.m.jpg)

### 本地部署预览

先查看搭建 hexo 本地博客是否成功，在自己上一步安装数据目录下 Git Bash 使用命令:

```cmd
hexo s 来启动本地服务，再次 Ctrl+C 停止本地服务
```

![启动本地服务](http://image.coolapk.com/feed/2018/1229/22/685100_1546094828_2499@746x596.gif)

浏览器进入 localhost:4000 预览本地博客
[4000链接](localhost:4000)

![浏览本地博客](http://image.coolapk.com/feed/2018/1229/22/685100_1546094832_2654@1336x676.gif)

完成以上算是成功一半了，接下来配置Git同步服务端

## Git 配置同步 Gitee 服务端

### 配置 Git 全局信息

配置 Git 全局信息，这样才能提交数据

```cmd
git config --global user.name "你的Gitee用户名"
git config --global user.email "你Gitee使用的邮箱"
```

![查看注册信息](http://image.coolapk.com/feed/2018/1229/22/685100_1546094834_9321@1110x401.jpg.m.jpg)

![配置Git全局](http://image.coolapk.com/feed/2018/1229/22/685100_1546094837_0589@434x90.jpg.m.jpg)

### 修改配置文件

进去码云查看我们创建博客的仓库，记录之前我们开启 Gitee Pages 的地址，修改配置文件中的信息

在数据根目录，找到这个文件 _config.yml 配置文件

![配置文件](http://image.coolapk.com/feed/2018/1229/22/685100_1546094839_3136@1366x738.jpg.m.jpg)

### 修改存放数据路径

![记录这个网址](http://image.coolapk.com/feed/2018/1229/22/685100_1546094810_7866@656x371.jpg.m.jpg)

设置 _config.yml 的信息 (url 和root) 信息如下

![url 和root 修改](http://image.coolapk.com/feed/2018/1229/22/685100_1546094841_7938@1298x109.jpg.m.jpg)

### 设置 Git 路径

进入仓库记录以下 git 地址

![记录git地址](http://image.coolapk.com/feed/2018/1229/22/685100_1546094844_0665@1366x738.jpg.m.jpg)

设置 _config.yml 的信息 (deploy) 信息如下

![设置deploy信息](http://image.coolapk.com/feed/2018/1229/22/685100_1546094846_3476@1298x620.jpg.m.jpg)

完成以上信息，就算是本地端配置好了，打字发图好累啊

### 测试本地文件能否于 Gitee 端传输数据

先安装 hexo-deployer-git 插件，在数据目录执行:

```cmd
npm install hexo-deployer-git --save
```

![安装git插件](http://image.coolapk.com/feed/2018/1229/22/685100_1546094848_6845@612x384.gif)

生成静态文件，并上传至 Gitee 端，部署到服务器
在数据目录 git bash 执行下命令：

```cmd
hexo g && hexo d
```

Hexo 将其改为了：

```cmd
hexo g -d
```

![部署至服务器](http://image.coolapk.com/feed/2018/1229/22/685100_1546094853_252@842x605.gif)

查看仓库，我们看到文件有更新，说明我们对接成功了

![文件更新](http://image.coolapk.com/feed/2018/1229/22/685100_1546094855_7785@1084x446.jpg.m.jpg)

这样就完成了部署

我们就可以直接访问这个网址进入自己的博客了

![博客地址](http://image.coolapk.com/feed/2018/1229/22/685100_1546094857_9599@667x84.jpg.m.jpg)

![博客初始界面](http://image.coolapk.com/feed/2018/1229/22/685100_1546094860_1542@1366x768.jpg.m.jpg)

可以看到我们的初始界面还是有点简陋的

### 发布博客

博客怎么写呢？
本地博客保存在:
数据目录 \source\_posts\ md文件

![博客内容](http://image.coolapk.com/feed/2018/1229/22/685100_1546094862_3219@732x591.jpg.m.jpg)

我们只要写好的博客用 Markdown 编辑器，导出 md 文件放入此文件夹，再次执行命令：

```cmd
hexo g -d
```

即可提交至服务器端

推荐Markdown编辑器: 小书匠编辑器

![编辑内容](http://image.coolapk.com/feed/2018/1229/22/685100_1546094864_7559@1366x768.jpg.m.jpg)

## 美化主题

刚搭建的博客还是有点简陋的，我们可以应用主题
官网上有很多开源的主题: [查看链接>>](https://hexo.io/themes)

### Next 主题

使用教程: [查看链接>>](http://theme-next.iissnan.com/getting-started.html)

### 新手温馨提示

- 安装 Hexo 用到的是 Node-npm 执行
- 配置并部署至服务器是在站点目录文件下用 Git 执行
  注意看上图的所用到的命令窗口！

### 疑难解答

遇到不会的问题，可以多看官网的文档 [查看链接>>](https://hexo.io/zh-cn/docs)

来自酷安 正常老司机
2018-12-29 小米MIX 2S
