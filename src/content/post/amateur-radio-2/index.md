---
title: '业余无线电进阶玩法'
description: '简单呼中继以外的进阶玩法。因为玩法太多，所以单独开一篇文章继续记录'
publishDate: '2024-10-07'
updatedDate: '2024-10-11'
tags: ['Radio', 'HAM']
heroImage: { src: './thumbnail.jpg', color: '#56C4FF' }
---

## 信号调制模式

> 部分内容摘自 [模拟信号调制解调----AM、FM调制解调原理分析](https://zhuanlan.zhihu.com/p/461218164)

- AM 调幅，使载波的振幅随调制信号的变化规律而变化。航空波段（Airband，108Mhz到137Mhz）就是这个（更多航空波段知识可阅读 [航空波段为什么使用调幅制式？](https://zhuanlan.zhihu.com/p/60645454)）。
- FM 调频，载波的瞬时频率随调制信号成线性变化的一种调制方式。分为两种：wfm 宽带就是调频广播，nfm 窄带就是业余无线电常用的调制方式。
- CW 等幅波（Continuous Wave），既不调幅也不调频，靠通断实现通信，一般指等幅电报通信。
- DSP 双边带信号，由调制信号和载波信号直接相乘得到的，它只有上下边带分量，没有载波分量。
- SSB 单边带信号，通过滤除双边带信号的一个边带而得到。USB 和 LSB 同属单边带调制波（SSB），一个是上边带调制，一个是下边带调制。

## 日志

ADIF（Amateur Data Interchange Format，[官网](https://adif.org/)）是一种约定俗成的通用日志格式，一般为按照特定格式的纯文本文件，文件后缀为 `adi`。

其中你的每一条日志通联信息被称为一条 QSO。

本地记录程序：

- [Ham2K Portable Logger](https://polo.ham2k.com/) ([Github](https://github.com/ham2k/app-polo))
  [Google Play](https://play.google.com/store/apps/details?id=com.ham2k.polo.beta) | [AppStore](https://apps.apple.com/app/id6478713938)

云端存储服务方案：

- [QRZ Logbook](https://logbook.qrz.com/logbook)
- [Clu Log](https://clublog.org/loginform.php)
- [LOTW / ARRL](https://lotw.arrl.org)

> 相关资料： [qrz.com 以及 lotw 的使用以及设置](https://forum.hamcq.cn/d/1395)

上传工具：

> TQSL 使用教程（还教你了如何注册 LOTW）：[LOTW如何注册？业余无线电lotw通联日志本注册、上传、台站设置保姆级教程](https://www.bilibili.com/video/BV1294y157pY)
>
> 一个很方便的多平台第三方上传工具：[yzwcfhmy/X-QSL业余无线电ADIF工具 - Gitee](https://gitee.com/yuzhenwu/x-qsl-amateur-radio-adif-tool/)（使用讲解视频：[QSO效率翻倍！一句话上传通联日志，一键同步多个平台！](https://www.bilibili.com/video/BV15r42137EW)）

比如下面这个 iframe 就展示了我在 QRZ 上上传的通联日志：

<div align='center'>
  <iframe
    align='top'
    frameborder='0'
    height='320'
    scrolling='yes'
    src='https://logbook.qrz.com/lbstat/BH8GHG/'
    width='600'
    style='border-radius:10px'
  ></iframe>
</div>

## 通联卫星

### 数据查找

[常用业余无线电 FM 卫星频率转发表](https://zhuanlan.zhihu.com/p/677448421)

卫星状况查询：

- AMSAT-NA：https://www.amsat.org/
- AMSAT-UK：https://amsat-uk.org/
- AMSAT 卫星状态查询：http://www.amsat.org/status/
- JE9PEL 业余卫星频率表：http://www.ne.jp/asahi/hamradio/je9pel/satslist.htm
- DK3WN 频率表：www.dk3wn.info/p/?page_id=29535

- [AMSAT](https://www.amsat.org/)

对于卫星数据查找：

- [N2YO](https://www.n2yo.com/)
- [Heavens Above](https://www.heavens-above.com/AmateurSats.aspx?lat=29.060973&lng=119.657291&loc=Unspecified&alt=0&tz=ChST)
- 微信小程序：云端卫星
- Android App: Look4Sat

## 短波

直接看文章，什么是短波通信、具体通联方式：[业余无线电的成长之路——短波篇](https://mp.weixin.qq.com/s/DhOM2G1NMPohU4gPhCWdiQ)

短波最好是单独架设优质天线。摘自 [城市业余无线电爱好者天线解决方案：“鱼竿”天线 – GP天线的制作](https://zhuanlan.zhihu.com/p/676718325)，其文中写的笔者手搓的“鱼竿”天线很有意思，有兴趣的可以阅读。

短波天线：

- 第一类——垂直地网天线（GP天线），这种天线架设形式简单，最易于安装，如果有足够数量的地网增加辐射，效率堪比偶极天线。由于GP天线的发射仰角较低，所以其作为简单有效的DX利器不可或缺。缺点就是噪音大。
- 第二类——偶极天线（DP天线），常见的架设形式有倒V、正V、水平等形式，DP天线的效率相对要比GP天线高很多，且噪音要比GP天线低很多，但是占地面积大，单人架设安装不是很方便。
- 第三类——指向性天线“八木”（YAGI）。这种天线通常是由一个主振子、一个反射器和多个引向器单元组成。八木天线的效率高、方向性强，依照天线的尺寸，在所指方向拥有较高增益。

## SDR

软件无线电，即 Software Defined Radio，SDR。通俗来讲，SDR就是基于通用的硬件平台上用软件来实现各种通信模块。

概念中有两个关键词，“通用硬件平台”和“软件”。“通用硬件平台”就是说我们能基于这个硬件平台实现各种各样的通信功能，而不是说一个硬件平台只能实现一种通信功能。“软件”来实现通信模块是相对于传统的无线电技术来讲的，传统的无线电通信模块都是用硬件电路来设计，一个通信电路

只能完成一种通信功能，开发周期长，开发成本高，而且一旦设计好后功能就无法改变。软件化可以加快通信模块的开发速度，降低开发成本，便于调试和维护。

我们可以用下图来简单看看软件无线电基站与传统的无线电基站的区别。图片左边的是传统的大基站，图片右边的是基于软件无线电的小型化基站。传统的商用基站体积较大，需要设计很多专用的硬件电路；而SDR基站体积较小，大部分通信功能由软件实现。

![sdr](./sdr.jpg)

如果你看完上文短波心血来潮想要听听，但是手里设备不支持短波或短波接收效果很差，那这里的在线 SDR 想必能撩动你的心扉。

> 一个不知道是啥的 SDR 在线收听站（需要注册，没有尝试过，不知道怎么归类了，先放这里）：[SDR在线收听站](https://sdr.cqradio.cn/)

### WebSDR

什么是 WebSDR？

与传统的接收机相比，WebSDR是连接到互联网的软件定义无线电接收器，允许很多接收者独立收听和同时调节接收频率模式等参数。SDR技术使收听者独立调节成为可能，收听不同的信号；与传统的接收机相比已经实现了互联网化。如果想测试不同天线、设备的DX发射效果，可以打开WebSDR页面，选择某个位置的WebSDR作为接收机，调谐到合适的频率，看能否收到自己发射的信号，以对比不同天线、功率的发射效果。

[Web SDR](http://www.websdr.org) 给出了世界上各大洲的 WebSDR 接收机的链接地址，其中业余无线电用户比较多的欧洲、美国的WebSDR接收机比较多。

目前 WebSDR 维护人好像是荷兰的 [PA3FWM](https://www.qrz.com/db/PA3FWM)

还有一些 SDR 网站列表（好像 WebSDR 官网就能查所有活跃的）：

- 荷兰：<http://websdr.ewi.utwente.nl:8901>
- 美国：<http://websdr1.kfsdr.com:8901>
- 德国：<http://kiwisdr.inf.dhbw-ravensburg.de:8073>
- 俄罗斯：<http://sdr.r9a.ru>
- 巴西：<http://appr.org.br:8905>
- 英国：<https://eshail.batc.org.uk/nb>
- 安道尔公国：<http://sdr.radioandorra.org>
- 俄罗斯：<http://websdr.srr76.ru>
- 荷兰：<http://sdr.websdrmaasbree.nl:8901>
- 美国：<http://websdr.k3fef.com:8901>

### KiwiSDR

> 摘自 [推荐一个比WebSDR更好玩的KiwiSDR](https://www.hellocq.net/forum/read.php?tid=354420)

KiwiSDR 较 WebSDR 的优点：

1. 使用 Kiwi 板子，频率均为范围是 0~32MHz，而WebSDR使用各种板子频宽不统一；
2. 软件Web操作界面友好，体验好，持续维护，而WebSDR体验极差，特别是手机H5页面，作者几乎不维护了；
3. 硬件开源！可以自行打板，也可以在 eBay 购买。
4. 预置常用频率（特别是业余段）
5. AM广播的音质接近立体声

官网：[KiwiSDR: Wide-band SDR + GPS cape for the BeagleBone Black](http://kiwisdr.com/) | [Github](https://github.com/jks-prv/Beagle_SDR_GPS)

一些能用的列表：

- 美国纽约：<http://www.jimlill.com:8073/>
- 日本：<http://ja0veu.hopto.org:8073/>

（懒得写了，官网有 [可用列表](http://kiwisdr.com/public/) 以及 [地图1](http://rx.linkfanel.net/) | [地图2](https://ve3sun.com/KiwiSDR/index.php)）

## SSTV

推荐文章：

- [BA7LCE的业余无线电基础课——4 业余无线电中的SSTV](https://www.bilibili.com/video/BV1ex1qYSE2y)
- [用MMSSTV发送和接收图片](https://zhuanlan.zhihu.com/p/105460358)

对于 PC 端的 MMSSTV，因为 SSTV 传输方式的抗干扰普遍很差，所以自己玩建议使用转换软件：

- MMV 转 WAV：[MMV2WAV](https://hamsoft.ca/pages/extras-add-on/mmv2wav.php)（MMSSTV 作者提供）
- WAV 转 MMV：[p0dalirius/wav2mmv - Github](https://github.com/p0dalirius/wav2mmv/) | [Simple gist version](https://gist.github.com/lofaldli/8e46b92bbd9d2fbbaa9f8f2ee70dae55)（目前只找到 ShellScript 版本，但是支持 Cygwin 类 unix 终端运行，即 Git bash、msys2 之类的都可以跑，刚需 FFmpeg）

此外还有一些小工具：

- 虚拟声卡：[VB-Audio Virtual Apps](https://vb-audio.com/Cable/index.htm)
- SSTV 各种功能小工具：[SSTV Tools](http://dxatlas.com/SstvTools/)
- 在线 SSTV 生成：[SSTV Generator](https://www.vr2woa.com/sstv/)

[[待补充]]
