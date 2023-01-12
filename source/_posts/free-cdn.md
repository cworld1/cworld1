---
title: 那些好用的前端 CDN 推荐
date: 2020-03-01 21:11:00
categories:
  - 资源
tags:
  - CDN
thumbnail: "thumbnail.png #72c5ff"
---

最近总感觉自己的网站速度不行，又不想重新搭建（Hexo 的宗旨就是打造响应速度超快的轻量级博客嘛），所以这篇文章也就由此应运而生了。

一个功能丰富的博客总是要引用一些优秀的项目代码。因此为了加快响应速度，不妨从 CDN 入手。

> Ps. 以下内容的 Ping 均选取平均值，且仅供参考。本文默认以 Ping 延迟排名，各地区和不同运营商网速各有差异，请在使用前自行测试考鉴。

## JSDelivr CDN

主要支持 npm ，Github 和 WordPress 的加速。也就是说，你可以把任意你自己的代码存放在 Github 上并用它来加速。重要的是，作为一家国外的 CDN 服务平台，在中国 QUANTIL 公司的赞助下，在大陆也能享受延迟极低的快速。

地址：[JSDelivr](http://www.jsdelivr.com/)  
赞助：Cloudflare，Fastly，StackPath，QUANTIL 和其他服务商  
Ping：11ms  
推荐：★★★★★

## Bootstrap 中文网开源项目 CDN 服务

致力于为 Bootstrap、jQuery、Angular 一样优秀的开源项目提供稳定、快速的免费 CDN 服务。BootCDN 所收录的开源项目主要同步于 cdnjs 仓库。自 2013 年 10 月 31 日上线以来已经为近万家网站提供了稳定、可靠的 CDN 服务。  
根据官网来看，已经支持了 3450+ 开源项目，确实是非常全的。

地址：[BootCDN](http://www.bootcdn.cn/)  
赞助：猫云  
Ping：11ms  
推荐：★★★★★

## 七牛云静态文件 CDN 服务

七牛云的目标是提供这样一个仓库，让它尽可能全面收录优秀的开源库，并免费为之提供 CDN 加速服务，使之有更好的访问速度和稳定的环境。同时，我们也提供开源库源接入的入口，让所有人都可以提交开源库，包括 JS、CSS、image 和 swf 等静态文件。  
Ps.点击搜索，才能发现那些隐藏的项目。

地址：[七牛云](https://www.staticfile.org/)  
赞助：掘金社区  
Ping：15ms  
推荐：★★★★★

## 字节跳动静态资源公共库

字节跳动也是一家非常具有生命力的公司，旗下的抖音和今日头条等产品也可以说是家喻户晓。更有趣的是，CDN 支持项目还非常广泛，可以与 CDNJS 对齐。

地址：[字节跳动](http://cdn.bytedance.com/)  
赞助：无  
Ping：25ms  
推荐：★★★★★

## 又拍云 JS 库加速服务

托管常用的 JavaScript 库。又一个不怎么更新速度却非常快的 CDN 。  
Ps.现在只提供 JQUERY、MOOTOOLS、MODERNIZR、DOJO、EMBER.JS 五种了。另，官网没加小绿锁 🔒。

地址：[常用 JavaScript 库 CDN 服务](http://jscdn.upai.com/)  
赞助：SegmentFault  
Ping：21ms  
推荐：★★★⚝⚝

## 腾讯微信前端通用库 CDN

太少了点…说实话不知道这样的站点还留着干嘛。  
还有，有点时间没更新了。

地址：[前端库 CDN 服务](https://qydev.weixin.qq.com/cdn/cdnjs.html)  
赞助：MIG CDN  
Ping：34ms  
推荐：★⚝⚝⚝⚝

## 75CDN（360 前端静态资源库）

来自一个叫做 [爆米兔](https://www.baomitu.com/) H5 服务。虽然没有明称是 360 团队的，不过这个 CDN 服务却似乎又暴露了什么。这个 CDN 服务又是叫做 [奇舞团](https://github.com/75team/) 的团队负责，而这个团队却是在为 360 做事，以至于 CDN 官网已直接用 “360 前端静态资源库” 暴露了身份。  
之前有报道过 360 CDN 已停止支持，不过现在来看支持的还是非常多的。这里更想推荐的是，75CDN 支持 Google 字体库的加速，而且效果非常不错。

地址：[75CDN](https://cdn.baomitu.com/)  
赞助：360  
Ping：36ms  
推荐：★★★★★

## 腾讯网静态资源公共库

还是太少了点…一样，有点时间没更新了。  
Ps.手动改网址，似乎还能获取到最新版的，但 Vue 都没有，也算是半残废吧。另，官网没加小绿锁 🔒。

地址：[前端库 CDN 服务](https://libs.qq.com/)  
赞助：MIG CDN  
Ping：37ms  
推荐：★★⚝⚝⚝

## 新浪云计算 CDN 公共库

新浪云计算是新浪研发中心下属的部门，主要负责新浪在云计算领域的战略规划，技术研发和平台运营工作。主要产品包括 应用云平台 Sina App Engine（简称 SAE）。

SAE 的 CDN 节点覆盖全国各大城市的多路（电信、联通、移动、教育）骨干网络，使开发者能够方便的使用高质量的 CDN 服务。

地址：[SAE](http://lib.sinaapp.com/)  
赞助：无  
Ping：48ms  
推荐：★★⚝⚝⚝

## 中科大 Google Fonts 加速服务

针对 Google Fonts 很不错。
Ps.现在 Google Fonts 在国内有服务器了，而且可以直接访问。  
但 Google 能用的只有 `fonts.googleapis.com`、`fonts.gstatic.com` 这两个域名。而 `ajax.googleapis.com` 和 `themes.googleusercontent.com` 暂时还是没法直接访问，所以还是得依赖中科大。

地址：https://lug.ustc.edu.cn/wiki/lug/services/googlefonts
赞助：无  
Ping：74ms  
推荐：★★★★⚝

## 公益项目 loli.net

网站提供常用前端公共库 CDN 服务。
这里很多东西都有，Google Fonts、Google 公共库、Gravatar 和 前端库！
唯一麻烦的是，不但取名为英文，而且还没有一个人性化的界面，所以你可能需要善用浏览器的搜索功能了。速度其实还是挺不错的。  
Ps.改名为…萝莉？？？库？

地址：[loli.net](https://cdnjs.loli.net/)  
赞助：公益  
Ping：84ms  
推荐：★★★★⚝

## 微软 Ajax CDN 服务

估计也用不上，没什么有用的东西。好在速度还可以，应该比较稳定。

地址：[AspnetCDN](https://docs.microsoft.com/zh-cn/aspnet/ajax/cdn/overview)  
赞助：无  
Ping：92ms  
推荐：★★★⚝⚝

## CDNJS.COM

CDNJS 提供非常完整的 JavaScript 库，无论是热门或是冷门的一应俱全。若你觉得它们缺少哪些好用的函式库，也可以自行提交到网站里，通过审核后就 CDNJS 就会为你分流 js 文件！这项服务是结合 CloudFlare、Pingdom 与 S3Stat 的，稳定性与速度自然不在话下。  
CDNJS 提供的 JavaScript Libraries 全部列在网站首页，使用者可以直接搜索。这些 JS 库都有标示版本编号、标签以及原维护网站链结。  
然而根据测试，看了下是 CF 提供的，所以大陆就速度也就一般般了。

地址：[CDNJS.COM](https://cdnjs.com/)  
赞助：Cloudflare  
Ping：288ms  
推荐：★★★⚝⚝

## UNPKG

这个网站估计玩过 npm 的都知道。只是不知道用来作 CDN 能否可行。国外的玩意速度都这样子。

地址：[UNPKG](https://unpkg.com/)  
赞助：CloudFlare  
Ping：283ms  
推荐：★★⚝⚝⚝

## CDNJS.NET

还是很全的，感觉跟 CDNJS.COM 有什么莫名的关系，网上都说这是个盗版。但不管怎么说是速度却败下阵来，而且有一些虽还算和谐的广告。

地址：[CDNJS.NET](https://cdnjs.net/)  
赞助：无  
Ping：302ms  
推荐：★★⚝⚝⚝

## Google Hosted Libraries

来自谷歌的托管库，大天朝看看就行。没法用，除非你的服务器是在非天朝（港澳台还是可以的）。
Ps.前文有大陆使用方法。

地址：[Google Hosted Libraries](https://developers.google.com/speed/libraries)  
赞助：无  
Ping：+∞
推荐：★⚝⚝⚝⚝
