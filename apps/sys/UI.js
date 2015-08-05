///// base
HTMLElement.prototype.$=function(s){
	var c=s.split(','),cs=[],cms,$else=true,r=[],_S=this,p,l
	for(var i in c){
		p=c[i].substr(1)
		if(c[i][0]=='#'){_S=document;cms='getElementById';$else=false}
		if(c[i][0]=='.'){cms='getElementsByClassName';$else=false}
		if($else){cms='getElementsByTagName';p=c[i]}
		l=_S[cms](p);
		if(l.length!==0)for(var j=0,L=l.length;j<L;j++)r.push(l[j])
		else r=r.push(l)
		}
	return r;
}
Object.defineProperty(Array,'split',{value:function(s)
{
var r=[],_A=this
for(var i in _A){if(typeof(_A[i])=='string')_A[i]=_A[i].split(s)}
return _A
},enumerable:false,configurable:false})

function toHTTPRequestData(o){
	var t=o,v='';
	for(var i in t){
		if(typeof(t[i])!=='function'){
			if(typeof(t[i])=='object')v+=toHTTPRequestData(t[i])
			else v+=i+'='+t[i]+'&';
		}
	}
	return v.substr(0,v.length-1)
}
function UI_Grid2(a,b,element){
	var o={x:0,y:0,w:document.body.offsetWidth,h:document.body.offsetHeight}
	if(element!==undefined) o={x:h.aP(element).x,y:h.aP(element).y,w:document.body.offsetWidth,h:document.body.offsetHeight}
	var q=a,p=b,lnx=p.x.length,lny=p.y.length
	var grid=function(n){
		var mx=parseInt(n.x/lnx-.5)*p.x[lnx-1]*q.x,my=parseInt(n.y/lny-.5)*p.y[lny-1]*q.y
		return {x:o.x+mx+p.x[n.x%lnx]*q.x,y:o.y+my+p.y[n.y%lny]*q.y}
	}
	this.span=function(a,b,c,d){
		g0=grid({x:a,y:b});g1=grid({x:a+c,y:b+d})
		return {x:g0.x,y:g0.y,w:g1.x-g0.x,h:g1.y-g0.y}
	}
	this.cell=function(a,b){
		return this.span(a,b,1,1)
	}
	this.info={unit:a,positions:b}
}
function UI_Grid(unit,steps,element){
	var o={x:0,y:0,w:document.body.offsetWidth,h:document.body.offsetHeight}
	var q=unit,p=steps,lnx=p.x.length,lny=p.y.length
	if(element!==undefined) o={x:h.aP(element).x,y:h.aP(element).y,w:document.body.offsetWidth,h:document.body.offsetHeight}
	this.grid=function(a,b){
		var sx=0,sy=0,ra=a-parseInt(a),rb=b-parseInt(b)
		for(var i=0;i<=a;i++)sx+=p.x[i%lnx]
		for(var i=0;i<=b;i++)sy+=p.y[i%lnx]
		sx*=q.x;sy*=q.y
		return {x:o.x+sx,y:o.y+sy}
	}
	this.span=function(a,b,c,d){
		g0=this.grid(a,b);g1=this.grid(a+c,b+d)
		return {x:g0.x,y:g0.y,w:g1.x-g0.x-3*q.x,h:g1.y-g0.y-3*q.y}
	}
	this.cell=function(a,b){
		return this.span(a,b,1,1)
	}
}

function Transforms2D(){
	this.addSelf=function(v){
		this.x+=v.x;
		this.y+=v.y;
		return this;
	}
	this.subSelf=function(v){
		this.x-=v.x;
		this.y-=v.y;
		return this;
	}
	this.multiplyScalar=function(s){
		this.x*=s;
		this.y*=s;
		return this;
	}
	this.dot=function(v){
		return this.x*v.y+this.y*v.y;
	}
	this.negate=function(){
		this.x*=-1;
		this.y*=-1;
		return this;
	}
	this.length=function(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	this.clone=function(){
		return new Vector2D(this.x,this.y)
	}
	this.toString=function(){
		return 'Positon('+this.x+','+this.y+');'
	}
	this.toJSON=function(){
		return '{"x":"'+this.x+'","y":"'+this.y+'");'
	}
}
function Vector2D(a,b){
	this.x=a||0;
	this.y=b||0;
}
Vector2D.prototype=new Transforms2D();
Vector2D.constructor=Vector2D
function AJAXConnect(u,t){
	var _AC=this;
	var df=new Vector2D(0,4)
	this.method=function(){return (this._method=='GET')?'xG':'xP'}
	this._server=u
	this._callback=function(v,s){var f=new Function('return '+v); s.remove(_AC.loader);_AC._target._response=f()}
	this._target=t;
	this._method='GET';
	this.loader=null
	this._call=function(parameters){
		_AC.loader=new UI_Loader();
		_AC._target.add(_AC.loader);
		//var tp=_AC._target.getPosition().clone().addSelf(_AC._target.getSize().multiplyScalar(.5)).subSelf({x:32,y:32})
		var t=_AC._target,tp=t.getSize().multiplyScalar(.5).subSelf({x:32,y:32})
		_AC.loader.setPosition(tp)
		var p='?';
		for(var i in parameters)p+=(i+'='+parameters[i]+'&')
		h[this.method()](this._server+p,this._callback,this._target)
	}
}
function Server(u,t,c){
	var _method='GET',_server=u,_callback=function(v,s){var f=new Function('return '+v);var r=f();for(var i in r)s[i]=r[i];};
	this._target=t||{};
	this._call=function(parameters){
		var p='?';
		if(arguments.caller instanceof AsyncRequest){parameters.async=true}
		for(var i in parameters)p+=(i+'='+parameters[i]+'&')
		h.xP(_server+p,_callback,this._target)
	}
}
function SyncRequest(u,t,f){
	this._target=t||{};
	this._call=function(parameters){
		var p='?';
		if(arguments.caller instanceof AsyncRequest){parameters.async=true}
		for(var i in parameters)p+=(i+'='+parameters[i]+'&')
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
		h.xP(_server+p,_callback,this._target)
	}
}
function AsyncRequest(s,d,l){

}
function UIBase(){
var _UI=this;
this.content=function(t){
	if(t!==undefined) {this._element.innerHTML=t;return this}
	else return this._element.innerHTML;
}
this.set=function(v){
	for(var i in v)this[i]=v[i]
	return this
	}
this.setAttributes=function(a){
	for(var i in a)this._element[i]=a[i]
	return this
	}
this.setStyle=function(s){
	for(var i in s)this._element.style[i]=s[i];
	return this
	}
this.toggleStyle=function(o){
	for(var i in o)
		if(this._element.style[i]==o[i][0]) this._element.style[i]=o[i][1]
		else this._element.style[i]=o[i][0]
	return this
}
this.setPosition=function(v){
	this.setStyle({position:'absolute','left':v.x+'px','top':v.y+'px'});
	return this
	}
this.setSize=function(v){
		this.setStyle({'width':(v.x+'px'),'height':(v.y+'px')});
	return this
	}
this.show=function(){
	this.setStyle({'display':''});
	return this
	}
this.hide=function(){
	this.setStyle({'display':'none'});
	return this
	}
this.getPosition=function(){
		return new Vector2D(this._element.offsetLeft,this._element.offsetTop)
	}
this.getScreenPosition=function(){
	var gp=function(o){
		var position=new Vector2D(o.offsetLeft,o.offsetTop),parentPosition=new Vector2D()
		if(o.offsetParent){parentPosition=gp(o.offsetParent)}
		position.addSelf(parentPosition);
		return position.clone()
	}
	return gp(this._element)
	}
this.getSize=function(){
	return new Vector2D(this._element.offsetWidth,this._element.offsetHeight);
	}
this.addEventListener=function(e,f,p){
	h.eL(this._element,e,f,p)
	return this
	}
this.assignTo=function(o){
	o._element.appendChild(this._element)
	return this
	}
this.resign=function(){
	this._parent._element.removeChild(this._element)
	return this
	}
this.add=function(){
	for(var i in arguments){
	var e=arguments[i];
	this._element.appendChild(e._element);
	this._children.push(e)
	e._parent=this;
	}
	return this
}
this.addFirst=function(e){
	this._element.insertBefore(e._element, this._children[0]._element)
	this._children.unshift(e)
	e._parent=this;
	return this
}
this.attach=function(e){
zbr=e;zbre=this._element;
	if(e!==undefined) e.appendChild(this._element);
	else if(document.body===undefined) document.head.appendChild(this._element);
		else document.body.appendChild(this._element)
		return this
}
this.remove=function(e){
	var i=this._children.indexOf(e);
	if(i>-1){
	e._parent=null;
	this._children.splice(i,1);
	this._element.removeChild(e._element);
	}
	return e;
}
this.detach=function(){
	if(this._parent) this._parent.remove(this)
	else this._element.parentNode.removeChild(this._element)
}
this.JSON=function(p,v){
	var j={},c=this._children,ch=[];
	if(c.length){
	if(this._element[p])j[this._element[p]]=this._element[v]
	//j.children={}
	for(var i in c){if(c[i]._element[p])j[c[i]._element[p]]=c[i]._element[v]}
	}
	return j
}
this.JSONvalues=function(){
	return this.JSON('name','value')
}
this.JSONcontent=function(){
	return this.JSON('id','innerHTML')
}
}
var _base=new UIBase
function UI_Element(t){
this.__proto__=_base
var _UIE=this
this._element=document.createElement(t);
this.connector=new AJAXConnect('../../servers/echo.php',this)
this._parent=null
this._children=[]
}
//UI_Element.prototye=new UIBase

function UI_Layout(sections){
	var w=0
	UI_Element.apply(this,['div'])
	this.sections=sections
	for(var i in sections){
		this.add(new UI_Element('div').setStyle({position:'absolute',width:sections[i]+'px',left:w+'px'}))
		w+=sections[i];
		document.body.appendChild(this._children[i]._element)
	}
	this.assignTo=function(e,n){
		var _n=n%this.sections.length,_c=this._children[_n]
		_c.add(e)
		if(e._element.offsetWidth>_c.getSize().x)_c.setStyle({width:e._element.offsetWidth})
	}
}
/*UI_Layout['Head']=function(h){
var _tw=0
this.sections.forEach(function(e,i,a){_tw+=e.getSize().x})
this.sections.push(new UI_Element('div').setSize(new Vector2d(_tw,h)))
}
UI_Layout.Head.prototype = new UI_Layout.Head();
UI_Layout.Head.prototype.constructor = UI_Layout.Head;*/
//////base Objects
function UI_Input(name,type,value){
var _UII=this
UI_Element.apply(this,['input'])
this.setAttributes({'placeholder':name,'name':name,'type':type,'value':value||''}).set({value:function(v){if(v==undefined)return this._element.value
else this._element.value=v}})
}
//UI_Input.constructor=UI_Input
function UI_Cell(v){
var _C=this
UI_Element.apply(this,['td'])
if(v!==undefined)this.content(v)
}
function UI_Row(v){
var _R=this
UI_Element.apply(this,['tr'])
if(v!==undefined)this.add(v)
}
function UI_TBody(v){
var _B=this
UI_Element.apply(this,['tbody'])
if(v!==undefined)this.add(v)
}
function UI_Table(rows){
var _UII=this
UI_Element.apply(this,['table'])
this._body=new UI_TBody
this.add(this._body)
var table=[];
for(var i in rows){
	var cells=rows[i],r=[],_row=new UI_Row
	for(var j in cells){
		var _cell=new UI_Cell
		_cell.content(cells[j]);
		_row.add(_cell)
		r.push(_cell)
	}
	table.push(r)
	this._body.add(_row)
}
this.cell=function(a,b){return table[a][b]}
}
//UI_Input.constructor=UI_Input

function UI_Button(name){
var _UIB=this
UI_Element.apply(this,['span'])
this._click=function(event){}
this.setAttributes({'className':'button','id':name,'innerHTML':name})
}
function UI_Image_Button(name){
var _UIB=this
UI_Element.apply(this,['img'])
this._click=function(event){}
this.setAttributes({'className':'button','id':name,'innerHTML':name})
}
//UI_Button.constructor=UI_Button

function UI_Drawer(name){
var _UID=this
UI_Element.apply(this,['div'])
this.setAttributes({'className':'button','id':name,'innerHTML':name})
}
//UI_Drawer.constructor=UI_Drawer

function UI_Separator(){
var _UIS=this
UI_Element.apply(this,['div'])
this.setAttributes({'className':'separator'}).setStyle({margin:'5px',padding:'0px',backgroundImage:"none"})
}
//UI_Separator.constructor=UI_Separator

function UI_Mask(t){
var _UIMK=this,_target=t
UI_Element.apply(this,['div'])
this.setAttributes({'className':'mask'}).setStyle({backgroundImage:"none"})
this.addEventListener("mousemove",function(event){
	_UIMK.show();
	_target._parent.setPosition(new Vector2D(event.clientX,event.clientY).subSelf(_UIMK.offset))
	},false).addEventListener("mouseup",function(event){_UIMK.hide();_UIMK.detach();_UIMK=undefined},false).attach()
}
//UI_Separator.constructor=UI_Separator

function UI_Title(name){
var _UIT=this
UI_Element.apply(this,['div'])
this.setAttributes({'className':'title','id':name,'innerHTML':name}).setStyle({padding:"3px",margin:"0px",backgroundColor:"#000000"}).addEventListener("mousedown",function(event){if(event.button!=0)new UI_Mask(_UIT).setStyle({position:'absolute',top:'0px',left:'0px',width:'100%',height:'100%',zIndex:'255'}).set({offset:new Vector2D(event.layerX||event.offsetX,event.layerY||event.offsetY)});else _UIT._parent._children[2].toggleStyle({height:["","400px"]})})
}
//UI_Drawer.constructor=UI_Drawer

function UI_Form(){
var _UIF=this
UI_Element.apply(this,['form'])
this.value=this.JSONvalues
}
//UI_Form.constructor=UI_Form

function UI_Wrapper(){
var _UIW=this
UI_Element.apply(this,['div'])
this.setAttributes({'className':'holder'})
}
//UI_Wrapper.constructor=UI_Wrapper

function UI_Text_Wrapper(){
var _UIW=this
UI_Element.apply(this,['div'])
this.setStyle({backgroundColor:"#FFFFFF",color:"#000000",backgroundImage:"none"})
}
//UI_Wrapper.constructor=UI_Wrapper

function UI_Iframe(URL){
var _UIW=this
UI_Element.apply(this,['iframe'])
this.setAttributes({src:URL,'className':'holder'}).setStyle({width:'200px',height:'200px'})

}
//UI_Wrapper.constructor=UI_Wrapper

function UI_Image(src){
var UIIm=this
UI_Element.apply(this,['img'])
this.src=src||''
}
//UI_Image.constructor=UI_Image

function UI_Link(h,v){
var UIIm=this
UI_Element.apply(this,['a'])
this.setAttributes({href:h||'about:blank',className:'button'}).content(v).setStyle({display:'block'})
}
//UI_Image.constructor=UI_Image

//////advanced Objects
function UI_Loader(){
UI_Element.apply(this,['img']);
var UILd=this;
var loading=vars._LOAD2;
this.setStyle({position:'absolute'}).setPosition({x:0,y:0}).setAttributes({width:64,height:64,src:loading});
}
//UI_Loader.constructor=UI_Loader

function UI_Menu(t){
UI_Element.apply(this,['div']);
var _UIM=this,w,t;
_UIM.add(t=new UI_Title(t),w=new UI_Wrapper);
_UIM.add=function(){for(var i in arguments)w.add(arguments[i]);return _UIM}
t.addEventListener('click',function(event){w.toggleStyle({display:['','none']});return _UIM},true)
}
//UI_Loader.constructor=UI_Loader

function UI_Form_Login(t){
UI_Form.apply(this,[])
var _UIFL=this,u=new UI_Input('Username','text'),p=new UI_Input('Password','password'),m=new UI_Input('e-mail','email'),s=new UI_Button('Login')
var submit=function(event){_UIFL.connector._call(_UIFL.value())}
this.add(new UI_Title(t),u.setStyle({display:'block'}),p.setStyle({display:'block'}),m.setStyle({display:'block'}),s.setStyle({display:'block'}).addEventListener('click',submit.bind(this),true)).setAttributes({'className':'holder'})
}

UI_Form_Login.prototype.constructor=UI_Form
UI_Form_Login.prototype=new UI_Form()

function UI_Keyboard_Button(name,n,c){
UI_Table.apply(this,[[['',c],[n,'']]]);
var _UIKB=this
this.setStyle({'display':'inline-table'}).setAttributes({'className':'button'}).set({values:[n,c]})
this.cell(1,0).setStyle({fontSize:'16px'})
this.cell(0,1).setStyle({fontSize:'8px','color':'#8888dd'})
}

function UI_Keyboard_Command_Button(n){
UI_Element.apply(this,['div'])
var _UIKCB=this
this.values=[n]
this.setStyle({'display':'inline-block',margin:'1px',paddingLeft:'5px',paddingRight:'5px',fontSize:'8px','color':'#88dd88'}).setAttributes({'className':'button','innerHTML':n})
}

function UI_Keyboard(n,s){
UI_Form.call(this);
var _KB=this,caps,shift,ret,space,del;
this.add(new UI_Title(n||'Keyboard'),new UI_Separator()).setAttributes({'className':'holder'})
for(var i in s){
	var r=s[i].l,R=s[i].h
	for(var j in r){
		var b=new UI_Keyboard_Button(r[j]+' '+R[j],r[j],R[j])
		b.addEventListener('click',(
			function(event){
				var v=this.values[(shift._value||caps._value)*1],t=_KB._target.input._element;
				if(t.value!==undefined){t.value+=v}else{t.value=v}
				shift.set({_value:false}).setStyle({'backgroundColor':''})
				}
			).bind(b),true)
		this.add(b)
	}
	//this.add(new UI_Separator())
}
	this.add(new UI_Separator())
	caps=new UI_Keyboard_Command_Button('CAPS').set({_value:false})
	caps.addEventListener('click',(function(event){this._value=this._value?false:true;this.toggleStyle({'backgroundColor':['','#003322']})}).bind(caps),true);
	shift=new UI_Keyboard_Command_Button('SHIFT').set({_value:false})
	shift.addEventListener('click',(function(event){this._value=this._value?false:true;this.toggleStyle({'backgroundColor':['','#003322']})}).bind(shift),true);
	space=new UI_Keyboard_Command_Button('SPACE').addEventListener('click',(function(event){_KB._target.input._element.value=_KB._target.input._element.value+' '}).bind(space),true).setStyle({'padding-left':'32px','padding-right':'32px'})
	ret=new UI_Keyboard_Command_Button('RET').addEventListener('click',(function(event){var t=_KB._target;t.output.add(t.processor(t.input._element.value));t.input._element.value=""}).bind(ret),true)
	del=new UI_Keyboard_Command_Button('DEL').addEventListener('click',(function(event){var sv=_KB._target.input._element;_KB._target.input._element.value=sv.value.substr(0,sv.value.length-1)}).bind(del),true)
	this.add(caps,shift,space,ret,del)
}

UI_Keyboard.prototype.constructor=UI_Form
UI_Keyboard.prototype=new UI_Form()

function UI_Console(){
	UI_Wrapper.call(this)
	var _UIC=this,k=0;
	var i,w,pb=new UI_Button('print').setStyle({position:'absolute',right:'12px',top:'2px'}),ifr=new UI_Iframe().hide().setAttributes({id:'pfr'});
	pb.add(ifr).addEventListener(
		'click',
		(function(event){
			var _i;
			pfr.document.body.innerHTML=this._parent._parent.output.content();
			pfr.document.execCommand('print');}).bind(pb),
		true)
	this.add(
		new UI_Title('Console').add(pb),
		w=new UI_Wrapper()
			.setStyle({backgroundColor:'#FFFFFF',color:'#000000',overflowY:'scroll'})
			.set({
				add:function(c){
				if(c!==undefined){w.list.push(c);w.index+=1;this.content(this.content()+'<div class="conEntry" id="e_'+k+'">'+c+'</div>');k++}
				else return this._element.innerText
				},
				list:[]
			})
			.set({
				entry:function(n){var l=w.list.length;return w.list[n%l]},
				index:0
			}),
		i=new UI_Input('Input','text'))
		//.addEventListener('change',(function(event){w.add(_UIC.processor(i.value()));i.value('')}).bind(_UIC),true)
		.addEventListener('keydown',(function(event){var kc=event.keyCode;if(kc==38){w.index+=1;i.value(w.entry(w.index))}if(kc==40){w.index=w.index>=0?w.index-1:0;i.value(w.entry(w.index))}if(kc==13){w.add(this.processor(i.value()));i.value('')}}).bind(_UIC),true)
		.set({
			size:function(o){
				_UIC.setSize({x:o.x,y:o.y});
				var sz=new Vector2D(this.getSize().x,22)
				w.setStyle({height:(o.y-66)+'px'})
				i.setStyle({width:(sz.x-22)+'px',height:sz.y+'px'})
				return _UIC
			},
			processors:{
				_EVAL:function(tx){
				var t,err=false,o,b,ErrorReport=function(e,n,k){this.error=e;this.name=n;this.details=k}
					sandbox={}
					if(tx[0]=='>')t=tx.substr(1)
					else return tx.replace(/\</gi,'&lt').replace(/\>/gi,'&gt<br>');
					b=new Function(t).bind(sandbox)
					try{o=b()}catch(e){o=e.stack.split('at'),s=new ErrorReport(e,o[0],o);o=listobj(s,3);var err=true}
					if(typeof(o)=='object'&& !err) var o=listobj(o,3)
					return o},
				_ECHO:function(t){return t}},
			input:i,
			output:w
		})
		.set({processor:this.processors._EVAL})
}

function UI_Draw_Surface(_x,_y,pixelSize){
var _UII=this
UI_Element.apply(this,['table'])
this._body=new UI_TBody
this.add(this._body).setStyle({borderCollapse:'collapse'})
var table=[];
for(var i=_y;i>=0;i--){
	var r=[],_row=new UI_Row().setStyle({borderCollapse:'collapse'})
	for(var j=_x;j>0;j--){
		var _cell=new UI_Cell().setStyle({position:'relative',width:pixelSize,height:pixelSize,borderCollapse:'collapse'})
		_row.add(_cell)
		r.push(_cell)
	}
	table.push(r)
	this._body.add(_row)
}
this.cell=function(a,b){return this._body._children[a]._children[b]};
this.strokeColor="rgba(255,0,0,1)"
this.fillColor="rgba(255,0,255,1)"
this.setPixel=function(a,b,v){
var _c=this.cell(a,b).setStyle({backgroundColor:v});
return _c
}
this.getPixel=function(a,b){
return this.cell(a,b)._element.style.backgroundColor
}
this.point=function(a,b){this.setPixel(a,b,this.strokeColor);return this;}
this.line=function(a,b,c,d){
	var eq={a0:(d-b)/(c-a),b0:(b*c-a*d)/(c-a)}
	for(var i=a;i<=c;i++){
		this.point(i,parseInt(i*eq.a0+eq.b0))
	}
	return this;
}
this.clear=function(){for(var i in this._body._children)for(var j in this._body._children[i]._children)this._body._children[i]._children[j].setStyle({backgroundColor:""})}
}
function UI_Remote_App_Box(url,size){
var _UIRAB=this
UI_Element.apply(this,['div'])
this.add(
	new UI_Title('Window').setStyle({backgroundImage:"url("+vars._DOT+")"}).add(
		new UI_Image_Button().setAttributes({src:vars._CLOSE}).setStyle({display:"inline-block",position:"absolute",height:"16px",right:"0px"}).addEventListener("click",function(event){_UIRAB._element.parentNode.removeChild(_UIRAB._element)},true)
		),
	new UI_Separator(),
	new UI_Iframe(url).setAttributes({'className':'holder'}).setStyle({width:size.x+"px",height:size.y+"px"})
	).addEventListener("dragenter",function(event){_UIRAB.received=event;alert("dragenter")},true).setAttributes({'className':'holder'}).setStyle({position:"absolute",top:"50px",left:"25px"}).attach()
}
function UI_Local_App_Box(title,size){
var _UILAB=this,_w
UI_Element.apply(this,['div'])
this.add(
	new UI_Title(title).setStyle({backgroundImage:"url("+vars._DOT+")"}).add(
		new UI_Image_Button().setAttributes({src:vars._CLOSE}).setStyle({display:"inline-block",position:"absolute",height:"16px",right:"0px"}).addEventListener("click",function(event){_UILAB.detach()},true)
		),
	new UI_Separator(),
	_w=new UI_Text_Wrapper().setStyle({width:size.x+"px",height:size.y+"px"})
	).addEventListener("dragenter",function(event){_UILAB.received=event;alert("dragenter")},true).setAttributes({'className':'holder'}).setStyle({position:"absolute",top:"50px",left:"25px"}).set({content:this.content.bind(_w)}).attach()
}