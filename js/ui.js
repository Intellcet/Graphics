function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function ctg(x) { return 1 / Math.tan(x); }
function arcsin(x) { return Math.asin(x); }
function arccos(x) { return Math.acos(x); }
function arctg(x) { return Math.atan(x); }
function arcctg(x) { return -Math.atan(x)+Math.PI/2; }

function UI(callback) {
    var i = 0;
    function inputKeyUpHandler(event) {
        try {
            callback.addCB(this.id, eval('a = function(x) { return ' + this.value + ' ; }'), this.value);
        } catch (e) {}
    }


    function buttonAppendClickHandler() {
        //create checkbox
        var id = 'input_'+i;
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        (function (i) {
            checkbox.addEventListener('click', function () {
                this.clicked = !(this.clicked);
                if (this.clicked) {
                    callback.polyCB(null, null, id);
                } else {
                    callback.polyCB(null, null, null, id);
                }
            });
        })(i);

        //create input
        var input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('id', id);
			input.addEventListener('keyup', inputKeyUpHandler);
        var buttonDel = document.createElement('input');
			buttonDel.setAttribute('type', 'button');
			buttonDel.setAttribute('value', 'Delete');
			(function (i) {
				buttonDel.addEventListener('click', function () {
					block1.removeChild(br);
					block1.removeChild(checkbox);
					block1.removeChild(input);
					block1.removeChild(buttonDel);
					callback.delCB(id);
				});
			})(i);
        var br = document.createElement('br');
			block1.appendChild(br);
			block1.appendChild(checkbox);
			block1.appendChild(input);
			block1.appendChild(buttonDel);
        i++;
    }
	
    function init() {
        block1 = document.createElement('div');
		block1.setAttribute('id', 'div1');
        var buttonAppend = document.createElement('input');
            buttonAppend.setAttribute('type', 'button');
            buttonAppend.setAttribute('value', 'Add function');
            buttonAppend.addEventListener('click', buttonAppendClickHandler);
        var inputX1 = document.createElement('input');;
            inputX1.addEventListener('keyup', function () {
                if (!isNaN(this.value)) {
                    callback.polyCB(this.value - 0, null, null);
                }
        });
        var inputX2 = document.createElement('input');;
            inputX2.addEventListener('keyup', function () {
                if (!isNaN(this.value)) {
                    callback.polyCB(null, this.value - 0, null);
                }
        });
		var spanS = document.createElement('span');
		var calcS = document.createElement('input');
			calcS.setAttribute('type', 'button');
			calcS.setAttribute('value', 'CalcS');
			calcS.addEventListener('click', function () {
				spanS.innerHTML = callback.outCB();
		});
		block1.appendChild(buttonAppend);
		block1.appendChild(inputX1);
		block1.appendChild(inputX2);
		var	block2 = document.createElement('div');
		block2.setAttribute('id', 'div2');
		block2.appendChild(calcS);
		block2.appendChild(spanS);
		document.querySelector('body').appendChild(block1);
		document.querySelector('body').appendChild(block2);
    }
    init();
}
