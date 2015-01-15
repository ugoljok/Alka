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
	if(cell_index+1>arrCell.length){
		//alert("Ты победил!");
		document.getElementById("photo").src = getPlayerByIndex(obj_pl,obj_mv.id).photo; //выводим фото
		document.getElementById("player_name").innerHTML = getPlayerByIndex(obj_pl,obj_mv.id).name+" "+getPlayerByIndex(obj_pl,obj_mv.id).surname; //выводим имя
		document.getElementById("player_position").innerHTML = ""; //выводим позицию в окно
		document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно 
		document.getElementById("player_fant").innerHTML = "Поздравляю! Ты добрался до финиша! Можешь расслабиться и отдохнуть;)";
		document.getElementById("color-header_player").style.background=getPlayerByIndex(obj_pl,obj_mv.id).color;
	}else{
	// выводим инфу на форму
	document.getElementById("photo").src = getPlayerByIndex(obj_pl,obj_mv.id).photo; //выводим фото
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
if((cell_index+1)>parseInt(arrCell.length)){
	// Удаление игрока
	//delete players[id.toString()];
	//ls.set ("players",JSON.stringify(obj_pl));
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
				if(arrCell[cell_index].rel=="kamikadze"){
					if(parseInt(result)>1){position_last=1; alert ("Неудачник! Топай на старт!)))")}else{
						// у нас есть победитель!
						alert("Поздравляю! Ты добрался до финиша! Можешь расслабиться и отдохнуть;)");
						position_last=position_first;
						};
					};
				}else{
					position_last = position_first+result; // получаем новую позицию текущего игрока
					};
	};
	getPlayerByIndex(obj_pl,obj_mv.id).position = position_last; // присваиваем новое значение
	ls.set ("players",JSON.stringify(obj_pl)); // записываем новые данные в лс
	//если дошли до последнего id игрока возвращаем значение текщего игрока в 1, если нет +1 к id
	if(obj_mv.id<objLength(obj_pl)-1){
		obj_mv.id++;
	}else{
		obj_mv.id=0;
		};
	ls.set ("move",JSON.stringify(obj_mv)); // записываем новые данные в лс
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
/*	
function getAllPosition(){
	obj = JSON.parse(ls.get("players")); // получили объект
	console.log(obj);
	for (i=1; i<=objLength(obj); i++){
		console.log(obj[i].name+";"+obj[i].position);
		}
	}*/
// вытаскиваем игрока по индексу
function getPlayerByIndex(obj, index){
var i=0;
for(var k in obj){
if(i===index) return obj[k];
i++;
}}