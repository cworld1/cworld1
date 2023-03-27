// @ts-nocheck

// hitokoto 名言
fetch("https://v1.hitokoto.cn")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("hitokoto").innerText = data.hitokoto;
  });

// 社交卡片

// telegram
fetch("https://api.swo.moe/stats/telegram/cworld0_cn")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .telegram").innerText = data.count;
  });
// github
fetch("https://api.swo.moe/stats/github/cworld1")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .github").innerText = data.count;
  });
// twitter
// fetch("https://api.swo.moe/stats/twitter/cworld0")
//   .then((res) => res.json())
//   .then((data) => {
//     document.querySelector("#stats .twitter").innerText = data.count;
//   });
// bilibili
fetch("https://api.swo.moe/stats/bilibili/388346465")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .bilibili").innerText = data.count;
  });
// weibo
fetch("https://api.swo.moe/stats/weibo/5501674056")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .weibo").innerText = data.count;
  });
// zhihu
fetch("https://api.swo.moe/stats/zhihu/wolf-03")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .zhihu").innerText = data.count;
  });
// steamgames
fetch("https://api.swo.moe/stats/steamgames/76561199021278120")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector("#stats .steamgames").innerText = data.count;
  });
