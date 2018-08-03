var detector = document.querySelector('.detector');
var grad = new Array();
var time;

for (var i=0; i<180; i++) {
    grad[i] = document.createElement('div');
    detector.appendChild(grad[i]);
    grad[i].classList.add('grad');
    grad[i].style.cssText = 'transform: rotate(' + i + 'deg)';
    var reverse = i+180;
    grad[i].innerHTML = '<div class="inner" onmouseenter="move(' + i + ', event)" onmouseleave="close(' + i + ', event)"></div><div class="inner-reverse" onmouseenter="move(' + reverse + ', event)" onmouseleave="close()"></div>';
};

var move = function(deg, event) {
    /*
    var intervalId = setInterval(function(){
        //console.log(event.type);
        
        console.log('interval');
        
    }, 1000); */
    if (event.type == 'mouseenter'){
        console.log('enter');
    };
    

};

var close = function(deg, event) {
    if (event.type == 'mouseleave'){
        console.log('close');
    };
    /*
    console.log('leave');
    clearInterval(intervalId); */
};