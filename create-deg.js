var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var intervalId;
var square = document.querySelector('.square');
var mapPlayer = document.getElementById('mapPlayer');
var player = document.querySelector('.player');
var playerDiameter = 100;
var eatDistance = 50;
var playerFontSize = 18;

var changeX = 0;
var changeY = 0;

var cordinateX = Math.floor(Math.random() * 2950) + 50;
var cordinateY = Math.floor(Math.random() * 1400) - 700;
square.style.transform = 'translate(' + (-cordinateX) +'px, ' + (-cordinateY) + 'px)';


/* food */
var foods = new Array();

var computFoodCordinate = function(numberFood){
    var x = Math.floor(Math.random() * 2900) + 50;
    var y = Math.floor(Math.random() * 1400) - 700
    document.querySelector('.food-' + numberFood).style.transform = 'translate(' + x +'px, ' + y + 'px)'
    
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
    
    computFoodCordinate(i);
    
};

var eat = function(typeFood) {
    if (typeFood == 'food') {
        var increaseProcent = playerDiameter;
        playerDiameter = Math.sqrt(Math.pow(playerDiameter, 2) + Math.pow(30, 2));
        increaseProcent = playerDiameter/increaseProcent;

        player.style.width = playerDiameter + 'px';
        player.style.height = playerDiameter + 'px';
        player.style.lineHeight = (playerDiameter-10) + 'px';
        
        mapPlayer.style.width = (playerDiameter/10) + 'px';
        mapPlayer.style.height = (playerDiameter/10) + 'px';
        
        eatDistance = playerDiameter/2;
        
        playerFontSize = playerFontSize * increaseProcent;
        player.style.fontSize = playerFontSize + 'px';
    }
}
/* */


for (var i=0; i<180; i++) {
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
        changeY = 1 - deg/180;
        changeX = -(1 - changeY);
    }
    
    if ((deg > 180) && (deg <= 270)){
        changeX = -(1 - deg/270);
        changeY = -(1 - changeX);
    }
    
    if ((deg > 270) && (deg <= 360)){
        changeY = -(1 - deg/360);
        changeX = 1 - changeY;
    }
    
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
        if ( ( (cordinateX - foods[i].foodCordinateX) > -eatDistance ) && ( (cordinateX - foods[i].foodCordinateX) < eatDistance ) && ( ((-cordinateY) - foods[i].foodCordinateY) > -eatDistance ) && ( ((-cordinateY) - foods[i].foodCordinateY) < eatDistance ) ) {
            
            computFoodCordinate(i);
            eat('food');
        }
    }    
        
    /* */
    
}, 10);


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