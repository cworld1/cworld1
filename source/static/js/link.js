fetch("static/links.json")
  .then((res) => res.json())
  .then((data) => {
    data.friends.forEach(function (dic) {
      var str = "";
      dic.link_list.forEach(function (friend) {
        str += `<li>
            <p><img src="${friend.avatar}" alt="" loading="lazy" class="φbp"></p>
            <ul>
            <li>${friend.name}</li>
            <li>${friend.intro}</li>
            <li><a href="${friend.link}" target="_blank"></a></li>
            </ul>
            </li>`;
      });
      document.querySelector(`.friends #${dic.id_name}`).innerHTML = str;
    });
  });
