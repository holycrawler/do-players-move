// ==UserScript==
// @name    DO-Auto-Move
// @version 3.2
// @description auto move players (it works 60% of the time every time)
// @author  holycrawler
// @include *dugout-online.com/players/*
// @update https://github.com/holycrawler/do-players-move/raw/main/DO-Auto-Move.user.js
// ==/UserScript==

if (document.querySelector(".top_positions") != null) {
  let postData;
  function movePlayers() {
    let table = document.querySelectorAll("tr[class*='matches_row']");
    table.forEach(function (e) {
      let id = e.children[2].children[1].id;
      let age = parseInt(e.children[4].textContent);
      if (age < 19) {
        fetch("https://www.dugout-online.com/players/details/playerID/" + id, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: postData,
        })
          //.then((response) => console.log(response))
          .then(() => e.remove());
      }
    });
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
  [postData, newbutton.value] =
    document.querySelector("#first1") != null
      ? ["movetoyouth=1", "move to youth"]
      : ["moveto1st=1", "move to 1st"];
}