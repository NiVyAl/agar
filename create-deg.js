var detector = document.querySelector('.detector');
var grad = new Array();
var time;

for (var i=0; i<180; i++) {
    grad[i] = document.createElement('div');
    detector.appendChild(grad[i]);
    grad[i].classList.add('grad');
    grad[i].style.cssText = 'transform: rotate(' + i + 'deg)';
    var reverse = i+180;
    grad[i].innerHTML = '<div class="inner" onmouseenter="move(' + i + ', event)" onmouseleave="move(' + i + ', event)"></div><div class="inner-reverse" onmouseenter="move(' + reverse + ', event)" onmouseleave="move(' + reverse + ', event)"></div>';
};

var move = function(deg, event) {
    console.log(deg + ': ' + event.type);
    /*
    while(event.type == 'mouseenter') {
        var time = Date.now();
        while(time > 10) {
            time = Date.now() - time;
        };
        console.log('1s')
    }*/
}