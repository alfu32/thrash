NORM={
    addListener:function addEventHandler(elem,eventType,handler) {
        if (elem.addEventListener)
            elem.addEventListener (eventType,handler,false);
        else if (elem.attachEvent)
            elem.attachEvent ('on'+eventType,handler);
    }
    ,removeListener:function removeEventHandler(elem,eventType,handler) {
        if (elem.removeEventListener)
            elem.removeEventListener (eventType,handler,false);
        if (elem.detachEvent)
            elem.detachEvent ('on'+eventType,handler);
    }
	,event:function(e){
		return e||event||window.event;
	}
	,target:function(event){
		return event.srcElement||event.target;
	}
    ,wheelDetail:function(e){
        var event = this.event( e||event);
        var detail=0;
        if(e.wheelDelta!=undefined){
            detail= -event.wheelDelta/120;
        }else{
            detail=event.detail;
        }
        return detail;
    }
	,preventDefault:function(e){
		var event = this.event( e||event)
		if (event.preventDefault) {  // W3C variant
			event.preventDefault()
		} else {					 // IE<9 variant:
			event.returnValue = false
		}
	}
	,stopPropagation:function(e){
		var event = this.event( e||event||window.event)
	    event.cancelBubble = true
		if (event.stopPropagation) {
	        event.stopPropagation();
		}
	}
	,mouseCoords:function(e){
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
		var event=NORM.event(e);
		var x,y;
		if(IS.IE){
			x=event.offsetX;y=event.offsetY;
		}else{
			if(IS.FF){
				x=event.layerX;y=event.layerY;
			}else{
				x=event.offsetX/Z;y=event.offsetY/Z;
			}
		}
	}
	,mouseX:function(e){
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
		var event=NORM.event(e);
		var x;
		if(IS.IE){
			x=event.offsetX;
		}else{
			if(IS.FF){
				x=event.layerX;
			}else{
				x=event.offsetX/Z;
			}
		}
		return x;
	}
	,mouseY:function(e){
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
		var event=NORM.event(e);
		var y;
		if(IS.IE){
			y=event.offsetY;
		}else{
			if(IS.FF){
				y=event.layerY;
			}else{
				y=event.offsetY/Z;
			}
		}
		return y;
	}
}