// ==UserScript==
// @name    DO-Auto-Move
// @version 3.0
// @description auto move players (it works 60% of the time every time)
// @author  mini18
// @include *dugout-online.com/players/*
// @update https://github.com/mini18do/do-players-move/raw/main/DO-Auto-Move.user.js
// ==/UserScript==

if (document.querySelectorAll(".top_positions").length > 0) {
  let postData;
  function movePlayers() {
    let table = document.querySelectorAll("tr[class*='matches_row']");
    table.forEach(function (e) {
      let id = e.children[2].children[1].id;
      let age = parseInt(e.children[4].textContent);
      age < 19
        ? xmlHttp(
            "POST",
            "https://www.dugout-online.com/players/details/playerID/" + id,
            "application/x-www-form-urlencoded",
            postData,
            function () {
              e.remove();
            }
          )
        : null;
    });
  }
  function xmlHttp(method, url, contenType, postData, callBack) {
    fetch(url, {
      method: method,
      headers: { "Content-Type": contenType },
      body: postData,
    })
      .then((response) => console.log(response))
      .then((data) => callBack(data));
  }
  let newcell = document
    .querySelector(".compare_players_wrapper tr")
    .insertCell(4);
  let newbutton = document.createElement("input");
  newcell.style.position = "absolute";
  newcell.style.paddingRight = "25px";
  newcell.style.right = "0px";
  newbutton.type = "button";
  newcell.append(newbutton);
  newbutton.addEventListener("click", movePlayers, true);
  document.querySelector("#first1") != null
    ? ((postData = "movetoyouth=1"), (newbutton.value = "move to youth"))
    : ((postData = "moveto1st=1"), (newbutton.value = "move to 1st"));
}
