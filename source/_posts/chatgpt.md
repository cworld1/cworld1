---
title: ChatGPT 深度使用与日用方案
date: 2023-03-27 14:07:32
categories:
  - 教程
tags:
  - GPT-3.5-turbo
  - Python
---

## 前置准备

ChatGPT 是一个基于 GPT-3.5-turbo 的聊天机器人，它可以通过简单的 API 调用来实现与人类的对话。

关于如何注册 OPENAI，网上的方法已经很多了，这里不再赘述。这里简单讲解一下如何拿到 ChatGPT 的 API。

在 [ChatGPT](https://chatgpt.com/) 上注册成功账号后，在 [API](https://chatgpt.com/api) 页面中，点击 `Get API Key` 按钮，即可获得你的 API Key。

![Get ChatGPT API Key](post/chatgpt/Snipaste_2023-03-27_15-00-35.png)

## 其他办法

继续深入讲解如何利用你的 API Key 前，先简单讲述一下其他方法：

通过网站：

1. [BAI Chat](https://chatbot.theb.ai/#/chat) 就是一个干净免费的网站，完全可以直接使用，并且具备速通能力。
2. [Kliuu ChatGPT](http://k.kliuu.xyz/index.php/2023/03/19/kliuu/) 是一个个人搭建的版本，同样有速通能力，但被限制最多输入 30 字符，最多回复 220 字符。

通过 Telegram：

1. [BAI](https://t.me/littleb_gptBOT) 就是上边提到的 BAI Chat 的 Telegram 版本，速度还算快，体验不错。
2. [BAI White](https://t.me/TheB_AI_Bot) BAI Chat 的镜像版本。
3. [ChatGPT OpenAI Bot](https://t.me/OpenAI_GPT_Chatbot) 甚至提供语音发送回复，但有 10 秒冷却（等于没有）。

## ChatGPT 与 Telegram

如果你对隐私、速度、安全或者单纯自定义有一定的要求，可以尝试自己搭建 Telegram 机器人，拥有更多的灵活度和更快的响应。更多信息详见 Github 项目 [TBXark/ChatGPT-Telegram-Workers](https://github.com/TBXark/ChatGPT-Telegram-Workers)，下面也简单讲解一下部署流程。

::: timeline

- 创建 Telegram 机器人

  首先，你需要一个 Telegram 账号，然后在 [BotFather](https://t.me/BotFather) 上创建一个机器人，按照提示操作即可。

- 部署 Workers

  1. 在 [Cloudflare Workers](https://dash.cloudflare.com/sign-up/workers) 上注册账号
  2. 点击右上角的 Create a Service
  3. 进入新建的 workers，选择 Quick Edit，将 [../dist/index.js](https://github.com/TBXark/ChatGPT-Telegram-Workers/blob/master/dist/index.js) 代码复制到编辑器中，保存。

  ![Alt text](post/chatgpt/Snipaste_2023-03-27_15-17-14.png)

- 配置环境变量

  前往你的 Workers,点击右上角的 Setting -> Variables，设置下述变量。

  > 带 \* 的为必设置，带 ^ 的为推荐设置

  | 变量名                      | 简述                        | 默认值               | 特殊说明                                                                                               |
  | --------------------------- | --------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------ |
  | \*API_KEY                   | OpenAI API Key              | `null`               |                                                                                                        |
  | \*TELEGRAM_AVAILABLE_TOKENS | 支持多个 Telegram Bot Token | `null`               | 多个 Token 用`,`分隔                                                                                   |
  | \*CHAT_WHITE_LIST           | 聊天 ID 白名单              | `null`               | 多个 ID 用`,`分隔，不知道 ID，和[机器人](https://t.me/username_to_id_bot)聊一句就能返回                |
  | I_AM_A_GENEROUS_PERSON      | 关闭白名单，允许所有人访问  | `false`              | 鉴于很多人不想设置白名单，或者不知道怎么获取 ID，所以设置这个选项就能允许所有人访问， 值为`true`时生效 |
  | AUTO_TRIM_HISTORY           | 自动清理历史记录            | `true`               | 为了避免 4096 字符限制，将消息删减                                                                     |
  | MAX_HISTORY_LENGTH          | 最大历史记录长度            | `20`                 | `AUTO_TRIM_HISTORY开启后` 为了避免 4096 字符限制，将消息删减                                           |
  | CHAT_MODEL                  | open ai 模型选择            | `gpt-3.5-turbo`      |                                                                                                        |
  | SYSTEM_INIT_MESSAGE         | 系统初始化信息              | `你是一个得力的助手` | 默认机器人设定                                                                                         |
  | SYSTEM_INIT_MESSAGE_ROLE    | 系统初始化信息角色          | `system`             | 默认机器人设定                                                                                         |
  | ^ENABLE_USAGE_STATISTICS    | 开启使用统计                | `false`              | 开启后，每次调用 API 都会记录到 KV，可以通过`/usage`查看                                               |
  | HIDE_COMMAND_BUTTONS        | 隐藏指令按钮                | `null`               | 把想要隐藏的按钮写入用逗号分开`/start,/system`, 记得带上斜杠,修改之后得重新`init`                      |
  | DEBUG_MODE                  | 调试模式                    | `false`              | 目前可以把最新一条消息保存到 KV 方便调试                                                               |
  | \*WORKERS_DOMAIN            | Workers 域名                | `null`               | 例如 workers_name.username.workers.dev                                                                 |

- 配置 KV 数据库

  1. 前往侧栏的 Workers -> KV，点击右上角的 `Create a Namespace`, 名字随便取, 但是绑定的时候必须设定为`DATABASE`
  2. 点击右上角的 Setting -> Variables
  3. 在 `KV Namespace Bindings` 中点击 `Edit variables`
  4. 点击 `Add variable`
  5. 设置名字为`DATABASE` 并选择刚刚创建的 KV 数据

- 初始化

  1. 运行 `https://workers_name.username.workers.dev/init` 自动绑定 telegram 的 webhook 和设定所有指令
  2. 开始新对话,使用`/new`指令开始,之后每次都会将聊天上下文发送到 ChatGPT
  3. 使用`/setenv KEY=VALUE`指令修改用户配置,例如`SETENV SYSTEM_INIT_MESSAGE=现在开始是喵娘,每句话已喵结尾`
  4. 使用 `/role 角色名 SYSTEM_INIT_MESSAGE=现在开始是猫娘，每句话以喵结尾` 可以创建一个新角色，并使用 `~角色名 聊天内容` 调用。

:::

## ChatGPT 与 AMA

AMA（Ask Me Anything）原本指一种在线问答形式，这里只是一个 ChatGPT 第三方客户端，支持 Android 和 iOS。

- Android: [Google Play Store](https://play.google.com/store/apps/details?id=com.bytemyth.ama)
- iOS: [App Store](https://apps.apple.com/cn/app/ama-ask-me-anything/id6446135619)

如果你还想获得速通能力，可以尝试自己设置 API Server（原理就是反代官方 API 接口）（感谢 [sfc9982's blog](https://googles.plus/2023/03/24/shi-yong-cloudflare-workers-jie-jue-openai-he-chatgpt-de-api-wu-fa-fang-wen/#!) 提供的思路）。

与上文相同，你需要在 Cloudflare Workers 上部署一个 Worker。相关注册等流程上文讲过这里不再赘述。

::: timeline

- 注意部署内容有发生改变，你需要填入以下内容：

  ```javascript
  const TELEGRAPH_URL = "https://api.openai.com";

  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });

  async function handleRequest(request) {
    const url = new URL(request.url);
    url.host = TELEGRAPH_URL.replace(/^https?:\/\//, "");

    const modifiedRequest = new Request(url.toString(), {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: "follow",
    });

    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);

    // 添加允许跨域访问的响应头
    modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");

    return modifiedResponse;
  }
  ```

- 点击编辑器右下角的 “Save and deploy” 按钮部署该代码，在弹出的对话框中继续选择 “Save and deploy” 确认部署。

- 在 Cloudflare Workers 的管理界面中，点击 “Triggers” 选项卡，然后点击 “Custom Domians” 中的 “Add Custom Domain” 按钮以绑定自己的域名（为的是防止免费提供的域名本身被拒绝速通，如果你能用也可以不设置）。

- 测试：将官方的 https://api.openai.com/v1/chat/completions 换为自己的域名（如 https://mydomain.com/v1/chat/completions ），如果打开收到结果如：

  ```json
  {
    "error": {
      "message": "You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys.",
      "type": "invalid_request_error",
      "param": null,
      "code": null
    }
  }
  ```

  说明你部署反代成功。只需填入 AMA 的设置中的 API Server 即可。

:::

## ChatGPT 与 PureWriter

PureWriter 中文名纯纯写作，是一款优秀的写作工具，支持 Windows、Android 平台（但 Windows 功能比较残缺），这里以 Android 版（也只有这个支持）为例。

下载：[Pure Writer 官网](https://writer.drakeet.com)

在设置中可输入 ChatGPT 的 API Key 即可快速启用。注意纯纯写作不支持自定义 API Server，没有办法速通。

![Pure Writer](post/chatgpt/6129538924557743150_119.jpg)

除了 “时光机” 界面外，还能在打字界面调用，有效提升写作效率。当然你也可以单纯当作一款 ChatGPT 客户端。
