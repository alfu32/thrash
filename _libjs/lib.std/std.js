/**
 * Created with JetBrains WebStorm.
 * User: ioanalferaru
 * Date: 08/10/12
 * Time: 13:36
 * To change this template use File | Settings | File Templates.
 */

Object.defineProperty(Object.prototype,"getKeys",{
    value:function Object_getKeys(quote){
        var _quote=quote||"";
        var keys=[];
        for(var i in this){
            keys.push(_quote+i+_quote);
        }
        return keys;
    },
    configurable:false,
    enumerable:false
});
Object.defineProperty(Object.prototype,"getValues",{
    value:function Object_getValues(quote){
        var _quote=quote||"";
        var values=[];
        for(var i in this){
            values.push(_quote+this[i]+_quote);
        }
        return values;
    },
    configurable:false,
    enumerable:false
});"´"
Object.defineProperty(Object.prototype,"getKeyValuePairs",{
    value:function Object_getKeyValuePairs(s){
        var delimiter=arguments[0];
        var pairs=[];
        for(var i in this){
            pairs.push(""+i+s+this[i]);
        }
        return pairs;
    },
    configurable:false,
    enumerable:false
});
Object.defineProperty(String.prototype,"surroundWith",{
    value:function String_surroundWith(s){
        return s+this+s;
    },
    configurable:false,
    enumerable:false
});

/*DEBUG_LEVEL={
    'server':-1,
    'all':0,
    'trace':2,
    'warn':3,
    'logs':4,
    'nothing':7,
    setDebugLevel:function _setDebugLevel(v){
        this._level=v;
    },
    _level:0
}*/
NO_DEBUG=false;
function ajaxinclude(url)
{
    var page_request = false;
    if (window.XMLHttpRequest) // if Mozilla, Safari etc
        page_request = new XMLHttpRequest()
    else if (window.ActiveXObject) // if IE
    {
        try {
            page_request = new ActiveXObject("Msxml2.XMLHTTP")
        }
        catch (e){
            try{
                page_request = new ActiveXObject("Microsoft.XMLHTTP")
            }
            catch (e){}
        }
    }
    else return false

    page_request.open() //get page synchronously
    page_request.send(null)
    return page_request.responseText;
}
function TODO(what) {
        log('TODO: ' + what);
}

function warn(msg){
    //if(DEBUG_LEVEL._level<=DEBUG_LEVEL.logs)
        log(msg);
    //if(DEBUG_LEVEL._level<=DEBUG_LEVEL.trace)
        trace();
}
function log(){
    if(NO_DEBUG)return
    var a=arguments;
    try{
        console.log.apply(console,arguments);
    }catch(e){
        console.log(a[0],a[1]||"",a[2]||"",a[3]||"",a[4]||"");
    }
}
function _echo(){
    var msg=arguments[0];
    return function(){
        console.log(msg);
        if(NO_DEBUG)return
        for(var i=0;i<arguments.length;i++){
            console.log(arguments[i]);
        }
    }
}
function _empty(){}
function trace(){
    if(NO_DEBUG)return
    var a=arguments;
    try{
        console.trace.apply(console,arguments);
    }catch(e){
        console.trace();
    }
}
function _abstract_custom(message){
    return function(){
        //if(DEBUG_LEVEL._level<=DEBUG_LEVEL.trace)
            log(message)
    }
}
function _abstract(){
    //if(DEBUG_LEVEL._level<=DEBUG_LEVEL.warn)
        warn("abstract : implement function");
}
function _ajaxBinding(url){
    this.binding = null;
    this.url=url;
    var _self=this;
    this.onBeforeInit=_empty;//_echo("-1: request not initialized");
    this.onRequestInit=_empty;//_echo("0: request not initialized");
    this.onConnected=_empty;//_echo("1: server connection established");
    this.onRequestReceived=_empty;//_echo("2: request received");
    this.onProcessRequest=_empty;//_echo("3: processing request");
    this.onResponseReady=_empty;//_echo("4: request finished and response is ready");

this.init=function(){
        var binding=null;
        if (window.XMLHttpRequest) // if Mozilla, Safari etc
            this.binding = new XMLHttpRequest()
        else if (window.ActiveXObject) // if IE
        {
            try {
                this.binding = new ActiveXObject("Msxml2.XMLHTTP")
            }
            catch (e){
                try{
                    this.binding = new ActiveXObject("Microsoft.XMLHTTP")
                }
                catch (e){}
            }
        }

    this.binding.onabort=this.onabort||_empty;//_abstract();
    this.binding.onerror=this.onerror||_empty;//_abstract();
    this.binding.onload=this.onload||_empty;//_abstract();
    this.binding.onloadend=this.onloadend||_empty;//_abstract();
    this.binding.onloadstart=this.onloadstart||_empty;//_abstract();
    this.binding.onprogress=this.onprogress||_empty;//_abstract();

    binding=this.binding;
            this.binding.onreadystatechange=function(event)
            {
                switch(this.readyState){
                    case 0:
                        _self.onRequestInit(event);
                        break;
                    case 1:
                        _self.onConnected(event);
                        break;
                    case 2:
                        _self.onRequestReceived(event);
                        break;
                    case 3:
                        _self.onProcessRequest(event);
                        break;
                    case 4:
                        _self.close();
                        _self.onResponseReady(binding,event);
                    break;
                }
            }
        return this;
    };
}
_ajaxBinding.prototype={
    send:function(data,MODE,SYNC,header){
        this.init();
        this.binding.open(MODE, this.url+data, SYNC)
        this.isOpened=true;
        this.binding.send(header||null);
    },
    close:function(){
        //this.binding.abort()
    },
    _GET:"GET",
    _POST:"POST"
}
function pack(o){
    var s=[]
    for(var i in o){
        s.push(i+":"+o[i]);
    }
    return s.join("@")
}
function unpack(o){
    var r={}
    var s= o.split('@')
    for(var i=0;i< s.length;i++){
        var p=s[i].split(':');
        r[p[0]]=p[1]
    }
    return r;
}
function _property(Class,name,prototype){
    var _name=name[0].toUpperCase()+name.substr(1);
    Class[name]=type;
    Class.prototype["set"+_name]=(function(Value){
        if(typeof Value == typeof prototype){
            this[name]=Value;
        }
        else{
            warn("argument must be "+ (typeof prototype));
        }
    }).bind(Class);
    Class.prototype["get"+_name]=(function(){
        return this[name];
    }).bind(Class);
}
function _accessor(Class,name,code){
    Class.prototype[name]=(function(){
        code.apply(this,arguments);
    }).bind(Class);
}

function _synchronized(Class,name,func){
    func.this=(function(){
        if(typeof arguments[0]=="function"){
            if(func()) return Class;
            else return Class;
        }
    }).bind(Class);
}