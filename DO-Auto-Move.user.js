// ==UserScript==
// @name    DO-Auto-Move
// @version 2.3
// @description auto move players (it works 60% of the time every time)
// @author  mini18

// @include *dugout-online.com/players/*
// @update https://github.com/mini18do/do-players-move/raw/main/DO-Auto-Move.user.js
// ==/UserScript==
if(document.querySelectorAll(".top_positions").length > 0) {
	let postData;
	movePlayers = function() {
		let table = document.querySelectorAll("tr[class*='matches_row']")
		table.forEach(function(e, i) {
			let name = e.children[3].textContent.replace(" ", "");
			let id = e.children[2].children[1].id;
			let age = parseInt(e.children[4].textContent);
			if(age < 19) xmlHttp("POST", "https://www.dugout-online.com/players/details/playerID/" + id, true, postData, function() {
				e.remove();
				//console.log("|", name, "|", age, "|");
			});
		});
	};

	function xmlHttp(method, url, async, data, callback) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url, async);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				if(callback) {
					callback(this.responseText);
				}
			}
		};
		xhr.send(data);
	}
	var newbutton = document.querySelector(".compare_players_wrapper tr").insertCell(4);
	if(document.querySelector("#first1") != null) {
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
