function Input(options) {

    var canvas = options.canvas;
    var zoom = options.callbacks.zoom;
    var move = options.callbacks.move;

    var canMove = false;



    canvas.addEventListener('wheel', function (event) {
        zoom(!(event.deltaY > 0));
    });

    canvas.addEventListener('mousemove', function (event) {
        if (canMove) {
            move(event.movementX, event.movementY);
        }
    });

    canvas.addEventListener('mousedown', function () {
        canMove = true;
    });

    canvas.addEventListener('mouseup', function () {
        canMove = false;
    });





}