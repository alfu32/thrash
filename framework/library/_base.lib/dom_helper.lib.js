//cE=document.createElement,gEBI=document.getElementById,gEBCN=document.getElementsByClassName;

IS={
		WEBKIT:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('AppleWebKit')>-1})()
		,IE:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('MSIE')>-1})()
		,FF:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('Firefox')>-1})()
		,WINDOWS:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('Windows NT')>-1})()
		,LINUX:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('Linux')>-1})()
		,OSX:(function(){Base.call(this,['IS']);return navigator.userAgent.indexOf('Intel Mac OS X')>-1})()
}

function ax(n){Base.call(this,['IS']);if(n.offsetParent==null)return 0;else return ax(n.offsetParent)+n.offsetLeft}
function ay(n){Base.call(this,['IS']);if(n.offsetParent==null)return 0;else return ay(n.offsetParent)+n.offsetTop}
function aP(n){
	Base.call(this,['IS']);
	var _x=n.offsetLeft,_y=n.offsetTop;
	if(n.offsetParent!=null){
		var z=parseInt(n.offsetParent.style.zoom)
		var v=aP(n.offsetParent);
		if(!isNaN(z)){_x*=z;_y*=z;}
		_x+=v.x;_y+=v.y;
	}
	return {x:_x,y:_y}
}
function retry(f){
	Base.call(this,['IS']);
	try{
		f();
	}catch(err){
		setTimeout(function(){recall(f);},50);
	}
}
getNodeRelativeGetter=function(nd){
	Base.call(this,['IS']);
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
tagNames=["b","i","u","o","p","h1","h2","h3","h4","h5","a","center","fake","source", "video", "media", "audio", "track", "shadow", "content", "unknown", "ulist", "title", "textarea"
          , "template", "tbody","thead","tfoot", "tr", "table", "th", "td", "caption", "style", "strong", "span"
          , "select", "script", "quote", "progress", "pre", "param", "paragraph", "output", "option", "optgroup", "object"
          , "ol","ul","li", "mod", "meter", "meta", "menu", "marquee", "map", "link", "legend", "label", "keygen", "input"
          , "img", "iframe", "heading", "head", "hr", "frameset", "frame", "form", "font", "fieldset", "embed", "div"
          , "directory", "datalist", "dlist", "canvas", "button", "body", "basefont", "base", "br", "area", "applet"
          , "anchor","IFRAME","box","IMAGE","divbox","spanbox","floatdivbox","progressbar","imagebutton"];
var factories={
	IFRAME:function(a,b,c){
		var iframe;
		try {
			iframe = document.createElement('<iframe name="'+(a.name||"")+'" id="'+(a.id||"")+'">');
		} catch (error) {
			try{
			iframe=document.createElement('iframe');
			}catch(horror){
				alert('IFRAME error');
			}
			
		}
		return iframe;
	}
	,box:function(a,b,c){
		if(IS.IE){
			return MAKE.span(a,b,c);
		}else{
			return MAKE.div(a,b,c);
		}
	}
	,IMAGE:function(a,b,c){
		return MAKE.span(a,fuseDict({
			display:'inline-block',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'50% 50%',
			backgroundImage:'url('+(a?(a.src?a.src:''):'')+')',
			width:(b?(b.width?b.width:''):''),
			height:(b?(b.height?b.height:''):'')
		},b),c)
	}
	,divbox:function(a,b,c){
		return MAKE.div(a,{
			display:'inline-block',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'50% 50%',
			backgroundImage:'url('+(a?(a.src?a.src:''):'')+')',
			width:(b?(b.width?b.width:''):''),
			height:(b?(b.height?b.height:''):'')
		},c)
	}
	,spanbox:function(a,b,c){
		return MAKE.span(a,{
			display:'inline-block',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'50% 50%',
			backgroundImage:'url('+(a?(a.src?a.src:''):'')+')',
			width:(b?(b.width?b.width:''):''),
			height:(b?(b.height?b.height:''):'')
		},c)
	}
	,floatdivbox:function(a,b,c){
		a.className='floatbox';
		var box=MAKE.div(a,{
			position:'absolute',
			backgroundRepeat:'no-repeat',
			backgroundPosition:'100% 50%'
		});
		if(b!=undefined){
			for(var i in b){
				box.style[i]=b[i];
			}
		}
		if(c!=undefined){
			for(var i in c){
				try{
					box.appendChild(c[i]);
				}catch(err){}
			}
		}
		retry(function retry_function(){
			window.onscroll=function window_onscroll(){
				var top=parseInt((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
				if(IS.WEBKIT){top/=parseFloat(document.body.style.zoom||1)}
				box.style.top=top+'px';
			}
			window.scrollBy(1,1);
		});
		var _BOX={
				view:box
        		,show:function progressbar_show(_parent){_parent.appendChild(box)}
        		,hide:function progressbar_hide(_parent){box.parentNode.removeChild(box)}
		}
		return box;
	}
	,progressbar:function(a,b,c){
		var timing=(a===undefined)?100:(a.timing||100);
		var WIDTH=200;
		var PADDING=1;
		var FONT_SIZE=10;
		var s0,s1,s2;
		var bar={
        		view:MAKE.divbox({className:'progressbar',align:'left'},{width:WIDTH+'px',backgroundColor:'#C0C0FF',border:'2px solid #A0A0ef'},[
        			s0=MAKE.div({innerHTML:'Processing ...'})
					,s1=MAKE.divbox({align:'right'},{width:'0px',padding:PADDING+'px',fontSize:FONT_SIZE+'px',border:'1px solid #4040AC',backgroundColor:'#9090ef',color:'#125'})
					,s2=MAKE.div()
				])}
				bar.onprogress=function(el,val){
					var s1=el.view.children[1];
					s1.style.width=val*(WIDTH-2*PADDING-2)/100+'px';
					s1.innerHTML=new Number(parseInt(val*2/5)*5/2).toFixed(1)+'%';
				}
				bar.title=function(t){
					if(t!==undefined){
						s0.innerHTML=t;
						return bar;
					}else{
						return s0.innerHTML;
					}
				}
				bar.text=function(t){
					if(t!==undefined){
						s2.innerHTML=t;
						return bar;
					}else{
						return s2.innerHTML;
					}
				}
				bar.progress=function progressbar_set_progress(val){bar.onprogress(bar,val)}
        		bar.show=function progressbar_show(_parent){_parent.appendChild(bar.view)}
        		bar.hide=function progressbar_hide(_parent){bar.view.parentNode.removeChild(bar.view)}
        	return bar;
	}
	,imagebutton:function(a,b,c){
		var background;
		var background_hover=a.hover||'#79F';
		a.hover=null;
		var button;
		if(IS.IE){
			button={
        		view:MAKE.spanbox(fuseDict({className:'button',align:'left',
        			onmousedown:function(event){background=button.view.style.backgroundColor;button.view.style.backgroundColor=background_hover;},
        			ontouchstart:function(event){background=button.view.style.backgroundColor;button.view.style.backgroundColor=background_hover;},
        			onmouseup:function(event){button.view.style.backgroundColor=background;},
        			ontouchend:function(event){button.view.style.backgroundColor=background;}
        		},a),fuseDict({border:'1px solid #4040AC'},b))}
		} else {
			button={
        		view:MAKE.divbox(fuseDict({className:'button',align:'left',
        			onmousedown:function(event){background=button.view.style.backgroundColor;button.view.style.backgroundColor=background_hover;},
        			ontouchstart:function(event){background=button.view.style.backgroundColor;button.view.style.backgroundColor=background_hover;},
        			onmouseup:function(event){button.view.style.backgroundColor=background;},
        			ontouchend:function(event){button.view.style.backgroundColor=background;}
        		},a),fuseDict({border:'1px solid #4040AC'},b))}
		}
    		button.show=function button_show(_parent){_parent.appendChild(button.view)}
    		button.hide=function button_hide(_parent){button.view.parentNode.removeChild(button.view)}
        	return button;
	}
}
for(var i in tagNames){
	MAKE[tagNames[i]+""]=(function(eltc){
	return function(a,s,c){
		Base.call(this,['MAKE']);
		var el=document.createElement(eltc);
		if(eltc in factories){el=factories[eltc](a,s,c);}
		var error=false;
		if(arguments.length>0){
			for(var i in arguments[0]){
				try{
					el[i]=arguments[0][i];
				}catch(err){
					//console.log("MAKE attrs error:"+err+',index:'+i+',argument:'+arguments[0][i]);
					error=true;
				}
			}
		}
		if(arguments.length>1){
			for(var i in arguments[1]){
				try{
					el.style[i]=arguments[1][i];
				}catch(err){
					//console.log("MAKE style error: "+err+',index:'+i+',argument:'+arguments[0][i]);
					error=true;
				}
			}
		}
		if(arguments.length>2){
			for(var i in arguments[2]){
				try{
					el.appendChild(arguments[2][i]);
				}catch(err){
					console.log("MAKE chlidren error:"+err+',index:'+i+',argument:'+arguments[0][i])
				}
			}
		};
		if(error)el.className=el.className+' ERROR';
	  return el;
	};
  })(tagNames[i]+"");
}
make=MAKE;
PRELOAD_IMAGES=function preload_images(){
	
	Base.call(this,['PRELOAD_IMAGES']);
	var _THIS=this;
	var images=[];
	var timeout;
	var progressbar=MAKE.progressbar({timing:100});
	var count=0;
	_THIS.add=function(src){
		if(typeof(src)=='string'){
			images[images.length]=src;
		}else{
			for(var i=0;i<src.length;i++){
				if(typeof(src[i])=='string'){
					images[images.length]=src[i];
				}
			}
		}
		return _THIS;
	}
	_THIS.load=function(){
		progressbar.progress(10);
		progressbar.show(document.body);
		for(var i=0;i<images.length;i++){
			var im=MAKE.img();
			im.onload=(function(index){
				return function(event){
					count++;
					progressbar.progress(100*count/images.length);
					/*progressbar.text(progressbar.text()+'<br>'+index+':'+images[index]);*/
					if(count>=images.length){
						progressbar.hide();
					}
				}
			})(i);
			im.src=images[i];
		}
		return _THIS;
	}
}
Base.call(this,['DO']);
DO={
	cancelEvent:function(e){
		Base.call(this,['DO']);
		var event = e || window.event;
		if(event.preventDefault){ event.preventDefault();}else{event.returnValue = false; }
	}
	,cancelPropagation:function(e){
		Base.call(this,['DO']);
		var event = e || window.event;
		if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble = true;}
	}
	,addEventListener:function(eventTarget, eventType, eventHandler) { 
		Base.call(this,['DO']);
		if (eventTarget.addEventListener) {eventTarget.addEventListener(eventType, eventHandler,false);} 
		else
			if (eventTarget.attachEvent) {
				eventType = "on" + eventType;
				eventTarget.attachEvent(eventType, eventHandler);} 
			else {eventTarget["on" + eventType] = eventHandler;}
		}
}
Base.call(this,['GET']);
GET={
	X:function(element){
		Base.call(this,['GET']);
		var ez=element.style.zoom;
		var Z=(isNaN(parseFloat(ez))?1:parseFloat(ez))
		//console.log(element)
		if(element.offsetParent!=null){
			return element.offsetLeft+this.X(element.offsetParent);
		}else { return element.offsetLeft;}
	}
	,Y:function(element){
		Base.call(this,['GET']);
		var ez=element.style.zoom;
		var Z=(isNaN(parseFloat(ez))?1:parseFloat(ez))
		if(element.offsetParent!=null){
			return element.offsetTop+this.Y(element.offsetParent);
		}else { return element.offsetLeft;}
	}
	,W:function(element){
		Base.call(this,['GET']);
		var ez=element.style.zoom;
		var Z=(isNaN(parseFloat(ez))?1:parseFloat(ez))
		//console.log(element)
		return element.offsetWidth*(IS.IE?1:Z);
	}
	,H:function(element){
		Base.call(this,['GET']);
		var ez=element.style.zoom;
		var Z=(isNaN(parseFloat(ez))?1:parseFloat(ez))
		//console.log(element)
		return element.offsetHeight*(IS.IE?1:Z);
	}
	,Pos:function(element){
		Base.call(this,['GET']);
		var _x=element.offsetLeft,_y=element.offsetTop;
		if(element.offsetParent!=null){
			var z=parseInt(element.offsetParent.style.zoom)
			var v=this.Pos(element.offsetParent);
			if(!isNaN(z)){_x*=z;_y*=z;}
			_x+=v.x;_y+=v.y;
		}
		var o={x:_x,y:_y}
		return o;
	}
	,Measure:function(node,parent){
		Base.call(this,['GET']);
		var pn=parent.parentNode;
		if(pn==null)document.body.appendChild(parent);
		var m=[node.offsetLeft,node.offsetTop,node.offsetWidth,node.offsetHeight];
		if(pn==null)document.body.removeChild(parent);
		return m;
	}
	,Box:function(element){
		Base.call(this,['GET']);
		var _p=this.Pos(element);
		var o={x:_p.x,y:_p.y,w:element.offsetWidth,h:element.offsetHeight};
		//console.log(element,o);
		return o;
	}
	,box:function(element){
		Base.call(this,['GET']);
		var _p=this.Pos(element);
		var o={left:_p.x+'px',top:_p.y+'px',width:element.offsetWidth,height:element.offsetHeight};
		//console.log(element,o);
		return o;
	}
	,Relative:function(element,path){
		Base.call(this,['GET']);
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
		Base.call(this,['GET']);
	    e = e || window.event;
	    var target = e.target || e.srcElement,
	        rect = target.getBoundingClientRect(),
	        offsetX = e.clientX - rect.left,
	        offsetY = e.clientY - rect.top;
	    return {x:offsetX,x:offsetY};
	}
	,DocumentHeight:function getWindowHeight(){
		Base.call(this,['GET']);
	    return document.body.offsetHeight;
	}
	,DocumentWidth:function getWindowWidth(){
		Base.call(this,['GET']);
	    return document.body.offsetWidth;
	}
	,WindowHeight:function getWindowHeight(){
		Base.call(this,['GET']);
	    var windowHeight = 0;
	    if (typeof(window.innerHeight) == 'number'){
	        windowHeight = window.innerHeight;
	    }else{
	        var ieStrict = document.documentElement.clientHeight; // w/out DTD gives 0
	        var ieQuirks = document.body.clientHeight; // w/DTD gives document height
	        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
	    }
	    return windowHeight;
	}
	,WindowWidth:function getWindowWidth(){
		Base.call(this,['GET']);
	    var windowWidth = 0;
	    if (typeof(window.innerWidth) == 'number'){
	        windowWidth = window.innerWidth;
	    }else{
	        var ieStrict = document.documentElement.clientWidth; // w/out DTD gives 0
	        var ieQuirks = document.body.clientWidth; // w/DTD gives document width
	        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
	    }
	    return windowWidth;
	}
	,ScrollTop:function getScrollTop(){
		Base.call(this,['GET']);
	    var scrollTop;
	    if(typeof(window.pageYOffset) == 'number'){
	        scrollTop = window.pageYOffset;
	    }else{
	        if(document.body && document.body.scrollTop){
	            scrollTop = document.body.scrollTop;
	        }else if(document.documentElement && document.documentElement.scrollTop){
		            scrollTop = document.documentElement.scrollTop;
		        }
	    }
	    return scrollTop/(IS.WEBKIT?parseFloat(document.body.style.zoom):1)||0;
	}
	,ScrollLeft:function getScrollLeft(){
		Base.call(this,['GET']);
	    var scrollLeft=0;
	    if(typeof(window.pageXOffset) == 'number'){
	        scrollLeft = window.pageXOffset;
	    } else{
	        if(document.body && document.body.scrollLeft){
	            scrollLeft = document.body.scrollLeft;}
	        else if(document.documentElement && document.documentElement.scrollLeft){
	            scrollLeft = document.documentElement.scrollLeft;}
	    }
	    return scrollLeft/(IS.WEBKIT?parseFloat(document.body.style.zoom):1)||0;
	}
}
SET={
		css:function(element,style){
			Base.call(this,['SET']);
			for(var s in style){
				try{
					element.style[s]=style[s]
				}catch(err){alert("SET.css "+err+':'+s+'>'+style[s])}
			}
		}
		,attr:function(element,attrs){
			Base.call(this,['SET']);
			for(var a in attrs){
				try{
					element.setAttribute(a,attrs[a])
				}catch(err){alert("SET.attr "+err+':'+a+'>'+attrs[a])}
			}
		}
		,on:function(element,_events){
			Base.call(this,['SET']);
			for(var ev in _events){
				try{
					element['on'+_events[ev]]=_function[ev]
				}catch(err){alert("SET.on "+err+':'+ev+'>'+_events[ev])}
			}
		}
		,pos:function(element,posVector){
			Base.call(this,['SET']);
			element.style.left=posVector.x+'px';
			element.style.top=posVector.y+'px';
		}
		,box:function(element,_box){
			Base.call(this,['SET']);
			element.style.left=_box.x+'px';
			element.style.top=_box.y+'px';
			element.style.width=_box.w+'px';
			element.style.height=_box.h+'px';
		}
		
		,styles:function(elements,style){
			Base.call(this,['SET']);
			for(var e in elements){
				this.css(elements[e],style)
			}
		}
		,attrs:function(elements,attrs){
			Base.call(this,['SET']);
			for(var e in elements){
				this.attr(elements[e],style)
			}
		}
		,listeners:function(elements,listeners){
			Base.call(this,['SET']);
			for(var e in elements){
				this.on(elements[e],listeners)
			}
		}
		,positions:function(elements,posVector){
			Base.call(this,['SET']);
			for(var e in elements){
				this.pos(elements[e],posVector)
			}
		}
		,boxes:function(elements,box){
			Base.call(this,['SET']);
			for(var e in elements){
				this.box(elements[e],box)
			}
		}
		,ScrollTop:function setScrollTop(val){
			Base.call(this,['SET']);
		    var scrollTop;
		    try{
		    	document.body.scrollTop=val;
		    }catch(err){ 
		    	document.documentElement.scrollTop=val;
		    }
		}
		,ScrollLeft:function setScrollLeft(val){
			Base.call(this,['SET']);
		    var scrollLeft;
		    try{
		    	document.body.scrollLeft=val;
		    }catch(err){ 
		    	document.documentElement.scrollLeft=val;
		    }
		}
		,alignElementOverElement:function(element,to_element){
			Base.call(this,['SET']);
			this.css(element,{position:'absolute'});
			this.box(element,GET.Box(to_element));
		}
}
HAS={
	properties:function(object){
		Base.call(this,['HAS']);
		var has=false;
		for(var prop in object){
			has=has||object.hasOwnProperty(prop);
		}
		return has;
	}
}

REPORT={
		ERROR:function(err){
			Base.call(this,['REPORT']);
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
