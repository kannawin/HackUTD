var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;
var socket = io.connect('http://localhost:3700');
    var x = "black",
        y = 2;
    
    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
    
        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);
    }
    
    function color(obj) {
        x = obj.id;
        if (x == "white") y = 14;
        else y = 2;
    
    }
    
    socket.on('drawable', function(data) {
        ctx.beginPath();
        ctx.moveTo(data.pX, data.pY);
        ctx.lineTo(data.cX, data.cY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    });
    
    function erase() {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
    
    function findxy(res, e) {
	canvas = document.getElementById('canvas');
        if (res == 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
    
            flag = true;
            dot_flag = true;
            if (dot_flag) {
                ctx.beginPath();
                ctx.fillStyle = x;
                ctx.fillRect(currX, currY, 2, 2);
                ctx.closePath();
                dot_flag = false;
            }
        }
        if (res == 'up' || res == "out") {
            flag = false;
        }
        if (res == 'move') {
            if (flag) {
		var w  = window,
		    d  = w.document,
		    de = d.documentElement,
		    db = d.body || d.getElementsByTagName('body')[0],
		    x  = w.innerWidth || de.clientWidth || db.clientWidth,
		    y  = w.innerHeight|| de.clientHeight|| db.clientHeight;

		

		var a = document.getElementById('insert');
		a.innerHTML = e.clientX + "  " + e.clientY + "  " + canvas.offsetLeft;
		a.innerHTML += "  " + canvas.offsetTop + "   " + x + " x " + y;
                prevX = currX;
                prevY = currY;
                currX = (e.clientX*.5) - (canvas.offsetLeft);
                currY = (e.clientY*.5) - (canvas.offsetTop);
                socket.emit('draw',{pX : prevX, pY : prevY, cX : currX, cY : currY });
            }
        }
    }
