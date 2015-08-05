Base.call(this,['NORM']);
NORM={
	FILES:function(input){
		var ret=input['files'];
		if(ret===undefined){
			try{
				var fso = new ActiveXObject("Scripting.FileSystemObject");
				var selectedfile = fso.getFile(input.value);
				return [{lastModifiedDate:selectedfile.DateLastModified,name:input.value,size:selectedfile.Size,type:selectedfile.Type}];
			}catch(error){
				return [{lastModifiedDate:new Date(),name:input.value,size:"1",type:"application/undefined"}];
			}
		};
		return ret;
	}
	,event:function(event){
		Base.call(this,['NORM']);
		return event||window.event;
	}
	,contentDocument:function(iframe_ref){
		var noid=false;
		if(iframe_ref.name==undefined){
			noid=true;
			iframe_ref.id='iframe_'+(Math.random()*99999)+'-'+(Math.random()*99999)+'-'+(Math.random()*99999);
		}
		var doc=(iframe_ref.contentWindow || iframe_ref.contentDocument || frames[iframe_ref.name.contentDocument]);
		if(doc.document!==undefined)doc=doc.document;
		if(noid){
			iframe_ref.name="";
		}
		return doc;
	}
	,target:function(event){
		Base.call(this,['NORM']);
		var targ,e=event;
		if (event==undefined) e = window.event;
		if (e.target!=undefined) targ = e.target;
		else if (e.srcElement!=undefined) targ = e.srcElement;
		if (targ.nodeType == 3) // defeat Safari bug
			targ = targ.parentNode;
		return targ;
	}
	,preventDefault:function(event){
		Base.call(this,['NORM']);
		var _event = this.event(event)
		if (_event.preventDefault) {  // W3C variant
			_event.preventDefault()
		} else {					 // IE<9 variant:
			_event.returnValue = false
		}
	}
	,stopPropagation:function(event){
		Base.call(this,['NORM']);
		var _event = this.event( event||window.event)
		if(IS.IE){
            _event.cancelBubble = true;
        } else {
            _event.stopPropagation();
        }
	}
	,mouseCoords:function(event){
		Base.call(this,['NORM']);
		var IS={
			WEBKIT:(function(){return navigator.userAgent.indexOf('AppleWebKit')>-1})()
			,IE:(function(){return navigator.userAgent.indexOf('MSIE')>-1})()
			,FF:(function(){return navigator.userAgent.indexOf('Firefox')>-1})()
			,WINDOWS:(function(){return navigator.userAgent.indexOf('Windows NT')>-1})()
			,LINUX:(function(){return navigator.userAgent.indexOf('Linux')>-1})()
			,OSX:(function(){return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
		}
        var Z;
	    if(isNaN(parseFloat(document.body.style.zoom))){Z=1}
	    else {Z=parseFloat(document.body.style.zoom);}
		var _event=NORM.event(e);
		var x,y;
		if(IS.IE){
			x=_event.offsetX;y=_event.offsetY;
		}else{
			if(IS.FF){
				x=event.layerX;y=event.layerY;
			}else{
				x=_event.offsetX/Z;y=_event.offsetY/Z;
			}
		}
	}
	,mouseX:function(event){
		Base.call(this,['NORM']);
		var IS={
			WEBKIT:(function(){return navigator.userAgent.indexOf('AppleWebKit')>-1})()
			,IE:(function(){return navigator.userAgent.indexOf('MSIE')>-1})()
			,FF:(function(){return navigator.userAgent.indexOf('Firefox')>-1})()
			,WINDOWS:(function(){return navigator.userAgent.indexOf('Windows NT')>-1})()
			,LINUX:(function(){return navigator.userAgent.indexOf('Linux')>-1})()
			,OSX:(function(){return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
		}
        var Z;
	    if(isNaN(parseFloat(document.body.style.zoom))){Z=1}
	    else {Z=parseFloat(document.body.style.zoom);}
		var _event=NORM.event(event);
		var x;
		if(IS.IE){
			x=_event.offsetX;
		}else{
			if(IS.FF){
				x=event.layerX;
			}else{
				x=_event.offsetX/Z;
			}
		}
		return x;
	}
	,mouseY:function(event){
		Base.call(this,['NORM']);
		var IS={
			WEBKIT:(function(){return navigator.userAgent.indexOf('AppleWebKit')>-1})()
			,IE:(function(){return navigator.userAgent.indexOf('MSIE')>-1})()
			,FF:(function(){return navigator.userAgent.indexOf('Firefox')>-1})()
			,WINDOWS:(function(){return navigator.userAgent.indexOf('Windows NT')>-1})()
			,LINUX:(function(){return navigator.userAgent.indexOf('Linux')>-1})()
			,OSX:(function(){return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
		}
        var Z;
	    if(isNaN(parseFloat(document.body.style.zoom))){Z=1}
	    else {Z=parseFloat(document.body.style.zoom);}
		var _event=NORM.event(event);
		var y;
		if(IS.IE){
			y=_event.offsetY;
		}else{
			if(IS.FF){
				y=event.layerY;
			}else{
				y=_event.offsetY/Z;
			}
		}
		return y;
	}
	,wheel:function(event){
		Base.call(this,['NORM']);
		var evt=event || window.event;
		var delta=evt.detail? evt.detail : evt.wheelDelta/(-120);
		return delta;
	}
	,typeOf:function(ref,index){
		Base.call(this,['NORM']);
		var o=ref[index];
		var IS={
			WEBKIT:(function(){return navigator.userAgent.indexOf('AppleWebKit')>-1})()
			,IE:(function(){return navigator.userAgent.indexOf('MSIE')>-1})()
			,FF:(function(){return navigator.userAgent.indexOf('Firefox')>-1})()
			,WINDOWS:(function(){return navigator.userAgent.indexOf('Windows NT')>-1})()
			,LINUX:(function(){return navigator.userAgent.indexOf('Linux')>-1})()
			,OSX:(function(){return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
		}
		var _type='Object';
		type=Object.prototype.toString.call(o).substr(8).replace(']','');
		if(IS.IE && typeof(o)=='object'){
			try{
				type=object[index].constructor.toString().split("function ")[1].split("(")[0];
			}catch(error2){
				try{
					type=o.toString().substr(8).replace(']','');
				}catch(err){
					type='Undefined Prototype';
				}
			}
			
			if(type=="")type='Object Extension';
			if(typeof(o.length)!=='undefined' && typeof(o.push)=='undefined'){
				type='array-like Object';
			}
			if(typeof(o.getElementsByTagName)!=='undefined'){
				type='Document';
			}
			if(typeof(o.tagName)!=='undefined'){
				type='HTML'+o.tagName.substr(0,1)+o.tagName.substr(1).toLowerCase()+'Element';
			}
			if(typeof(o.padding)!=='undefined'){
				type='CSSStyleDeclaration';
			}
			if(typeof(o.namedItem)!=='undefined'){
				type='HTMLCollection';
			}
			if(typeof(o.byteLength)!=='undefined'){
				type='ArrayBuffer';
				if(typeof(o.prototype.BYTES_PER_ELEMENT)!=='undefined'){
					var n=Math.pow(2,3*n)
					type='Int'+n+'Array';
				}
			}
			if(typeof(o.window)!=='undefined'){
				type='Window';
			}
			if(index=='childNodes'){
				type='NodeList';
			}
			if(index=='location'){
				type='Location';
			}
			if(index=='localStorage'){
				type='LocalStorage';
			}
		}
		return type;
	}
}