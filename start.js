

//выводим всех уже имеющихся игроков
function showAllPlayers(){
    document.getElementById("user_list").innerHTML = '';
    var players = JSON.parse(ls.get("players")); // получили объект
    if(!players){document.getElementById("user_list").innerHTML = 'Добавьте игроков...';
        }else{
    var user_list=document.getElementById("user_list");
    i=1;
    for(var i in players){
        var nu_player = document.createElement("div"); //общая ячейка
            nu_player.className = "nu_player";
            var nu_player_photo = document.createElement("div");
                nu_player_photo.className = "nu_player_photo";
                    nu_player_photo.style.background = 'url('+players[i].photo+')';
                    nu_player_photo.style.backgroundSize = 'cover';
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
    i++;};
    };// конец if
};
showAllPlayers();

// Показ формы добавления игрока
document.getElementById('nu_user_add').onclick = function(){
    document.getElementById('form_add_user').style.display = 'block';
document.getElementById("nu_photo_video").style.display = 'block';
document.getElementById("nu_photo_canvas").style.display = 'none';
document.getElementById("nu_photo_img").style.display = 'none';
document.getElementById("nu_photo_img").src = 'http://vk.com/images/gift/'+(   100+Math.round(  Math.random()*500  )   )+'/256.jpg';
document.getElementById("nu_photo_take").style.display = 'block';


  document.getElementById("nu_photo_take").innerHTML = "Сфоткать"

document.getElementById("nu_photo_take").onclick = function(){takepicture();}
}

// выбор цвета из массива
function rndColor(colors)
{
  var first = 0;
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
    //i=objLength(players)+1;
    //id Игрока по дате
    i=Math.round((new Date().getTime())/1000);
    players[i] = new Object();
    players[i].name=nu_name;
    players[i].surname=nu_surname;
    var photosrc = document.getElementById("nu_photo_img").src;

    players[i].photo = photosrc;
    players[i].color = rndColor(colors);
    players[i].position = 1;
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
    showAllPlayers();
    // скрываем форму
    document.getElementById("nu_name").value='';
    document.getElementById("nu_surname").value='';
    document.getElementById('form_add_user').style.display = 'none';
}
// удаление игрока
function killPlayer(id){
    if(confirm("И не жалко убивать людей-то?")){
        var players = JSON.parse(ls.get("players"));
        if(delete players[id.toString()]){
            ls.set ("players",JSON.stringify(players));
            alert("Дело сделано, убийца...");
            showAllPlayers();
        }else {
            alert("До он бессмертен!!!!!")
        };
    }
}

// очищение ЛС
document.getElementById("nu_user_kill_all").onclick = function(){
    ls.clear();
    showAllPlayers();
    alert("Список игроков пуст...");
    };



  var streaming = false,
     video        = document.querySelector('#nu_photo_video'),
      canvas       = document.querySelector('#nu_photo_canvas'),
      photo        = document.querySelector('#nu_photo_img'),
      startbutton  = document.querySelector('#nu_photo_take'),
      width = 128,
      height = 128;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
 video.style.display = "none";
 canvas.style.display = "none";
  photo.style.display = "block";
startbutton.onclick = function(){

video.style.display = "block";
 canvas.style.display = "none";
  photo.style.display = "none";
startbutton.onclick = function(){takepicture();startbutton.innerHTML = "Еще разок" }
startbutton.innerHTML = "Сфоткать"
}
}

