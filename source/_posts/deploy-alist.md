---
title: Alist 自建0成本部署
date: 2022-12-15 02:06:47
categories: 教程
tags:
  - Alist
thumbnail: "thumbnail.jpg #2f76d7"
---

Alist 是一款支持多种存储的目录文件列表程序，后端基于 `gin`，前端使用 `react`。

<!-- more -->

这里提供 Alist 官方的传送门：[Github](https://github.com/alist-org/alist) | [Demo](https://pan.nn.ci/) | [文档](https://alist.nn.ci/zh/)

不过本节将重点讨论使用 Render 部署 Alist 的方法。

## Fork 仓库

首先，我们需要 Fork 一份 Alist-render 的仓库。（不会的自己使用搜索引擎）

Alist 仓库地址：[Github](https://github.com/alist-org/alist-render)

## 修改配置

前往 fork 的仓库，修改 render.yaml 内的 `repo` 配置为自己的仓库地址。

## 创建数据库

Alist 需要一个数据库，可选 sqlite3、mysql、postgres。这里选用提供免费服务的 [ElephantSQL](https://www.elephantsql.com/)。

进入官网：[ElephantSQL](https://www.elephantsql.com/)，点击位于页面中央的 `Get a managed database today`

![](post/deploy-alist/62a5ea8d2548b.png)

选择海龟样子的 `Free` 计划

![](post/deploy-alist/62a5eab45c34f.png)

会进入登陆页面，可以使用 Github 进行授权登陆。之后会来到控制台，我们选择绿色的 `Create New Instance` 创建一个新的数据库。名称和 Tag 随意填写，方案是默认的 Free 方案。

![](post/deploy-alist/1671194703990.png)

接下来的地区可以随意选择，优先选择高亮的地区；如我选的 `AP-East-1 (Hong Kong)`。这样我们就获得了一个免费的 `postgres` 类型的数据库。注意详情页的如下配置，后面会用到。

![](post/deploy-alist/1671195753013.png)

## Render 部署

进入官网：[Render](https://render.com/)，点击右上角的 `GET STARTED` 注册账号。

注册完成后，点击右上角的 `New +`，选择 `Web Service`，并在授权 Github 时连接刚刚 Fork 的 Alist 仓库。

![](post/deploy-alist/1671195753256.png)

下一步先随便取个名字，然后拉到底部点击 `Advanced`，录入需要的环境变量。

![](post/deploy-alist/1671196295276.png)

|  变量参数   |             示例参数             |    数据库详情页对应     |     说明     |
| :---------: | :------------------------------: | :---------------------: | :----------: |
|   DB_HOST   |    queenie.db.elephantsql.com    |         Server          |  数据库地址  |
|   DB_NAME   |              bkqgx               | User & Default database |  数据库名字  |
|   DB_PASS   | 5CqBjEVZWdaaad2333aadadadadN3Clo |        Password         |  数据库密码  |
|   DB_PORT   |               5432               |                         |  数据库端口  |
| DB_SSL_MODE |             disable              |                         |   SSL 模式   |
|   DB_TYPE   |             postgres             |                         |  数据库类型  |
|   DB_USER   |              bkqgx               | User & Default database | 数据库用户名 |
|    PORT     |               8080               |                         |     端口     |

::: collapse 关于 DB_SSL_MODE

用于给数据连接提供 SSL 加密保护。其中：

- sqlite3 数据库：请忽略该参数
- mysql 数据库：参数有 `true`, `false`, `skip-verify`, `preferred`, 选一个填
- postgres 数据库：参数有 `disable`，`allow`，`prefer`，`require`，`verify-full`，选一个填

我用的 postgres 数据库填的是 `disable`，也就是没用 SSL；大家按需选择即可。

:::

注：为了提升访问速度，建议额外配置环境变量 `CDN` 为 `https://npm.elemecdn.com/alist-web@【NPM官网查到的最新版本号】/dist/`，能一定程度上加快网页打开速度。

## 保持唤醒

由于 Render 15 分钟没访问会休眠，所以我们可以注册一个 [Uptimerobot](https://uptimerobot.com/) 或 [Checklyhq](https://www.checklyhq.com/) 类似的这种监视网站，添加一个监控，24 小时定时访问 render 上的项目，render 就不会休眠了。

> Render 原本的免费计划是每月允许总共使用 750 小时，似乎是不计流量的，就部署一个项目来说完全够用。但是 render 官方宣布定价将从 2023 年 1 月 1 日开始更改，从每月使用 750 小时，改为了每月免费带宽 100GB 的流量。

## 问题解决

由于搭建的人开始变多，Render 官方也开始对 Alist 项目进行限制，导致部分人无法正常部署。解决方案：

- 修改自己的仓库名，避免出现 Alist 字眼；
- 将 `render.yaml` 中的 `repo` 配置为自己的仓库地址。

最后感谢 [檐牙](https://www.zxma.top/) 提供的[参考](https://www.zxma.top/posts/438365eb)。
