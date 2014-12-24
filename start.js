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
	alert(players[i].name);
	players[i].surname=nu_surname;
	players[i].photo = "photos/boton.jpg";
	players[i].color = rndColor(colors);
	alert(players[i].color);
	players[i].position = 0;
	ls.set ("players",JSON.stringify(players)); // записываем новые данные в лс
	
	// выводим добавленного игрока на форму
	
	document.getElementById('form_add_user').style.display = 'none'; // скрываем форму
}

