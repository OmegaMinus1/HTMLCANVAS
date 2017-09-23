
var projectionMatrix;
var g_points = [];
var buttonDown = {};

var fieldOfViewRadians = degToRad(90);

//Startup Helpers
function initWindow() {


    document.body.style.overflow = 'hidden';
    document.body.scroll = 'no';
    document.body.style.marginLeft = 0;
    document.body.style.marginRight = 0;
    document.body.style.marginBottom = 0;
    document.body.style.marginTop = 0;

    theCanvas.width = window.innerWidth;
    theCanvas.height = window.innerHeight;

    window.onresize = function (event) {

        theCanvas.width = window.innerWidth;
        theCanvas.height = window.innerHeight;

        var thisCanvasAspectRatio = window.innerWidth / window.innerHeight;

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
        projectionMatrix = makePerspective(fieldOfViewRadians, thisCanvasAspectRatio, 1.0, 100000.0);
        updateUniformBufferResolution(window.innerWidth, window.innerHeight);
    };

    return getWebGLContext(theCanvas);
}
function initCanvas() {
    
    return document.getElementById('WebGLCanvas5');

}
function initMouse() {


    function mouseDownClick(event, buttonDown) {

        buttonDown[event.button] = true;

        //alert("Mouse Down");
        //event.preventDefault();

    }

    theCanvas.onmousedown = function (event) { mouseDownClick(event, buttonDown) };

    function mouseUpClick(event, buttonDown) {

        buttonDown[event.button] = false;

        //alert("Mouse Up");
        //event.preventDefault();
    }

    theCanvas.onmouseup = function (event) { mouseUpClick(event, buttonDown) };


    theCanvas.addEventListener('mousemove', function (event) {
        
        mouseX = event.pageX;
        mouseY = event.pageY;

        //event.preventDefault();

    });

    theCanvas.addEventListener('contextmenu', function (event) {

        event.preventDefault();

    });

    
}

//Realtime Functions
function updateProc(TimeElapsed) {


    if (keysDown[Key_LEFT] == true) {

    }

    if (keysDown[Key_RIGHT] == true) {

    }

    if (keysDown[Key_UP] == true) {

    }

    if (keysDown[Key_DOWN] == true) {

    }

    if (buttonDown[MouseLeftButton] == true) {

        //alert("clicked");
        //var X = 2.0 * ((1.0 / theCanvas.width) * mouseX) - 1.0;
        //var Y = 2.0 * (1.0 - ((1.0 / theCanvas.height) * mouseY)) - 1.0;

        //g_points.push(X);
        //g_points.push(Y);

        //alert(Y.toString());

        buttonDown[MouseLeftButton] = false;
    }

    if (buttonDown[MouseMiddleButton] == true) {

        buttonDown[MouseMiddleButton] = false;
    }

    if (buttonDown[MouseRightButton] == true) {

        buttonDown[MouseRightButton] = false;
    }
}
function renderProc(TimeElapsed) {
    
    //Clear the buffers ??? Really do need to in this all the time.
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    //Draw Fullscreen Tirangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}
function updateUniformBufferTime(TimeElapsed) {

    gl.uniform1f(iTime_U, TimeElapsed);

}
function updateUniformBufferResolution(resolutionX, resolutionY) {

    gl.uniform2fv(iResolution_U, new Float32Array([resolutionX, resolutionY]));
}

//Fullsreen Triangle Helpers
function initVertexBuffer(gl) {
    //var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var vertices = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        alert("Error creating VertexBuffer");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}
function initUniformBuffer(gl, TimeElapsed, resolutionX, resolutionY) {
    
    gl.uniform1f(iTime_U, TimeElapsed);
    
    gl.uniform2fv(iResolution_U, new Float32Array([resolutionX, resolutionY]));

    return 1;
}

//Startup WebGL
function LoadApp() {

    TBank.loadTextures();

    //Make Full Canvas
    theCanvas = initCanvas();

    gl = initWindow();

    //User Input
    initKeyBoard(document);
    initMouse();

    //Start it up
    //hideMouse();
    main(gl);

}
function main(glC) {

    //alert(TBank.numImages.toString());
    //alert(TBank.getImageWidth(0).toString());
    //alert(TBank.getImageWidth(1).toString());


    if (!glC) {

        // TODO: Log error
        alert("Try a different Browser, This browser does not support WebGL.");
        return;
    }

    if (!initShaders(glC, VSHADER_SOURCE, FSHADER_SOURCE)) {

        // TODO: Log error
        alert("Shader Error, ERROR Creating shaders.");
        return;
    }

    iResolution_U = gl.getUniformLocation(gl.program, "iResolution");
    iTime_U = gl.getUniformLocation(gl.program, "iTime");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    var n = initVertexBuffer(gl);

    var errorRes = initUniformBuffer(gl, Time.Clock.elapsedTime, window.innerWidth, window.innerHeight);

    mainLoop();

}
function mainLoop(timestamp) {

    requestAnimationFrame(mainLoop);
        
    var elapsedTime = performance.now();
    
    TotalSeconds += (elapsedTime - lastElapsedTime) / 1000;

    updateUniformBufferTime(TotalSeconds);

    updateProc(elapsedTime);

    renderProc(elapsedTime);

    lastElapsedTime = elapsedTime;
}

