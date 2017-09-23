var keysDown = {};

var Key_F1 = 0x70;
var Key_F2  = 0x71;
var Key_F3  = 0x72;
var Key_F4  = 0x73;
var Key_F5  = 0x74;
var Key_F6  = 0x75;
var Key_F7  = 0x76;
var Key_F8  = 0x77;
var Key_F9  = 0x78;
var Key_F10  = 0x79;
var Key_F11  = 0x7A;
var Key_F12  = 0x7B;

var Key_SHIFT  = 0x10;
var Key_LSHIFT  = 0xA0;
var Key_RSHIFT  = 0xA1;

var Key_CTRL  = 0x11;
var Key_LCTRL  = 0xA2;
var Key_RCTRL  = 0xA3;

var Key_ALT  = 0x12;
var Key_TAB  = 0x09;
var Key_ENTER  = 0x0D;
var Key_ESC  = 0x1B;
var Key_SPACE  = 0x20;
var Key_SCREENSHOT  = 0x2C;

var Key_LEFT  = 0x25;
var Key_RIGHT  = 0x27;
var Key_UP  = 0x26;
var Key_DOWN  = 0x28;

var Key_Tilda  = 0xC0;
var Key_0  = 0x30;
var Key_1  = 0x31;
var Key_2  = 0x32;
var Key_3  = 0x33;
var Key_4  = 0x34;
var Key_5  = 0x35;
var Key_6  = 0x36;
var Key_7  = 0x37;
var Key_8  = 0x38;
var Key_9  = 0x39;

var Key_A  = 0x41;
var Key_B  = 0x42;
var Key_C  = 0x43;
var Key_D  = 0x44;
var Key_E  = 0x45;
var Key_F  = 0x46;
var Key_G  = 0x47;
var Key_H  = 0x48;
var Key_I  = 0x49;
var Key_J  = 0x4A;
var Key_K  = 0x4B;
var Key_L  = 0x4C;
var Key_M  = 0x4D;
var Key_N  = 0x4E;
var Key_O  = 0x4F;
var Key_P  = 0x50;
var Key_Q  = 0x51;
var Key_R  = 0x52;
var Key_S  = 0x53;
var Key_T  = 0x54;
var Key_U  = 0x55;
var Key_V  = 0x56;
var Key_W  = 0x57;
var Key_X  = 0x58;
var Key_Y  = 0x59;
var Key_Z = 0x5A;

function initKeyBoard(doc) {

    doc.addEventListener('keydown', function (event) {

        keysDown[event.keyCode] = true;

        event.preventDefault();

    });

    doc.addEventListener('keyup', function (event) {

        keysDown[event.keyCode] = false;

        event.preventDefault();

    });

}