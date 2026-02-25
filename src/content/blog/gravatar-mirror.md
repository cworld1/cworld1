---
title: 'Gravatar Mirror'
description: '解决 Gravatar 在国内访问堪忧的问题'
publishDate: '2026-02-25 14:52:58'
tags:
  - Blog
language: 'en & zh-cn'
---

## Internal

[sep.cc](https://sep.cc/gravatartx.html):

- API: `https://cdn.sep.cc/avatar/`
- Test URL: https://cdn.sep.cc/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 14ms avg
- Note: 境内 Ucloud 和华为云同时提供服务，境外 Cloudflare CDN 提供服务; Gravatar 头像缓存 365 天

[WeAvatar](https://weavatar.com/):

- API: `https://weavatar.com/avatar/`
- Test URL: https://weavatar.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 41 ms avg

[Cravatar](https://cravatar.com/):

- API: `https://cravatar.com/avatar/`
- Test URL: https://cravatar.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 43ms avg

[万维网测试小组](https://w3tt.com/):

- API: `https://gravatar.w3tt.com/avatar/`
- Test URL: https://gravatar.w3tt.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 54ms avg

[zeruns.tech](https://blog.zeruns.com/):

- API: `https://gravatar.zeruns.tech/avatar/`
- Test URL: https://gravatar.zeruns.tech/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 290ms, 25% loss avg

## Global 

[Ro Public CDN](https://cdn.ews1.com/):

- API: `https://gravatar.ews1.com/avatar/`
- Test URL: https://gravatar.ews1.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 36ms avg
- Note: Also support Google Fonts.

[7ED](https://www.7ed.net/):

- API: `https://use.sevencdn.com/avatar/`
- Test URL: https://use.sevencdn.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 184ms avg

[sm.ms / loli.net](https://sm.ms/):

- API: `https://gravatar.loli.net/avatar/`
- Test URL: https://gravatar.loli.net/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 236 ms avg

[webp.se](https://webp.se/):

- API: `https://gravatar.webp.se/avatar/`
- Test URL: https://gravatar.webp.se/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 762ms, 25% loss avg
- Note: Will convert the avatar into webp format, and the size will be greatly compressed.

[libravatar]:

- API: `https://seccdn.libravatar.org/gravatarproxy/`
- Test URL: https://seccdn.libravatar.org/gravatarproxy/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: 259ms avg
- Note: Reject any ping test.

## Bad

[Gravatar](https://www.gravatar.com/):

- API: `https://www.gravatar.com/avatar/`
- Test URL: https://www.gravatar.com/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: banned

[V2EX](https://cdn.v2ex.com/):

- API: `https://cdn.v2ex.com/gravatar/`
- Test URL: https://cdn.v2ex.com/gravatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: banned

[极客族](https://sdn.geekzu.org/):

- API: `https://sdn.geekzu.org/avatar/`
- Test URL: https://sdn.geekzu.org/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200
- Ping: redirect to gravatar

## Thanks

- https://luoxx.top/archives/gravatar-mirror-2022
- https://zhuanlan.zhihu.com/p/377149911
