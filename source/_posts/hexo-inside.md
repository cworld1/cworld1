---
title: Hexo 主题之 Inside 拓展篇
date: 2022-02-14 23:15:28
categories:
 - 教程
tags:
 - Inside
 - Hexo
thumbnail: 'https://gitee.com/cworld0/file/raw/master/img/hexo-inside.jpg #111'
---

[Inside](https://github.com/ikeq/hexo-theme-inside) 是一款采用 SPA 打造的轻量级和功能丰富的 Hexo 主题。然而整体上作者采用了较为开放的丰富的自定义模式，所以很多功能都需要手动调整。

## Hexo 内部调整

个人建议不要设置时区，因为设置了反而不好用。

这里给出一些重要的配置项：

```yml
language: zh-Hans # 主题的配置写法
permalink: /post/:title/ # 个人在这里相对喜欢这种简单的格式
skip_render: ["css/*", "js/*"] # 便于在仓库内置各类文件
deploy:
  type: git
  repository: git@github.com:cworld1/cworld1.git # 这种写法更不容易报错
  branch: gh-pages
```

## Inside 主题配置

- 想要像我那样侧栏用户名有漂亮的字体，配置应该额外调整：

  ```yml
  appearance:
    # ...
    font:
      url: //fonts.googleapis.com/css?family=Lobster|Baloo+Bhaijaan|Inconsolata|Josefin+Sans|Montserrat
      base: 'Josefin Sans'
      logo: 'Lobster' # 就是这款字体
      menu: 'Baloo Bhaijaan'
  ```

- 想要在社交按钮栏加上酷安，需要单独引入 svg 图标。

  ```yml
  sns:
    # ...
    - title: 酷安
      url: https://www.coolapk.com/u/1384771
      template: |
        <svg t="1644654153078" class="icon" viewBox="0 0 1922 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1687" data-darkreader-inline-fill="" width="18" height="18"><path d="M513.810604 0c308.858273 0 602.991192 297.820939 602.991192 297.820939l-132.287657 102.890399S723.386322 178.321089 513.810604 178.321089c-143.391802 0-329.062206 104.787859-329.062206 323.556901 0 213.250375 136.029126 334.594235 330.906216 334.594235C1023.05127 836.485587 1203.216369 0 1363.15081 0c104.787859 0 175.047303 244.772252 297.820938 450.406065 147.06646 246.349014 261.475239 472.814793 261.47524 481.660695 0 49.641277-46.380854 91.919878-79.479494 91.919878S1206.891026 577.255229 1206.891026 577.255229l148.910469-108.462516 189.345061 128.679812L1359.476153 259.230358c-57.912596 57.899234-336.424882 764.769642-834.628215 764.769642C329.970848 1023.986638 0 880.581473 0 500.047343 0 284.952958 162.687093 0 513.810604 0z" p-id="1688"></path></svg>
  ```

- 或者侧栏链接上加上 Emoji 看起来更好看：

  ```yml
  menu:
  🏠 Home: /
  🔍 Search: /search
  🔗 Link: /link
  🧑‍💻 About: /about
  ```

## 自动 CI 部署

这里采用 Star 数较高的一个自动 [Github Action](https://github.com/sma11black/hexo-action) ，提到了整个流程。如果不太懂，也可以参考别人的一些教程。这里提几个点：

- 运行命令 `$ ssh-keygen -t rsa -C "username@example.com"` 时会提示一些选项，建议全部按回车默认选项。这会在你的用户名文件夹根目录下生成一个 `.ssh` 文件夹，得到两个文件，其中带.pub后缀的为公钥，另一个为私钥。两者可以填在同一个仓库不同分支，也可以填在不同的仓库。
- Github Actions 的配置文件应该在项目根目录下的 `.github` > `workflows` ，默认名称为 `main.yml` ，当然你也可以随意命名。将整个项目一起上传上去，Github Actions 会自动执行并生成渲染文件。
- 自定义域名应该在项目的 `source` 目录中放一个 CNAME 文件。

## 评论系统

### Waline + Leancloud + Vercel

Waline 基于 Valine，是一个干净纯粹但功能丰富的评论系统框架。它支持 Markdown 语法，支持自定义表情、部分文字、配色、精选，以及后台管理、邮件自动发送等功能。

### 文档

[Waline 官网](https://waline.js.org/)  

[Waline on Github](https://github.com/walinejs/waline)

### 配置上手

除官网给出部分，博客这边配置也非常重要。由于 Inside 主题是直接通过变量达成夜间模式的切换的，所以就宣告着 Waline 自身夜间模式的报废。当然这并不影响夜间模式的效果。下面是我的配置。

```yml
  - position: comments
    template: |
      <div id="waline"></div>
      <script>
        Waline({
          el: '#waline',
          serverURL: '<你的Vercel的url>',
          locale: {placeholder:'欢迎评论。(填写邮箱可在被回复时收到邮件提醒，登录非必须)'},
          visitor: true,
          emoji: [
            'https://cworld0.gitee.io/file/img/weibo',
            'https://cworld0.gitee.io/file/img/bilibili',
          ],
        });
      </script>
      <link href="/css/comment.min.css" rel="stylesheet">
```

其中页面/文章访问数的功能完全仅用于统计数据，暂时不打算做效果呈现。Leancloud 可以轻松查询到。Emoji 则采用了较为经典的微博和B站表情。

评论样式内容较多而且为了方便维护，故单独引用文件。

文件压缩版的贴一份仅供参考：

```css
:root{--waline-dark-grey:var(--inside-foreground-color);--waline-theme-color:var(--inside-accent-color);--waline-active-color:var(--inside-accent-color);--waline-text-color:var(--inside-foreground-color);--waline-bgcolor:var(--inside-background);--waline-bgcolor-light:var(--inside-card-background);--waline-bgcolor-hover:var(--inside-card-background);--waline-border-color:var(--inside-border-color);--waline-disable-bgcolor:var(--inside-card-background);--waline-disable-color:var(--inside-foreground-color);--waline-code-bgcolor:var(--inside-highlight-00);--waline-mobile-avatar-size:calc(var(--waline-avatar-size) * 11 / 13);--waline-badge-color:var(--inside-accent-color);--waline-info-bgcolor:var(--inside-background);--waline-avatar-radius:50%}#waline .veditor{width:calc(100% - 2em)!important}
```

## 自定义小插件

### 站点访问统计

在主题配置文件修改：

```yml
footer:
  # ...
  custom: <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
# ...
plugins:
  - https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js # 全局引入卜蒜子统计
```

### 代码块快捷复制到剪贴板

先从 [Github](https://github.com/zenorocha/clipboard.js/blob/master/dist/clipboard.min.js) 下载文件并放置好目录

然后在主题配置文件修改：

```yml
plugins:
  # ...
  - js/clipboard.min.js # 全局引入剪贴板JS文件
  - position: [post, page] # 剪贴板
    template: |
      <script>
        var elements = document.querySelectorAll(".highlight tr>.code");
        for (var i = 0; i < elements.length; i++) { elements[i].innerHTML = '<button class="btn-copy" data-clipboard-snippet=""><svg t="1644686763820" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2062" data-darkreader-inline-fill="" width="16" height="16"><path d="M798.4 128h-72v-12.8c0-38.4-33.6-72-72-72h-97.6C555.2 17.6 537.6 0 512 0c-25.6 0-43.2 17.6-43.2 43.2h-97.6c-38.4 0-72 33.6-72 72V128h-72c-30.4 0-56 25.6-56 56v780.8c0 33.6 25.6 59.2 59.2 59.2h568c17.6 0 33.6-8 43.2-20.8 8-12.8 12.8-25.6 12.8-38.4V184C852.8 153.6 827.2 128 798.4 128zM384 128h256v84.8H384V128z m384 811.2H256V212.8h43.2v12.8c0 38.4 33.6 72 72 72h281.6c38.4 0 72-33.6 72-72v-12.8H768v726.4z" p-id="2063"></path></svg></button>' + elements[i].innerHTML };
        new ClipboardJS('.btn-copy', { target: (trigger) => trigger.nextElementSibling });
      </script>
      <style>
        .btn-copy{position:absolute;right:5px;top:5px;border:none;padding:3px 6px;border-radius:3px;background:var(--inside-background);fill:currentColor;opacity:0;transition:.3s}.highlight:hover .btn-copy{opacity:1}
      </style>
```

其实大部分自定义代码都是在用 SVG 写图标，所以不用担心代码量很大~

## 友链优化

这个主题最大的短板就是没有单独的友链支持。所以这里单独对友链介绍一下我的解决方案。

在友链页面按照如下格式写：

- 提前引用 css 样式避免排版错乱

  ```markdown
  <link href="/css/link.min.css" rel="stylesheet">
  ```

  其文件压缩版也贴出来仅供参考：
  ```css
  .f>ul{display:flex;flex-wrap:wrap;padding:0}.f>ul>li{transition:.3s ease;list-style:none}.f>ul>li{display:flex;margin:0 10px 10px 0;text-decoration:none;padding:10px;background-color:var(--inside-background);color:var(--inside-accent-color);border-radius:6px}.f>ul>li:hover{color:#fff;background-color:var(--inside-accent-color);box-shadow:0 2px 4px 1px rgb(0 0 0 / 20%);transform:scale(1.03)}.f>ul>li:active{transform:scale(0.97)}.f>ul>li>p{margin:0}.f img{border:solid 1px var(--inside-border-color);border-radius:25px;width:50px;height:50px;margin:0!important;max-width:fit-content}.f>ul>li>ul{position:relative;margin-left:10px;padding:0}.f>ul>li>ul>li{list-style:none;text-align:center}.f>ul>li>ul>li:nth-child(1){font-size:14px}.f>ul>li>ul>li:nth-child(2){font-size:12px;margin-top:5px;max-width:108px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:.8}.f>ul>li>ul>li:nth-child(3) a{position:absolute;right:0;top:0;height:100%;width:100%;border:0;color:transparent}@media(max-width:450px){.f>ul>li{margin-left:0;width:100%}.f>ul>li>ul{width:100%}.f>ul>li>ul>li{text-align:start;max-width:100%!important}}
  ```

- 随后用一个 div 标签将需要优化展示的友链包裹起来即可。这样通过 Markdown 语法写出来的友链，真的是不知道要比手动写 html 标签要高到哪里去了。

  ```markdown
  <div class="f">
  
  - ![](https://gravatar.loli.net/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=400)
    - CWorld's Blog
    - 求知若愚，虚怀若谷
    - [](https://blog.cworld.top)
  
  </div>
  ```

## 结尾

静态博客能够折腾到这个地步真的已经做的很不错了。希望大家都能把博客折腾成各自喜欢的样子，然后长期坚持把内容写下去，否则，折腾一大圈，也不过是一时热情，只会拖累自己的产物罢了。
