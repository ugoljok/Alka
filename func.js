//длина объекта
function objLength(obj){
    var k = 0;
    for(var i in obj) {
        k++;
    }
    return k;
}

//Говорилка
function speak(text){
   	var url = 'http://translate.google.com/translate_tts?ie=UTF-8&q=' + decodeURIComponent(text)+ '&tl=ru&prev=input';	
    document.getElementById("au").src=url;
};

// локальное хранилище в браузере
/*
Мануал

ls.set("name","value") // Устанавливает значение
ls.get("name")         // получает значение
ls.unset("name")       // Удаляет запись
ls.clear()             // Очищает хранилище
*/
ls = new Object();
ls.set = function(key,value){
	localStorage.setItem(key, value);
};
ls.get = function(key){
	return localStorage.getItem(key)
}
ls.unset = function(key){
	localStorage.removeItem(key);
}
ls.clear = function(){
	localStorage.clear(); //удалит все элементы
}

// запись из массива игроков в лс
function lsPlayers (players){
	ls.clear();
	ls.set ("players",JSON.stringify(players));
	};
	
// обнуление позиций в лс
function clearPosition (){
	obj = JSON.parse(ls.get("players")); // получили объект
	var i=1;
	for (i in obj){
		obj[i].position = 1; // обнуление позиций
		i++;
		}
	ls.set ("players",JSON.stringify(obj));
	var move = {id:0};// ходит первый в списке
	ls.unset("move");
	ls.set ("move",JSON.stringify(move)); // запись в лс
	};
	
//генератор-кубик
function kubik(){
	var max_random = 6;
	var min_random = 1;
	var range = max_random - min_random + 1;
	var result = Math.floor(Math.random()*range) + min_random; // генерим число
	return result;
};

// вывод данных текущего игрока
function currentPlayer(result){
	obj_pl = JSON.parse(ls.get("players")); // получаем игроков
	obj_mv = JSON.parse(ls.get("move")); // получаем id текущего игрока
	var position_first = getPlayerByIndex(obj_pl,obj_mv.id).position; // получаем текущую позицию текущего игрока
	var cell_index = position_first+result-1; // индекс задания	
	// Дошли до финиша
	if( (cell_index+1>arrCell.length && position_first!=arrCell.length) || (result==1 && position_first==arrCell.length) ){
		//alert("Ты победил!");
	victory(obj_pl, obj_mv);
	}
	else if(result>1 && position_first==arrCell.length){
		document.getElementById("photo").src = "photos/start.jpg"; //выводим фото
		document.getElementById("player_name").innerHTML = getPlayerByIndex(obj_pl,obj_mv.id).name+" "+getPlayerByIndex(obj_pl,obj_mv.id).surname; //выводим имя
		document.getElementById("player_position").innerHTML = ""; //выводим позицию в окно
		document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно
		document.getElementById("player_fant").innerHTML = "Неудачник! Топай на старт!)))"; //выводим выпавший фант в окно
		speak(getPlayerByIndex(obj_pl,obj_mv.id).name+", тебе не повезло...Да что там не повезло! Дуй на старт, днище ебаное!"); // говорилка
		document.getElementById("color-header_player").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
	// вывод картинки из ячейки
		document.getElementById("form_currentPlayer").style.background = '#FFFFFF url(images/fail.jpg) 0% 100% no-repeat';
		}else{
	// выводим инфу на форму
	document.getElementById("photo").src = "photos/start.jpg"; //выводим фото
	document.getElementById("player_name").innerHTML = getPlayerByIndex(obj_pl,obj_mv.id).name+" "+getPlayerByIndex(obj_pl,obj_mv.id).surname; //выводим имя
	document.getElementById("player_position").innerHTML = position_first; //выводим позицию в окно
	document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно
	document.getElementById("player_fant").innerHTML = "Задание: "+arrCell[cell_index].text; //выводим выпавший фант в окно
	speak(getPlayerByIndex(obj_pl,obj_mv.id).name+", "+arrCell[cell_index].text); // говорилка
	document.getElementById("color-header_player").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
	// вывод картинки из ячейки
	document.getElementById("form_currentPlayer").style.background = '#FFFFFF url(images/'+cell_index+'.png) 0% 100% no-repeat';
	};
};

// перевод позиции текущего игрока
function playersMove(){
	
	players = JSON.parse(ls.get("players")); // получаем игроков
	obj_mv = JSON.parse(ls.get("move")); // получаем id текущего игрока
	var position_first = getPlayerByIndex(obj_pl,obj_mv.id).position; // получаем текущую позицию текущего игрока
	var cell_index = position_first+result-1; // индекс задания
	var position_last;
	if((cell_index+1) >= parseInt(arrCell.length)){
		if(result>1 && position_first==arrCell.length){
			position_last=1;
			}else{
				// у нас есть победитель!
				// Удалит игрока и запишит в лс обьект без текщего игрока
				console.log("Позиция игрока", (cell_index+1), " выходит за пределы игрового поля. Удаляем игрока");
				ls.set ("players",JSON.stringify( delPlayerByIndex(players,obj_mv.id) )); 
				// если игрок последний то переводим на первого 
				if(obj_mv.id==objLength(obj_pl)-1){obj_mv.id=0; ls.set ("move",JSON.stringify(obj_mv));} ;
				return false;
			};
		
	}else{
		// если указано на сколько клеток надо идти вперед\назад
		if(arrCell[cell_index].step){
			position_last = position_first+parseInt(arrCell[cell_index].step);
		}else if(arrCell[cell_index].rel){// если есть ссылка на конкретную ячейку
			if(arrCell[cell_index].rel=="start"){position_last=1;}
			if(parseInt(arrCell[cell_index].rel)==34){position_last = 34;}
			if(parseInt(arrCell[cell_index].rel)==22){position_last = 22;}
			if(parseInt(arrCell[cell_index].rel)==60){position_last = 60;}
			if(arrCell[cell_index].rel=="pass"){position_last = position_first;}
		}else{
			position_last = position_first+result; // получаем новую позицию текущего игрока
		};
	};
		getPlayerByIndex(obj_pl,obj_mv.id).position = position_last; // присваиваем новое значение
		ls.set ("players",JSON.stringify(obj_pl)); // записываем новые данные в лс
		
		// вызываем функцию перемещения фишки
		moveFishka(players, obj_mv, position_last);
		
		//если дошли до последнего id игрока возвращаем значение текщего игрока в 1, если нет +1 к id
		if(obj_mv.id<objLength(obj_pl)-1){
			obj_mv.id++;
		}else{
			obj_mv.id=0;
		};
		ls.set ("move",JSON.stringify(obj_mv)); // записываем новые данные в лс
	
	console.log("Игрок", obj_mv.id, "    Кубик:",result,"   Позиция:", position_first, " -> ", position_last || (cell_index+1));
	

	
};

//показать\скрыть форму
var form = {
    show:function(id_elem){
        this.hideAll();
        document.getElementById(id_elem).style.display="block";
    },
    hide:function(id_elem){document.getElementById(id_elem).style.display="none"},
    hideAll:function(){ 
        var forms = document.querySelectorAll('.form');
        for(var i=0, l= forms.length; i<l; i++){
            forms[i].style.display="none";
        }
    }
}

function initDice(){
	obj_pl = JSON.parse(ls.get("players")); // получаем игроков
	obj_mv = JSON.parse(ls.get("move")); // получаем id текущего игрока
	var name = getPlayerByIndex(obj_pl,obj_mv.id).name;
	var surname = getPlayerByIndex(obj_pl,obj_mv.id).surname;
	//alert(name);
	document.getElementById("dice_name").innerHTML = name+" "+surname.charAt(0)+", твой ход, сучка!";
	document.getElementById("color-header_kosti").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
	};

// вытаскиваем игрока по индексу
function getPlayerByIndex(obj, index){
var i=0;
for(var k in obj){
if(i===index) return obj[k];
i++;
}}

// удаление игрока по индексу
function delPlayerByIndex(obj, index){
var i=0;
for(var k in obj){
if(i===index){
	delete obj[k]; 
	var cells = document.getElementById("playfield").getElementsByClassName('game_cell');
	var fishkaCurrent = document.getElementById("fishka_"+k);
	fishkaCurrent.parentNode.removeChild(fishkaCurrent);
	return obj; };
i++;
}};

//получаем уникальный индекс игрока
function getPlayerUniqueID(obj, index){
var i=0;
for(var k in obj){
if(i===index) return k;
i++;
}}

function victory(obj_pl, obj_mv){
	if(objLength(obj_pl)==1){lastWinner(obj_pl, obj_mv);}else{
		document.getElementById("photo").src = "photos/start.jpg" //выводим фото
		document.getElementById("player_name").innerHTML = getPlayerByIndex(obj_pl,obj_mv.id).name+" "+getPlayerByIndex(obj_pl,obj_mv.id).surname; //выводим имя
		document.getElementById("player_position").innerHTML = ""; //выводим позицию в окно
		document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно 
		document.getElementById("player_fant").innerHTML = "Поздравляю! Ты добрался до финиша! Можешь расслабиться и отдохнуть;)";
		document.getElementById("color-header_player").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
		speak(getPlayerByIndex(obj_pl,obj_mv.id).name+", твою мать. Я так счастлива! Иди слей масло. Только не долго, а то подумают что какаешь."); // говорилк
		// вывод картинки из победителя
		document.getElementById("form_currentPlayer").style.background = '#FFFFFF url(images/win.jpg) 0% 100% no-repeat';
		}
	}
	
function lastWinner(obj_pl, obj_mv){
	document.getElementById("photo").src = "photos/start.jpg" //выводим фото
	document.getElementById("player_name").innerHTML = getPlayerByIndex(obj_pl,obj_mv.id).name+" "+getPlayerByIndex(obj_pl,obj_mv.id).surname; //выводим имя
	document.getElementById("player_position").innerHTML = ""; //выводим позицию в окно
	document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно
	document.getElementById("player_fant").innerHTML = "Игра окончена! Всем спасибо! Все сводны!"; //выводим выпавший фант в окно
	speak(getPlayerByIndex(obj_pl,obj_mv.id).name+", мы тебя уже заждались, Последний Герой! Игра окончена, ёпта!"); // говорилка
	document.getElementById("color-header_player").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
	// вывод картинки из ячейки
	document.getElementById("form_currentPlayer").style.background = '#FFFFFF url(images/lastwin.jpg) 0% 100% no-repeat';
	}

// функция передвижения фишки игрока	
function moveFishka(players, obj_mv, position_last){
	var cells = document.getElementById("playfield").getElementsByClassName('game_cell');
	var pleyerInd = getPlayerUniqueID(players, obj_mv.id);
	var fishkaCurrent = document.getElementById("fishka_"+pleyerInd);
	var grobik = fishkaCurrent.parentNode.removeChild(fishkaCurrent);
    cells[position_last-1].appendChild(grobik);
	};