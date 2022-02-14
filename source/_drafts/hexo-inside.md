---
title: Hexo 主题之 Inside 拓展篇
date: 2022-02-18T19:58:07+08:00
categories:
 - 教程
tags:
 - Inside
 - Hexo
thumbnail: 'http://image.coolapk.com/feed/2018/1229/22/685100_1546094801_479@1600x719.jpg #111'
---

Inside 是一款非常优秀的 Hexo 主题，当然也是采用 SPA 打造的轻量级和功能丰富的强大主题。然而整体上作者采用了较为开放的丰富的自定义模式，所以很多功能都需要手动调整。

## 评论系统

### Valine & Valine Admin

由 Valine 修改而来的 Valine Admin 是个不错的选择。它拥有轻量级的引入代码，高颜值的界面，完整支持 Markdown 语法，强大的评论管理系统，可自定义的邮箱模板，以及评论过滤功能（Valine 不具备后三点）。可以说，功能已极其丰富。

一直没有太多动静的 Valine 最近终于开始动工了，看来这并不是一个没人管的项目，所以不用担心抽风换评论系统了。

不过唯一美中不足的是 Valine Admin 需要引进 JQuery ，所以还需大家斟酌了。

#### 文档：

[Valine 官网](https://valine.js.org/)  
[Valine on Github](https://github.com/xCss/Valine/)（1200 + Star，日常维护）  

[Valine Admin：独立博客评论系统](https://deserts.io/diy-a-comment-system/)  
[Valine Admin 配置手册](https://deserts.io/valine-admin-document/)  
[Valine Admin on Github](https://github.com/DesertsP/Valine-Admin)（300 + Star，最近一次7个月前）  

> 值得注意的是，Valine 和 Valine Admin 虽配置大致相同，但很多地方并不相通。所以建议从一开始就选择自己所需的系统机制，并两个文档互相参考。
> Valine Admin 似乎对静态加载支持不是很友好，建议尝试是否可用后再作长期决定。

### Gitalk & Gitment

基于 Github 的 Issue 提问功能，每一篇文章都生成一个对应的 Issue 。如果想要评论上两句，你需要登录 Github 账号并授权（没有听错，你需要授权，而且还会收到提醒邮件，这可能会让人望而却步），因此这样看来评论门槛还是较高的。不过好在美观的评论界面看起来还是非常友好的。

Gitment 虽早已弃更，但一则是由于 Github 长久以来的稳定性，所以至少功能上还是完美的，二则是它的评论界面风格与 Github 保持了高度一致。如果你是个 Github 的忠实党派，或许 Gitment 更适合你。

#### 文档

[Gitment Demo](https://imsun.github.io/gitment/)
[Gitment：使用 GitHub Issues 搭建评论系统](https://imsun.net/posts/gitment-introduction/)  
[Gitment on Github](https://github.com/imsun/gitment/)（3500 + Star，最近一次2年前）  

[Gitalk Demo](https://gitalk.github.io/)  
[Gitalk on Github](https://github.com/gitalk/gitalk/)（4000 + Star，日常维护）  

### 畅言云评 & 来必力（LiveRe）

畅言云评看起来确实比较专业，公司发展的也很不错。但因为没用过，所以这里就不多提了。可以参考下网上的一些说法酌情使用。

来必力已经是个老牌了，来自韩国，少数没有被墙彻底的公司。界面非常友好。但如果一些地区被墙掉的话，其实也好不到哪去。值得一提的是 Inside 已内置来必力，配方便简单。但是没有内置的话配置比较麻烦。同时大公司的玩意总是比较冗杂，建议设置为惰性加载，避免拖慢响应速率。

### 多说 & 网易云跟帖 & 友言

没太多说的，很可惜，已停服。

## 友链

## 链接

```
<div class="friends">

    <a class="brick" href="网站链接">
        <img class="blog-avatar" src="头像链接">
        <div class="container">
            <div class="name">网站名称</div>
            <div class="motto">描述</div>
        </div>
    </a>
// 下一个
    <a class="brick" href="网站链接">
        <img class="blog-avatar" src="头像链接">
        <div class="container">
            <div class="name">网站名称</div>
            <div class="motto">描述</div>
        </div>
    </a>
// ...后面重复

</div>
<style>
.friends{display:flex;flex-wrap:wrap;}.friends .brick{-webkit-transition:all .3s ease;transition:all .3s ease;}.friends .brick{display:flex;margin:10px 10px 0 0;text-decoration:none;font-weight:300;padding:10px;background-color:#fff0;border:solid 1px #659eb929;color:#659eb9;text-align:center;border-radius:4px;overflow:hidden}.friends .brick:hover{background-color:#659eb9;color:#fff;border:solid 1px #659eb9;box-shadow:0 6px 16px 0 rgba(80, 178, 243, 0.35);}.blog-avatar:hover{animation:whirl 0.5s;}
@keyframes whirl{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.friends .brick:active{-webkit-transform:scale(0.95);-moz-transform:scale(0.95);-ms-transform:scale(0.95);-o-transform:scale(0.95);transform:scale(0.95);}.friends .brick .blog-avatar{background-color:#fff0;color:#fff;border:solid 1px #dbdbdb;border-radius:50%;width:50px;height:50px;}.friends .brick .container{margin-left:10px;}.friends .brick .container .name{font-size:14px;}.friends .brick .container .motto{font-size:12px;margin-top:5px;-webkit-box-orient:vertical;-webkit-line-clamp:1;}
@media(max-width:450px){.friends .brick{width:100%;}.friends .brick .container{margin-left:0;width:100%;}.motto{width: 100% !important;}}.motto.long{width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.mdui-panel-item[open] .mdui-panel-item-arrow{transform:rotate(180deg);}.mdui-panel-item-body {height:auto!important;}
</style>
// 会改的可以自己改样式
```