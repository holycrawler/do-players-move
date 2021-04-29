// ==UserScript==
// @name    DO-Auto-Move
// @version 1.6
// @description auto move players (it works 60% of the time every time)
// @author  mini18

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

	toYouth = function() {
		if(playersObj[i].age < 19) {
			let move = new XMLHttpRequest();
			move.open("POST", "https://www.dugout-online.com/players/details/playerID/" + playersObj[i].id, true);
			move.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			move.send("movetoyouth=1");
		}
	}; // can only run on 1st squad page

	toFirst = function() {
		let move = new XMLHttpRequest();
		move.open("POST", "https://www.dugout-online.com/players/details/playerID/" + playersObj[i].id, true);
		move.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		move.send("moveto1st=1");
	}; // can only run on youth page

	movePlayers = function(YOUTHor1ST) {
		for(i in playersObj) {
			YOUTHor1ST(playersObj[i].age)
		}
	};

	var newbutton = document.querySelector(".compare_players_wrapper tr").insertCell(4);

	if(document.querySelector("#first1") != null) {
		//newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to youth"></td>'
		newbutton.outerHTML = '<td style="position: absolute; padding-right: 25px; right: 0px;"><input type="button" onclick="movePlayers(toYouth);" value="move to youth"></td>'
		//newbutton.addEventListener ("click",this.movePlayers(toYouth), false);
		//newbutton.addEventListener ("click",movePlayers.bind(this,toYouth), false);
		//newbutton.addEventListener ("click",function(){movePlayers(toYouth)}, false);
	} else {
		//newbutton.outerHTML = '<td style="padding-left: 340px;"><input type="button" value="move to 1st"></td>'
		newbutton.outerHTML = '<td style="position: absolute; padding-right: 25px; right: 0px;"><input type="button" onclick="movePlayers(toFirst);" value="move to 1st"></td>'
		//newbutton.addEventListener ("click",this.movePlayers(toFirst), false);
		//newbutton.addEventListener ("click",movePlayers.bind(this,toFirst), false);
		//newbutton.addEventListener ("click",function(){movePlayers(toFirst)}, false);
	};
};
