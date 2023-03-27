---
title: 米哈游游戏（原神/崩坏3）自动签到
date: 2022-04-17 17:10:14
categories:
  - 教程
tags:
  - Mihoyo
  - Python
  - Serverless
---

这是一个关于 [原神签到小助手](https://github.com/y1ndan/genshinhelper2) 的指导教程。

<!-- more -->

写这个文档，是因为开发者自己写的文档太乱了。我也花了很长时间才彻底看懂。。

## 项目相关

> genshinhelper 从 v2.0.0 开始，分为 genshinhelper2 和 genshin-checkin-helper 两个项目，同时分离出 onepush 推送包。

### 前言

原神是少有的游戏本体和签到福利分离的游戏，玩家为了签到还要额外下载米游社 App。

平心而论，目前的每日签到奖励真的不咋地，都知道是蚊子腿。事实上，你完全可以选择无视签到，不签也没啥大的损失；或者选择手动签到，但这样的话哪天忘记打卡了就很头疼。

为了原石、摩拉和紫色经验书等签到奖励，这个项目应运而生，可以实现自动每日签到。

### 简介

`genshinhelper`（原神签到小助手），前身为 `genshin-impact-helper`，可以自动化为你获取原神每日福利。

### 功能支持

- 支持订阅推送
- 支持多个账号以及一个账号下的多个角色
- 米游社原神/崩坏 3 的每日签到
- 米游社的米游币获取任务
- 原神超话功能 活动监测 + 领兑换码 + 多方推送
- 支持原神多种服务器（天空岛/世界树/America/Europe/Asia/SAR）
- 原神微信积分商城签到
- 云原神时长活动签到

### 源码

- genshinhelper2（[Github](https://github.com/y1ndan/genshinhelper2) | [Gitlab](https://gitlab.com/y1ndan/genshinhelper2)）- 签到相关的封装库，不能开箱即用。

- [genshin-checkin-helper](https://gitlab.com/y1ndan/genshin-checkin-helper) - 签到主程序。
- [onepush](https://github.com/y1ndan/onepush) - 一个简单易用的推送包。

## 运行方式与环境搭建

![](post/mihoyo-helper/runway-choose.jpg)

::: collapse 方案 1 终端运行

终端运行 `genshinhelper` or `python -m genshinhelper`可以直接运行签到脚本。

:::

::: collapse 方案 2 云函数运行（推荐）

> 注意：`v1.5.0+` 版本增加了随机延迟功能，默认为 10-300s。故云函数的`执行超时时间`应设置为大于变量中的 `MAX_SLEEP_SECS`（最大休眠秒数）。

这里以腾讯云函数为例。阿里云方法类似。

[云函数版文件下载](https://wwa.lanzoui.com/b07mk6dla) 密码：ed03

前往 [云函数 SCF 管理控制台](https://console.cloud.tencent.com/scf/) -->`函数服务`-->`新建`-->`自定义创建`-->`基础配置`-->`本地上传zip包`-->`上传`-->`本地上传zip包`--> 选择下载的`genshinhelper-xxx-serverless.zip`压缩包-->`完成`

![](post/mihoyo-helper/new-server.png)

前往`genshinhelper`-->`函数管理`-->`函数配置`-->`编辑`

![](post/mihoyo-helper/edit-config.png)

此处可以编辑环境变量。同时建议修改`执行超时时间`为`600`秒。

![](post/mihoyo-helper/add-variables.png)

前往`genshinhelper`-->`触发管理`-->`新建触发器`--> 按下图进行配置。当然你也可以添加一个 `API 网关`，方便手动强制执行。

![](post/mihoyo-helper/triggers.png)

:::

::: collapse 方案 3 Docker 运行

使用以下命令拉取镜像：

```bash
docker pull yindan/genshinhelper
```

你也可以在 [Docker Hub](https://registry.hub.docker.com/r/yindan/genshinhelper/) 上找到该仓库。

在下列命令中， `COOKIE_MIHOYOBBS` 代表环境变量名字， `<COOKIE_MIHOYOBBS>` 代表 `COOKIE_MIHOYOBBS` 对应的值；`DISCORD_WEBHOOK` 同理。

> 应当注意，这里的 `COOKIE_MIHOYOBBS`和 `DISCORD_WEBHOOK`只是教程使用的例子，并非必须字段。
> 如果你是国际服则应该配置 `COOKIE_HOYOLAB`而不是 `COOKIE_MIHOYOBBS`；不使用 Discord 推送，可以不配置 `DISCORD_WEBHOOK`。

- 基本使用

```bash
docker run -d --name=genshinhelper \
-e COOKIE_MIHOYOBBS="<COOKIE_MIHOYOBBS>" \
-e DISCORD_WEBHOOK="<DISCORD_WEBHOOK>" \
--restart always \
yindan/genshinhelper:latest
```

- 高级使用

Docker 会在每天早上 `6:00` 触发签到任务。可以使用 `CRON_SIGNIN` 参数自定义触发时间。

例如触发时间使用的是北京时间：

```bash
docker run -d --name=genshinhelper \
-e COOKIE_MIHOYOBBS="<COOKIE_MIHOYOBBS>" \
-e DISCORD_WEBHOOK="<DISCORD_WEBHOOK>" \
-e CRON_SIGNIN="0 7 * * *" \
--restart always \
yindan/genshinhelper:latest
```

如果你想使用 `config.json` 配置文件（这部分会在 `配置`章节讲解），则可以使用以下命令映射文件夹。

假设你的配置文件位于 `/etc/genshin/config.json`。

```bash
docker run -d --name=genshinhelper \
-v /etc/genshin:/app/genshincheckinhelper/config \
--restart always \
yindan/genshinhelper:latest
```

- 常用命令

```bash
# 查看日志
$ docker logs -f genshinhelper --tail 100

# 重启
$ docker restart genshinhelper

# 更新
$ docker pull yindan/genshinhelper
$ docker rm -f genshinhelper
# 之后依据基本使用或高级使用重新部署

# 卸载
$ docker rm -f genshinhelper
$ docker image rm genshinhelper
```

:::

::: collapse 方案 4 使用 PyPI Package 运行

使用 [pypi 包](https://pypi.org/project/genshinhelper/) 进行安装：

```bash
pip install genshinhelper
```

你需要先在主机中添加环境变量，或者使用 `pip show genshinhelper` 查看包的安装位置，找到并编辑 `config.json` 配置文件。

如果你已经完成前置要求，使用以下命令运行项目:

```bash
python -m genshinhelper
```

:::

## 配置与操作

### 配置项

其实就是云函数里面的环境变量或者其他方式下的 Config 文件。

下面的配置项并非每一项都要填写，根据需要填即可。

| 变量名                  | 默认值 | 描述                                                                                                   |
| :---------------------- | :----: | :----------------------------------------------------------------------------------------------------- |
| LANGUAGE                |   en   | 项目语言。目前支持中文(zh)和英文(en)。                                                                 |
| MAX_SLEEP_SECS          |  300   | 最大休眠秒数。自 v1.5.0 添加了运行前随机延迟，设置此参数可自定义延迟，秒数应该＞ 10                    |
| RANDOM_SLEEP_SECS_RANGE | 0-300  | 随机延迟休眠秒数范围。设置成"0-0"为取消延迟                                                            |
| RUN_ENV                 |  prod  | 是否延迟执行。设置为任意非默认值即可跳过随机延迟                                                       |
| CHECK_IN_TIME           |        | （云函数无需配置此项）每日签到时间，只运行环境的时间有关。对于 Docker 可以用 TZ=Asia/Shanghai 设置时区 |
| CHECK_RESIN_SECS        |        | （云函数无需配置此项）原神原粹树脂检测间隔秒数                                                         |
| ONE_PUSH                |        | 设置消息推送                                                                                           |
| COOKIE_MIHOYOBBS        |        | 米游社里原神签到需要的 Cookie 值                                                                       |
| COOKIE_BH3              |        | 崩坏 3 签到需要的 Cookie 值                                                                            |
| COOKIE_MIYOUBI          |        | 米游社执行任务获取米游币需要的 Cookie 值                                                               |
| COOKIE_HOYOLAB          |        | HoYoLAB 里原神签到需要的 Cookie 值                                                                     |
| COOKIE_WEIBO            |        | 微博超话自动签到需要的 Cookie 值，形如 `aid=xxx;gsid=xxx;s=xxx;from=xxx`                               |
| COOKIE_KA               |        | 超话活动追踪\获取兑换码需要的 Cookie 值，形如 `SUB=xxx;SUBP=xxx`                                       |
| CLOUD_GENSHIN           |        | 云原神签到得时长需要的 Cookie 值                                                                       |
| COOKIE_RESIN_TIMER      |        | 原神原粹树脂检测需要的 Cookie 值                                                                       |
| SHOPTOKEN               |        | 原神微信积分商城的 token 值（通过抓包获取）                                                            |

> Cookie 相关配置项都可以填写多个账号。不同账号的 Cookie 值之间用`#`分隔，如：`cookie1#cookie2#cookie3`

### 配置文件

对于云函数就是环境变量，所以无需配置文件。

例如只配置原神签到福利和 Discord 推送，那么配置文件除了保持完整也可以写成：

```json
{
  "COOKIE_MIHOYOBBS": "",
  "DISCORD_WEBHOOK": ""
}
```

### 获取 Cookie

你可以通过书签法执行 JS 代码。

JS 代码如下：

```javascript
javascript: (function () {
  let domain = document.domain;
  let cookie = document.cookie;
  prompt("Cookies: " + domain, cookie);
})();
```

你可以直接在开发者工具的 Console 面板直接粘贴运行，也可以将下面的链接收藏为书签（电脑拖拽到书签栏，手机需要手动添加）：

<a href="javascript:(function(){let domain=document.domain;let cookie=document.cookie;prompt('Cookies: '+domain, cookie)})();">获取 Cookie</a>

## 签到相关详解

### 原神、崩坏 3、米游社签到

对于 `COOKIE_MIHOYOBBS`、`COOKIE_BH3`、`COOKIE_MIYOUBI` 的 Cookie 值抓取，都可以直接前往米游社网站 https://bbs.mihoyo.com/ys/ 或 https://bbs.mihoyo.com/bh3/。

如果是 HoYoLAB，请前往 https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481&lang=en-us 页面抓取并填入 `COOKIE_HOYOLAB`。

> 上述 Cookie 应包含 `account_id` 和 `cookie_token` 两个字段。如果没有，建议使用浏览器的无痕/访客/隐私模式重新登陆访问。

### 微博超话签到

`COOKIE_WEIBO` 参数需要在 **微博国际版 APP** 内抓包取得。抓包时使用微博的搜索功能就能轻松获得相应请求，但请注意抓包地址为 https。

地址形如：`https://api.weibo.cn/2/xxxxxx?aid=xxx&c=weicoabroad&from=123&gsid=_xxx&i=xxx&lang=zh_CN&s=xxx&ua=iPhone12%2C1_iOS14.0.1_Weibo_intl._4330_cell&v_p=59`

在抓包结果请求头（地址 query 参数）里提取出 aid、s、gsid 和 from 参数，组合成形如 `"aid=xxx; s=xxx;gsid=xxx;from=xxx"`的形式填入。

`COOKIE_KA` 用来追踪超话活动和自动提取兑换码。事实上会在抓取 `COOKIE_WEIBO` 的时候会一起被抓取到。注意 Cookie 需要`SUB`和`SUBP`两个字段。填写形式同 `COOKIE_WEIBO`。

详细抓取教程可参考视频：[微博国际版 iOS 抓包教程](https://b23.tv/3cj7vG)

## 推送相关详解

在配置中，设置 `ONEPUSH` 变量开启推送。不支持同时使用多个推送。默认配置/格式如下：

```json
{
  "notifier": "",
  "params": {
    "markdown": false
  }
}
```

实际填写时请浓缩至一行，形如 `{"notifier":"","params":{"markdown":false}}`。如果是本地配置，请使用单引号包裹。

`ONEPUSH` 根配置：

- notifier：推送名字，如 `bark`、`dingtalk`、`discord`、`pushplus`、`qmsg`、`serverchan`、`serverchanturbo`、`telegram`、`wechatworkapp`、`wechatworkbot`、`custom` 等。
- params：推送参数，如 `markdown`、`required`、`secret` 等。

如使用 Discord Bot：

```json
ONEPUSH={"notifier":"discord","params":{"markdown":true,"webhook":"https://discord.com/api/webhooks/xxxxxx"}}
```

::: collapse 详细配置说明

> 下列参数如果 required 字段包含 'title' 或 'content'，ONEPUSH 变量中都不需要设置。例如 serverchan 不需要设置 'title'。
> 此外 custom 方式暂时不支持推送签到结果。

- bark

```json
ONEPUSH={"notifier":"bark","params":{"markdown":false,"key":"xxxxxx"}}
```

- custom

该方式比较复杂：

```json
{
  "method": "post",
  "url": "",
  "data": {},
  "retcode_key": "",
  "retcode_value": 200,
  "data_type": "data",
  "merge_title_and_desp": false,
  "set_data_title": "",
  "set_data_sub_title": "",
  "set_data_desp": ""
}
```

| 配置项               | 描述                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------------- |
| method               | 必填，请求方式。默认：post                                                                                                                                                                              |
| url                  | 必填，完整的自定义推送链接                                                                                                                                                                              |
| data                 | 选填，发送的 data。默认为空，可自行添加额外参数                                                                                                                                                         |
| retcode_key          | 必填，响应体返回的状态码的 key                                                                                                                                                                          |
| retcode_value        | 必填，响应体返回的状态码的 value                                                                                                                                                                        |
| data_type            | 选填，发送 data 的方式，可选 params                                                                                                                                                                     | json | data，默认：data |
| merge_title_and_desp | 选填，是否将标题（应用名 + 运行状态）和运行结果合并。默认：false                                                                                                                                        |
| set_data_title       | 必填，推送方式 data 中消息标题的 key                                                                                                                                                                    |
| set_data_sub_title   | 选填，推送方式 data 中消息正文的 key。有的推送方式正文的 key 有次级结构，需配合 set_data_title 构造子级，与 set_data_desp 互斥。例如：企业微信中，set_data_title 填 text，set_data_sub_title 填 content |
| set_data_desp        | 选填，推送方式 data 中消息正文的 key。例如：server 酱的为 desp，与 set_data_sub_title 互斥，两者都填则本项不生效                                                                                        |

例如写一个 ServerChan 的自定义推送。

查看文档得到 ServerChan 推送所需要的信息：

- 需要的 `url`形式为：`https://sc.ftqq.com/{SCKEY}.send`
- 发送的 `data`形式为：`{'text': test','desp':desp}`
- 消息发送成功响应体为：`{'errno': 0, 'errmsg': 'OK'}`

自定义推送配置如下：

```json
{
  "method": "post",
  "url": "https://sc.ftqq.com/{直接填写你的SCKEY}.send",
  "data": {},
  "retcode_key": "errno",
  "retcode_value": 0,
  "data_type": "data",
  "merge_title_and_desp": true,
  "set_data_title": "test",
  "set_data_sub_title": "",
  "set_data_desp": "desp"
}
```

- dingtalk

```json
ONEPUSH={"notifier":"dingtalk","params":{"markdown":true,"token":"xxxxxx",secret:"xxxxxx"}}
```

- discord

```json
ONEPUSH={"notifier":"discord","params":{"markdown":true,"webhook":"https://discord.com/api/webhooks/xxxxxx"}}
```

- pushplus

```json
ONEPUSH={"notifier":"pushplus","params":{"markdown":true,"token":"xxxxxx"}}
```

- qmsg

```json
ONEPUSH={"notifier":"qmsg","params":{"markdown":false,"key":"xxxxxx"}}
```

- serverchan

```json
ONEPUSH={"notifier":"serverchan","params":{"markdown":true,"sckey":"xxxxxx"}}
```

- serverchanturbo

```json
ONEPUSH={"notifier":"serverchanturbo","params":{"markdown":true,"sctkey":"xxxxxx"}}
```

- telegram

```json
ONEPUSH={"notifier":"telegram","params":{"markdown":false,"token":"xxxxxx","userid":"xxxxxx"}}
```

- wechatworkapp

```json
ONEPUSH={"notifier":"wechatworkapp","params":{"markdown":true,"corpid":"xxxxxx","corpsecret":"xxxxxx","agentid":"xxxxxx"}}
```

- wechatworkbot

```json
ONEPUSH={"notifier":"wechatworkbot","params":{"markdown":true,"key":"xxxxxx"}}
```

:::
