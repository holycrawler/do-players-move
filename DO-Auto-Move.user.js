// ==UserScript==
// @name    DO-Auto-Move
// @version 2.0
// @description auto move players (it works 60% of the time every time)
// @author  mini18

// @include *dugout-online.com/players/*
// @update https://github.com/mini18do/do-players-move/raw/main/DO-Auto-Move.user.js
// ==/UserScript==
if (document.querySelectorAll(".top_positions").length > 0) {
let postData;
   movePlayers = function() {
    let table = document.querySelectorAll("tr[class*='matches_row']")
    let playersObj = new Object;
    table.forEach(function(e, i) {
      playersObj[i] = {
        id: e.children[2].children[1].id,
        age: parseInt(e.children[4].textContent)
      };
    });

    for (let i in playersObj) {
      let xhr = new XMLHttpRequest();
      if (playersObj[i].age < 19) {
        xhr.open("POST", "https://www.dugout-online.com/players/details/playerID/" + playersObj[i].id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(postData);
      };
    };
  };
  var newbutton = document.querySelector(".compare_players_wrapper tr").insertCell(4);
  if (document.querySelector("#first1") != null) {
    postData = "movetoyouth=1";
    //newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to youth"></td>'
    newbutton.outerHTML = '<td style="position: absolute; padding-right: 25px; right: 0px;"><input type="button" onclick="movePlayers();" value="move to youth"></td>'
    //newbutton.addEventListener ("click",this.movePlayers("movetoyouth=1"), false);
    //newbutton.addEventListener ("click",movePlayers.bind(this,"movetoyouth=1"), false);
    //newbutton.addEventListener ("click",function(){movePlayers("movetoyouth=1")}, false);
  } else {
    postData = "moveto1st=1";
    //newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to 1st"></td>'
    newbutton.outerHTML = '<td style="position: absolute; padding-right: 25px; right: 0px;"><input type="button" onclick="movePlayers();" value="move to 1st"></td>'
    //newbutton.addEventListener ("click",this.movePlayers("moveto1st=1"), false);
    //newbutton.addEventListener ("click",movePlayers.bind(this,"moveto1st=1"), false);
    //newbutton.addEventListener ("click",function(){movePlayers("moveto1st=1")}, false);
  };
};
