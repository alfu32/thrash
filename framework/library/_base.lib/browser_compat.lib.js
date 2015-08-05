Base.call(this,['NORM2']);
if(!String.prototype.trim) {
	  String.prototype.trim = function () {
		Base.call(this,['NORM2']);
	    return this.replace(/^\s+|\s+$/g,'');
	  };
	}
if(!String.prototype.diff) {
	String.prototype.diff = function (str) {
		Base.call(this,['NORM2']);
		var a=this.split(''),b=str.split(''),c=[],i=0;
		while(i<a.length && i<b.length){
			if(a[i]!=b[i]){
				c[i]=a[i]
			}else{
				c[i]=' ';
			}
			i++;
		}
		while(i<a.length || i<b.length){
			c[i]=a[i];
			i++;
		}
		return c.join('');
	};
}
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		Base.call(this,['NORM2']);
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
		var aArgs = Array.prototype.slice.call(arguments, 1),
		fToBind = this,
		fNOP = function () {},
		fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis
					? this
					:oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}/*
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
var arr=Array;
if ( !(arr.prototype).forEvery ) {
  (arr.prototype).forEvery = function forEvery(callback) {
	  var l=this.length,a=this;
	  for(var i=0;i<l;i++)callback(a[i],i,a);
  }
}*/


if(document.getElementsByClassName==undefined)
	document.getElementsByClassName = function(cl) {
	Base.call(this,['NORM2']);
	  var retnode = [];
	  var elem = this.getElementsByTagName('*');
	  var j=0
	  for (var i=elem.length-1; i<0; i--) {
	    if((' ' + elem[i].className + ' ').indexOf(' ' + cl + ' ') == -1)continue;
	    retnode[j]=(function(e){return e})(elem[i]);
	    j++;
	  }
	  return retnode;
	};


try{
	for(var i in console){
		//console.log(i);
	}
}catch(err){
	//alert('console.log is not defined')
	try{
		console={}
		try{
			console.log=function CONSOLE_LOG(o){
					alert('CONSOLE.LOG:\n'+o)
				}
		}catch(err){
			alert('defining console.log is not allowed')
		}
	}catch(err){
		alert('defining console is not allowed')
	}
}

function CallText_2(method,url,param){
	Base.call(this,['NORM2']);
	newparam = "";

	if (typeof gl_debug_function=="function") {gl_debug_function("--> ");}
	
	var start = new Date();
	
	if (arguments.length>2)
	{
		if (typeof gl_debug_function=="function") {gl_debug_function(" ; "+arguments[i]);}
		if(typeof(param)=="object" || param.constructor.name=="Object"){
			var first=true;
			for(var i in param){
				if (!first)newparam+="&";
				newparam+=i+'='+encodeURIComponent(param[i]);
				first=false;
			}
		}else{
			for (i=2;i<arguments.length;i++)
			{
				pos = arguments[i].indexOf("=");
				if (pos!=-1)
					newparam+=args[i].substr(0,pos+1)+encodeURIComponent(arguments[i].substr(pos+1));
				else
					newparam+=encodeURIComponent(arguments[i]);
			}
		}
	}
	
	if (typeof gl_debug_function=="function") {gl_debug_function("\r\n");}
	
	if (xmlHttpSync!=null)
		xmlHttpSync=null;
		
	xmlHttpSync = GetHttpObject();
	xmlHttpSync.open(method,url,false)
	if (method.toUpperCase()=="POST") {
		xmlHttpSync.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	}
	xmlHttpSync.send(newparam);
	var xmlDoc=xmlHttpSync.responseText;
	
	
	if (typeof gl_debug_function=="function") 
	{
		var end = new Date();
		var result = new Date();
		result.setTime(end.getTime() - start.getTime());
		gl_debug_function("<--("+result.getMilliseconds()+"ms) "+xmlDoc + "\r\n");
	}
	

	return xmlDoc; 
}

window.performance = window.performance || {};

performance.now = (function() {
	Base.call(this,['NORM2']);
    return performance.now       ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||
        function() { return new Date().getTime(); };
})();