var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var square = document.querySelector('.square');
var cordinateX = 0;
var cordinateY = 0;

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
    grad[i].innerHTML = '<div class="inner" onmouseenter="move(' + radian(reverse) + ', event)" onmouseleave="stop()"></div><div class="inner-reverse" onmouseenter="move(' + radian(i) + ', event)" onmouseleave="stop()"></div>';
};

var intervalId;

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