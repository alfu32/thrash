function request(URI,callback){
	var _c=callback||function(){},
	    _d=document.createElement("script");
	function cb(event){
			_c.bind(cb)();
			_c();
			//document.head.removeChild(_d)
		};
		_d.src=URI;
		_d.type="application/javascript"
		_d.async=false;
		_d.addEventListener("load",cb);
		_d.addEventListener("readystatechange",(function(event){alert(this.readystatechange)}).bind(_d));
		document.head.appendChild(_d);
	}
function whenObject(s,p,v,c,r,ro){
var _W=this;
this.scope=s;
this.parameter=p
this.value=v;
this.repeat=r?true:false
this.once=ro;
this.parseQueue=function(interval){
if(whenQueue.length){
	for(var i in whenQueue){
	if(i=='started')continue;
		var w=whenQueue[i];
		if(w.scope[w.parameter]==w.value){
			w.code()
			if(!w.repeat){
				whenQueue.splice(whenQueue.indexOf(w),1)
			}
		}
	}
	setTimeout(_W.parseQueue,interval)
}
else {whenQueue.started=false}
}
this.code=typeof(c)=='function'?c:new Function('with(window){'+c+'}')
if(!window.whenQueue) {
	//Object.defineProperty(window,'whenQueue',{value:[],writable:false,configurable:false,enumerable:false})
	//Object.defineProperty(whenQueue,'started',{value:false,writable:true,configurable:false,enumerable:false})
	window.whenQueue=[]
	whenQueue.started=false
}
window.whenQueue.push(this);
if(!whenQueue.started){whenQueue.started=true;_W.parseQueue(200)}
}

function when(s,p,v,c,r){
var ai=0;
if(window.whenQueue!==undefined)for(var i in whenQueue){if(i=='started')continue;var co=whenQueue[i];ai+=((co.scope==s)&&(co.parameter==p)&&(co.value==v));}
if(!ai)new whenObject(s,p,v,c,r)
	else con.out='already watching variable'
}
function whenever(cond,code,scope){
var scp=(scope!==undefined)?scope:window
var self=function(){whenever(cond,code,scope)}
var condition=new Function('s','with(s){ return '+cond+'}')
var procedure=(typeof(code)=='function')?code:new Function('s','with(s){'+code+'}')
if(condition(scp))procedure(scp)
var timer=setTimeout(self,1000)
}
function onChange(variable,code,scope,value){
//con.out='onchange('+variable+','+code+','+scope+','+value+')'
var scp=(scope!==undefined)?scope:window
var val=new Function('s','with(s){ return '+variable+'}')
var changed=(value!==val(scp))
var newValue=changed?val(scp):value
var self=function(){onChange(variable,code,scope,newValue)}
var procedure=(typeof(code)=='function')?code:new Function('s',''+code+'')
if(changed)procedure(scp)
timers.push(setTimeout(self,250))
}

listobj=function(o,n)
{
var r='';if(!n)var n=0;
if(typeof(o)=='object'){
var r='<table style="display:run-in;margin:'+n+'px;margin-left:'+(8*n)+'px"><tbody><tr><td><b style=";cursor:pointer;background-color:#eeeeee;" onclick="h.toggle(this.parentNode.parentNode.parentNode.children[1].children[0])">'+(o.__proto__.constructor.toString().split(' ')[1].split('(')[0])+"</b></td></tr><tr><td style='display:none;border-bottom:1px solid #ffffff'><table><tbody>"
	for(var i in o){
		var $else=true
		if(typeof(o[i])=='object'){r+="<tr style='margin:"+n+"px;margin-left:"+(8*n)+"px'><td style='color:#aa5522'>"+i+':</td><td>'+listobj(o[i],n+1)+"</td></tr>";$else=false}
		if(typeof(o[i])=='function'){r+="<tr style='margin:"+n+"px;margin-left:"+(8*n)+"px'><td style='color:#2255aa'>"+i+':</td><td>'+o[i]+"</td></tr>";;$else=false}
		if($else)r+="<tr style='margin:"+n+"px;margin-left:"+(8*n)+"px'><td style='color:#55aa22'>"+i+':</td><td>'+o[i]+"</td></tr>";
	}
		//if(o.__proto__){r+="<tr style='margin:"+n+"px;margin-left:"+(8*n)+"px'><td style='color:#aa5522'>__proto__:</td><td>"+listobj(o.__proto__,n+1)+"</td></tr>"}
	r+="</tbody></table></td></tr></tbody></table>"
}
return r;
}
function Prototype(o){
return o.__proto__.constructor.toString().split(' ')[1].split('(')[0]
}
listobj=function(o,n)
{
var r='';if(!n)var n=20;
var proto=Prototype(o),iserror=proto.split('Error')[1]!==undefined
if(iserror){return listobj({error:o.message,at:o.stack.split('at')},n)}
if(typeof(o)=='object' && n<120){
var r='<span style="margin:'+n/10+'px;padding:'+n/10+'px;left:'+(n)+'px"><i><b style=";cursor:pointer;color:#000066;" onclick="h.toggle(this.parentNode.nextElementSibling)">('+proto+")</b></i><div style='padding:2px;margin:10px;background-color:rgba(1,1,5,.05);box-shadow:-1px -1px "+360/n+"px #ffffaa,inset "+n/20+"px "+n/20+"px "+n/5+"px #555555;display:none;border-radius:0px 0px 0px 5px;border-style:dotted;border-width:0px 0px 0px 1px'>"
var k=0
	for(var i in o){
		//if(Prototype(o[i]).substr(0,4)=='HTML')break;
		var $else=true
		if(typeof(o[i])=='object' && Prototype(o[i]).substr(0,4)!='HTML'){r+="<div style='margin-left:"+n+"px;left:"+(n)+"px'><span ><span style='color:#aa5522'>"+(parseInt(i)==i?('['+i+']'):i+':')+'</span><span>'+listobj(o[i],n+20)+"</span></div>";$else=false}
		if(typeof(o[i])=='function'){r+="<div style='margin-left:"+n+"px;left:"+(n)+"px'><span><span style='color:#2255aa;cursor:pointer' onclick='h.toggle(this.nextElementSibling.nextElementSibling)'>"+i+':</span><span>'+o[i].toString().substr(0,30)+"</span><span style='display:none'>"+o[i].toString().substr(30)+"</span></div>";;$else=false}
		if($else)r+="<div style='margin-left:"+n+"px;left:"+(n)+"px'><span><span style='color:#225500'>"+i+':</span><span>'+o[i]+"</span></span></div>";
		k++;
	}
		//if(o.__proto__){r+="<tr style='margin:"+n+"px;margin-left:"+(8*n)+"px'><td style='color:#aa5522'>__proto__:</td><td>"+listobj(o.__proto__,n+1)+"</td></tr>"}
	r+="</div></span>"
}
return r;
}
function Console()
{
this.processors=
	{
	_EVAL:function(tx){
	if(tx[0]=='>')var t=tx.substr(1)
		else return tx;
	var err=false;var b=new Function('return '+t)
		if(typeof(t)!=='object'){try{var o=b()}catch(e){var errorReport=function(){this.error='';this.name='';this.details=[]};var o=e.stack.split('at'),s=new errorReport();s.error=e;s.name=o[0];for(var k in o){if(k!=='0')s.details.push(o[k])};o=listobj(s);var err=true}}
		if(typeof(o)=='object'&& !err) var o=listobj(o)
	return o},
	_ECHO:function(t){return t}}
var _S=this,m=parseInt(document.body.offsetWidth*270/1680),_m=15,_M=400,_h
var formChange=function(event){
var t=h.eT(event);
_S.out=_S.processor(t.value);

_S.cmd=''
}
var setHeight=function(m){
	var em=m;
	this.h(m)
	_h=em<400?em:400
	}
if(this.__defineGetter__)this.__defineSetter__('height',setHeight)
else Object.defineProperty(this,'height',{set:setHeight})
this.h=function(m){
	var em=parseInt(m);
	this.element.style.top=(document.body.offsetHeight-m-15)+'px';
	this.element.style.height=em+'px';
	this.element.children[0].style.height=(em-15)+'px'
	return em
	}
this.processor=this.processors._ECHO
this.element=h.cE('form')
this.element.style.position='absolute';this.element.style.width=document.body.offsetWidth+'px';this.element.style.top=(document.body.offsetHeight-80)+'px';this.element.style.height='80px';this.element.style.fontSize='12px'
this.element.innerHTML='<div style="text-align:left;background-color:#ffffff;height:65px;overflow-y:scroll"></div><div style="height:1em"><input type=text size="'+256+'" max="'+m+'" value="Console"></div>'
this.element.addEventListener('dblclick',function(event){_S.toggle},false)
this.element.addEventListener('change',formChange,false)
this.element.addEventListener('submit',function(e){h.pD(event)},false)
var getClear=function(){_S.element.children[0].innerHTML=''}
var getToggle=function(){var e=_S.element.offsetHeight;if(e==_M) this.h(_m)
																		else if(e==_m)this.h(_h)
																		else this.h(_M)}
var getMin=function(){_S.height=_m}
var getMax=function(){_S.height=_M}
var setCmd=function(v){_S.element.children[1].children[0].value=v}
var setOut=function(v){_S.element.children[0].innerHTML+=v+'<br>';_S.element.children[0].scrollTop+=30}
if(this.__defineGetter__)this.__defineGetter__('clear',getClear)
else Object.defineProperty(this,'clear',{set:getClear})
if(this.__defineGetter__)this.__defineGetter__('toggle',getToggle)
else Object.defineProperty(this,'toggle',{set:getToggle})
if(this.__defineGetter__)this.__defineGetter__('min',getMin)
else Object.defineProperty(this,'min',{set:getMin})
if(this.__defineGetter__)this.__defineGetter__('max',getMax)
else Object.defineProperty(this,'max',{set:getMax})
if(this.__defineSetter__)this.__defineSetter__('cmd',setCmd)
else Object.defineProperty(this,'cmd',{set:setCmd})
if(this.__defineSetter__)this.__defineSetter__('out',setOut)
else Object.defineProperty(this,'out',{set:setOut})
}
//request(location.origin+"/_sys/javascript+.js");
request(location.origin+"/_sys/images.js");
//request(location.origin+"/_sys/Console.js");

var timers=[]


///////////////////////////////////////

///////////////////////////////////
var cbk={
"unpk":function(tx,obj){
h.eval('props.mnu='+tx);
h.gt("mn").innerHTML='';
jUnPack(h.gt("mn"),props.mnu,5);
},
"ld":function(tx,obj){
obj.innerHTML=tx;
},
"app":function(tx,obj){
obj.removeChild(obj.rel.loader);
obj.appendChild(obj.rel.target);
dsp.appendChild(obj)
}
}
var props={"mnu":{},"server":'http://'+location.hostname+'/_sys'};
	function parseDOM(obj)
	  {
		var ch=obj.childNodes;
		var gsdsd='{';
		for(var fsed=0;fsed<ch.length;fsed++)
		{
		if(ch[fsed].nodeType==3){gsdsd+='"text":"'+ch[fsed].nodeValue+'",'}
		if(ch[fsed].nodeType==1)gsdsd+='{"'+ch[fsed].nodeName+'":'+parseDOM(ch[fsed])+'},';
		}
		gsdsd+='len:'+(fsed-1)+'}'
		return gsdsd;
	  }
	  var mult=0;
	  var cbks=new Array();
	  function translateDOM(obj)
	  {
		var ch=obj.childNodes;
		if(ch.length!=0)
		{
			for(var fsed=0;fsed<ch.length;fsed++)
			{
			if(ch[fsed].nodeType==3)
			{
			if (ch[fsed].length>3||ch[fsed].nodeValue>" ")
				{
				cbks[mult]={
				func:new Function("cbks["+mult+"].obj.nodeValue=arguments[0].translation;"),
				obj:ch[fsed]}
				google.language.translate(ch[fsed].nodeValue,"en","es",cbks[mult].func);
				mult+=1;
				}
			}
			if(ch[fsed].nodeType==1)translateDOM(ch[fsed]);
			}
		}
		return mult;
	  }
function jUnPack(trg,objref,lev){
if(lev>0){
		for(i in objref)
		{
		ppd=h.cE('div');
		ppd.id=i;
		ppd.innerHTML=i;
		ppd.className='disabled';
		trg.appendChild(ppd);
		if(typeof(objref[i])=='function')
			{
				h.eL(ppd,'click',objref[i]);
				ppd.className='function';
			} else {
			if(typeof(objref[i])=='object')
				{
					ab=h.cE('div');
					vars.ix+=1;
					ab.id='h_'+vars.ix;
					ab.style.display='none';
					ppd.className='object';
					ab.className='child';
					trg.appendChild(ab);
					vars.tm=ppd;
					h.eval("h.eL(vars.tm,'click',function(){trg=h.gt('"+("h_"+vars.ix)+"');h.toggle(trg);});");
					jUnPack(ab,objref[i],lev-1);
				}
			}
		}
		}
	}
	function edit(obj,cbk)
	  {
	  ix=h.cE('textarea');
	  ix.value=obj.innerHTML;
	  obj.ref=h.gt(obj.innerHTML);
	  ix.position='absolute';
	  ix.style.top=0;
	  ix.style.left=0;
	  ix.style.width=obj.parentNode.offsetWidth;
	  ix.style.height=obj.parentNode.offsetHeight;
	  ix.onblur=function(e){
		this.nextElementSibling.innerHTML=this.value;
		this.nextElementSibling.style.display='';
		this.parentNode.removeChild(this);
		cbk(obj);
		}
		obj.style.display='none';
	  h.iB(obj.parentNode,ix,obj);
	  return obj.innerHTML;
	  }
	function msgBox($contents)
	{
	$tab=h.cE('table');
	with($tab.style)
	{
	backgroundColor="";
	if(!$contents.position){position='fixed';}else{position=$contents.position;}
	if($contents.width)width=$contents.width;
	if($contents.height)height=$contents.height;
	if($contents.top)top=$contents.top;
	if($contents.left)left=$contents.left;
	if($contents.bottom)bottom=$contents.bottom;
	if($contents.right)right=$contents.right;
	}
	$tab.className='window round';
	$ret="<tbody><tr class='head'><td class='title' style='position:relative'><table style='width:100%'><tbody><tr><td>"+$contents['name']+"</td><td class='button minimize'>&nbsp;_&nbsp;</td><td class='button close'>&nbsp;X&nbsp;</td></tr></tbody></table></td></tr>";
	$ret+="<tr><td class='body'>"+$contents['description']+"</td></tr>";
	$ret+="<tr><td class='footer'>"+arguments.callee.name+"</td></td></tr></tbody>";
	$tab.innerHTML=$ret;
	document.body.appendChild( $tab);
	}
	function appBox(name,mode,size)
	{
	if(h.gt('mn')){h.gt('mn').style.display='none'}
	win=h.cE('div');
	mark=h.cE('div');
	mark.innerHTML="v 2 0 1 0";
	with(mark.style){position="absolute";backgroundImage="url(adfasdf.gtt)";backgroundColor="#846484";mark.style.right="2";mark.style.top="2";mark.style.fontSize="9px";}
	it=h.cE('div');
	na=h.cE('span');
	sz=h.cE('img');
	sz.src=vars._NULL;
	sz.className='sizer';//width='16px';height='16px';
	with(sz.style){position='absolute';right='0%';bottom='0%';cursor='nw-resize';width='16px';height='16px';}
	it.oncontextmenu=function(e){ee=(window.event||e);ee.preventDefault();return false;}
	ifr=h.cE('iframe');
	this.kill=new btn.img(it,function(e){targ=h.eT(e,this);targ.parentNode.rel.parentNode.removeChild(targ.parentNode.rel);},vars._CLOSE,{"h":"12px","w":"12px","x":'6px'},"click");
	it.onselectstart = function(e) {ee=(window.event||e);ee.preventDefault();return false;}
	h.eL(this.it,"dblclick",function(e){
	ee=(window.event||e);
	targ=h.eT(ee,this).parentNode;
	h.toggle(targ.childNodes[2]);
	h.toggle(targ.childNodes[1]);
	h.toggle(targ.children[0].children[1].children[0]);
	ee.preventDefault();
	return false;
	},true);
	with(win.style){position='absolute'};
	var appaddr=name.split('/');
	var appname=appaddr[appaddr.length-2];
	na.innerHTML=appname.split('.')[0];
	win.className='window';
	it.className='header';
	it.rel=win;
	it.style.cursor='Default';
	win.onmousedown=function(){last.style.zIndex=1;this.style.zIndex=128;last=this;}
	ifr.src=name;if(mode){ifr.src+='?usr='+usr.usr;}
	ifr.rel=win;
	lcd=new btn.loader(win);
	ifr.style.width=size[0];
	ifr.style.height=size[1];
	win.rel={"loader":lcd,"target":ifr};
	it.appendChild(na);
	win.appendChild(it);
	win.appendChild(sz);
	na.appendChild(mark);
	dsp.rel=win;
	cbk.app('nada',win);
	last.style.zIndex=1;win.style.zIndex=128;last=win;
	return win;
	}
	function serialTranslate()
	{
	this.index=0;
	this.cbks=new Array();
	this.proc=0;
	this.translateDOM=function(obj)
	  {
		var ch=obj.childNodes;
		if(ch.length!=0)
		{
			for(var fsed=0;fsed<ch.length;fsed++)
			{
			if(ch[fsed].nodeType==3)
			{
			if (ch[fsed].length>3||ch[fsed].nodeValue>" ")
				{
				cbks[index]={
				func:new Function("cbks["+index+"].obj.nodeValue=arguments[0].translation"),
				obj:ch[fsed]}
				google.language.translate(ch[fsed].nodeValue,window.srcL,window.desL,cbks[index].func);
				index+=1;
				}
			}
			if(ch[fsed].nodeType==1)this.translateDOM(ch[fsed]);
			}
		}
	  }
	 this.reset=function(){proc=0;index=0;cbks=new Array();}
}
function tB(obj,values)//take block
{
	if(obj.tagName=="BODY") {
		return false;
	} else {
		var chk=true;
		for(var i=0;i<values.length;i++) {
			chk=chk&&(obj.className!=values[i])
		}
		if(chk) {
			return tB(obj.parentNode,values);
		} else {
			return obj;
		}
	}
}
var temp=document.createElement('div')
if(temp.__proto__)var protos=temp.__proto__.__proto__.__proto__
else if(temp.prototype)var protos=temp.prototype.prototype.prototype
	else var protos=temp.constructor.constructor.constructor

	protos.__css=function() {
		a=this.style.cssText.split(';');
		b="{";
		for(var i=a.length;i>=0;i--) {
			c=a[i].split(':');
			b+="\""+c[0].trim()+"\":'"+c[1].trim()+"'";
				b+=i?",":""
		}
		d=new Function("return "+b);
		return d();
	}
	protos.__t=function(parameter,value) {
		var ret=[]
		if(this[parameter]==value) ret.push(this)
		if(this.children[0]!==undefined) for(var i in children) ret=ret.concat(children[i].__t(parameter,value))
		return ret
	}
	protos.__pos= function() {
		var poz= {x:this.offsetLeft,y:this.offsetTop}
		if(this.offseParent==null) return poz
		else {
			var d=this.offsetParent.__pos();
			return {x:d.x+poz.x,y:d.y+poz.y}
		}
	}
	protos._show=function() {
	this.style.display=''
	},
	protos._hide=function() {
	this.style.display='none'
	},
	protos._toggle=function() {
	this.style.display=(this.style.display=='none')?'':'none'
	},
	protos.__c=function(o){if(typeof(o)!=='number')return this.children 
		else return this.children[o]},
	protos._p=function(){return this.parentNode}
//setTimeout()
var h={
	"$_GET": (function() {
		var url = window.location.href;
		var params=url.split('?');
		var obj={};
		if(params[1]) {
			var partArray=params[1].split('&');
			for(var i in partArray) {
				kk=partArray[i].split('=');
				obj[kk[0]]=kk[1];
			}
		}
		return obj;
	})(),
	"$_COOKIES": function(cookie) {
		if(!cookie) {var str=false
		} else {
			var str=cookie;
		}
		kk=document.cookie;
		kk=kk.replace(/\s/gi,"");
		kk=kk.split(';');
		var gfred= {}
		for(var i in kk) {
			var uyu=kk[i].split('=');
			gfred[uyu[0]]='';
			for(var j in uyu)
				gfred[uyu[0]]+=(j==0)?'':unescape(uyu[j]+(((gfred[uyu[0]].length-1)>j)?'=':''));
		}
		if(str) {
			if(gfred[str]) {
				return gfred[str]
			} else {
				return false
			}
		} else {
			return gfred
		}
	},
	"$_FILES": function() {
	},
	"css": function(str) {
		a=str.split(';');
		b="{";
		for(var i=0;i<a.length;i++) {
			c=a[i].split(':');
			b+="\""+c[0]+"\":'"+c[1]+"'";
			if(i<a.length-1) {
				b+=","
			}
		}
		d=new Function("return "+b);
		return d();
	},
	"xP": function(url,f,obj,params) {
		var h=null;
		if (window.XMLHttpRequest)
			h=new XMLHttpRequest();
		else if (window.ActiveXObject)
			h=new ActiveXObject("Microsoft.XMLHTTP");
		if(h!=null) {
			h.onreadystatechange = function() {
				if(h.target!=undefined)
					h=h.target;
				if((h.readyState == 4) && ((h.status==200) || (h.status==0)))
					f(h.responseText,obj);
			};
			h.open("POST", url,true);
			h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			h.send(params);
			return true;
		} else
			return false;
	},
	"xPx": function(url,f,obj,params,headers) {
		var h=null;
		if (window.XMLHttpRequest)
			h=new XMLHttpRequest();
		else if (window.ActiveXObject)
			h=new ActiveXObject("Microsoft.XMLHTTP");
		if(h!=null) {
			h.onreadystatechange = function() {
				if(h.target!=undefined)
					h=h.target;
				if((h.readyState == 4) && ((h.status==200) || (h.status==0)))
					f(h.responseText,obj);
			};
			h.open("POST", url,true);
			for(i in headers) {
				h.setRequestHeader(i,headers[i])
			}
			h.send(params);
			return true;
		} else
			return false;
	},
	"xG": function(url,f,obj) {
		//load=btn.loader(obj);
		var h=null;
		var readystate=["request not initialized","server connection established","request received","processing request","processing response"];
		if (window.XMLHttpRequest)
			h=new XMLHttpRequest();
		else if (window.ActiveXObject)
			h=new ActiveXObject("Microsoft.XMLHTTP");
		if(h!=null) {
			h.onreadystatechange = function() {
				//obj.innerHTML+=readystate[h.readyState]+'<br>';
				if(h.target!=undefined)
					h=h.target;
				if((h.readyState == 4) && ((h.status==200) || (h.status==0))) {
					try {
						f(h.responseText,obj);
					} catch(err) {alert(err)}
				}
			}
			h.open("GET", url,true);
			h.send(null);
			return true;
		} else
			return false;
	},
	"sxG": function(url,parameters,f,obj) {
		h.xG(url, function(txt,obj) {
			var res=h.exEval(txt);
			f(res.result,obj);
			if(res.state=='notready') {
				sxG(url,res.rest,f,obj)
			}
		},obj)
	},
	"xGx": function(url,f,obj,headers) {
		var h=null;
		if (window.XMLHttpRequest)
			h=new XMLHttpRequest();
		else if (window.ActiveXObject)
			h=new ActiveXObject("Microsoft.XMLHTTP");
		if(h!=null) {
			h.onreadystatechange = function() {
				if(h.target!=undefined)
					h=h.target;
				if((h.readyState == 4) && ((h.status==200) || (h.status==0)))
					f(h.responseText,obj)
			}
			h.open("GET", url,true);
			for(i in headers) {
				h.setRequestHeader(i,headers[i])
			}
			h.send(null);
			return true;
		} else
			return false;
	},
	"xHead": function(url,f) {
		var h=null;
		if (window.XMLHttpRequest)
			h=new XMLHttpRequest();
		else if (window.ActiveXObject)
			h=new ActiveXObject("Microsoft.XMLHTTP");
		if(h!=null) {
			h.onreadystatechange= function() {
				if (h.readyState==4) {
					var m=h.getAllResponseHeaders();
					m=m.split('\n');
					var n= {};
					for(var i in m) {
						var spl=m[i].split(':');
						if(spl[0]!='') {
							n[spl[0]]='';
							for(var j in spl) {
								if(spl[j]!='') {
									n[spl[0]]+=(j!=0)?spl[j]:''+(j<(spl.length-1))?':':'';
								}
							}
						}
					}
					f( n );
				}
			}
			h.open("HEAD", url,true);
			h.send(null);
			return true;
		} else
			return false;
	},
	"tB": function(obj,value) {
		if(obj.tagName=="BODY") {
			return false
		} else {
			if(h.cL(obj)[0]!=value) {
				return h.tB(obj.parentNode,value)
			} else {
				return obj
			}
		}
	},
	"t": function(obj,parameter,value) {
		if(obj.tagName=="BODY") {
			return false
		} else {
			if(obj[parameter]!=value) {
				return h.t(obj.parentNode,parameter,value)
			} else {
				return obj
			}
		}
	},
	"cO": function(obj) {
		if(obj.tagName=="BODY") {
			return {
				x:obj.offsetLeft,
				y:obj.offsetTop
			}
		} else {
			var d=h.cO(obj.parentNode);
			return {
				x:d.x+parseInt(obj.offsetLeft/2),
				y:d.y+parseInt(obj.offsetTop/2)
			}
		}
	},
	"pN": function(obj,level) {
		if(obj!==document.body&&level) {
			tr=h.pN(obj.parentNode,level-1);
		} else {
			tr=obj;
		}
		return tr;
	},
	"dom": function(obj,code) {
		if(code.length>1) {
			if(code[0]=='^') {
				rt=h.dom(obj.parentNode,code.slice(1,code.length))
			} else {
				rt=h.dom(obj.children[code[0]],code.slice(1,code.length))
			}
		} else {
			if(code=='^') {
				rt=obj.parentNode
			} else {
				rt=obj.children[code]
			}
		}
		return rt
	},
	"iH": function(txt,obj) {
		obj.innerHTML=txt
	},
	"toggle": function(obj) {
		if(obj.style.display=='') {
			obj.style.display='none'
		} else {
			obj.style.display=''
		};
	},
	"tP": function(obj,parameter,values) {
		if(obj[parameter]==values[0]) {
			obj[parameter]=values[1]
		} else {
			obj[parameter]=values[0]
		};
	},
	"gP": function(obj,parameter,value) {
		var d=obj.children;
		for(var i=0;i<d.length;i++) {
			if(d[i][parameter]==value) {
				return d[i];
			} else {
				var e=h.gP(d[i],parameter,value);
				if(e) {
					return e
				}
			};
		}
	},
	"_gt": function(obj,str) {
		return obj.getElementById(str);
	},
	"gt": function(str) {
		return document.getElementById(str);
	},
	"_gts": function(obj,ID) {
		var ret=new Array();
		if(obj.id==ID) {
			ret[ret.length]=obj;
		}
		if(obj.childElementCount>0) {
			var lst=obj.children;
			for(var i in lst) {
				if(lst[i].id==ID) {
					ret[ret.length]=lst[i];
				}
				var res=h._gts(lst[i],ID);
				for(var j in res) {
					if(res[j].id==ID) {
						ret[ret.length]=res[j]
					}
				}
			}

		}
		return ret;
	},
	"s": function(queue) {
		var result=[];
		var instructions=queue.split(';')
		for(var i in instructions) {
			var instruction=instructions[i];
			var selector='tagName';
			var value;
			var results;
			if(instruction[0]=='.') {
				selector='className'
			}
			if(instruction[0]=='#') {
				selector='id'
			}
			if(selector!=='tagName') {
				value=instruction.substring(1)
			} else {
				value=instruction.toUpperCase()
			}
			results=h._gp(document.body,selector,value);
			for(var j in results) {
				result[result.length]=results[j]
			}
		}
		return result;
	},
	"_gp": function(obj,parameter,value) {
		var ret=new Array();
		if(obj[parameter]==value) {
			ret[ret.length]=obj;
		}
		if(obj.childElementCount>0) {
			var lst=obj.children;
			for(var i in lst) {
				var res=h._gp(lst[i],parameter,value);
				for(var j in res) {
					if(res[j][parameter]==value) {
						ret[ret.length]=res[j]
					}
				}
			}

			return ret;
		}
	},
	"tg": function(str) {
		return document.getElementsByTagName(str)[0];
	},
	"tgs": function(str) {
		return document.getElementsByTagName(str);
	},
	"nm": function(str) {
		return document.getElementsByName(str)[0];
	},
	"nms": function(str) {
		return document.getElementsByName(str);
	},
	"cls": function(str) {
		return document.getElementsByClassName(str);
	},
	"_cls": function(obj,str) {
		return obj.getElementsByClassName(str);
	},
	"eL": function(container,eventName,code,propagate) {
		if( container.addEventListener ) {
			container.addEventListener(eventName,code,propagate);
		} else if ( container.attachEvent ) {
			container.attachEvent('on'+eventName,code);
		}
		//else {container['on'+eventName] = code;}
		//container['on'+eventName]=code;
	},
	"fE": function(element,event) {
		if (document.createEventObject) {
			// dispatch for IE
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt)
		} else {
			// dispatch for firefox + others
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent(event, true, true ); // event type,bubbling,cancelable
			return !element.dispatchEvent(evt);
		}
	},
	"aP":function(o){
	//return h.cO(o)
		var d=function(ob){var a=ob.split('px')
			if(a[0]) return parseInt(a[0])
			else return 0;
			}
		var r={x:0,y:0},elem=o
		while(elem!=null){
		r.x+=d(elem.style.paddingLeft)+d(elem.style.marginLeft)+elem.offsetLeft
		r.y+=d(elem.style.paddingTop)+d(elem.style.marginTop)+elem.offsetTop
		elem=elem.offsetParent;
		}
		return r;
	},
	"pD": function(event) {
		event.cancelBubble = true;
        event.returnValue = false;
		if(event.preventDefault) event.preventDefault()
		else if(event.stopPropagation)event.stopPropagation()
		return false
	},
	"cE": function(s) {
		return document.createElement(s);
	},
	"cL": function(obj) {
		return obj.className.split(' ');
	},
	"eT": function(e,ob) {
		var targ;
		if (targ=e.srcElement) {
			targ = e.srcElement;
		} else {
			targ = e.target;
		}
		return targ;
	},
	"iA": function (parent, node, referenceNode) {
		if(referenceNode.nextElementSibling) {
			parent.insertBefore(node, referenceNode.nextElementSibling);
		} else {
			parent.appendChild(node);
		}
	},
	"iB": function (parent, node, referenceNode) {
		parent.insertBefore(node, referenceNode);
	},
	"eval": function(code) {
		var b=new Function(code);
		return b()
	},
	"exEval": function(code) {
		b=new Function('return '+code);
		return b()
	},
	"evnt": function(code) {
		var b=new Function("e",code);
		return b
	},
	"evalAndGo": function(code,f) {
		b=new Function(code);
		b();
		setTimeout(f(),2000);
	},
	"iT": function(obj) {
		if(obj['innerText']) {
			return obj.innerText
		} else {
			var txt = "";
			for(var i = 0; i < obj.childNodes.length; i++) {
				if(obj.childNodes[i].nodeType == 1 /* ELEMENT_NODE */)
					txt += h.iT(obj.childNodes[i]);
				if(obj.childNodes[i].nodeType == 3 /* TEXT_NODE */)
					txt += obj.childNodes[i].nodeValue;
			}
			return(txt);
		}
	}
};
// parameter change listeners
var watchers=null;
function loadWatchers(watcherEnum)
{
for(i in watcherEnum){
var wenum=watcherEnum[i];
var parameters=wenum.parameter;
for(var j=0;j<parameters.length;j++){
var ocnt=wenum.originalContent;
var trg=wenum.element;
ocnt[j]=trg[parameters[j]];
}
}
}
function Watch(watcherEnum)
{
for(var i in watcherEnum)
	{
	var parameters=watcherEnum[i].parameter;valid=false;
	for(var j in parameters){
	if(watcherEnum[i].toLower){valid=valid||(watcherEnum[i].originalContent[j].toLowerCase()!=watcherEnum[i].element[parameters[j]].toLowerCase());}
	else{valid=valid||(watcherEnum[i].originalContent[j]!=watcherEnum[i].element[parameters[j]]);}
	}
	if(valid)
		{
		var reg=watcherEnum[i];
		var par=reg.parameter;
		reg.handler();
		for(var k in par)reg.originalContent[k]=reg.element[reg.parameter[k]];
		}
	}
}
// global listeners
function appendListeners(object,listenersCollection,bubble)
{
for(i in listenersCollection)
{classes=listenersCollection[i];
for(j in classes){
h.eL(object,i,classes[j],bubble)}
}
}
//"cL":function(obj,ord){if(obj.classList){rt=obj.classList[ord]}else{ar=obj.className.split(' ');rt=ar[ord]}return rt},
//var exe;
//	if(window.execScript){h.eval=window.execScript}else{h.eval=eval;}
//countdown clock
function Clock(toElement,length,direction,callback)
{
function clockTransform(sec)
{
hr=Math.round(sec/3600-.5);mi=Math.round((sec-hr*3600)/60-.5);se=Math.round((sec-hr*3600-mi*60)-.5);
return {h:((hr<10)?('0'+hr):hr),m:((mi<10)?('0'+mi):mi),s:((se<10)?('0'+se):se)}
}
var norm=clockTransform(length);
toElement.innerHTML=norm.h+':'+norm.m+':'+norm.s;
var begin=new Date();
var clock0=Math.round(begin.getTime()/1000-.5);
this.clk=function()
{
var date=new Date();
var clock=Math.round(date.getTime()/1000-.5);
var dir=Math.abs(direction)/direction
var dc=((dir>0)?0:length)+dir*Math.abs(clock-clock0);
if(dc<0)
{callback();window.clearInterval(intervalID)}
else
{var norm=clockTransform(dc); toElement.innerHTML=norm.h+':'+norm.m+':'+norm.s;}
}
var intervalID=setInterval(this.clk,'1000')
return intervalID;
}
//drag object
Drag=function(hnd,d)
{
this.handle=hnd?hnd:'dragPoint'
this.element=d?d:'draggable'
dragTarget={};
this.dragListeners={
"mousedown":[function(e){
var ev=e||window.event;
var et=h.eT(ev,this);
if((h.cL(et)[0]==this.handle)||(h.cL(et)[1]==this.handle)){
	drag.startdrag(h.tB(et,this.element),ev);
	}},
	function(e){
var ev=e||window.event;
var et=h.eT(ev,this);ev.offsetX+=40;ev.offsetY+=40;
if((h.cL(et)[0]=='result')&&ev.ctrlKey){
drag.msk.style.zIndex=-1;
	copy=et.cloneNode(true);
	copy.className=this.element+' '+this.handle;
	copy.style.position='absolute';
	copy.style.top=et.offsetTop+'px';
	copy.style.left=et.offsetLeft+'px';
	copy.style.width=et.offsetWidth+'px';
	copy.style.Height=et.offsetHeight+'px';
	document.body.appendChild(copy);
	drag.startdrag(copy,ev);
	}}],
"mousemove":[function(e){
	var ev=e||window.event;
	var et=h.eT(ev,this);
	//h.dom(h.gt('Status'),'02000').innerHTML="className:"+et.className+"<br>ID:"+et.id;
	if(dragTarget.className){
		drag.move(ev,dragTarget)
		}
	}],
"mouseup":[function(e){
	if(!copy)drag.stopdrag(e,dragTarget);
	},
	function(e){
	var ev=e||window.event;
	var et=h.eT(ev,this);
	drag.stopdrag(e,dragTarget);parent=h.tB(et,'draggable');
	if(copy&&parent.id=='Edit'){copy.style.position=copy.style.top=copy.style.left=copy.style.width=copy.style.height='';copy.className="editingContent";h.dom(h.gt('Edit'),'02000').appendChild(copy);copy=false;}
	},
]}
this.msk=h.cE('div');
this.msk.id="maskLayer";
this.msk.className="dummy";
document.body.appendChild(this.msk);
with(this.msk.style){top='0px';left='0px';width='100%';height='100%';padding='0px';margin='0px';position='fixed';backgroundImage='url("'+vars._NULL+'")';display='none';cursor='move';zIndex=255}
this.offset={x:-60,y:-10};
	var snapX=1;
	var snapY=1;
this.move=function(e,sel){
	ee=(window.event || e);
	mp=parseInt(sel.style.margin||0)+parseInt(sel.style.padding||0)+30;
	var y=(ee.clientY-this.offset.y-mp);
	var x=(ee.clientX-this.offset.x-mp);
	x=(x>0)?x:0;
	y=(y>0)?y:0;
	sel.style.left=parseInt(x/snapX)*snapX+'px';
	sel.style.top=parseInt(y/snapY)*snapY+'px';
	}
this.startdrag=function(who,ev){
	this.offset={x:(ev.offsetX || ev.layerX),y:(ev.offsetY || ev.layerY)};
	dragTarget=who;
	if(!copy)this.msk.style.display='';
	}
this.stopdrag=function(e,sel){
	this.msk.style.display='none';
	dragTarget={}}
appendListeners(document.body,this.dragListeners,true);
}
// editor
function Editor(docContainer)
{
this.container=h.cE('div');
with(this.container){className="textEditor";with(style){position='absolute';width='300px';height='200px';top='600px';left='0px';}}
docContainer.appendChild(this.container)
this.__defineGetter__('length',function(){return this.container.innerHTML.length});
}
// enum object
function Enum(valuesArray)
{
this.__defineGetter__('get',function(){return v});
var values=[];
v={};
this.__defineSetter__('add',function(value){values[values.length]=value});
this.__defineSetter__('define',function(valueArray){values=[];for(var i in valueArray){values[i]=valueArray[i]}})
this.__defineSetter__('set',function(val){var assign=false;for(var i in values){if(values[i]==val)assign=i;}if(assign)v=values[assign]})
if(valuesArray){this.define=valuesArray};
}
// css selector
/*------------------------------------------------------------------------------------------------*/
function Models()
{
this.linear=function(dt,dy){return 'function(t){return t*t*t*'+((dy[1]-dy[0])/(dt*dt*dt))+'+'+dy[0]+'}'}
}
var animationModels=new Models();
function anim(trg,p,dy,dt,samples,model,callback)
{
trg.style[p]=dy[0]+'px';
trg.style.overflow='hidden';
var f=eval('('+animationModels[model](dt,dy)+')');
var timeSample=dt/samples;
var ctime=0;
var clk=function()
{
if(ctime>dt)
{callback(trg);if(parseInt(f(ctime))>1){trg.style[p]='';};window.clearInterval(intervalID)}
else
{trg.style[p]=parseInt(f(ctime))+'px';}
ctime+=timeSample;
}
var intervalID=setInterval(clk,timeSample);
if(trg.offsetHeight){this.hg=trg.offsetHeight};
}
function toggleAnim(trg,h)
{
if(trg.style.display==''){ aa=new anim(trg,'height',[trg.offsetHeight,0],500,30,'linear',function(trg){trg.style.display='none'});}else{trg.style.display=''; bb=new anim(trg,'height',[0,aa.hg],500,30,'linear',function(trg){});};
}

var btn={
	"ce":function(container,tag,cls,eventName,action){
	this.elem=h.cE(tag);
	h.eL(this.elem,eventName,action,true);
	this.elem.className=cls;
	container.appendChild(this.elem);
	return this.elem;},
	"img":function(container,action,src,dims,eventName){
	this.elem=btn.ce(container,'img','button',eventName,action);
	this.elem.src=src;
	with(this.elem.style){
	display='inline-block';
	position='absolute';
	left=dims.x;
	top='6px';
	height=dims.h;
	width=dims.w;
		}
		return this.elem;
	},
	"txt":function(container,action,txt,dims,eventName){this.elem=btn.ce(container,"span",txt,'button',eventName,action);this.elem.innerHTML=txt;with(this.elem.style){display='inline-block';position='absolute';left='24px';height=this.dims.h;width=this.dims.w;}},
	"box":function(container,action,txt,dims,eventName){this.elem=btn.ce(container,"span",txt,'button',eventName,action);this.elem.innerHTML=txt;with(this.elem.style){display='inline-block';position='absolute';left='24px';height=this.dims.h;width=this.dims.w;}},
	"loader":function(container){
	cnt=h.cE('span');
	cnt.innerHTML+='<span style="font-size:11px">'+arguments.callee.caller.name+'</span>';
	var nimg=h.cE('img');
	nimg.src='../../loader 10.gif';

	nimg.style.width='43px';nimg.style.height='11px';nimg.style.padding='5px 151px 5px 5px';
	cnt.appendChild(nimg);
	container.appendChild(cnt);
	return cnt;},
	"timer":function(delay,period,f){
	if((period-delay)>=0)
		{
			f(period);
			period+=delay;
			setTimeout('btn.timer('+delay+','+period+','+f+');',Math.abs(delay));
		}
	}
	}
function foreach(array,f)
{
for(i in array)f(array[i]);
}
function transform(array,f)
{
var nwa=new Array();
for(i in array)nwa[i]=f(array[i]);
return nwa;
}

function insertAtCursor(myField, myValue) {
//IE support
if (document.selection) {
myField.focus();
sel = document.selection.createRange();
sel.text = myValue;
}
//MOZILLA NETSCAPE support
else 
{
if ( myField.selectionStart || (myField.selectionStart =='0')) {
var startPos = myField.selectionStart;
var endPos = myField.selectionEnd;
myField.value = myField.value.substring(0, startPos)
+ myValue
+ myField.value.substring(endPos, myField.value.length);
} else {
myField.value += myValue;
}
}
}
function insertAtCursor_html(myField, myValue) {
//IE support
if (document.selection) {
myField.focus();
sel = document.selection.createRange();
sel.text = myValue;
}
//MOZILLA NETSCAPE support
else 
{
if ( myField.selectionStart || (myField.selectionStart =='0')) {
var startPos = myField.selectionStart;
var endPos = myField.selectionEnd;
myField.innerHTML = myField.innerHTML.substring(0, startPos)
+ myValue
+ myField.innerHTML.substring(endPos, myField.innerHTML.length);
} else {
myField.innerHTML += myValue;
}
}
}
function selected_HTML() 
{
return document.getSelection();
}