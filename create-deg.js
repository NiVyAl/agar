var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var intervalId;
var square = document.querySelector('.square');

var cordinateX = Math.floor(Math.random() * 2950) + 50;
var cordinateY = Math.floor(Math.random() * 1400) - 700;
square.style.transform = 'translate(' + (-cordinateX) +'px, ' + (-cordinateY) + 'px)'


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

var mainInterval = setInterval(function(){
    //console.log('interval');
    move2();
    square.style.transform = 'translate(' + cordinateX + 'px, ' + cordinateY + 'px)';
    //console.log(cordinateX);
    //console.log(cordinateY);
    
}, 100);

var move2 = function(deg) {
    //console.log(deg);
    var x = 90 - deg;
    cordinateX = x;
    cordinateY = 90 - x;
}


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