var XHR = (function() {
	var PROTO = function XHR() {
        Base.call(this,['XHR']);
        
		var _THIS = this;
		var is_IE = false;
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			is_IE = true;
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		QProperty.call(this, [ 'URL' ]);
		_THIS.URL.afterSet = function(_url) {
		}
		QProperty.call(this, [ 'Async' ]);
		_THIS.Async(true);
		_THIS.Async.afterSet = function(_async) {
		}
		QProperty.call(this, [ 'Method' ]);
		_THIS.Method('POST');
		_THIS.Method.afterSet = function(_Method) {
		}
		QProperty.call(this, [ 'Headers' ]);
		_THIS.Headers({});
		_THIS.Headers.afterSet = function(_headers) {
			
		}
		QProperty.call(this, [ 'Body' ]);
		_THIS.Body({});
		_THIS.Body.afterSet = function(_body) {
		}

		QProperty.call(this, [ 'OnAbort' ]);
		_THIS.OnAbort(function(ref, xhr, event) {
		});
		QProperty.call(this, [ 'OnError' ]);
		_THIS.OnError(function(ref, xhr, event) {
		});
		QProperty.call(this, [ 'OnStart' ]);
		_THIS.OnStart(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnConnect' ]);
		_THIS.OnConnect(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnRequestReceived' ]);
		_THIS.OnRequestReceived(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnProcessingRequest' ]);
		_THIS.OnProcessingRequest(function(ref, xhr) {
		});

		QProperty.call(this, [ 'OnResponseReady' ]);
		_THIS.OnResponseReady(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnResponseError' ]);
		_THIS.OnResponseError(function(ref, xhr) {
		});

		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 0) {
				_THIS.OnStart()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 1) {
				_THIS.OnConnect()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 2) {
				_THIS.OnRequestReceived()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 3) {
				_THIS.OnProcessingRequest()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					_THIS.OnResponseReady()(_THIS, xmlhttp);
				} else {
					_THIS.OnResponseError()(_THIS, xmlhttp);
				}

			}
		}

		QProperty.call(this, [ 'OnProgress' ]);
		_THIS.OnProgress(function(ref, xhr) {
		});

		xmlhttp.onabort = function(event) {
			_THIS.OnAbort()(_THIS, xmlhttp, event);
		}
		
		xmlhttp.onerror = function(event) {
			_THIS.OnError()(_THIS, xmlhttp, event);
		}
		
		var poll_request = function() {
			if (xmlhttp.readyState <= 4 &&  xmlhttp.readyState >= 2) {
				_THIS.OnProgress()(_THIS, xmlhttp);
				setTimeout(poll_request, PROTO.POLL_FREQUENCY)
			}
		}
		
		_THIS.init = function() {
			_THIS.OnStart()(_THIS, xmlhttp);
			if(_THIS.Method()=='GET'){
				xmlhttp.open(_THIS.Method(), _THIS.URL()+'?'+serializeDict(_THIS.Body(), '=', '&'), _THIS.Async());
				var headers=_THIS.Headers();
				for(var n in headers){
					xmlhttp.setRequestHeader(n,headers[n]);
				}
				xmlhttp.send();
			}else{
				xmlhttp.open(_THIS.Method(), _THIS.URL(), _THIS.Async());
				for(var n in headers){
					xmlhttp.setRequestHeader(n,headers[n]);
				}
				xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xmlhttp.send(serializeDict(_THIS.Body(), '=', '&'));
			}
			poll_request();
			return _THIS;
		}
		
		_THIS.abort = function() {
			xmlhttp.abort();
			return _THIS;
		}
	};
	PROTO.LongPolling=function(){
		var xhr;
		var _THIS=this;
		var paused=false;
		this.pause=function(){paused=true;return _THIS}
		this.resume=function(){
			paused=false;
			xhr.init();
			return _THIS;
		}
		var _exec=function longPolling_exec(){
			if(!paused){
				setTimeout(function (){
					xhr.init();
				},_THIS.Period());
			}
		}
		QProperty.call(this, [ 'URL' ]);
		_THIS.URL.afterSet = function(_url) {
			xhr.URL(_THIS.URL());
		}
		QProperty.call(this, [ 'Period' ]);
		_THIS.Period(5000);
		
		QProperty.call(this, [ 'Headers' ]);
		_THIS.Headers({});
		_THIS.Headers.afterSet = function(_headers) {
			xhr.Headers(_THIS.Headers());
		}
		QProperty.call(this, [ 'Body' ]);
		_THIS.Body({});
		_THIS.Body.afterSet = function(_body) {
			xhr.Body(_THIS.Body());
		}
		QProperty.call(this, [ 'OnError' ]);
		_THIS.OnError(function(ref, xhr, event) {
		});
		
		QProperty.call(this, [ 'OnRequestReceived' ]);
		_THIS.OnRequestReceived(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnProcessingRequest' ]);
		_THIS.OnProcessingRequest(function(ref, xhr) {
		});

		QProperty.call(this, [ 'OnResponseReady' ]);
		_THIS.OnResponseReady(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnResponseError' ]);
		_THIS.OnResponseError(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnProgress' ]);
		_THIS.OnProgress(function(ref, xhr) {
		});
		
		xhr=new XHR()
			.URL(_THIS.URL())
			.Async(true)
			.Method('POST')
			.Headers(_THIS.Headers())
			.Body(_THIS.Body())
			.OnError(function (_ref, _xhr, event){
				_THIS.OnError()(_ref, _xhr, event);
				_exec();
			})
			.OnResponseReady(function(_ref, _xhr){
				_THIS.OnResponseReady()(_ref, _xhr);
				_exec();
			})
			.OnResponseError(function(_ref, _xhr){
				_THIS.OnResponseError()(_ref, _xhr);
				_exec();
			})
			.OnProgress(function (_ref, _xhr){
				_THIS.OnProgress()(_ref, _xhr);
			});
		_exec();
	}
	PROTO.LongPolling.test=function(url,body){
		var asd=new XHR.LongPolling().URL(url || "test_application.php").Body(body || {cmd:'request_body',mb:'32'})
		return asd;
	}
	PROTO.test=function(url,body){
		var time=new Date().getTime();
		XHR.POLL_FREQUENCY=10;
		var asd=new XHR()
			.URL(url||"test_application.php")
			.Async(true)
			.Body(body||{cmd:'big_data',mb:'32'})//big_data//request_body
			.Headers({})
			.Method('POST')
			.OnAbort(function(ref,xhr,event){
				console.log('!A - aborted',new Date().getTime()-time);
			})
			.OnError(function(ref,xhr,event){
				console.log('!E - error',new Date().getTime()-time);
			})
			
			.OnStart(function(ref,xhr,event){console.log('0 - start',new Date().getTime()-time);})
			.OnConnect(function(ref,xhr,event){console.log('1 - connected',new Date().getTime()-time);})
			.OnRequestReceived(function(ref,xhr,event){console.log('2 - received',new Date().getTime()-time);})
			.OnProcessingRequest(function(ref,xhr,event){
				//console.log('3.0 - processing',new Date().getTime()-time);
			})
			.OnResponseReady(function(ref,xhr,event){
				console.log('4.0 - ready',new Date().getTime()-time);
				PROTO.POLL_FREQUENCY = 100;
			})
			.OnResponseError(function(ref,xhr,event){
				console.log('4.1 - response error : '+xhr.status,new Date().getTime()-time);
				PROTO.POLL_FREQUENCY = 100;
			})
			.OnProgress(function(ref,xhr,event){
				var dt=new Date().getTime()-time;
				console.log(
					'3.1 - receiving data',
					parseInt(xhr.responseText.length/1024/1024+0.5)+'Mbytes, '+parseInt(xhr.responseText.length/1024/dt+0.5)+'KB/s'
				);
			})
			
			.init();
		return asd;
	}
	PROTO.POLL_FREQUENCY = 100;
	PROTO.LONG_POLL_FREQUENCY = 2000;
	return PROTO;
})();


var XDR = (function() {
	var PROTO = function XDR() {
        Base.call(this,['XDR']);
		var _THIS = this;
		var is_IE = false;
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			is_IE = true;
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if (window.XDomainRequest) {
			xmlhttp = new window.XDomainRequest();
		} else {
			xmlhttp = new XMLHttpRequest();
		}
		
		QProperty.call(this, [ 'URL' ]);
		_THIS.URL.afterSet = function(_url) {
		}
		QProperty.call(this, [ 'Async' ]);
		_THIS.Async(true);
		_THIS.Async.afterSet = function(_async) {
		}
		QProperty.call(this, [ 'Method' ]);
		_THIS.Method('POST');
		_THIS.Method.afterSet = function(_Method) {
		}
		QProperty.call(this, [ 'Headers' ]);
		_THIS.Headers({});
		_THIS.Headers.afterSet = function(_headers) {
			for ( var name in _headers) {
				xmlhttp.setRequestHeader(n, _headers[name]);
			}
		}
		QProperty.call(this, [ 'Body' ]);
		_THIS.Body({});
		_THIS.Body.afterSet = function(_body) {
		}

		QProperty.call(this, [ 'OnStart' ]);
		_THIS.OnStart(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnConnect' ]);
		_THIS.OnConnect(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnRequestReceived' ]);
		_THIS.OnRequestReceived(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnProcessingRequest' ]);
		_THIS.OnProcessingRequest(function(ref, xhr) {
		});

		QProperty.call(this, [ 'OnResponseReady' ]);
		_THIS.OnResponseReady(function(ref, xhr) {
		});
		QProperty.call(this, [ 'OnResponseError' ]);
		_THIS.OnResponseError(function(ref, xhr) {
		});

		var onreadystatechange=function XDR_onreadystatechanged() {
			if (xmlhttp.readyState == 0) {
				_THIS.OnStart()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 1) {
				_THIS.OnConnect()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 2) {
				_THIS.OnRequestReceived()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 3) {
				_THIS.OnProcessingRequest()(_THIS, xmlhttp)
			}
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					_THIS.OnResponseReady()(_THIS, xmlhttp);
				} else {
					_THIS.OnResponseError()(_THIS, xmlhttp);
				}

			}
		}
			if (xmlhttp) {
				if (window.XDomainRequest) {
					xmlhttp.onload = onreadystatechange
				} else {
					xmlhttp.onreadystatechange = onreadystatechange
				}
			} else {
				//ERROR : cannot XDR
			}
			
		QProperty.call(this, [ 'OnProgress' ]);
		_THIS.OnProgress(function(ref, xhr) {
		});

		xmlhttp.onprogress = function(event) {
			_THIS.OnProgress()(_THIS, xmlhttp, event);
		}

		var poll_request = function() {
			_THIS.OnProgress()(_THIS, xmlhttp);
			if (xmlhttp.readyState != 4) {
				setTimeout(poll_request, PROTO.POLL_FREQUENCY)
			}
		}
		_THIS.init = function() {
			if (xmlhttp) {
				xmlhttp.open(_THIS.Method(), _THIS.URL(), _THIS.Async());
				xmlhttp.send(serializeDict(_THIS.Body(), '=', '&'));
				poll_request();
			} else {
				//ERROR : cannot XDR
			}
			return _THIS;
		}
		_THIS.abort = function() {
			xmlhttp.abort();
		}
	};
	PROTO.POLL_FREQUENCY = 100;
	return PROTO;
})();
