THREE.Vector3.prototype.angles=function(){var v=this;return {xy:Math.atan(v.x/v.y),xz:Math.atan(v.x/v.z),yx:Math.atan(v.y/v.x),yz:Math.atan(v.y/v.z),zx:Math.atan(v.z/v.x),zy:Math.atan(v.z/v.y)}}

function load(destination,filename,callBack)
{
//destination.innerHTML=filename;
//dialog.innerHTML='loaded';
//btn.loader(dialog);

}
function Loader(id)
{
var cb=function(txt,obj){obj.result=txt}
var self=this
//this.e=h.cE('input');
//this.e.name="file_name"
//this.e.binding=this
//this.e.onchange="this.binding.call(this.value)"
this.e=toolbar([],"loadFile",{},'LoadFile')
this.e.children[1].innerHTML='<form><input type="file" name="file_name" onchange="this.parentNode.parentNode.binding.call(this.value)"><form>'
this.e.children[1].binding=this
h.gt('leftPane').appendChild(this.e)
this.callback=cb
this.call=function(filename){h.xP('./echo.php',cb,self,'userfile='+filename);}
this.result={}
}
function loadFile()
{
}
function def(name,value,callback) {
var val=value?value:null
var o=callback?callback:function(v){alert(val)}
if(window['linkedVariables'])window['linkedVariables'][name]=this
else {window['linkedVariables']={};window['linkedVariables'][name]=this}
this.onchange=o
window.__defineSetter__(name,function(v){val=v;window['linkedVariables'][name].onchange(v)})
window.__defineGetter__(name,function(){return val})
}
function Color(c){
var _C=this
	if(typeof(c)=='undefined')c={r:255,g:255,b:255,a:1}
	if(typeof(c)=='object') {
		this.r=c.r!==undefined?parseInt(c.r):255
		this.g=c.g!==undefined?parseInt(c.g):255
		this.b=c.b!==undefined?parseInt(c.b):255
		this.a=c.a!==undefined?parseFloat(c.a):1.0
	}
	if(typeof(c)=='string') {
		if(c.split('rgb')[1]){
		var rgb=c.split('(')[1].split(')')[0].split(',');
		this.r=rgb[0]?parseInt(rgb[0]):255
		this.g=rgb[1]?parseInt(rgb[1]):255
		this.b=rgb[2]?parseInt(rgb[2]):255
		this.a=rgb[3]?parseFloat(rgb[3]):1.0
		}
	}
	this.set=function(c){
		switch(typeof(c)){
			case 'object':_C.r=c.r,_C.g=c.g;_C.b=c.b;_C.a=c.a;_C.hex=(_C.r*65535+_C.g*256+_C.b)&0xFFFFFF;break;
			case 'number':var v=c.toString(16);this.hex=(v.substr(0,6),16);_C.r=parseInt(v.substr(0,2),16);_C.r=parseInt(v.substr(2,2),16);_C.r=parseInt(v.substr(4,2),16);_C.r=parseInt(v.substr(6,2),16)/255;break
			}
		}
	this.hex=(this.r*65535+this.g*256+this.b)&0xFFFFFF
	this.toRGBA=function(){return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')'}
	this.toHex=function(){return '0x'+(this.hex.toString(16))}
}
function ColorSwatch(){
var _C=this,_CALLER
var pickColor=function(event){
var cl=new THREE.Color()
	var c={x:event.layerX-20,y:event.layerY}
	if(c.x>0){
		var rgb=HSV(c,128,128)
		cl.setRGBA(rgb[0],rgb[1],rgb[2],_CALLER.color.a);}
	else cl.setRGBA(_CALLER.color.r,_CALLER.color.g,_CALLER.color.b,1-c.y/128)
	_CALLER.set(cl)
	return cl;
	}
var HSV=function(c,L,H){
var x=c.x/L,y=c.y/H;
var cl=new THREE.Color();cl.setRGBA(cSV(x,y),cSV(x+2/3,y),cSV(x+1/3,y),1);//cl.updateRGBA();cl.updateHex();
return [cSV(x,y),cSV(x+2/3,y),cSV(x+1/3,y)]
}
this.element=h.cE('div')
with(this.element.style){position='absolute';width='148px';height='128px';backgroundPosition='20px 0px';backgroundRepeat='no-repeat';border='1px solid white'}
document.body.appendChild(this.element)
this.element.style.backgroundImage='url(./images/colorpick128.png)'
this.mask=h.cE('div')
this.element.appendChild(this.mask)
this.mask.style.width='148px'
this.mask.style.height='128px'
h.eL(this.mask,'mousemove',pickColor,true)
h.eL(this.mask,'mouseout',function(event){_CALLER.set(_CALLER.color);_C.hide()},true)
h.eL(this.mask,'mousedown',function(event){
	_CALLER.set(pickColor(event));
	var co={x:event.offsetX, y:event.offsetY}
	_C.hide();
	},true)
this.show=function(_CL){
	_CALLER=_CL;
	_C.element.style.display='';
	var pos=h.aP(_CALLER.element);
	//pos.x=_CALLER.element.offsetLeft;
	//pos.y=_CALLER.element.offsetTop;
	this.element.style.left=pos.x+_CALLER.element.offsetWidth+'px';
	this.element.style.top=pos.y+_CALLER.element.offsetHeight+'px'}
this.hide=function(){_C.element.style.display='none'}
this.hide()
}
function TextureSwatch(source){
var _C=this,_CALLER
this.target=_CALLER
var pickTexture=function(event){}
this.element=h.cE('div')
this.catalog=source;
this.children=[]
for(var i in source){if(typeof(source[i])=='number')continue;var e=new TextureSwatchElement(source[i],_C);this.children.push(e);this.element.appendChild(e.element)}
with(this.element.style){position='absolute';width='200px';}
document.body.appendChild(this.element)
this.show=function(_CL){
	_CALLER=_CL;
	this.target=_CL
	_C.element.style.display='';
	var pos=h.aP(_CALLER.element);
	//pos.x=_CALLER.element.offsetLeft;
	//pos.y=_CALLER.element.offsetTop;
	this.element.style.left=pos.x+_CALLER.element.offsetWidth+'px';
	this.element.style.top=pos.y+_CALLER.element.offsetHeight+'px';
	}
this.hide=function(){_C.element.style.display='none'}
this.hide()
}

function ColorButton(r,g,b,a,blending,w){
var _CB=this,w=(w!==undefined)?w+'px':'50px'
this.element=h.cE('div');
with(this.element.style){
	width=w;height=w;display='inline-block';margin='2px';
}
this.color=new THREE.Color()
this.material=new THREE.MeshColorFillMaterial(this.color.hex&0xFFFFFF,this.color.a);
this.set=function(color,b){
_CB.color.setRGBA(color.r,color.g,color.b,color.a);
_CB.material.color=_CB.color;
_CB.material.blending=(b!==undefined)?b:_CB.material.blending;
render();
_CB.element.style.backgroundColor=_CB.color.__styleString
}
this.element.style.backgroundColor=this.color.__styleString
this.picker=colorSwatch
h.eL(this.element,'click',function(event){_CB.picker.show(_CB)},true)
this.set({r:r,g:g,b:b,a:a},blending)
}

function TextureButton(m,b,w){
var _TB=this
this.element=h.cE('canvas')
this.element.width=w||50;this.element.height=w||50;
this.texture={}//m?textures[m]:textures.wood01
var context=this.element.getContext('2d');
this.material={}//new THREE.MeshBitmapMaterial(_T.element)
this.set=function(T,b){
	this.texture=T;
	this.material=new THREE.MeshBitmapMaterial(T.element)
	this.material.blending=(b!==undefined)?b:_TB.blending
	context.clearRect(0,0,50,50)
	context.drawImage(T.im,0,0,T.width,T.height,0,0,50,50)
	}
this.picker=textureSwatch;
h.eL(this.element,'click',function(event){_TB.picker.show(_TB)},true)
this.set(m?m:textures.empty,b);
}
function TextureSwatchElement(m,p){
var _TSE=this
var _P=p
this.element=h.cE('canvas')
this.element.width=50;this.element.height=50;
this.texture=m
this.element.getContext('2d').drawImage(m.im,0,0,m.width,m.height,0,0,50,50)
h.eL(this.element,'click',function(event){
	_P.target.set(_TSE.texture);
	_P.hide()
	},true)
}

function StandardMaterialDialog(n,m)
{
var _SMD=this
this.name=n//arguments[0]?arguments[0]:'StandardMaterial'
this.materialDialog=m
this.materials=[]
this.element=h.cE('div')
var text=h.cE('div'),b=h.cE('div');b.style.display='none';b.style.display='none';text.innerHTML=this.name;text.className='title'
this.element.appendChild(text)
this.element.appendChild(b)
for(var i in m){this.element.children[1].appendChild(m[i].element)
this.materials.push(m[i].material)}
this.button=h.cE('div');this.button.className='button vertical';this.button.innerHTML='apply'
this.element.children[1].appendChild(this.button)
h.eL(this.button,'click',function(event){
_SMD.apply(selection.objects)
},true)
this.apply=function(S){
var tmp=[];for(var i in S){tmp.push(S[i])}
deselect();
for(var i in tmp){
tmp[i].material=[]
	_SMD.materials[0].opacity=_SMD.materials[0].color?_SMD.materials[0].color.a:1
for(var j in _SMD.materials){
	tmp[i].material.push(_SMD.materials[j])
	if(_SMD.materials[j] instanceof THREE.MeshBitmapMaterial){
	tmp[i].geometry.uvs=[];
	var tex=_SMD.materialDialog[j].texture
	for(var j in tmp[i].geometry.faces)tmp[i].geometry.uvs.push(tex.UV.textureMap(tmp[i],tmp[i].geometry.faces[j]))}
	}

selection.addObject(tmp[i]);
}
}
}
function cSV(x,y){
function c(a){var x=a-parseInt(a); return (x<1/6)?1:(x<2/6)?(6*(2/6-x)):(x<3/6)?0:(x<4/6)?0:(x<5/6)?(6*(x-4/6)):1;}
function V(y){return y<=0.5 ? 1 : 2*(1-y) }
function S(y){return y<=0.5 ? 2*y : 1 }
return V(y)*(S(y)*(c(x)-1)+1)
}

function ModelsList()
{this.list=[]
var t={}
this.buttons=[]
this.toolbar=toolbar([],'models',{},'ModelsCache')
var bc=this.toolbar.children[1]
for(var i in localStorage)
	if(i.split('model')[1]){
	var t={}
	t[i]=localStorage[i]
	this.list.push(t)
	var _B=new Button(i,'insertModel')
	this.buttons.push(_B)
	_B.setClick(new Function('event',localStorage[i]))
	bc.appendChild(_B.element)
	//var bb
	}
rightPane.appendChild(this.toolbar)
}

function AuthenticationProtocol(user){
var _AP=this,guestSession={libServerWrite:'./guest'},_l=new UILoader()
this.user=user
this.session=null
this.gatewayServer='./auth.php'
this.UIdialog=new UIAuthenticationDialog(_AP)
this.login=
	function(usr,pwd){
	//if(localStorage.SSID)_AP.logout()
		_AP.UIdialog.message.setText(_l.element)
		h.xP(this.gatewayServer+'?cmd=login&usr='+usr+'&pwd='+pwd,
			function(txt,obj){
				var r=h.eval('return '+txt);
				obj.loggedIn=usr
				if(r.status=='exists')  {obj.session=r.data;
				localStorage.SSID=r.data.SSID;
				_AP.UIdialog.message.setText('')
				localLibrary=new ObjectLibrary('./usr/'+usr+'/objects/LocalObjects.txt','Local')
				models=new ObjectLibrary('./usr/'+usr+'/models/models.txt','Models')
				}
				if(r.status=='invalid') obj.UIdialog.message.setText(r.error)
				//obj.sessionID=r.data.SSID
			},
			_AP)}
this.logout=function(){
		_AP.UIdialog.message.setText(_l.element)
		//var ssid=_AP.session.SSID?_AP.session.SSID:localStorage.SSID
	h.xP(this.gatewayServer+'?cmd=logout&SSID='+localStorage.SSID,
			function(txt,obj){
				var r=h.eval('return '+txt);
				obj.loggedIn=null
				if(r.status=='logout')  {
					if(_AP.session){localLibrary.unload()
					models.unload()}
					obj.session=r.data;
					localStorage.SSID=''
					_AP.UIdialog.message.setText('')
				}
				if(r.status=='invalid') obj.UIdialog.message.setText(r.error)
			},
			_AP)}
this.signup=function(u,p,e){
_AP.UIdialog.message.setText(_l.element)
h.xP(this.gatewayServer+'?cmd=makeuser&usr='+u+'&pwd='+p+'&mail='+e,
	function(txt,obj){
		var r=h.eval('return '+txt);
		if(r.status=='created')  {obj.UIdialog.message.setText('Your account has been created. We have sent you a confirmation e-mail at '+e)
		}
		if(r.status=='invalid') obj.UIdialog.message.setText(' Creating the account has failed. Reason : '+r.error)
	},
	_AP)

}
this.loggedIn=null
}
function UILoader(){
this.element=h.cE('img');
this.element.src='data:image/gif;base64,R0lGODlhBQABAIAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAABACwAAAAAAQABAAACAkQBACH5BAkUAAEALAAAAAACAAEAAAICDAoAIfkECRQAAQAsAgAAAAEAAQAAAgJEAQAh+QQJFAABACwDAAAAAQABAAACAkQBACH5BAkUAAEALAQAAAABAAEAAAICRAEAOw==';
this.element.width='25'
this.element.height='5'
}
function UIBox(text){
	this.element=h.cE('div')
	this.setText=function(t){if(typeof(t)=='string')this.element.innerHTML=t
	else {this.element.innerHTML='';this.element.appendChild(t)}
	}
	this.setText(text)
}
function UIFormField(name,type,length){
	this.element=h.cE('input')
	var i=this.element
	i.name=name
	i.type=type
	i.size=length
	i.placeholder=name+':'
}
function UIForm(s){
	this.element=h.cE('form');
	for(var i in s)this.element.style[i]=s[i]
	var _F=this, el=this.element
	this.button=new Button('login','UIForm_submit')
	//this.button.style.display='block'
	this.element.appendChild(this.button.element)
}
function UIAuthenticationDialog(p){
	this.parent=p;
	var _P=this.parent,_UIAD=this;
	this.toolbar=new UIToolbar('Authentication')
	this.toolbar.setSize(185)
	this.form=new UIForm({width:'175px'});
	this.form.className='holder';
	this.message=new UIBox('')
	this.user=new UIFormField('Username','text',22)
	this.password=new UIFormField('Password','password',22)
	this.email=new UIFormField('e-mail','email',22)
	this.form.element.appendChild(this.user.element)
	this.form.element.appendChild(this.password.element)
	this.form.element.appendChild(this.email.element)
	this.form.element.appendChild(this.message.element)
	this.form.button.setClick(function(event){_P.login(_UIAD.form.element[0].value,_UIAD.form.element[1].value)})
	this.form.logout=new Button('logout','UIForm_logout')
	this.form.logout.setClick(function(event){_P.logout()})
	this.form.element.appendChild(this.form.logout.element)
	this.form.signup=new Button('signup','UIForm_logout')
	this.form.signup.setClick(function(event){_P.signup(_UIAD.form.element[0].value,_UIAD.form.element[1].value,_UIAD.form.element[2].value)})
	this.form.element.appendChild(this.form.signup.element)
	this.toolbar.addElement(this.form.element);
}
function UIToolbar(name,el){
	this.element=h.cE('div')
	this.element.id=name
	this.element.className='holder';
	this.setPosition=function(x,y){this.element.style.left=x?x+'px':'';this.element.style.top=y?y+'px':'';}
	this.setSize=function(w,h){this.element.style.width=w?w+'px':'';this.element.style.height=h?h+'px':'';}
	this.setStyle=function(s){for(var i in s)this.element.style[i]=s[i]}
	var _UIT=this,_t=new UITitle(name);
	this.element.appendChild(_t.element);
	this.element.innerHTML+='<div style="color:#FFFFFF"></div>';
	this.addElement=function(el){this.element.children[1].appendChild(el)}
	this.addUIElements=function(el){for(var i in el) this.element.children[1].appendChild(el[i].element)}
	this.appendTo=function(o){o.appendChild(this.element)}
	if(el)if(el instanceof Array) this.addUIElements(el)
			else this.addElement(el)
}
function UIButton(text,className){
	this.element=h.cE('div')
	this.element.className=className+" button"
	this.element.innerHTML=text
	var _click=function(){}
	this.setClick=function (f){h.eL(this.element,'click',f,false);_click=f}
}
function UIContainer(id){
	this.element=h.cE('div')
	this.element.id=id
	this.setStyle=function(s){for(var i in s)this.element.style[i]=s[i]}
	var _click=function(){}
	this.setClick=function (f){h.eL(this.element,'click',f,false);_click=f}
}
function UITitle(text){
	this.element=h.cE('div')
	this.element.className="title"
	this.element.innerHTML=text
	var _click=function(){}
	this.setClick=function (f){h.eL(this.element,'click',f,false);_click=f}
}