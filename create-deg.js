var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var intervalId;
var square = document.querySelector('.square');
var mapPlayer = document.getElementById('mapPlayer');
var player = document.querySelectorAll('.player');
var playerDiameter = 100;
var eatDistance = 50;
var playerFontSize = 18;

console.log(player);

var changeX = 0;
var changeY = 0;

var cordinateX = Math.floor(Math.random() * 2950) + 50;
var cordinateY = Math.floor(Math.random() * 1400) - 700;
square.style.transform = 'translate(' + (-cordinateX) +'px, ' + (-cordinateY) + 'px)';


/* food */
var foods = new Array();

var computFoodCordinate = function(numberFood){
    var x = Math.floor(Math.random() * 2900) + 50;
    var y = Math.floor(Math.random() * 1400) - 700;
    document.querySelector('.food-' + numberFood).style.transform = 'translate(' + x +'px, ' + y + 'px)';
    
    foods[numberFood] = {
        foodCordinateX: x,
        foodCordinateY: y  
    };
}

for (var i=0; i<100; i++) {
    foods[i] = document.createElement('div');            
    square.appendChild(foods[i]);
    foods[i].classList.add('food');
    foods[i].classList.add('food-' + i);
    foods[i].classList.add('food-color-' + (Math.floor(Math.random()*5)+1) )
    
    computFoodCordinate(i);
    
};

var sizeChange = function(playerDiameter, increaseProcent) {
    increaseProcent = playerDiameter/increaseProcent;
    playerFontSize = playerFontSize * increaseProcent;
    for (i=0; i< player.length; i++){
        player[i].style.width = playerDiameter + 'px';
        player[i].style.height = playerDiameter + 'px';
        player[i].style.lineHeight = (playerDiameter-10) + 'px';
        player[i].style.fontSize = playerFontSize + 'px';
    }
    
    mapPlayer.style.width = (playerDiameter/10) + 'px';
    mapPlayer.style.height = (playerDiameter/10) + 'px';

    eatDistance = playerDiameter*0.4;
}

var eat = function(typeFood) {
    if (typeFood == 'food') {
        var increaseProcent = playerDiameter;
        playerDiameter = Math.sqrt(Math.pow(playerDiameter, 2) + Math.pow(30, 2));
        
        sizeChange(playerDiameter, increaseProcent);
    }
}
/* */


for (var i=0; i<180; i++) {     /* генерация градусов */
    grad[i] = document.createElement('div');
    detector.appendChild(grad[i]);
    grad[i].classList.add('grad');
    grad[i].style.cssText = 'transform: rotate(' + -i + 'deg)';
    var reverse = i+180;
    grad[i].innerHTML = '<div class="inner" onmouseenter="move2(' + reverse + ')"></div><div class="inner-reverse" onmouseenter="move2(' + i + ')"></div>';
};

var move2 = function(deg) {
    if ((deg <= 90) && (deg >= 0)) {
        changeX = 1 - deg/90;
        changeY = 1 - changeX;
    }
    
    if ((deg > 90) && (deg <= 180)){
        deg = deg - 90
        changeY = 1 - deg/90;
        changeX = -(1 - changeY);
    }
    
    if ((deg > 180) && (deg <= 270)){
        deg = deg - 180;
        changeX = -(1 - deg/90);
        changeY = -(1 + changeX);
    }
    
    if ((deg > 270) && (deg <= 360)){
        deg = deg - 270;
        changeY = -(1 - deg/90);
        changeX = 1 + changeY;
    }
    
    changeX = changeX * (10 - playerDiameter/40); // если игрок больше 400px то движемся в обратную сторону
    changeY = changeY * (10 - playerDiameter/40);
    //console.log('changeX: ' + changeX);
    //console.log('changeY: ' + changeY);
    
    /* анимация поедания 
    
    if (((deg > 45) && (deg < 135)) || ((deg > 225) && (deg < 315)) ) {
        player.style.transition = '0.25s width, 0.25s font-size, 0.25s line-height';
    } else {
        player.style.transition = '0.25s height, 0.25s font-size, 0.25s line-height';
    } */
}


var mainInterval = setInterval(function(){
    
    if (((playerDiameter/2) < (changeX + cordinateX)) && ((3000-playerDiameter/2) > (changeX + cordinateX)) ) {
        cordinateX = changeX + cordinateX;
    };
    
    if ( ((changeY + cordinateY) > (-750 + playerDiameter/2)) && ((changeY + cordinateY) < (750 - playerDiameter/2) ) ) {
        cordinateY = changeY + cordinateY;
    }
    
    square.style.transform = 'translate(' + (-cordinateX) + 'px, ' + (cordinateY) + 'px)';
    mapPlayer.style.transform = 'translate(' + (cordinateX/10) + 'px, ' + (-cordinateY/10) + 'px)';
    
    /* eat */
    for (var i=0; i<100; i++){
        if ( Math.sqrt(Math.pow((cordinateX - foods[i].foodCordinateX), 2) + Math.pow((-cordinateY - foods[i].foodCordinateY), 2)) < eatDistance ) {
            
            computFoodCordinate(i);
            eat('food');
        }
    }    
        
    /* */
    
}, 10);


var split = function() {
    increaseProcent = playerDiameter;
    playerDiameter = playerDiameter/2;
    sizeChange(playerDiameter, increaseProcent);
    
    var playerSpl = document.createElement('div');
    detector.insertBefore(playerSpl, detector.firstChild);
    playerSpl.classList.add('player');
}

/* старая функция

var radian = function(deg) {
    var rad = (deg * Math.PI)/180;
    return rad
};

var move = function(deg, event) {
    var hypothesis = 0;
    
    
    intervalId = setInterval(function(){
        hypothesis = hypothesis + 1;
        
        cordinateX = (Math.cos(deg) * hypothesis) + cordinateX;
        var fixCordinateX = -cordinateX
        cordinateY = (Math.sin(deg) * hypothesis) + cordinateY;
        
        square.style.transform = 'translate(' + fixCordinateX + 'px, ' + cordinateY + 'px)';
    }, 100);    

};

var stop = function(deg, event) {
    clearInterval(intervalId);
};
*/