function GraphManager(width, height) {

    var width = width || 600,
        height = height || 600;

    var printPolygon = false;
    var x1, x2, id1, id2;

    var data  = new  Data({
        width: width,
        height: height,
        functions: []
    });
    var graph = new Graph({ width: width, height: height });
    var input = new Input({
        canvas: graph.getCanvas(),
        callbacks:{
            zoom: function (zoomPlus) {
                data.zoom(zoomPlus);
                render();
            },
            move: function (dx, dy) {
                data.move(dx, dy);
                render();
            }
        }
    });

    function render() {
		graph.fillRect('#F0F0F0');
		if (printPolygon) {
            graph.polygon(data.getPoints(x1, x2, id1, id2), 'orange', 'yellow');
        }
		data.render(function (koord, color, text) {
			if (!text) {
				graph.line(koord, color);
			} else {
				graph.fillText(koord, color, text);
			}
		});
	}

    this.updateFuncs = function (fs) {
        data.updateFuncs(fs);
        render();
    }
	
	this.calcS = function (x1, x2, id1, id2) {
		return data.calcS(x1, x2, id1, id2);
	}

    this.polygon = function (_x1, _x2, _id1, _id2) {
        if (!isNaN(_x1) && !isNaN(_x2) && _id1 && _id2) {
            x1 = _x1;
            x2 = _x2;
            id1 = _id1;
            id2 = _id2;
            printPolygon = true;
        } else {
            printPolygon = false;
        }
		render();
    };

    function init() {
        render();
    }
    init();
}