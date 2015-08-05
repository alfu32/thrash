/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/9/12
 * Time: 8:44 AM
 * To change this template use File | Settings | File Templates.
 */
function KeyBuffer(listeningElement,onBufferChangedListener,onBufferFlushedListener){
    var kb=this;
    this.onBufferFlushed=onBufferFlushedListener||function(buff){log("bufeer ended:",buff);};
    this.onBufferChanged=onBufferChangedListener||function(buff){log("bufeer changed:",buff);};
    var le=listeningElement;
    var buffer=[];
    var key_listener=function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.charCode),value;
        if(event.shiftKey === true) {
            value = KeyBuffer.SHIFTED_CODE_MAP[keyCode];
        }else {
            value = KeyBuffer.KEY_CODE_MAP[keyCode];
        }
        if(keyCode==8 || keyCode==46){
            if(buffer.length)buffer.length=buffer.length-1;
            kb.onBufferChanged(buffer.join(""));
            return;
        }
        if(keyCode<32 && value!="return")return;
        if(keyCode!==32 && value!="return"){
            buffer[buffer.length]=value;
            kb.onBufferChanged(buffer.join(""));
        }else{
            kb.onBufferFlushed(buffer.join(""));
            buffer=[]
        }
    }
    listeningElement.addEventListener("keyup",key_listener,true);
}
KeyBuffer.FINISH_STATEMENT={
    8:null,27:null,
}
KeyBuffer.KEY_CODE_MAP={
    8:"backspace", 9:"tab", 13:"return", 16:"shift", 17:"ctrl", 18:"alt", 19:"pausebreak", 20:"capslock", 27:"escape", 32:" ", 33:"pageup",
    34:"pagedown", 35:"end", 36:"home", 37:"left", 38:"up", 39:"right", 40:"down", 43:"+", 44:"printscreen", 45:"insert", 46:"delete",
    48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
    61:"=", 65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
    77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
    96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9",
    106: "*", 107:"+", 109:"-", 110:".", 111: "/",
    112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12",
    144:"numlock", 145:"scrolllock", 186:";", 187:"=", 188:",", 189:"-", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
}
KeyBuffer.SHIFTED_CODE_MAP={
    192:"~", 48:")", 49:"!", 50:"@", 51:"#", 52:"$", 53:"%", 54:"^", 55:"&", 56:"*", 57:"(", 109:"_", 61:"+",
    65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I", 74:"J", 75:"K", 76:"L",
    77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R", 83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
    219:"{", 221:"}", 220:"|", 59:":", 222:"\"",187:"+", 188:"<", 189:">", 191:"?",
    96:"insert", 97:"end", 98:"down", 99:"pagedown", 100:"left", 102:"right", 103:"home", 104:"up", 105:"pageup"
}

KeyBuffer.constructor=KeyBuffer;