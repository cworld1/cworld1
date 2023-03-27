---
title: 钉钉云课堂提取视频 & 倍速播放 & 学习进度
date: 2020-03-03 23:21:47
categories:
  - 教程
tags:
  - DingTalk
  - Fiddler
  - JavaScript
---

钉钉的云课堂比较反人类，不仅有水印影响观看体验，而且不支持倍速播放。<!-- more -->看讲课比较慢的老师的视频，无疑是一种煎熬。过于慢的速度，反而会影响效率。

教程由简单到难逐渐递增，不过玩法也越来越多，所以还请斟酌着看。

## 利用 IDM 下载

来自知乎用户 [cxy](https://www.zhihu.com/question/371593651/answer/1019733992)（方法及其简单粗暴，一看便懂。博主测试直播回看界面失效）

首先，下载一个 IDM（internet download manager），这个软件平时当多核下载器拿来下浏览器里的文件也是非常不错的。百度一下网上都有 IDM 的下载链接，浏览器插件也行。

![image](post/dingtalk-player/uzjvsj3j30k00bvgmj.jpg)

安装完成以后在后台运行，点开你的课堂网址，右上角就会出现这样的标识：

![image](post/dingtalk-player/v06dn82j30v50b676t.jpg)

如果没有出现，多刷新几次页面就可以了

下载到你电脑的视频就可以任你宰割了，你只需要随便用一个支持倍速播放的播放器即可

![image](post/dingtalk-player/v14raoxj30k00ap754.jpg)

## 使用 HttpCanary 抓取

来自知乎用户 [solstice23](https://www.zhihu.com/question/371593651/answer/1015872082)，方法比较中矩，还是有一些参考价值的。

下载 HttpCanary 软件（这里提供一个[下载链接](https://link.zhihu.com/?target=https%3A//www.lanzous.com/i9ff8eb)）

1. 进入钉钉，先不要打开云课堂视频。

2. 打开 HttpCanary，点击右下角的开始捕获按钮。

3. 切回钉钉，打开云课堂视频，播放几秒

4. 切回 HttpCanary，点击右下角按钮暂停抓包

5. 点击右上角搜索按钮，选择类别 "视频"

6. 筛选出来几个数据包，地址都是相同的。随便点进去一个，长按地址复制。

7. 使用下载器下载该视频（例如 ADM 下载器），并使用支持倍速播放的播放器播放即可。

![image](post/dingtalk-player/vbxemrvj32pg1ww1kx.jpg)

## 利用 Fiddler 注入 JS

可以说这里开始才是正文。同时也对作者 [樱花赞](https://www.cnblogs.com/1024th/p/12330849.html) 表示感谢！

> PS.他并不是原创，最初原创的是 [solstice23](https://solstice23.top/archives/1075)

### 思路

云课堂的本质是一个（套壳的）网页，可以用抓包软件分析记录学习进度请求，再通过修改这个请求并重发来修改学习进度。

### 提示

该方法仅 PC 端可用（其实手机也不是不行）。

### 教程

#### 安装 Fiddler

[点击这里](https://telerik-fiddler.s3.amazonaws.com/fiddler/FiddlerSetup.exe)下载安装。

#### 设置 Fiddler 捕获 HTTPS 流量

打开 Fiddler，点击顶栏 “Tools”，在弹出的菜单中点击 “Options…”。

![image](post/dingtalk-player/vh9k0nhj30i606e3zo.jpg)

在弹出的窗口中切换到顶部的 “HTTPS” 菜单，勾选 “Capture HTTPS CONNECTs” 和 “Decrypt HTTPS traffic” 复选框，然后点击 OK。

勾选后会弹出安装证书的窗口，确认即可。

![image](post/dingtalk-player/vhi47apj30iu0csjti.jpg)

如果出现下面这样的黄条，点击黄条即可。

![image](post/dingtalk-player/vhvlkxjj311y02sweo.jpg)

#### 写入脚本

在 Fiddler 中按下 `Ctrl+R` 。弹出一个代码编辑器窗口。

![image](post/dingtalk-player/vkq3jhyj311y0k6abe.jpg)

在代码编辑器窗口按下 `Ctrl+F` ，在弹出的窗口中输入 OnBeforeResponse 并按下回车。找到 OnBeforeResponse 函数（下图所示）。

![image](post/dingtalk-player/vkxu4tuj317c0im0ve.jpg)

把图中的下面这段：

```javascript
static function OnBeforeResponse(oSession: Session) {
    if (m_Hide304s && oSession.responseCode == 304) {
        oSession["ui-hide"] = "true";
    }
}
```

替换成下面的代码，然后按下 `Ctrl+S` 来保存。

> 下方代码已经整合 [【一劳永逸】钉钉云课堂倍速播放教程](https://www.cnblogs.com/1024th/p/12317158.html) 中的代码（看过这篇教程的，可以把原来的代码删掉用下面的）。  
> 以下代码部分来自 [HTML5 播放器增强插件](https://greasyfork.org/users/49622)，对原作者深表感谢！  
> 以下代码参考 [aneasystone's blog: 通过 FiddlerScript 实现根据条件重发请求](https://www.aneasystone.com/archives/2015/03/reissue-requests-by-conditions-using-fiddlerscript.html)，对博主深表感谢！

```javascript
public static RulesOption("视频增强插件")
var m_H5VideoPlayerExtension: boolean = true;
public static RulesOption("自动学习")
var m_AutoLearn: boolean = true;
static function OnBeforeResponse(oSession: Session) {
    if (m_Hide304s && oSession.responseCode == 304) {
        oSession["ui-hide"] = "true";
    }
    if (m_H5VideoPlayerExtension) {
        var sToInsert = "<script src=data:application/javascript;base64,KGZ1bmN0aW9uKCl7dmFyIGh0bWxfcGxheWVyX2VuaGFuY2U9e2ZvbnRTaXplOjIwLHBsYXllcjpmdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCJ2aWRlbyIpfSx0aXBzOmZ1bmN0aW9uKHN0cil7dmFyIHN0eWxlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNodG1sX3BsYXllcl9lbmhhbmNlX3RpcHMiKS5zdHlsZTtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjaHRtbF9wbGF5ZXJfZW5oYW5jZV90aXBzIikuaW5uZXJUZXh0PXN0cjtmb3IodmFyIGk9MDtpPDM7aSsrKXtpZih0aGlzLm9uX29mZltpXSl7Y2xlYXJUaW1lb3V0KHRoaXMub25fb2ZmW2ldKX19c3R5bGUuZGlzcGxheT0iYmxvY2siO3RoaXMub25fb2ZmWzBdPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtzdHlsZS5vcGFjaXR5PTF9LDUwKTt0aGlzLm9uX29mZlsxXT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c3R5bGUub3BhY2l0eT0wfSwyMDAwKTt0aGlzLm9uX29mZlsyXT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7c3R5bGUuZGlzcGxheT0ibm9uZSJ9LDI4MDApfSxvbl9vZmY6bmV3IEFycmF5KDMpLHJvdGF0ZTowLGZwczozMCxmaWx0ZXI6e2tleTpuZXcgQXJyYXkoNSksc2V0dXA6ZnVuY3Rpb24oKXt2YXIgdmlldz0iYnJpZ2h0bmVzcyh7MH0pIGNvbnRyYXN0KHsxfSkgc2F0dXJhdGUoezJ9KSBodWUtcm90YXRlKHszfWRlZykgYmx1cih7NH1weCkiO2Zvcih2YXIgaT0wO2k8NTtpKyspe3ZpZXc9dmlldy5yZXBsYWNlKCJ7IitpKyJ9IixTdHJpbmcodGhpcy5rZXlbaV0pKTt0aGlzLmtleVtpXT1OdW1iZXIodGhpcy5rZXlbaV0pfWh0bWxfcGxheWVyX2VuaGFuY2UucGxheWVyKCkuc3R5bGUuV2Via2l0RmlsdGVyPXZpZXd9LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5rZXlbMF09MTt0aGlzLmtleVsxXT0xO3RoaXMua2V5WzJdPTE7dGhpcy5rZXlbM109MDt0aGlzLmtleVs0XT0wO3RoaXMuc2V0dXAoKX19LHNldHRpcHM6ZnVuY3Rpb24oKXt2YXIgdGlwcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJkaXYiKTt0aGlzLnBsYXllcigpLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGlwcyk7dGlwcy5zZXRBdHRyaWJ1dGUoImlkIiwiaHRtbF9wbGF5ZXJfZW5oYW5jZV90aXBzIik7dGlwcy5zZXRBdHRyaWJ1dGUoInN0eWxlIiwicG9zaXRpb246IGFic29sdXRlO3otaW5kZXg6IDk5OTk5OTtwYWRkaW5nOiAxMHB4O2JhY2tncm91bmQ6IHJnYmEoMCwwLDAsMC44KTtjb2xvcjp3aGl0ZTt0b3A6IDUwJTtsZWZ0OiA1MCU7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2l0aW9uOiBhbGwgNTAwbXMgZWFzZTtvcGFjaXR5OiAwO2Rpc3BsYXk6IG5vbmU7IC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IHN1YnBpeGVsLWFudGlhbGlhc2VkO2ZvbnQtZmFtaWx5OiAnbWljcm9zb2Z0IHlhaGVpJywgVmVyZGFuYSwgR2VuZXZhLCBzYW5zLXNlcmlmOy13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7Iik7aWYodGhpcy5mb250U2l6ZSE9PTApe3RpcHMuc3R5bGUuZm9udFNpemU9dGhpcy5mb250U2l6ZSsicHgifWlmKGxvY2F0aW9uLmhvc3RuYW1lPT09Ind3dy55b3V0dWJlLmNvbSIpe3RoaXMucGxheWVyKCkucGFyZW50Tm9kZS5zdHlsZS5oZWlnaHQ9IjEwMCUifX0sX2lzRm91Y3M6ZmFsc2UsaXNGb3VjczpmdW5jdGlvbigpe3RoaXMucGxheWVyKCkub25tb3VzZW92ZXI9ZnVuY3Rpb24oKXtodG1sX3BsYXllcl9lbmhhbmNlLl9pc0ZvdWNzPXRydWV9O3RoaXMucGxheWVyKCkub25tb3VzZW91dD1mdW5jdGlvbigpe2h0bWxfcGxheWVyX2VuaGFuY2UuX2lzRm91Y3M9ZmFsc2V9fSxidXR0b246ZnVuY3Rpb24oZXZlbnQpe3ZhciBfdGhpcz1odG1sX3BsYXllcl9lbmhhbmNlO2lmKGV2ZW50LmFsdEtleXx8ZXZlbnQuY3RybEtleXx8ZXZlbnQuc2hpZnRLZXkpe3JldHVybn1pZighX3RoaXMuX2lzRm91Y3Mpe3JldHVybn1ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtldmVudC5wcmV2ZW50RGVmYXVsdCgpO2lmKGV2ZW50LmtleUNvZGU9PT0zOSl7X3RoaXMucGxheWVyKCkuY3VycmVudFRpbWUrPTM7X3RoaXMudGlwcygi5b+r6L+b77yaM+enkiIpfWlmKGV2ZW50LmtleUNvZGU9PT0zNyl7X3RoaXMucGxheWVyKCkuY3VycmVudFRpbWUtPTM7X3RoaXMudGlwcygi5ZCO6YCA77yaM+enkiIpfWlmKGV2ZW50LmtleUNvZGU9PT0zOCl7aWYoX3RoaXMucGxheWVyKCkudm9sdW1lPDEpe190aGlzLnBsYXllcigpLnZvbHVtZSs9MC4wMX1fdGhpcy5wbGF5ZXIoKS52b2x1bWU9X3RoaXMucGxheWVyKCkudm9sdW1lLnRvRml4ZWQoMik7X3RoaXMudGlwcygi6Z+z6YeP77yaIitwYXJzZUludChfdGhpcy5wbGF5ZXIoKS52b2x1bWUqMTAwKSsiJSIpfWlmKGV2ZW50LmtleUNvZGU9PT00MCl7aWYoX3RoaXMucGxheWVyKCkudm9sdW1lPjApe190aGlzLnBsYXllcigpLnZvbHVtZS09MC4wMX1fdGhpcy5wbGF5ZXIoKS52b2x1bWU9X3RoaXMucGxheWVyKCkudm9sdW1lLnRvRml4ZWQoMik7X3RoaXMudGlwcygi6Z+z6YeP77yaIitwYXJzZUludChfdGhpcy5wbGF5ZXIoKS52b2x1bWUqMTAwKSsiJSIpfWlmKGV2ZW50LmtleUNvZGU9PT0zMil7aWYoX3RoaXMucGxheWVyKCkucGF1c2VkKXtfdGhpcy5wbGF5ZXIoKS5wbGF5KCk7X3RoaXMudGlwcygi5pKt5pS+Iil9ZWxzZXtfdGhpcy5wbGF5ZXIoKS5wYXVzZSgpO190aGlzLnRpcHMoIuaaguWBnCIpfX1pZihldmVudC5rZXlDb2RlPT09ODgpe2lmKF90aGlzLnBsYXllcigpLnBsYXliYWNrUmF0ZT4wKXtfdGhpcy5wbGF5ZXIoKS5wbGF5YmFja1JhdGUtPTAuMTtfdGhpcy5wbGF5ZXIoKS5wbGF5YmFja1JhdGU9X3RoaXMucGxheWVyKCkucGxheWJhY2tSYXRlLnRvRml4ZWQoMSk7X3RoaXMudGlwcygi5pKt5pS+6YCf5bqm77yaIitfdGhpcy5wbGF5ZXIoKS5wbGF5YmFja1JhdGUrIuWAjSIpfX1pZihldmVudC5rZXlDb2RlPT09Njcpe2lmKF90aGlzLnBsYXllcigpLnBsYXliYWNrUmF0ZTwxNil7X3RoaXMucGxheWVyKCkucGxheWJhY2tSYXRlKz0wLjE7X3RoaXMucGxheWVyKCkucGxheWJhY2tSYXRlPV90aGlzLnBsYXllcigpLnBsYXliYWNrUmF0ZS50b0ZpeGVkKDEpO190aGlzLnRpcHMoIuaSreaUvumAn+W6pu+8miIrX3RoaXMucGxheWVyKCkucGxheWJhY2tSYXRlKyLlgI0iKX19aWYoZXZlbnQua2V5Q29kZT09PTkwKXtfdGhpcy5wbGF5ZXIoKS5wbGF5YmFja1JhdGU9MTtfdGhpcy50aXBzKCLmkq3mlL7pgJ/luqbvvJox5YCNIil9aWYoZXZlbnQua2V5Q29kZT09NzApe2lmKCFfdGhpcy5wbGF5ZXIoKS5wYXVzZWQpe190aGlzLnBsYXllcigpLnBhdXNlKCl9X3RoaXMucGxheWVyKCkuY3VycmVudFRpbWUrPU51bWJlcigxL190aGlzLmZwcyk7X3RoaXMudGlwcygi5a6a5L2N77ya5LiL5LiA5binIil9aWYoZXZlbnQua2V5Q29kZT09Njgpe2lmKCFfdGhpcy5wbGF5ZXIoKS5wYXVzZWQpe190aGlzLnBsYXllcigpLnBhdXNlKCl9X3RoaXMucGxheWVyKCkuY3VycmVudFRpbWUtPU51bWJlcigxL190aGlzLmZwcyk7X3RoaXMudGlwcygi5a6a5L2N77ya5LiK5LiA5binIil9aWYoZXZlbnQua2V5Q29kZT09Njkpe2lmKF90aGlzLmZpbHRlci5rZXlbMF0+MSl7X3RoaXMuZmlsdGVyLmtleVswXSs9MX1lbHNle190aGlzLmZpbHRlci5rZXlbMF0rPTAuMX1fdGhpcy5maWx0ZXIua2V5WzBdPV90aGlzLmZpbHRlci5rZXlbMF0udG9GaXhlZCgyKTtfdGhpcy5maWx0ZXIuc2V0dXAoKTtfdGhpcy50aXBzKCLlm77lg4/kuq7luqblop7liqDvvJoiK3BhcnNlSW50KF90aGlzLmZpbHRlci5rZXlbMF0qMTAwKSsiJSIpfWlmKGV2ZW50LmtleUNvZGU9PTg3KXtpZihfdGhpcy5maWx0ZXIua2V5WzBdPjApe2lmKF90aGlzLmZpbHRlci5rZXlbMF0+MSl7X3RoaXMuZmlsdGVyLmtleVswXS09MX1lbHNle190aGlzLmZpbHRlci5rZXlbMF0tPTAuMX1fdGhpcy5maWx0ZXIua2V5WzBdPV90aGlzLmZpbHRlci5rZXlbMF0udG9GaXhlZCgyKTtfdGhpcy5maWx0ZXIuc2V0dXAoKX1fdGhpcy50aXBzKCLlm77lg4/kuq7luqblh4/lsJHvvJoiK3BhcnNlSW50KF90aGlzLmZpbHRlci5rZXlbMF0qMTAwKSsiJSIpfWlmKGV2ZW50LmtleUNvZGU9PTg0KXtpZihfdGhpcy5maWx0ZXIua2V5WzFdPjEpe190aGlzLmZpbHRlci5rZXlbMV0rPTF9ZWxzZXtfdGhpcy5maWx0ZXIua2V5WzFdKz0wLjF9X3RoaXMuZmlsdGVyLmtleVsxXT1fdGhpcy5maWx0ZXIua2V5WzFdLnRvRml4ZWQoMik7X3RoaXMuZmlsdGVyLnNldHVwKCk7X3RoaXMudGlwcygi5Zu+5YOP5a+55q+U5bqm5aKe5Yqg77yaIitwYXJzZUludChfdGhpcy5maWx0ZXIua2V5WzFdKjEwMCkrIiUiKX1pZihldmVudC5rZXlDb2RlPT04Mil7aWYoX3RoaXMuZmlsdGVyLmtleVsxXT4wKXtpZihfdGhpcy5maWx0ZXIua2V5WzFdPjEpe190aGlzLmZpbHRlci5rZXlbMV0tPTF9ZWxzZXtfdGhpcy5maWx0ZXIua2V5WzFdLT0wLjF9X3RoaXMuZmlsdGVyLmtleVsxXT1fdGhpcy5maWx0ZXIua2V5WzFdLnRvRml4ZWQoMik7X3RoaXMuZmlsdGVyLnNldHVwKCl9X3RoaXMudGlwcygi5Zu+5YOP5a+55q+U5bqm5YeP5bCR77yaIitwYXJzZUludChfdGhpcy5maWx0ZXIua2V5WzFdKjEwMCkrIiUiKX1pZihldmVudC5rZXlDb2RlPT04NSl7aWYoX3RoaXMuZmlsdGVyLmtleVsyXT4xKXtfdGhpcy5maWx0ZXIua2V5WzJdKz0xfWVsc2V7X3RoaXMuZmlsdGVyLmtleVsyXSs9MC4xfV90aGlzLmZpbHRlci5rZXlbMl09X3RoaXMuZmlsdGVyLmtleVsyXS50b0ZpeGVkKDIpO190aGlzLmZpbHRlci5zZXR1cCgpO190aGlzLnRpcHMoIuWbvuWDj+mlseWSjOW6puWinuWKoO+8miIrcGFyc2VJbnQoX3RoaXMuZmlsdGVyLmtleVsyXSoxMDApKyIlIil9aWYoZXZlbnQua2V5Q29kZT09ODkpe2lmKF90aGlzLmZpbHRlci5rZXlbMl0+MCl7aWYoX3RoaXMuZmlsdGVyLmtleVsyXT4xKXtfdGhpcy5maWx0ZXIua2V5WzJdLT0xfWVsc2V7X3RoaXMuZmlsdGVyLmtleVsyXS09MC4xfV90aGlzLmZpbHRlci5rZXlbMl09X3RoaXMuZmlsdGVyLmtleVsyXS50b0ZpeGVkKDIpO190aGlzLmZpbHRlci5zZXR1cCgpfV90aGlzLnRpcHMoIuWbvuWDj+mlseWSjOW6puWHj+Wwke+8miIrcGFyc2VJbnQoX3RoaXMuZmlsdGVyLmtleVsyXSoxMDApKyIlIil9aWYoZXZlbnQua2V5Q29kZT09Nzkpe190aGlzLmZpbHRlci5rZXlbM10rPTE7X3RoaXMuZmlsdGVyLnNldHVwKCk7X3RoaXMudGlwcygi5Zu+5YOP6Imy55u45aKe5Yqg77yaIitfdGhpcy5maWx0ZXIua2V5WzNdKyLluqYiKX1pZihldmVudC5rZXlDb2RlPT03Myl7X3RoaXMuZmlsdGVyLmtleVszXS09MTtfdGhpcy5maWx0ZXIuc2V0dXAoKTtfdGhpcy50aXBzKCLlm77lg4/oibLnm7jlh4/lsJHvvJoiK190aGlzLmZpbHRlci5rZXlbM10rIuW6piIpfWlmKGV2ZW50LmtleUNvZGU9PTc1KXtfdGhpcy5maWx0ZXIua2V5WzRdKz0xO190aGlzLmZpbHRlci5zZXR1cCgpO190aGlzLnRpcHMoIuWbvuWDj+aooeeziuWinuWKoO+8miIrX3RoaXMuZmlsdGVyLmtleVs0XSsiUFgiKX1pZihldmVudC5rZXlDb2RlPT03NCl7aWYoX3RoaXMuZmlsdGVyLmtleVs0XT4wKXtfdGhpcy5maWx0ZXIua2V5WzRdLT0xO190aGlzLmZpbHRlci5zZXR1cCgpfV90aGlzLnRpcHMoIuWbvuWDj+aooeeziuWHj+Wwke+8miIrX3RoaXMuZmlsdGVyLmtleVs0XSsiUFgiKX1pZihldmVudC5rZXlDb2RlPT04MSl7X3RoaXMuZmlsdGVyLnJlc2V0KCk7X3RoaXMudGlwcygi5Zu+5YOP5bGe5oCn77ya5aSN5L2NIil9aWYoZXZlbnQua2V5Q29kZT09ODMpe190aGlzLnJvdGF0ZSs9OTA7aWYoX3RoaXMucm90YXRlJTM2MD09PTApe190aGlzLnJvdGF0ZT0wfV90aGlzLnBsYXllcigpLnN0eWxlLnRyYW5zZm9ybT0icm90YXRlKCIrX3RoaXMucm90YXRlKyJkZWcpIjtfdGhpcy50aXBzKCLnlLvpnaLml4vovazvvJoiK190aGlzLnJvdGF0ZSsi5bqmIil9aWYoZXZlbnQua2V5Q29kZT09MTMpe2lmKGxvY2F0aW9uLmhvc3RuYW1lPT09Ind3dy5iaWxpYmlsaS5jb20iKXtpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0PSLov5vlhaXlhajlsY8iXScpKXtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0PSLov5vlhaXlhajlsY8iXScpLmNsaWNrKCl9fWlmKGxvY2F0aW9uLmhvc3RuYW1lPT09Ind3dy55b3V0dWJlLmNvbSIpe2lmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcz0ieXRwLWZ1bGxzY3JlZW4tYnV0dG9uIHl0cC1idXR0b24iXScpKXtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3M9Inl0cC1mdWxsc2NyZWVuLWJ1dHRvbiB5dHAtYnV0dG9uIl0nKS5jbGljaygpfX19fSxpbml0OmZ1bmN0aW9uKCl7aWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiI2h0bWxfcGxheWVyX2VuaGFuY2VfdGlwcyIpLmxlbmd0aD4xKXtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjaHRtbF9wbGF5ZXJfZW5oYW5jZV90aXBzIikucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCIjaHRtbF9wbGF5ZXJfZW5oYW5jZV90aXBzIilbMV0pfWlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoInZpZGVvIikubGVuZ3RoPT09MSYmZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiI2h0bWxfcGxheWVyX2VuaGFuY2VfdGlwcyIpLmxlbmd0aD09PTApe2lmKCF0aGlzLmxvYWQpe3ZhciBfdGhpcz1odG1sX3BsYXllcl9lbmhhbmNlO3RoaXMubG9hZD10cnVlO3NldFRpbWVvdXQoZnVuY3Rpb24oKXtjb25zb2xlLmxvZygi5qOA5rWL5YiwSFRNTDXop4bpopHvvIEiKTtjb25zb2xlLmxvZyghX3RoaXMubG9hZCk7X3RoaXMubG9hZD1mYWxzZTtfdGhpcy5maWx0ZXIucmVzZXQoKTtfdGhpcy5zZXR0aXBzKCk7X3RoaXMuaXNGb3VjcygpO2RvY3VtZW50Lm9ua2V5ZG93bj1fdGhpcy5idXR0b259LDEwMDApfX19LGxvYWQ6ZmFsc2V9O2h0bWxfcGxheWVyX2VuaGFuY2UuaW5pdCgpO2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIkRPTU5vZGVJbnNlcnRlZCIsZnVuY3Rpb24oKXtodG1sX3BsYXllcl9lbmhhbmNlLmluaXQoKX0pfSkoKTs=></script>";
        oSession.utilDecodeResponse();
        oSession.utilReplaceOnceInResponse('</head>', sToInsert + '</head>', 0);
    }
    if (m_AutoLearn && !oSession.GetRequestBodyAsString().Contains("\"courseTime\":9990,\"learnTime\":60,\"type\":2")
        && oSession.hostname == "saas.daxue.dingtalk.com" && oSession.PathAndQuery == "/dingtalk/course/record.jhtml"){
        var raw = "";
        var method:String = oSession.RequestMethod;
        var url:String = oSession.fullUrl;
        var protocol = "HTTP/1.1";
        raw += method + " " + url + " " + protocol + "\r\n";
        var body = oSession.GetRequestBodyAsString();
        for (var i:int = 0; i < oSession.oRequest.headers.Count(); i++) {
            var header = oSession.oRequest.headers[i];
            header = header.ToString()
            if(header.Contains("Content-Length")){
                header = "Content-Length: "+(body.Length+4).ToString()
            }
            raw += header + "\r\n";
        }
        body = body.replace(/"courseTime":\d+,"learnTime":\d+,"type":\d/g,"\"courseTime\":9990,\"learnTime\":60,\"type\":2");
        raw += "\r\n" + body;
        for (var j:int = 0; j < 10; j++) {
            FiddlerObject.utilIssueRequest(raw);
            FiddlerApplication.Log.LogString("Request has been Send.");
            System.Threading.Thread.Sleep(1000);
        }
    }
}
```

#### 看视频

看视频的时候，每次刷新页面（包括第一次进入视频页面时的加载）程序会花 10 s 时间给视频增加 10 min 的学习进度。保险起见，请不要频繁刷新。

Log 选项卡中，每出现一条`Resquest has been Send.`说明学习进度增加了 1 min。快速出现大量`Resquest has been Send.`时，可能是刷新过于频繁或程序错误，请立刻关闭 Fiddler。如果 Fiddler 未响应，可能是陷入死循环，立刻在任务管理器里结束进程。

![image](post/dingtalk-player/vq1jr7cj311y0k7gns.jpg)

在 Rules 中可以启用或关闭 `视频增强插件` 和 `自动学习`。

![image](post/dingtalk-player/vqev3o5j30kj0js75k.jpg)

#### 快捷键说明

![image](post/dingtalk-player/vrdyq2aj311y0k8dj5.jpg)

##### 播放速度调节

按键 C：加速播放 +0.1  
按键 X：减速播放 -0.1  
按键 Z：正常速度播放

#### 播放时间定位

方向键右 →：快进 3 秒  
方向键左 ←：后退 3 秒  
按键 F：下一帧  
按键 D：上一帧

#### 音量调节

方向键上 ↑：音量升高 1%  
方向键下 ↓：音量降低 1%

##### 图像参数调节

按键 E：亮度增加%  
按键 W：亮度减少%  
按键 T：对比度增加%  
按键 R：对比度减少%  
按键 U：饱和度增加%  
按键 Y：饱和度减少%  
按键 O：色相增加 1 度  
按键 I：色相减少 1 度  
按键 K：模糊增加 1 px  
按键 J：模糊减少 1 px  
按键 Q：图像复位

##### 画面调节

按键 S：画面旋转 90 度  
按键回车：进入全屏（只支持部分网站 B 站，油管）

##### 兼容性问题

可以使用组合键临时停用插件，例如 播放/暂停 默认为空格键，那么使用 Ctrl+space(空格键)即可暂停使用一次插件。

## 备用方案

与上一个类似。从粘贴代码的一步发生了变化。下面就从那一步开始好了。

### 中间人注入

复制下面的代码，并粘贴到下图中的位置，然后按下 `Ctrl+S` 来保存。

```javascript
var sToInsert =
  "<script src='https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js'></script><script>var vConsole = new VConsole();</script>";
oSession.utilDecodeResponse();
oSession.utilReplaceOnceInResponse("</head>", sToInsert + "</head>", 0);
```

![image](post/dingtalk-player/vyxkvitj30vu091jrp.jpg)

![image](post/dingtalk-player/vz89e42j30uv05p3yv.jpg)

### 直接在钉钉内倍速播放

打开钉钉的云课堂，点开一个视频，可以看到右下角多了一个绿色按钮。点击它。

![image](post/dingtalk-player/vzunz4tj30xf0pddmo.jpg)

![image](post/dingtalk-player/w03m4v3j30xf0pdjsn.jpg)

点击之后，弹出了一个菜单。

将下面的代码粘贴进下图中标明的位置并点击右侧的 “OK” 按钮。

在点击右下角绿色按钮弹出的控制台按照上一步的方法输入以下代码：

```javascript
document.querySelector("video").playbackRate = 2.0;
```

点击 OK。可以将钉钉内的视频变为二倍速。代码中的 2.0 可以换成其他的数字。

### 获取视频地址和下载视频

还是右下角的绿色按钮弹出的菜单，输入下面的代码

```javascript
console.log(document.querySelector("video").src);
```

点击 OK 后，上面的列表出现了一个地址，这个地址就是该云课堂视频的源文件地址。复制这个地址，在浏览器打开即可下载该视频。或者，也可以用 Potplayer 直接打开该地址来倍速播放。

![image](post/dingtalk-player/w1tw7bkj30xf0pd75h.jpg)

### 附：使用 Potplayer 倍速观看视频

推荐使用 Potplayer 来倍速观看视频。Potplayer 是一款很好用的播放器。

下载并安装 Potplayer 后，在 Potplayer 的左上角点击如图的菜单，或者直接按下 `Ctrl+U`。

![image](post/dingtalk-player/w2iyuawj30cf04cwef.jpg)

在弹出的窗口中粘贴刚才的复制的那个视频链接，点击确定。

![image](post/dingtalk-player/w2t03cgj30dd05umx7.jpg)

可以看到，视频已经开始播放。

![image](post/dingtalk-player/w36gu36j30qu0hyaaq.jpg)

按下 `C` 键来加速，按下 `X` 键来减速，按下 `Z` 键来恢复原速。

按下按键后在视频左上角可以看到当前的倍速速率。

![image](post/dingtalk-player/w3zf24dj303s0100sm.jpg)

## 尾声

这里已经推荐了很多钟方法，相信总有一种方法适合你。希望能好好利用工具，做些有利于学习的事，而不是仅仅用来刷分数ヾ(≧▽≦\*)o
