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
	for (i=1; i<=objLength(obj); i++){
		obj[i].position = 1; // обнуление позиций
		}
	ls.set ("players",JSON.stringify(obj));
	var move = {id:1};// ходит первый в списке
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
	var position_first = obj_pl[obj_mv.id].position; // получаем текущую позицию текущего игрока
	// выводим инфу на форму
	document.getElementById("photo").src = obj_pl[obj_mv.id].photo; //выводим фото
	document.getElementById("player_name").innerHTML = obj_pl[obj_mv.id].name+" "+obj_pl[obj_mv.id].surname; //выводим имя
	document.getElementById("player_position").innerHTML = position_first; //выводим позицию в окно
	document.getElementById("player_kubik").innerHTML = "Тебе выпало число: "+result; //выводим выпавшее число в окно
	document.getElementById("player_fant").innerHTML = "Задание: "+arrCell[position_first].text; //выводим выпавший фант в окно
};

// перевод позиции текущего игрока
function playersMove(){
	obj_pl = JSON.parse(ls.get("players")); // получаем игроков
	obj_mv = JSON.parse(ls.get("move")); // получаем id текущего игрока
	var position_first = obj_pl[obj_mv.id].position; // получаем текущую позицию текущего игрока
	var position_last = position_first+result; // получаем новую позицию текущего игрока
	obj_pl[obj_mv.id].position = position_last; // присваиваем новое значение
	ls.set ("players",JSON.stringify(obj_pl)); // записываем новые данные в лс
	//если дошли до последнего id игрока возвращаем значение текщего игрока в 1, если нет +1 к id
	if(obj_mv.id<objLength(obj_pl)){
		obj_mv.id=obj_mv.id+1;
	}else{
		obj_mv.id=1;
		};
	ls.set ("move",JSON.stringify(obj_mv)); // записываем новые данные в лс
};

//показать\скрыть форму
var form = {
    show:function(id_elem){
        this.hideAll()
        document.getElementById(id_elem).style.display="block";
    },
    hide:function(id_elem){document.getElementById(id_elem).style.display="none"},
    hideAll:function(){ 
        var forms = document.querySelectorAll('.form');
        for(var i=0, l= forms.length; i<l; i++){
            forms[i].style.display="none"
        }
    }
}

function initDice(){
	obj_pl = JSON.parse(ls.get("players")); // получаем игроков
	obj_mv = JSON.parse(ls.get("move")); // получаем id текущего игрока
	document.getElementById("dice_name").innerHTML = obj_pl[obj_mv.id].name+" "+obj_pl[obj_mv.id].surname.charAt(0)+", твой ход, сучка!";
	};
	
function getAllPosition(){
	obj = JSON.parse(ls.get("players")); // получили объект
	console.log(obj);
	for (i=1; i<=objLength(obj); i++){
		console.log(obj[i].name+";"+obj[i].position);
		}
	}