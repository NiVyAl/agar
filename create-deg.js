$(document).ready(function(){

    var detector = document.querySelector('.detector');
    var grad = new Array();
    var time;

    for (var i=0; i<180; i++) {
        grad[i] = document.createElement('div');
        detector.appendChild(grad[i]);
        grad[i].classList.add('grad');
        grad[i].style.cssText = 'transform: rotate(' + i + 'deg)';
        //console.log('before: ' + $(grad[i]).before);
        //console.log('after: ' + $(grad[i]).after);
        grad[i].id = i;

        $(grad[i]).hover(function(){
            time = Date.now();
            var grad = $(this);
            console.log(grad);
            /*
            console.log('enter: ' + time);
            console.log('grad[i]: ' + grad[i]); */
            
        },function(){
            time = Date.now() - time;
            console.log('exit: ' + time);
        }
        );
    };
    
    
    var move = function(deg) {
        console.log(deg);
    }
    
});