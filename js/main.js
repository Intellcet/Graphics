window.onload = function () {

    var fs = [];

    var x1, x2, id1, id2;

    var graph = new GraphManager();
    var ui = new UI({
		addCB: function (id, newFunc, text) { // add function
			for (var i = 0; i < fs.length; i++) {
				if (fs[i].id === id) {
					fs[i].F = newFunc;
					fs[i].text = text;
					graph.updateFuncs(fs);
					return;
				}
			}
			fs.push({
				id: id,
				F: newFunc,
				color: "rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")",
				text: text
			});
			graph.updateFuncs(fs);
		},
		delCB: function (id) { // delete function
			for (var i = 0; i < fs.length; i++) {
				if (fs[i].id === id) {
					fs.splice(i, 1);
					graph.updateFuncs(fs);
					return;
				}
			}
		},
        polyCB: function (_x1, _x2, id, delId) {
            if ((_x1 || _x1 === 0) && !isNaN(_x1)) {
                x1 = _x1;
            }
            if ((_x2 || _x2 === 0) && !isNaN(_x2)) {
                x2 = _x2;
            }

            for (var i = 0; i < fs.length; i++) {
                if (fs[i].id === id) {
                    id1 = id2;
                    id2 = id;
                    break;
                }
            }
            id1 = (delId === id1) ? null : id1;
            id2 = (delId === id2) ? null : id2;
            graph.polygon(x1, x2, id1, id2);
        },
		outCB: function () {
			return graph.calcS(x1, x2, id1, id2);
		}
    });
};