showAllPlayers();
//выводим всех уже имеющихся игроков
function showAllPlayers(){
	var players = JSON.parse(ls.get("players")); // получили объект
	var user_list=document.getElementById("user_list");
	for(i=1; i<=objLength(players); i++){
		var nu_player = document.createElement("div"); //общая ячейка
			nu_player.className = "nu_player";
			var nu_player_photo = document.createElement("div");
				nu_player_photo.className = "nu_player_photo";
			nu_player.appendChild(nu_player_photo);
			var nu_player_name = document.createElement("div");
				nu_player_name.className = "nu_player_name";
				nu_player_name.appendChild(document.createTextNode(players[i].name+" "+players[i].surname));
			nu_player.appendChild(nu_player_name);
			var nu_player_kill = document.createElement("a");
				nu_player_kill.className = "nu_player_kill";
				nu_player_kill.setAttribute('href','javascript:killPlayer('+i+')');
				nu_player_kill.appendChild(document.createTextNode("×"));
			nu_player.appendChild(nu_player_kill);
	user_list.appendChild(nu_player);
	};
};


// Показ формы добавления игрока
document.getElementById('nu_user_add').onclick = function(){
	document.getElementById('form_add_user').style.display = 'block'; 
}

// выбор цвета из массива
function rndColor(colors)
{
  var  first = 0;
  var last = colors.length;
  rndNum=Math.floor( Math.random() * (last - first + 1) ) + first;
  var rndColor=colors[rndNum];
  return rndColor;
}
// нажатие ОК
document.getElementById("nu_okay").onclick = function (){
	var nu_name=document.getElementById("nu_name").value;
	var nu_surname = document.getElementById("nu_surname").value;
	// создаем массив игроков и заносим его в ЛС
	var players = JSON.parse(ls.get("players")); // получили объект
	if(!players){
		var players=new Object();
	};
	i=objLength(players)+1;
	players[i] = new Object();
	players[i].name=nu_name;
	players[i].surname=nu_surname;
	players[i].photo = "photos/boton.jpg";
	players[i].color = rndColor(colors);
	players[i].position = 0;
	ls.set ("players",JSON.stringify(players)); // записываем новые данные в лс
	// выводим добавленного игрока на форму
	var user_list=document.getElementById("user_list");
		var nu_player = document.createElement("div"); //общая ячейка
			nu_player.className = "nu_player";
			var nu_player_photo = document.createElement("div");
				nu_player_photo.className = "nu_player_photo";
			nu_player.appendChild(nu_player_photo);
			var nu_player_name = document.createElement("div");
				nu_player_name.className= "nu_player_name";
				nu_player_name.appendChild(document.createTextNode(nu_name+" "+nu_surname));
			nu_player.appendChild(nu_player_name);
			var nu_player_kill = document.createElement("a");
				nu_player_kill.className = "nu_player_kill";
				nu_player_kill.setAttribute('href','javascript:killPlayer('+i+')');
				nu_player_kill.appendChild(document.createTextNode("×"));
			nu_player.appendChild(nu_player_kill);
	user_list.appendChild(nu_player);
	// скрываем форму
	document.getElementById("nu_name").value='';
	document.getElementById("nu_surname").value='';
	document.getElementById('form_add_user').style.display = 'none'; 
}

function killPlayer(playesr_id) {
	
	};