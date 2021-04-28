// ==UserScript==
// @name    DO-Auto-Move
// @version 1.0
// @description auto move players (it works 60% of the time every time)
// @author  mini18
// @run-at  document-end
// @include *dugout-online.com/players/*
// @update https://github.com/mini18do/do-players-move/raw/main/DO-Auto-Move.user.js
// ==/UserScript==

if(document.querySelectorAll(".top_positions").length > 0) {

	var table = document.querySelectorAll("tr[class*='matches_row']")
	var playersObj = new Object;
	table.forEach(function(e, i) {
		playersObj[i] = {
			id: e.children[2].children[1].id,
			age: parseInt(e.children[4].textContent)
		};
	});

	function Youth(age) {
		if(age < 18) {
			let move = new XMLHttpRequest();
			move.open("POST", "https://www.dugout-online.com/players/details/playerID/" + playersObj[i].id, true);
			move.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			move.send("movetoyouth=1");
		}
	}; // can only run on 1st squad page

	function First(age) {
		let move = new XMLHttpRequest();
		move.open("POST", "https://www.dugout-online.com/players/details/playerID/" + playersObj[i].id, true);
		move.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		move.send("moveto1st=1");
	}; // can only run on youth page

	function moveTo(YOUTHor1ST) {
		for(i in playersObj) {
			YOUTHor1ST(playersObj[i].age)
		}
	};

	if(document.querySelector("#first1") != null) {
		newbutton = document.querySelector(".compare_players_wrapper tr").insertCell(4);
		newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to youth" onclick="moveTo(Youth);" ></td>'
	} else {
		newbutton = document.querySelector(".compare_players_wrapper tr").insertCell(4);
		newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to 1st" onclick="moveTo(First);" ></td>'
	};
};




