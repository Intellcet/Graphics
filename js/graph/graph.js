function Graph(options) {

    var canvas = null;
    var context = null;
	var div = null;

    this.fillRect = function (color) {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    this.line = function (koord, color) {
        context.beginPath();
        context.strokeStyle = (color) ? color : 'black';
        context.moveTo(koord.x1, koord.y1);
        context.lineTo(koord.x2, koord.y2);
        context.stroke();
    };

	this.fillText = function (koord, color, text) {
		context.fillStyle = color || 'black';
		context.font = '12px New Times Roman';
		context.fillText(text, koord.x, koord.y);
	};
	
    this.polygon = function (points, penColor, fillColor) {
        if (points && points.length >= 3) {
            context.beginPath();
            context.strokeStyle = (penColor) ? penColor : 'black';
            context.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                context.lineTo(points[i].x, points[i].y);
            }
            context.closePath();
            context.stroke();
            context.fillStyle = (fillColor) ? fillColor : 'black';
            context.fill();
            
        }
    };

    this.getCanvas = function () {
        return canvas;
    };

    function init() {
        // создал канвас
		canvas = document.createElement('canvas');
		canvas.width = options.width;
		canvas.height = options.height;
		// создал блок
		div = document.createElement('div');
		div.setAttribute('style', 'float:left');
		div.appendChild(canvas); // в блок сунул канвас
		document.querySelector('body').appendChild(div); // в боди сунул блок
		context = canvas.getContext('2d');
	}
    init();
}