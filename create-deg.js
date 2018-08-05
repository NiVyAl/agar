var detector = document.querySelector('.detector');
var grad = new Array();
var time;
var square = document.querySelector('.square');
var cordinateX = 0;
var cordinateY = 0;

for (var i=0; i<180; i++) {
    grad[i] = document.createElement('div');
    detector.appendChild(grad[i]);
    grad[i].classList.add('grad');
    grad[i].style.cssText = 'transform: rotate(' + i + 'deg)';
    var reverse = i+180;
    grad[i].innerHTML = '<div class="inner" onmouseenter="move(' + i + ', event)" onmouseleave="stop(' + i + ', event)"></div><div class="inner-reverse" onmouseenter="move(' + reverse + ', event)" onmouseleave="stop()"></div>';
};

var intervalId;

var move = function(deg, event) {
    intervalId = setInterval(function(){
        console.log('interval');
        cordinateX = cordinateX + 1;
        cordinateY = cordinateY + 1;
        
        console.log(cordinateY);
        
        square.style.transform = 'translate(' + cordinateX + 'px, ' + cordinateY + 'px)';
    }, 10);    

};

var stop = function(deg, event) {
    console.log('leave')
    clearInterval(intervalId);
    console.log(cordinateY);
};