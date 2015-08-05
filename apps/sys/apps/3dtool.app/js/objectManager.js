ObjectLibrary=function(url,n)
{
var u=url.split('/')
var scope=this;
if(n==undefined){this.nm=''}else{this.nm=n+' '}
this.filename=u[u.length-1];
this.unload=function(){this.e.parentNode.removeChild(this.e)}
var Src=function(url){
h.xG(url,function(txt,scope){
	var obj=objImporter(txt);
		var o={};
	var buttons=[];
	
	for(var i in obj){
		var name=obj[i].name.replace(/\s/gi,'');
		o[name]=obj[i]
		o[name].material.replace(/\s/gi,'')
		buttons.push(name);
		}
	scope.objects=o;
		var interface=h.gt('rightPane');
	if(!scope.e)
		{scope.e=toolbar(buttons,scope.nm+"library",{},scope.nm+'Library')
		interface.appendChild(scope.e);} else {interface.removeChild(scope.e);scope.e=toolbar(buttons,scope.nm+"library",{},scope.nm+'Library');interface.appendChild(scope.e);}
	},this)}
if(this.__defineSetter__)this.__defineSetter__('src',Src)
else Object.defineProperty(this,'src',{set:Src})
this.e=null
this.content=''
this.src=url;
//h.xG(url,function(txt,scope){scope.src=txt;},this)
//this.src=h.;
}
function getObjectGeometry(txt)
{
importObj(objImporter(txt)[0])
}
