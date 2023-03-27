---
title: 钉钉一键点赞（最高 21 亿）
date: 2020-03-03 23:21:47
categories:
  - 教程
tags:
  - DingTalk
  - Fiddler
  - JavaScript
thumbnail: "thumbnail.jpg #640D80"
---

想必感兴趣的已经试过了连点器的畅快吧。在玩转这之前，这确实不失为一种强有力的手段。<!-- more -->然而如果这样的话，最多也就不过十万。这怎么能让博主折服呢，所以就从钉钉直播下手。在这之前，先对这个套壳钉钉有一个更深入的了解。

## 思路分析

### 运行逻辑

先研究一下点赞的运行逻辑：

![点赞逻辑](post/dingtalk-like/hrtsmcgmj30wu08wwja.jpg)

由于钉钉的客户端中的网络通讯加密，点赞数上传也不例外，所以我们从直播间网页上下功夫。

直播间所用网页：[钉钉直播间](https://h5.m.taobao.com/tblive/dingtalk/pc-live-v3.html)

> 注意：钉钉加载直播间的弹出窗口实际上是一个浏览器，其网络通讯可以被 Fiddler 获取到，亦可以通过其 Autoresponder 功能替换为本地文件，这就是我们的突破口。

### 目标流程

![目标](post/dingtalk-like/hsdqms0bj30w008o42u.jpg)

其中不对 favorCount 进行自增是为了确保赞数确实上传到服务器并进行了累加，这样会导致点击之后到数值显示有一定的延迟，一般在几秒钟。此时我们看到点击一次点赞按钮到一定时间后（源文件中是 1000ms ）将会触发上传操作。

## 具体实现

### 理论实践

首先根据原理准备网页文件，下载直播间代码。

打开上述网址，`Ctrl + S` 保存。注意我们只需要 html 文件。

![image](post/dingtalk-like/htjjkwiaj30p50973zi.jpg)

搜索 uploadLikesClick 字段，将看到一个函数。

![image](post/dingtalk-like/htqqvj2uj30gg03jgm6.jpg)

注意两个画框的地方，它们就是要修改的核心。

这样一来就可以直接修改了。将第一个框中的内容改为：

```javascript
uploadLikesClick(B, 10000000);
```

第二个框中的 1e4 即为上传间隔，赋值为 0 即为清零操作。

故我们可以做到如下图一般的骚操作：

```javascript
uploadLikesClick(B,Math.ceil(10000000*Math.random()+1)),t.favorCountCache=1)},1e2)
```

至此理论部分结束。如有技术可以自己实现了。经过实验钉钉存赞数的变量为 32 位有符号 int 其最大值约为 21 亿左右，超出后变成负值，直播间会显示为 0 。如果还有人点赞，赞数会增加但是 -21 亿没什么人会点的过来的...除了这样改。

> Ps. 10000000 好像是最大值了。

### Fiddler 修改

1. 首先你需要下载并修改好直播间网页并将其保存在本地。
2. 安装 [Fiddler](https://www.telerik.com/download/fiddler) 。
3. 打开 Fiddler 的 HTTPS 模式，位于 Tools - Options - HTTPS 。  
   ![image](post/dingtalk-like/iaaqmxk8j30f20a8mxk.jpg)
4. 配置 Autoresponder ，即在测试环境中将在线网页强制替换为本地网页。  
   ![image](post/dingtalk-like/iaf10k3gj30fz08474s.jpg)
5. 打开清理钉钉的网页缓存，位于%LOCALAPPDATA%\DIngtalk\Cache，删除全部 f 开头的文件。
   > `%LOCALAPPDATA%` 为 `C:\Users\你的电脑用户名\AppData\Local`  
   > Ps. 此步骤需在每次 **更改网页文件后和重新打开直播间之前** 完成，否则会导致替换失败。
6. 打开钉钉直播间，如果遇到错误没关系，多打开几次，当播放正常之后，点赞吧。

### 效果展示

![image](post/dingtalk-like/ib1q0zv7j31ww0zcgxc.jpg)

### 注意事项

为了避免视频界面缓存问题，我们将大部分缓存都清除了，这会使直播界面甚至其他界面需要重载缓存，因此清理后很多界面需要二次打开才能加载。

同时需要注意的是，点赞仅供娱乐。请勿过分贪玩，适度为止。

## 主播禁用点赞的问题

根据测试，禁用功能应该是最近研发的，而相关代码似乎是直接追加到最后的，所以趁直播界面加载完毕之前，拟好点赞位置猛击，就会发现还是可以卡的出几个赞的。如果你需要更快的点赞方式，建议使用 [鼠大侠](https://www.shudaxia.com/) 等软件，帮助你更快地在加载的片刻迅速点赞。
