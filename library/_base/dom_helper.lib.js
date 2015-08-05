//cE=document.createElement,gEBI=document.getElementById,gEBCN=document.getElementsByClassName;
function ax(n){if(n.offsetParent==null)return 0;else return ax(n.offsetParent)+n.offsetLeft}
function ay(n){if(n.offsetParent==null)return 0;else return ay(n.offsetParent)+n.offsetTop}
function aP(n){
	var _x=n.offsetLeft,_y=n.offsetTop;
	if(n.offsetParent!=null){
		var z=parseInt(n.offsetParent.style.zoom)
		var v=aP(n.offsetParent);
		if(!isNaN(z)){_x*=z;_y*=z;}
		_x+=v.x;_y+=v.y;
	}
	return {x:_x,y:_y}
}
getNodeRelativeGetter=function(nd){
	return function getNodeRelative(c){
		var node=nd,code=c.split("");
		for(var i=0;i<code.length;i++){
			var n=parseInt(code[i]);
			if(!isNaN(n)){node=node.children[n]}
			if(code[i]=='<'){node=node.nextElementSibling}
			if(code[i]=='>'){node=node.previousElementSibling}
			if(code[i]=='^'){node=node.parentNode}
			if(code[i]=='#'){node=node.offsetParent}
			if(node==undefined) throw new ErrorEvent("bad path definition : "+nd+" @ char "+i+" ('"+code[i]+"')")
		}
		return node;
	}
}
/*
Object.prototype.getElementRelative=function getNodeRelative(c){
	var node=this,code=c.split("");
	for(var i=0;i<code.length;i++){
		var n=parseInt(code[i]);
		if(!isNaN(n)){node=node.children[n]}
		if(code[i]=='<'){node=node.nextElementSibling}
		if(code[i]=='>'){node=node.previousElementSibling}
		if(code[i]=='^'){node=node.parentNode}
		if(code[i]=='#'){node=node.offsetParent}
		if(node==undefined) throw ("bad path definition : '"+c+"' @ char "+i+" ('"+code[i]+"')")
	}
	return node;
}*/
function _(id){
	var el=document.getElementById(id);
	el.rel=getNodeRelativeGetter(el);
	return el;
}

nodeMap=function _nodeMap(node,text){
	var map=[];
	if(node.attributes!=null){
		var attrs=node.attributes;
		for(var i=0;i<attrs.length;i++){
			if(attrs[i].nodeValue==text){
				map[map.length]=attrs[i+""];
			}
		}
	}
	if(node.nodeType!=1){
		if(node.nodeValue==text)map[map.length]=node;
	}
	for(var i=0;i<node.childNodes.length;i++){
		map=map.concat(nodeMap(node.childNodes[i],text));
	}
	return map;
};
MAKE={};
tagNames=["h1","h2","h3","h4","h5","a","center","fake","source", "video", "media", "audio", "track", "shadow", "content", "unknown", "ulist", "title", "textarea"
          , "template", "tbody","thead","tfoot", "tr", "table", "th", "td", "caption", "style", "strong", "span"
          , "select", "script", "quote", "progress", "pre", "param", "paragraph", "output", "option", "optgroup", "object"
          , "olist", "mod", "meter", "meta", "menu", "marquee", "map", "link", "legend", "label", "li", "keygen", "input"
          , "img", "iframe", "heading", "head", "hr", "frameset", "frame", "form", "font", "fieldset", "embed", "div"
          , "directory", "datalist", "dlist", "canvas", "button", "body", "basefont", "base", "br", "area", "applet"
          , "anchor"];
for(var i in tagNames){
	MAKE[tagNames[i]+""]=(function(eltc){
	return function(){
		var el=document.createElement(eltc);
		if(arguments.length>0){
			for(var i in arguments[0]){
				try{
					el[i]=arguments[0][i];
				}catch(err){alert("MAKE attrs error:"+err+',index:'+i+',argument:'+arguments[0][i])}
			}
		}
		if(arguments.length>1){
			for(var i in arguments[1]){
				try{
					el.style[i]=arguments[1][i];
				}catch(err){alert("MAKE style error: "+err+',index:'+i+',argument:'+arguments[0][i])}
			}
		}
		if(arguments.length>2){
			for(var i in arguments[2]){
				//try{
					el.appendChild(arguments[2][i]);
				//}catch(err){alert("MAKE chlidren error:"+err+',index:'+i+',argument:'+arguments[0][i])}
			}
		}
	  return el;
	};
  })(tagNames[i]+"");
}
MAKE2={
	'box':function(){
		var box=MAKE.div({},{backgroundRepeat:'no-repeat',backgroundPosition:'50% 50%',display:'inline-block'});
		return box;
		}
	,'progress':function(a,b){
		var s1;
		var _view=MAKE.div({align:'left'},{position:'absolute',width:'330px',backgroundRepeat:'no-repeat',backgroundPosition:'50% 50%',display:'inline-block',border:'1px solid #123'}
			,[
				s1=MAKE.div({innerHTML:'0%',align:'right'},{position:'absolute',backgroundColor:'#123',color:'#FFF',backgroundRepeat:'no-repeat',backgroundPosition:'50% 50%',display:'inline-block',fontSize:'16px',})
			]);
		var _progress=0;
		_view.__defineSetter__('value',function(val){
			_progress=val;
			s1.innerHTML=parseInt(_progress)+'%'
			s1.style.width=parseInt(330*val/100);
		});
		_view.__defineGetter__('value',function(){
			return _progress;
		});
		_view.show=function _show(parent){parent.appendChild(_view);}
		_view.hide=function _show(parent){_view.parentNode.removeChild(_view);}
		return _view;
	}
}
IS={
		WEBKIT:(function(){return navigator.userAgent.indexOf('AppleWebKit')>-1})()
		,IE:(function(){return navigator.userAgent.indexOf('MSIE')>-1})()
		,FF:(function(){return navigator.userAgent.indexOf('Firefox')>-1})()
		,WINDOWS:(function(){return navigator.userAgent.indexOf('Windows NT')>-1})()
		,LINUX:(function(){return navigator.userAgent.indexOf('Linux')>-1})()
		,OSX:(function(){return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
}
DO={
	cancelEvent:function(e){
		var event = e || window.event;
		if(event.preventDefault){ event.preventDefault();}else{event.returnValue = false; }
	}
	,cancelPropagation:function(e){
		var event = e || window.event;
		if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble = true;}
	}
	,addEventListener:function(eventTarget, eventType, eventHandler) { 
		if (eventTarget.addEventListener) {eventTarget.addEventListener(eventType, eventHandler,false);} 
		else
			if (eventTarget.attachEvent) {
				eventType = "on" + eventType;
				eventTarget.attachEvent(eventType, eventHandler);} 
			else {eventTarget["on" + eventType] = eventHandler;}
		}
}
GET={
	X:function(element){
		var ez=element.style.zoom;
		var Z=(element.tagName,isNaN(parseFloat(ez))?1:parseFloat(ez))
		//console.log(element)
		if(element.offsetParent!=null){
			return element.offsetLeft+this.X(element.offsetParent);
		}else { return element.offsetLeft;}
	}
	,Y:function(element){
		var ez=element.style.zoom;
		var Z=(element.tagName,isNaN(parseFloat(ez))?1:parseFloat(ez))
		if(element.offsetParent!=null){
			return element.offsetTop+this.Y(element.offsetParent);
		}else { return element.offsetLeft;}
	}
	,Pos:function(element){
		var _x=element.offsetLeft,_y=element.offsetTop;
		if(element.offsetParent!=null){
			var z=parseInt(element.offsetParent.style.zoom)
			var v=this.Pos(element.offsetParent);
			if(!isNaN(z)){_x*=z;_y*=z;}
			_x+=v.x;_y+=v.y;
		}
		var o={x:_x,y:_y}
		//console.log(element,o);
		return o;
	}
	,Box:function(element){
		var _p=this.Pos(element);
		var o={x:_p.x,y:_p.y,w:element.offsetWidth,h:element.offsetHeight};
		//console.log(element,o);
		return o;
	}
	,Relative:function(element,path){
		var node=element,code=path.split("");
		for(var i=0;i<code.length;i++){
			var n=parseInt(code[i]);
			if(!isNaN(n)){node=node.children[n]}
			if(n=='<'){node=node.nextElementSibling}
			if(n=='>'){node=node.previousElementSibling}
			if(n=='^'){node=node.parentNode}
			if(n=='#'){node=node.offsetParent}
		}
		return node;
	}
	,EventCoords:function(e) {
	    e = e || window.event;
	    var target = e.target || e.srcElement,
	        rect = target.getBoundingClientRect(),
	        offsetX = e.clientX - rect.left,
	        offsetY = e.clientY - rect.top;
	    return {x:offsetX,x:offsetY};
	}
}
SET={
		css:function(element,style){
			for(var s in style){
				try{
					element.style[s]=style[s]
				}catch(err){alert("SET.css "+err+':'+s+'>'+style[s])}
			}
		}
		,attr:function(element,attrs){
			for(var a in attrs){
				try{
					element[a]=attrs[a]
				}catch(err){alert("SET.attr "+err+':'+a+'>'+attrs[a])}
			}
		}
		,on:function(element,_events){
			for(var ev in _events){
				try{
					element['on'+_events[ev]]=_function[ev]
				}catch(err){alert("SET.on "+err+':'+ev+'>'+_events[ev])}
			}
		}
		,pos:function(element,posVector){
			element.style.left=posVector.x+'px';
			element.style.top=posVector.y+'px';
		}
		,box:function(element,_box){
			element.style.left=_box.x+'px';
			element.style.top=_box.y+'px';
			element.style.width=_box.w+'px';
			element.style.height=_box.h+'px';
		}
}
HAS={
	properties:function(object){
		var has=false;
		for(var prop in object){
			has=has||object.hasOwnProperty(prop);
		}
		return has;
	}
}
REPORT={
		ERROR:function(err){
			function pad(n){return n<10?'0'+n:n}
			var er=printStackTrace(err)
			var dta="CLASS|JAVASCRIPT_ERROR"
			for(var i=0;i<er.length;i++){
				dta+=';stacktrace_'+pad(i)+"|"+encodeURIComponent(er[i]);
			}
			var asd={cmd:'insert_error',data:dta}
				//console.log(asd)
			CallText2("POST",'__UTIL_report_error_application.php',asd);
		}
	,LOG:function(KVOBJECT){
		var asd={cmd:'insert_error',data:'CLASS|JAVASCRIPT_LOG'};
		asd.cmd='insert_error'
			
			for(var j in KVOBJECT){
				var key=j
				asd.data+=';'+j+'|'+encodeURIComponent(KVOBJECT[j]);
			}
			CallText2("POST",'__UTIL_report_error_application.php',asd);
	}
}
