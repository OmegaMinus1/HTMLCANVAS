//Screen Coords
var mouseX = 0;
var mouseY = 0;

//Buttons

var MouseLeftButton = 0;
var MouseMiddleButton = 1;
var MouseRightButton = 2;

//Show Hide Cursor
var savedMouseCursor = null;

function hideMouse() {
    savedMouseCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
}

function showMouse() {
    if (savedMouseCursor == null) {
        return;
    }

    document.body.style.cursor = savedMouseCursor;
}

//Setup the listeners Fake Async


//click: the simplest event.
//dblclick: fired on a double click on an HTML element.
//mousedown: fired when the button is pressed.
//mouseup: fired when the button is released.
//mouseover: fired when the cursor passes over an HTML element.
//mouseout: fired when the cursor leaves the displaying area of an HTML element; the inverse of mouseover.
//mousemove: fired everytime the cursor moves one pixel. It's very easy to hang the browser by targeting this event.

//drag: fired frequently on a dragged element (which must define the *draggable* attribute.)
//dragstart: fired when the mouse is held down on an element and the movement starts.
//dragend: fired when the element is released.
//dragenter: fired when an element enters the displayed area of another one.
//dragleave: fired when an element exits the displayed area, as the inverse of dragenter.
//dragover: fired frequently when an element is over another.
//drop: fired when an element is released over another.
//<!DOCTYPE html>
//<html>
//<head>
//<script type="text/javascript">
//        window.onload = function() {
//        var box1 = document.getElementById('box1');
//        box1.addEventListener('dragstart', function(e) { console.log('Dragging #box1'); });
//        box1.addEventListener('dragend', function(e) { console.log('Dragging ended'); });
//        var box2 = document.getElementById('box2');
//        box2.addEventListener('dragenter', function(e) { console.log('Entered into #box2'); });
//        box2.addEventListener('dragleave', function(e) { console.log('Leaving #box2'); });
//    }
//</script>
//</head>
//<body>
//<div draggable="true" id="box1" style="width: 100px; height: 100px; background-color: navy;">&nbsp;</div>
//<div id="box2" style="width: 100px; height: 100px; background-color: green;">&nbsp;</div>
//</body>
//</html>

//<!DOCTYPE html>
//<html>
//<head>
//<script type="text/javascript">
//    window.onload = function() {
//        var box = document.getElementById('box');
//        var width = 100;
//        var height = 100;
//        box.addEventListener('mousewheel', function(e) {
//            console.log(e.wheelDelta);
//            if (e.wheelDelta > 0) {
//                width += 20;
//                height += 20;
//            } else if (e.wheelDelta < 0) {
//                if (width > 20) {
//                    width -= 20;
//                    height -= 20;
//                }
//            }
//            box.style.width = width + "px";
//            box.style.height = height + "px";
//        });
//    }
//</script>
//</head>
//<body>
//<div id="box" style="width: 100px; height: 100px; background-color: navy;">&nbsp;</div>
//</body>
//</html>


//<!DOCTYPE html>
//<html>
//<head>
//<script type="text/javascript">
//    window.onload = function() {
//        var box = document.getElementById('box');
//        box.addEventListener('scroll', function(e) {


//            console.log(e.target.scrollTop + " of " + e.target.scrollHeight);
//            // same with scrollLeft and scrollWidth
//        });
//    }
//</script>
//</head>
//<body>
//<div id="box" style="width: 100px; height: 100px; overflow:scroll;">Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... Lorem ipsum dolor amet... </div>
//</body>
//</html>

//<!DOCTYPE html>
//<html>
//<head>
//<script type="text/javascript">
//    window.onload = function() {
//        var box = document.getElementById('box');
//        box.addEventListener('contextmenu', function(e) {
//            console.log(e);
//        });
//    }
//</script>
//</head>
//<body>
//<div id="box" style="width: 100px; height: 100px; background-color: navy;">&nbsp;</div>
//</body>
//</html>
