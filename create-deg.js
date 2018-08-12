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

for (var i=0; i<100; i++) {
    foods[i] = document.createElement('div');            
    square.appendChild(foods[i]);
    foods[i].classList.add('food');
    foods[i].classList.add('food-' + i);
    var x = Math.floor(Math.random() * 2950) + 50;
    var y = Math.floor(Math.random() * 1400) - 700
    foods[i].style.transform = 'translate(' + x +'px, ' + y + 'px)'
    
    foods[i] = {
        foodCordinateX: x,
        foodCordinateY: y  
    };
    
};

var eat = function(typeFood) {
    if (typeFood == 'food') {
        playerDiameter = playerDiameter + 30;
        player.style.width = playerDiameter + 'px';
        player.style.height = playerDiameter + 'px';
        player.style.lineHeight = (playerDiameter-10) + 'px';
        
        mapPlayer.style.width = (playerDiameter/10) + 'px';
        mapPlayer.style.height = (playerDiameter/10) + 'px';
        
        eatDistance = eatDistance + 15;
        playerFontSize = playerFontSize + 5;
        player.style.fontSize = playerFontSize + 'px';
    }
}
/* */


var radian = function(deg) {
    var rad = (deg * Math.PI)/180;
    return rad
};

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
    
    if ((50 < (changeX + cordinateX)) && (2950 > (changeX + cordinateX)) ) {
        cordinateX = changeX + cordinateX;
    };
    
    if ( ((changeY + cordinateY) > -700) && ((changeY + cordinateY) < 700) ) {
        cordinateY = changeY + cordinateY;
    }
    
    square.style.transform = 'translate(' + (-cordinateX) + 'px, ' + (cordinateY) + 'px)';
    mapPlayer.style.transform = 'translate(' + (cordinateX/10) + 'px, ' + (-cordinateY/10) + 'px)';
    
    /* eat */
        for (var i=0; i<100; i++){
            if ( ( (cordinateX - foods[i].foodCordinateX) > -eatDistance ) && ( (cordinateX - foods[i].foodCordinateX) < eatDistance ) && ( ((-cordinateY) - foods[i].foodCordinateY) > -eatDistance ) && ( ((-cordinateY) - foods[i].foodCordinateY) < eatDistance ) ) {
                console.log('eat');
                console.log('x: ' + foods[i].foodCordinateX);
                console.log('y: ' + foods[i].foodCordinateY);
                foods[i].foodCordinateX = 0;
                foods[i].foodCordinateY = 1500;
                document.querySelector('.food-' + i).style.display = 'none';
                eat('food');
                
                // 50 - разница координат
            }
        }    
        
    /* */
    
}, 10);


var move = function(deg, event) {
    var hypothesis = 0;
    
    /*
    console.log('Угол: ' + deg);
    console.log('cos: ' + Math.cos(deg));
    console.log('sin: ' + Math.sin(deg)); */
    
    intervalId = setInterval(function(){
        //console.log('interval');
        hypothesis = hypothesis + 1;
        
        cordinateX = (Math.cos(deg) * hypothesis) + cordinateX;
        var fixCordinateX = -cordinateX
        cordinateY = (Math.sin(deg) * hypothesis) + cordinateY;
        
        /*console.log('X: ' + cordinateX);
        console.log('Y: ' + cordinateY); */
        
        square.style.transform = 'translate(' + fixCordinateX + 'px, ' + cordinateY + 'px)';
    }, 100);    

};

var stop = function(deg, event) {
    //console.log('leave')
    clearInterval(intervalId);
};
