/**
 * Created by alf on 05/01/14.
 */
var XHR=(function(){
    var PROTO=function XHR(){
        var _THIS=this;
        var is_IE=false;
        var xmlhttp;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }else{
            // code for IE6, IE5
            is_IE=true;
            xmlhttp=new ActiveXObject("Msxml2.XMLHTTP.3.0");
        }

        QProperty.call(this,['URL']);
        _THIS.URL.afterSet=function(_url){
        }
        QProperty.call(this,['Async']);
        _THIS.Async(true);
        _THIS.Async.afterSet=function(_async){
        }
        QProperty.call(this,['Method']);
        _THIS.Method('POST');
        _THIS.Method.afterSet=function(_Method){
        }
        QProperty.call(this,['Headers']);
        _THIS.Headers({});
        _THIS.Headers.afterSet=function(_headers){
        }
        QProperty.call(this,['Body']);
        _THIS.Body({});
        _THIS.Body.afterSet=function(_body){
        }

        QProperty.call(this,['OnStart']);
        _THIS.OnStart(function(ref,xhr){});
        QProperty.call(this,['OnConnect']);
        _THIS.OnConnect(function(ref,xhr){});
        QProperty.call(this,['OnRequestReceived']);
        _THIS.OnRequestReceived(function(ref,xhr){});
        QProperty.call(this,['OnProcessingRequest']);
        _THIS.OnProcessingRequest(function(ref,xhr){});

        QProperty.call(this,['OnResponseReady']);
        _THIS.OnResponseReady(function(ref,xhr){});
        QProperty.call(this,['OnResponseError']);
        _THIS.OnResponseError(function(ref,xhr){});

        xmlhttp.onreadystatechange=function(){
            if (xmlhttp.readyState==0){
                _THIS.OnStart()(_THIS,xmlhttp)
            }
            if (xmlhttp.readyState==1){
                _THIS.OnConnect()(_THIS,xmlhttp)
            }
            if (xmlhttp.readyState==2){
                _THIS.OnRequestReceived()(_THIS,xmlhttp)
            }
            if (xmlhttp.readyState==3){
                _THIS.OnProcessingRequest()(_THIS,xmlhttp)
            }
            if (xmlhttp.readyState==4){
                if(xmlhttp.status==200){
                    _THIS.OnResponseReady()(_THIS,xmlhttp);
                }else{
                    _THIS.OnResponseError()(_THIS,xmlhttp);
                }

            }
        }

        QProperty.call(this,['OnProgress']);
        _THIS.OnProgress(function(ref,xhr){});

        xmlhttp.onprogress=function(event){
            _THIS.OnProgress()(_THIS,xmlhttp,event);
        }

        var poll_request=function(){
            _THIS.OnProgress()(_THIS,xmlhttp);
            if(xmlhttp.readyState!=4){
                setTimeout(poll_request,PROTO.POLL_FREQUENCY)
            }
        }
        _THIS.init=function(){
            xmlhttp.open(_THIS.Method(),_THIS.URL(),_THIS.Async());
            var _headers=_THIS.Headers();
            for(var name in _headers){
                xmlhttp.setRequestHeader(name,_headers[name]);
            }
            switch(_THIS.Method()){
                case 'POST':
                    break;
                case 'GET':
                    break;
                case 'JSONP':
                    break;
                case 'XML':
                    break;
            }
            xmlhttp.send(serializeDict(_THIS.Body(),'=','&'));
            poll_request();
        }
        _THIS.abort=function(){
            xmlhttp.abort();
        }
    };
    PROTO.POLL_FREQUENCY=100;
    return PROTO;
})();
