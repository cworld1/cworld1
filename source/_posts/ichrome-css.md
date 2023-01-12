---
title: iChrome CSS 美化
date: 2019-07-24 05:58:40
categories:
  - 教程
tags:
  - CSS
---

一个 Chrome 插件 iChrome，功能齐全，但是有广告，所以以下代码就是来美化插件并去除“牛皮藓”。

<!-- more -->

![iChrome](post/ichrome-css/ichrome.jpg)

## 使用方法

在插件 iChrome 的设置中找到自定义 CSS 片段框，填入下面的内容，已经过浓缩处理。

```CSS
.tab-container .tab>.ad-unit.bottom{display:none!important}
.store-detail .preview .widget, .widgets-container .widget{background:#fffc;backdrop-filter:blur(20px)}
.store-detail .preview .widget .wtooltip, .widgets-container .widget .wtooltip{display:none!important}
header.toolbar.floating .search input {background:#fffc;backdrop-filter:blur(20px);box-shadow:0 2px 10px 0 #0000005e}
.store-detail .preview .widget .wdelete, .widgets-container .widget .wdelete{color:black}
.feedback-link .icon{display:none!important}
.bg-info{right:10px;color:#fffc}
.add-widget-link{color:#fffc;position:absolute}
.menu-toggle .menu-button:hover{background-color:#fff}
.menu-toggle .menu-button:before{color:black}
.menu-toggle .menu-button{background-color:#fffc}
.add-widget-link .icon{text-shadow: 0 0 0 #fff0}
button.material.fab{background-color:#fffc}
.menu-container{background:#fffc;backdrop-filter:blur(20px);box-shadow:0 0 0 0 #fff0}
.app.settings .page header{background:#4080fe}
```
