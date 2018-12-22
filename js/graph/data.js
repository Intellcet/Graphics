function Data(options) {

    var detail = 1000;

    var ekran = {
        left: -5,
        bottom: -5,
        width: 10,
        height: 10
    };

    var deltaEkr = 1;
    var Width = options.width;
    var Height = options.height;
    var Fs = options.functions || [];

    //из локальной в экранную
    function getXs(x) {
        return (x - ekran.left) * Width / ekran.width;
    }

    function getYs(y) {
        return Height - (y - ekran.bottom) * Height / ekran.height;
    }

    //из экранной в локальную(вектор)
    function getX(x) {
        return ekran.width * x / Width;
    }

    function getY(y) {
        return -ekran.height * y / Height;
    }

    function printGraphic(F, color, text, cb) {
        if (F instanceof Function) {
            var x = ekran.left;
            var dx = ekran.width / detail;
            var y1, y2;
            while (true) {
                try {
                    y1 = F(x);
                    y2 = F(x + dx);
                    if (Math.abs(y1 - y2) < ekran.height) {
                        cb({x1: getXs(x), y1: getYs(y1), x2: getXs(x + dx), y2: getYs(y2)}, color);
                    }
                } catch (e) {}
                x += dx;
                if (x > ekran.width + ekran.left) {
                    break;
                }
            }
			var point = 1.5;
			cb({ x: getXs(point) + 10, y: getYs(F(point)) }, color, 'y = ' + text);
        }
    }

    function printGraphics(cb) {
        for (var i = 0; i < Fs.length; i++) {
            printGraphic(Fs[i].F, Fs[i].color, Fs[i].text, cb);
        }
    }

    function printOXY(cb) {
		var color = 'black';
		// OX
		cb({ x1: getXs(ekran.left), y1: getYs(0), x2: getXs(ekran.left + ekran.width), y2: getYs(0) }, color);
		// OY
		cb({ x1: getXs(0), y1: getYs(ekran.bottom), x2: getXs(0), y2: getYs(ekran.bottom + ekran.height) }, color);
	}

	function printArrows(cb) {
		var color = 'black';
		//Стрелка на оси OX
		cb({ x1: getXs(ekran.left + ekran.width), y1: getYs(0), x2: getXs(ekran.left + ekran.width) - 8, y2: getYs(0) + 4 }, color);
		cb({ x1: getXs(ekran.left + ekran.width), y1: getYs(0), x2: getXs(ekran.left + ekran.width) - 8, y2: getYs(0) - 4 }, color);
		//Стрелка на оси OY
		cb({ x1: getXs(0), y1: getYs(ekran.bottom + ekran.height), x2: getXs(0) + 4, y2: getYs(ekran.bottom + ekran.height) + 8 }, color);
		cb({ x1: getXs(0), y1: getYs(ekran.bottom + ekran.height), x2: getXs(0) - 4, y2: getYs(ekran.bottom + ekran.height) + 8 }, color);
	}

	function printRisks(cb) {
		var color = 'black';
		// Риски на оси OX вправо от нуля
		var x = 0;
		while (true) {
			if (x > ekran.left + ekran.width) {
				break;
			}
			cb({ x1: getXs(x), y1: getYs(0) - 5, x2: getXs(x), y2: getYs(0) + 5 }, color);
			x++;
		};
		// Риски на оси OX влево от нуля
		x = 0;
		while (true) {
			if (x < ekran.left) {
				break;
			}
			cb({ x1: getXs(x), y1: getYs(0) - 5, x2: getXs(x), y2: getYs(0) + 5 }, color);
			x--;
		};
		//Риски на оси OY вверх от нуля
		var y = 0;
		while (true) {
			if (y > ekran.bottom + ekran.height) {
				break;
			}
			cb({ x1: getXs(0) - 5, y1: getYs(y), x2: getXs(0) + 5, y2: getYs(y) }, color);
			y++;
		};
		//Риски на оси OY вниз от нуля
		y = 0;
		while (true) {
			if (y < ekran.bottom) {
				break;
			}
			cb({ x1: getXs(0) - 5, y1: getYs(y), x2: getXs(0) + 5, y2: getYs(y) }, color);
			y--;
		};
	}

	function printField(cb) {
		var color = '#D0D0D0';
		// вертикальные линии вправо от нуля
		var x = 0;
		while (true) {
			if (x > ekran.left + ekran.width) { // это выход
				break;
			}
			cb({ x1: getXs(x), y1: getYs(ekran.bottom), x2: getXs(x), y2: getYs(ekran.bottom + ekran.height) }, color);
			x++;
		}
		// вертикальные линии влево от нуля
		x = 0;
		while (true) {
			if (x < ekran.left) { // это выход
				break;
			}
			cb({ x1: getXs(x), y1: getYs(ekran.bottom), x2: getXs(x), y2: getYs(ekran.bottom + ekran.height) }, color);
			x--;
		}
		// горизонтальнеы линии вверх от нуля
		var y = 0;
		while (true) {
			if (y > ekran.bottom + ekran.height) { // это выход
				break;
			}
			cb({ x1: getXs(ekran.left), y1: getYs(y), x2: getXs(ekran.left + ekran.width), y2: getYs(y) }, color);
			y++;
		}
		// горизонтальнеы линии вниз от нуля
		y = 0;
		while (true) {
			if (y < ekran.bottom) { // это выход
				break;
			}
			cb({ x1: getXs(ekran.left), y1: getYs(y), x2: getXs(ekran.left + ekran.width), y2: getYs(y) }, color);
			y--;
		}
	}

    this.updateFuncs = function (fs) {
        if (fs instanceof Array) {
            Fs = fs;
        }
    };

    this.getPoints = function(x1, x2, id1, id2) {
        if (x1 > x2) {
            var x3 = x1;
            x1 = x2;
            x2 = x3;
        }
        var points = [];
		//создаем первую функцию-ограничитель
        for (var i = 0; i < Fs.length; i++) {
            if (Fs[i].id === id1) {
                var dx = (x2 - x1) / detail
                for (var x = x1; x < x2; x += dx) {
                    points.push( {x: getXs(x), y: getYs(Fs[i].F(x))} );
                }
                break;
            }
        }
		//создаем вторую функцию-ограничитель
        for (var i = 0; i < Fs.length; i++) {
            if (Fs[i].id === id2) {
                var dx = (x2 - x1)/detail
                for (var x = x2; x > x1; x -= dx) {
                    points.push({x: getXs(x), y: getYs(Fs[i].F(x))});
                }
                break;
            }
        }
      return points;
    };

	this.calcS = function (x1, x2, id1, id2) {
		if (x1 > x2) {
            var x3 = x1;
            x1 = x2;
            x2 = x3;
        }
		
		var dx = (x2 - x1) / detail;
		var s1 = 0;
		var s2 = 0;
		var s = 0;

	  //считаем площадь первой фигуры
	  for (var i = 0; i < Fs.length; i++) {
            if (Fs[i].id === id1) {
				for (var c = x1; c < x2; c += dx) {
					s1 += Fs[i].F(c) * dx;
				}
				break;
			}
		}
		//считаем площадь второй фигуры
        for (var i = 0; i < Fs.length; i++) {
            if (Fs[i].id === id2) {
				for (var x = x1; x < x2; x += dx) {
					s2 += Fs[i].F(x) * dx;
				}
				break;
			}
		}
		//конечная площадь
		return Math.abs(s2-s1);
	}
	
	function printXY(cb) {
        //1: текст, 2: x, 3:y, 4: цвет текста,(если нужно 5: шрифт "15px Verdana") 
        color = 'black';
        cb({x: getXs(ekran.width + ekran.left) - 18, y: getYs(0) - 7}, color, 'x');
        cb({x: getXs(0) + 7, y: getYs(ekran.height + ekran.bottom) + 18}, color, 'y');
    }
	
	function printNumbers(cb) {
        color = 'black';
		var x = 0;
        while (true) {//нумерация положительных полуосей
            if (x > ekran.bottom + ekran.height && x > ekran.left + ekran.width) {
                break;
            }
            if (x != 0) {
                cb({ x: getXs(x) - 5, y: getYs(0) + 18}, color, x);
				cb({ x: getXs(0) + 12, y: getYs(x) + 5}, color, x);
            }
			x++;
        }
		var x = 0;
		while (true) {//нумерация отрицательных полуосей
            if (x < ekran.bottom && x < ekran.left) {
                break;
            }
            if (x != 0) {
                cb({ x: getXs(x) - 5, y: getYs(0) + 18}, color, x);
				cb({ x: getXs(0) + 12, y: getYs(x) + 5}, color, x);
            }
			x--;
        }
    }
	
    this.render = function (cb) {
        printField(cb);
		printOXY(cb);
		printGraphics(cb);
		printArrows(cb);
		printRisks(cb);
		printXY(cb);
		printNumbers(cb);
    };

    this.zoom = function (zoomPlus) {
        if (zoomPlus) { // увеличиваем
            if (ekran.width - deltaEkr > 0 && ekran.height - deltaEkr > 0) {
                ekran.width -= deltaEkr;
                ekran.left += deltaEkr / 2;
                ekran.height -= deltaEkr;
                ekran.bottom += deltaEkr / 2;
            }
        } else {
            ekran.width += deltaEkr;
            ekran.left -= deltaEkr / 2;
            ekran.height += deltaEkr;
            ekran.bottom -= deltaEkr / 2;
        }
    };

    this.move = function (dx, dy) {
        ekran.left -= getX(dx);
        ekran.bottom -= getY(dy);
    };
}