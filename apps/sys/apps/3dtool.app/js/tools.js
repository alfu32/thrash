
var renderSquare
var renderShadows=function(){
worker1 = new Worker('js/raytraceWorker.js');
//worker2 = new Worker('js/worker.js');
//worker3 = new Worker('js/worker.js');
//worker4 = new Worker('js/worker.js');
rendering=true
var canvasPosition=h.aP(renderer.domElement)
renderSquare=new Box(document.body,canvasPosition.x,canvasPosition.y,64,64)

function render(event) {
  if(event.data[0]=='>') con.out="Worker said:" + event.data
  else {
	  var f=new Function('return '+event.data);
	  var piece=f()
	  var context=renderer.domElement.getContext('2d'),q=64
	  context.lineWidth=1;var qx=q,qy=q,lim=q*q
	  qx=piece.qx;qy=piece.qy;lim=qx*qy
	  renderSquare.set(canvasPosition.x+piece.x,canvasPosition.y+piece.y,qx,qy)
	  
	  for(var i=0;i<lim;i++)
	  {
		var b=parseInt(i/qx)
		var a=i%qx
		var xx=piece.offsetX+piece.x+a,xy=piece.offsetY+piece.y+b;
		context.fillStyle=shadowColors[piece.colors[i]];
		context.fillRect(xx,xy,1,1)
	  }
	  
	  if((piece.y+q)>=renderer.domElement.height){worker1.terminate();renderSquare.remove()}
  }
 };
var shadowColors=[
		'rgba(64,128,64,0.001)',
		'rgba(0,0,0,.2)',
		'rgba(255,255,255,.1)',
		'rgba(47,127,175,0.1)',
		'rgba(0,0,255,.5)',
		'rgba(255,0,0,.5)',
		'rgba(0,255,255,.5)',
		'rgba(255,0,255,.5)',
		'rgba(255,255,0,.5)'
	]
worker1.onmessage = render
//worker2.onmessage = render
//worker3.onmessage = render
//worker4.onmessage = render
//var ts=new Date(),hw=parseInt(renderer.domElement.width/2),hh=parseInt(renderer.domElement.height/2)
var ts=new Date(),hw=parseInt(renderer.domElement.width),hh=parseInt(renderer.domElement.height)
var wh1={ox:0,oy:0,domElement:{'width':hw,'height':hh}}
//var wh1={ox:0,oy:0,domElement:{'width':2*hw,'height':2*hh}}
//var wh2={ox:0,oy:hh,domElement:{'width':2*hw,'height':2*hh}}
//var wh3={ox:hw,oy:0,domElement:{'width':2*hw,'height':2*hh}}
//var wh4={ox:hw,oy:hh,domElement:{'width':2*hw,'height':2*hh}}
var lightPos=scene.lights[1].position.clone().multiplyScalar(10000),
msg={
	cmd:'start' ,
	_scene:toJavaScript(scene.objects) ,
	_light:JSON.stringify(lightPos) ,
	_camera:JSON.stringify(camera) ,
	_renderer:JSON.stringify(wh1) ,
	time:ts.valueOf(),
	q:64}
worker1.postMessage(msg)
//msg._renderer=JSON.stringify(wh2);worker2.postMessage(msg)
//msg._renderer=JSON.stringify(wh3);worker3.postMessage(msg)
//msg._renderer=JSON.stringify(wh4);worker4.postMessage(msg)
}
cacheScene=function(){
localStorage.model=toJavaScript(scene.objects)
}
rememberScene=function(){
selection.deselect()
localStorage.lastScene=toJavaScript(scene.objects)
return true
}
function tempBuffer(){
}
retrieveSceneFromCache=function(){
var fn=new Function(localStorage.model)
fn();updateHash();render();
}
retrieveScene=function(){
var fn=new Function(localStorage.lastScene)
fn();updateHash();render();
}
flipAxes=false
// structure of materials : bkcolor-required,texture,frontcolor-required if texture;
function apply(o){
var sel=selection.objects//;deselect()
for(var i in sel){/*sel[i].material.pop()*/;o.apply(sel[i])}
}

function Texture(s){
this.im=new Image();
var _T=this
if(typeof(s)=='string'){var src=s}else{src=s.toDataURL()}
this.im.src=src;
this.loaded=false
this.material={}
h.eL(this.im,'load',function(event)
	{
		textures.count+=1;
		_T.width=this.width
		_T.height=this.height
		_T.element.width=this.width
		_T.element.height=this.height
		_T.element.getContext('2d').drawImage(this,0,0)
		_T.loaded=true;
		_T.material=new THREE.MeshBitmapMaterial(_T.element)
		con.out='Confirm: TEXTURE "'+this.src+'" loaded'
	})
var dist=function(a,b){return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)+Math.pow(a.z-b.z,2))}
this.element=h.cE('canvas')
this.apply=function(selected)
{
var mesh=selected , _hex=mesh.material[0].color.hex;
if(mesh.geometry.uvs.length!==mesh.geometry.faces.length){mesh.geometry.uvs=[]
for(var k in mesh.geometry.faces)mesh.geometry.uvs.push(/*_T.UV.faceMap())*/_T.UV.textureMap(mesh,mesh.geometry.faces[k]))//*/
}
if(!justUVs)mesh.material.push(this.material)
//mesh.material[0].color={hex:_hex}
}
this.UV={
textureMap:function(object,face)
	{var norm={x:new THREE.Vector3(0,1,1),y:new THREE.Vector3(1,0,1),z:new THREE.Vector3(1,0,1)};
	var geometry=object.geometry,p=object.position,fn=face.normal;
	var sc=object.scale
	if(fn.x)var n=norm.x
	if(fn.y)var n=norm.y
	if(fn.z)var n=norm.z
	var dist3=function(v1,v2){return Math.sqrt(Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2)+Math.pow(v1.z-v2.z,2))}
	var ca=geometry.vertices[face.a].position.clone().addSelf(p).multiplySelf(sc)//.multiplySelf(fn),
		cb=geometry.vertices[face.b].position.clone().addSelf(p).multiplySelf(sc)//.multiplySelf(fn),
		cc=geometry.vertices[face.c].position.clone().addSelf(p).multiplySelf(sc)//.multiplySelf(fn)
	    var l1=dist3(ca,cb)/_T.width,l2=dist3(cb,cc)/_T.height//,l3=dist3(c,d),l4=dist3(d,a),
		if(geometry.faces.indexOf(face)==0)con.out=l1+','+l2//cd=geometry.vertices[face.d]//.addSelf(p.multiply(n))
	return [new THREE.UV(0,0),new THREE.UV(l1,0),new THREE.UV(l1,l2),new THREE.UV(0,l2)]
	},
faceMap:function(){return [new THREE.UV(0,0),new THREE.UV(0,1),new THREE.UV(1,1),new THREE.UV(1,0)]},
faceMap2:function(){return [new THREE.UV(0,0),new THREE.UV(0,.5),new THREE.UV(.5,.5),new THREE.UV(.5,0)]},
unitMap:[new THREE.UV(0,0),new THREE.UV(0,1),new THREE.UV(1,1),new THREE.UV(1,1)]
}
}

function msToTime(t){
var h,m,s;
var v=t/1000
h=parseInt(v/3600);h=h<10?'0'+h:h
m=parseInt((v-h*3600)/60);m=m<10?'0'+m:m
s=parseInt((v-h*3600-m*60));s=s<10?'0'+s:s
ms=parseInt(100*(v-h*3600-m*60-s));
return [h,m,s].join(':')+'.'+ms
}

function msToTime2(t){
var h,m,s,ms,r=[];
var v=t/1000
h=parseInt(v/3600);h=h>=10?h:(h==0)?null:'0'+h;if(h)r.push(h)
m=parseInt((v-h*3600)/60);m=m>=10?m:(m==0&&!h)?null:'0'+m;if(m)r.push(m)
s=parseInt((v-h*3600-m*60));s=s>=10?s:(s==0&&!m)?null:'0'+s;if(s)r.push(s)
ms=parseInt(100*(v-h*3600-m*60-s));
return r.join(':')+'.'+ms
}
var rendering=false
renderPreview=function(){

	linesMaterial5.color.setRGBA( 0, 0, 0, 0 )
	linesMaterial10.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialRed.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialGreen.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialBlue.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialRed1.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialGreen1.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialBlue1.color.setRGBA( 0, 0, 0, 0 )
	brush.position.y = 2000;
	render();
	regen();
var raytracer=new RayTracer(scene,camera,renderer2)
nVertices=scene.countVertices()
nFaces=scene.countFaces()
var quantizer=nFaces<200?64:nFaces<400?32:nFaces<1600?16:8;
//dv=new Box(document.body,raytracer.canvasPosition.x,raytracer.canvasPosition.y,quantizer,quantizer)
pieces=parseInt((raytracer.width/quantizer)+1)*parseInt((raytracer.height/quantizer)+1); done=0
render();
//raytracer.context.clearRect(0,0,raytracer.width,raytracer.height)
rendering=true;time0=new Date();time0=time0.valueOf();t0=new Date();t0=t0.valueOf()
	if(renderPiece(0,0,{x:renderer2.domElement.width+1,y:1},renderer2,scene,camera)){
		linesMaterial5.color.setRGBA( 0, 0, 0, .2 )
		linesMaterial10.color.setRGBA( 0, 0, 0, .5 )
		linesMaterialRed.color.setRGBA( 255, 0, 0, 0.5 )
		linesMaterialGreen.color.setRGBA( 0, 255, 0, 0.5 )
		linesMaterialBlue.color.setRGBA( 0, 0, 255, 0.5 )
		linesMaterialRed1.color.setRGBA( 255, 0, 0, 0.2 )
		linesMaterialGreen1.color.setRGBA( 0, 255, 0, 0.2 )
		linesMaterialBlue1.color.setRGBA( 0, 0, 255, 0.2 )
	}
	//if(raytracer.renderZone(550,400,16,16))con.out=p;
}
renderWindow=function(){
	linesMaterial5.color.setRGBA( 0, 0, 0, 0 )
	linesMaterial10.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialRed.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialGreen.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialBlue.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialRed1.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialGreen1.color.setRGBA( 0, 0, 0, 0 )
	linesMaterialBlue1.color.setRGBA( 0, 0, 0, 0 )
	brush.position.y = 2000;
	render();
	regen();
var raytracer=new RayTracer(scene,camera,renderer,scene,camera)
nVertices=scene.countVertices()
nFaces=scene.countFaces()
var quantizer=nFaces<200?64:nFaces<400?32:nFaces<1600?16:8;
//dv=new Box(document.body,raytracer.canvasPosition.x,raytracer.canvasPosition.y,quantizer,quantizer)
pieces=parseInt((raytracer.width/quantizer)+1)*parseInt((raytracer.height/quantizer)+1); done=0
render();
//raytracer.context.clearRect(0,0,raytracer.width,raytracer.height)
rendering=true;time0=new Date();time0=time0.valueOf();t0=new Date();t0=t0.valueOf()
	if(renderPiece(0,0,{x:parseInt(renderer.domElement.width/2)+1,y:1},renderer,scene,camera)){
		linesMaterial5.color.setRGBA( 0, 0, 0, .2 )
		linesMaterial10.color.setRGBA( 0, 0, 0, .5 )
		linesMaterialRed.color.setRGBA( 255, 0, 0, 0.5 )
		linesMaterialGreen.color.setRGBA( 0, 255, 0, 0.5 )
		linesMaterialBlue.color.setRGBA( 0, 0, 255, 0.5 )
		linesMaterialRed1.color.setRGBA( 255, 0, 0, 0.2 )
		linesMaterialGreen1.color.setRGBA( 0, 255, 0, 0.2 )
		linesMaterialBlue1.color.setRGBA( 0, 0, 255, 0.2 )
	}
	//if(raytracer.renderZone(550,400,16,16))con.out=p;
}
function renderPiece(a,b,q,_r,_s,_c){
	done+=1
	var raytracer=new RayTracer(_s,_c,_r)
	//dv.set(raytracer.canvasPosition.x+a,raytracer.canvasPosition.y+b,q.x,q.y)
	if(raytracer.renderZone(a,b,q.x,q.y)){
		function nextPiece(){renderPiece(da,db,q,_r,_s,_c)}
		con.clear;
		var t1=new Date();t1=t1.valueOf()
		var dt=t1-t0
		t0=t1;var med=(t1-time0)/done
		var pps=parseInt(100000*q.x*q.y/dt)/100
		//var ppspf=parseInt(100*dt/(q*q*nFaces*10))/100
		con.out='Scene : { vertices : '+nVertices+' , faces : '+nFaces+' }'
		con.out='RayTracing : { procent : '+(parseInt(10000*done/pieces)/100)+'% , count : '+done+' of '+pieces+' pieces , elapsed time : '+msToTime(t1-time0)+' , lastPiece: '+msToTime(dt)+' , estimated time remaining: '+msToTime(med*(pieces-done))+' , pixelProcessing : '+pps+' pixels/second}'
		var db=((a+q.x)<raytracer.width)?b:(b+q.y)
		var da=((a+q.x)<raytracer.width)?(a+q.x):0
		if((db)<raytracer.height&&rendering){
		setTimeout(nextPiece,50)
		return true
		} else {
			//dv.remove()
			con.out='render finished in '+msToTime(t0-time0);
			//rendering=false;
			var cntx=renderer.domElement.getContext('2d');
			cntx.globalCompositeOperation='source-over'//'darken'
			if(_r!==renderer)cntx.drawImage(_r.domElement, 0, 0, renderer.domElement.width, renderer.domElement.height);
			cntx.globalCompositeOperation='source-over'
			return true}
	}
	return true
}
Box=function(p,x,y,w,H){
var _B=h.cE('div');
	_B.style.position='absolute';
	_B.style.top=y+'px';
	_B.style.left=x+'px';
	_B.style.border='1px solid rgba(255,255,255,.5)';
	_B.style.width=w+'px';
	_B.style.height=H+'px'
	_B.style.fontSize='8px'
	_B.style.color='#ffffff'
	_B.style.overflow='hidden'
	
	//con.out=[p,x,y,w,H].join(',')
	_B.className='Box'
	this.element=_B
	this.parent=null
	this.show=function(){
	_B.style.display='';
	}
	this.hide=function(){
	_B.style.display='none';
	}
	this.set=function(x,y,w,h){
	_B.style.top=y+'px';
	_B.style.left=x+'px';
	_B.style.width=w+'px';
	_B.style.height=h+'px';
	}
	this.remove=function(){
	this.parent.removeChild(_B)
	}
	this.append=function(_parent){
	this.parent=_parent
	_parent.appendChild(_B)
	}
	if(p!==undefined)this.append(p)
}
RayTracer=function(_scene,_camera,_renderer){
	var context=_renderer.domElement.getContext('2d')
	this.context=context
	//this.canvas=_renderer.domElement
	this.canvasPosition=h.aP(_renderer.domElement)
	var W=_renderer.domElement.width, H=_renderer.domElement.height,_RT=this;
	this.width=W;
	this.height=H;
	var lightPos=_scene.lights[1].position.clone().multiplyScalar(10000)
	var traceVisible=function(x,y){
		var pos3d=projector.unprojectVector( new THREE.Vector3( ( x / W ) * 2 - 1, - ( y / H ) * 2 + 1, 0.5 ), _camera );
		ray.direction = pos3d.subSelf( _camera.position ).normalize();
		var solids1=ray.intersectSolids(_scene,true)//,true);
		//var solids=[];for(var j in intersections){if(intersections[j].object.material[0].opacity>0.9 || intersections[j].object==plane )solids.push(intersections[j])}
		return solids1[0]!==undefined?solids1[0]:false
	}
	var RGBize=function(object,alpha){
	var rgb=object.object.material[0].color
	rgb={r:parseInt(rgb.r*256),g:parseInt(rgb.g*256),b:parseInt(rgb.b*256),a:(alpha==undefined)?(rgb.a/10):alpha}
	return 'rgba('+[rgb.r,rgb.g,rgb.b,rgb.a].join(',')+')'
	}
	var clampAlpha=function(val,min,max){
	return (val<min)?min:(val<=max)?(val):max
	}
	var traceLight=function(object){
		var lightRay = new THREE.Ray( lightPos, object.point.clone().subSelf( lightPos ).normalize() );
		var intersections=lightRay.intersectScene(_scene,true)//!!!!!!!!!
		var position={}
		var solids=[];for(var j in intersections){if(intersections[j].object.material[0].opacity>0.6 || intersections[j].object==plane || intersections[j].face==object.face){solids.push(intersections[j]);if(intersections[j].face==object.face)position={s:solids.length-1,i:j};}}
		if(position.i==0){return 'rgba(255,255,225,'+clampAlpha(1000/(solids[0].distance),.1,.7)+')'}
		else {
			if(position.s==0)return RGBize(intersections[position.i-1])
			else return 'rgba(0,0,0,'+clampAlpha(250/(solids[position.s].distance-solids[0].distance),.05,.15)+')'
		}
	}
	context.globalCompositeOperation='source-over'
	function ShadowColor(a){
	var ar=a;
	this.__defineGetter__('toRGBA',function(){return 'rgba('+ar.join(',')+')'})
	}
	this.shadowColors=[
		new ShadowColor([64,128,64,0.001]),
		new ShadowColor([0,0,0,.1]),
		new ShadowColor([255,0,0,.5]),
		new ShadowColor([0,255,0,.5]),
		new ShadowColor([0,0,255,.5])
	]
	this.renderZone=function(x,y,w,h){
	var l=1
		var iterate=function(){
			for(xx=x;xx<(x+w);xx+=l){
				for(xy=y;xy<(y+h);xy+=l){
					var pobj=traceVisible(xx,xy);
					var xRay=false;
					if(pobj){
						var xRay=traceLight(pobj);
						//xRay=xRay?0:1//<5)?xRay:4
					}
					context.lineWidth=1;
					context.strokeStyle=xRay?xRay:_RT.shadowColors[0].toRGBA;
					context.beginPath()
					context.moveTo(xx,xy)
					context.lineTo(xx+1,xy+1)
					context.stroke()
					context.moveTo(xx+1,xy)
					context.lineTo(xx,xy+1)
					context.stroke()
				}
			}
			return true
		}
		if(iterate()){}//dv.remove()
		return true;
	}
}
optimizeMesh=function (){
if(selection.objects.length==1){
var cf=findCongruentFaces()
con.out=cf.result.length+' faces found '//con.out=listobj(cf)
try{deleteDoublefaces(cf.result)}catch(e){con.out='optimizeMesh says:';con.out=e}
}else{con.out='no faces found'}
}
findCongruentFaces=function(){
function D(a,b){return Math.abs(a-b)<0.1}
var cn=[];for(var i in scene.objects)if(scene.objects[i]!==plane && scene.objects[i]!==brush){f=scene.objects[i].geometry.faces;for(var k in f){cn.push({face:f[k],object:scene.objects[i],centroid:f[k].centroid})}}
var eqf=[];
	for(var a=0;a<cn.length-1;a++)
		for(var b=0;b<cn.length-1;b++){
			var oba=selection.objects.indexOf(cn[a].object)>-1
			var obb=selection.objects.indexOf(cn[b].object)>-1
			var o=oba?a:obb?b:-1
			var ot=(oba||obb)&&(o>-1)
			if(cn[a].face!==cn[b].face&&
			ot &&
			D(cn[a].centroid.x,cn[b].centroid.x)&&
			D(cn[a].centroid.y,cn[b].centroid.y)&&
			D(cn[a].centroid.z,cn[b].centroid.z))
				eqf.push({i:scene.objects.indexOf(cn[o].object),face:cn[o].face})}
return {result:eqf}
}
findCongruentVertices=function(){
var cn=[];for(var i in scene.objects)if(scene.objects[i]!==plane && scene.objects[i]!==brush){f=scene.objects[i].geometry.vertices;for(var k in f){cn.push({face:f[k],object:parseInt(i),centroid:f[k].centroid})}}
var eqv=[];
	for(var a=0;a<cn.length-1;a++)
		for(var b=a;b<cn.length-2;b++)
			if(cn[a].face!==cn[b].face&&
			cn[a].centroid.x==cn[b].centroid.x&&
			cn[a].centroid.y==cn[b].centroid.y&&
			cn[a].centroid.z==cn[b].centroid.z)
				eqv.push({i:cn[a].object,face:cn[a].face})
return {result:eqv}
}
deleteDoublefaces=function (eqf){
	var spliceNext=function(arr,k){
		if(k>-1){
			try{
			var item=arr[k];
			var facear=scene.objects[item.i].geometry.faces
			var is=selection.objects.indexOf(scene.objects[item.i])>-1
			if(facear.splice(facear.indexOf(item.face),1))spliceNext(eqf,k-1)
			}catch(e){con.out='deleteDoublefaces '+k+' says:';con.out=e}
		} else return true
	}
	return spliceNext(eqf,eqf.length-1);
}
function Interval(ax,bx){
var a=ax,b=bx;
this.a=a;this.b=b;
this.in=function(x){return (a<=x)&&(x<=b)}
this.intersects=function(i){
			var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
			return ar[0].r!==ar[1].r
			}
this.intersectSelf=function(i){
			var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
			if(ar[0].r!==ar[1].r){this.a=ar[1].n;this.b=ar[2].n}
			else {this.a=null;this.b=null}
			return this
			// 
			}
this.unionSelf=function(i){
			var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
			if(ar[0].r!==ar[1].r){this.a=ar[0].n;this.b=ar[3].n}
			return this
}
this.subtractSelf=function(i){
			var ar=[{r:1,n:this.a},{r:1,n:this.b},{r:2,n:i.a},{r:2,n:i.b}].sort(function(p,n){return p.n-n.n});
			if(ar[0].r!==ar[1].r){this.a=ar[0].n;this.b=ar[1].n}
			return this
}
}
function NInterval(v0,v1,indices){
var a=v0,b=v1,I={};
this.indices=indices||'xyz';
for(var i in this.indices){I.push(new Interval(a[this.indices[i]],b[this.indices[i]]))}
this.a=a;this.b=b;
this.in=function(v){var r=true;for(var i in this.indices)r*=(I[this.indices[i]].in(v[this.indices[i]]));return r}
this.intersects=function(i){
			}
this.intersectSelf=function(i){
			}
this.unionSelf=function(i){
}
this.subtractSelf=function(i){
}
}
function Domain(){
var i,j,L,_D=this,a=null,order,optimize,t=[],c,d
this.domain=[]
this.order=(function(){for(i=0,L=_D.domain.length;i<L;i++){if(_D.domain[i].a!==null)t.push(_D.domain[i])}_D.domain=t;t=[]}).bind(this)
this.optimize=(function(){for(i=0,L=_D.domain.length;i<L;i++)for(j=i+1;j<L;j++){c=_D.domain[i];d=_D.domain[j];if(c.intersects(d)){c.unionSelf(d);d.a=null}}}).bind(this)
this.add=function(I){
	this.domain.push(I);this.optimize();this.order();
}
for(i=0,L=arguments.length;i<L;i++){
		if(arguments[i] instanceof Interval)this.domain.push(arguments[i])
	}
this.order();this.optimize()
this.intersectSelf=function(I){
	for(i=0,L=this.domain.length;i<L;i++)this.domain[i].intersectSelf(I)
	this.optimize();this.order();
}
}

function Selector()
		{
		this.position=function(x,y){this.d.style.top=y+'px';this.d.style.left=x+'px'}
		this.size=function(x,y){this.d.innerHTML=(this.ttd?'add':'remove')+(this.rtl?' Vertices':' Bodies');this.d.style.border='1.5px '+(this.rtl?'solid':'dashed')+' rgba(255,255,255,.5)';this.d.style.width=x+'px';this.d.style.height=y+'px'}
		this.corners=function(){
			var topleft=this.toScreenCoordinates(this.d.offsetLeft,this.d.offsetTop)
			var bottomright=this.toScreenCoordinates(this.d.offsetLeft+this.d.offsetWidth,this.d.offsetTop+this.d.offsetHeight)
			return {
				t:(-2*this.d.offsetTop / renderer.domElement.height+1),
				b:(-2*( this.d.offsetTop +this.d.offsetHeight)/renderer.domElement.height+1),
				l:((this.d.offsetLeft) / renderer.domElement.width ) * 2 - 1,
				r:((this.d.offsetLeft+this.d.offsetWidth) / renderer.domElement.width ) * 2 - 1
				}
			}
		this.toScreenCoordinates=function(x,y){
			return {
				x:(2* x / renderer.domElement.width-1),
				y:(-2*y/renderer.domElement.height+1)
				}
			}
		this.toCanvasCoordinates=function(x,y){
			return {
				x:(x+1)*renderer.domElement.width/2,
				y:(1-y)*renderer.domElement.height/2
				}
			}
			this.rtl=false
			this.ttb=false
		this.get0=function(){return projector.unprojectVector(new THREE.Vector3( ( this.d.offsetLeft / renderer.domElement.width ) * 2 - 1, - ( this.d.offsetTop / renderer.domElement.height ) * 2 + 1, 0.5 ), camera );}
		this.get1=function(){return projector.unprojectVector(new THREE.Vector3( ( (this.d.offsetLeft+this.d.offsetWidth) / renderer.domElement.width ) * 2 - 1, - ( (this.d.offsetTop+this.d.offsetHeight) / renderer.domElement.height ) * 2 + 1, 0.5 ), camera );}
		this.show=function(){this.d.style.display='';}
		this.hide=function(){this.d.style.display='none'}
		this.get=function(x,y){return projector.unprojectVector(new THREE.Vector3( ( (this.d.offsetLeft+this.d.offsetWidth*x) / renderer.domElement.width ) * 2 - 1, - ( (this.d.offsetTop+this.d.offsetHeight*y) / renderer.domElement.height ) * 2 + 1, 0.5 ), camera );}
		var inInterval=function(a,x,b){return (a<=x)&&(x<=b)}
		//var intersectIntervals=function(a,b,c,d){
		//	return (a<b)?((c<d)?((b<c)?false:true):((b<d)?false:true)):((c<d)?((a<c)?false:true):((a<d)?false:true))}
		var intersectIntervals=function(a,b,c,d){
			var ar=[{r:1,n:a},{r:1,n:b},{r:2,n:c},{r:2,n:d}];ar.sort(function(p,n){return p.n-n.n});
			return (ar[0].r!==ar[1].r)}
		this.d=h.cE('div');
		this.d.style.textAlign='center';
		this.d.style.fontSize='8px';
		this.d.style.color='#ddffdd';
		this.d.className='selector ';
		this.d.id='selWin';
		document.body.appendChild(this.d)
		this.hide()
		this.operation='addObject'
		this.getCrossing=function()
		{
			var c=this.corners()
			for(var k=scene.objects.length-1;k>=0;k--){
				var o=scene.objects[k],v=o.geometry.vertices,f=o.geometry.faces
				if((scene.objects[k]==plane) || (scene.objects[k]==brush) || scene.objects[k] instanceof THREE.Line || scene.objects[k].geometry instanceof Tick) {continue}
				for(var i in v){
					var ps=v[i].positionScreen
					if(inInterval(c.l,ps.x,c.r)&&inInterval(c.b,ps.y,c.t)){
						selection[this.operation](o);
						break;
					}
				}
				for(var i in f){
					var psa=v[f[i].a].positionScreen,psb=v[f[i].b].positionScreen,psc=v[f[i].c].positionScreen,psd=v[f[i].d].positionScreen,crossface=(intersectIntervals(psa.x,psc.x,c.l,c.r)&&intersectIntervals(psa.y,psc.y,c.b,c.t))||
					(intersectIntervals(psb.x,psd.x,c.l,c.r)&&intersectIntervals(psb.y,psd.y,c.b,c.t))
					if(crossface){
						selection[this.operation](o);
						break;
					}
				}
			}
			//con.out=this.operation+selection.objects.length
			return true;
		}
		this.getWindow=function()
		{	
			var c=this.corners()
			for(var k in scene.objects){
				var o=scene.objects[k],v=o.geometry.vertices,checkObject=true
				var vol=o.geometry instanceof Volume
				if((scene.objects[k]==plane) || (scene.objects[k]==brush) || scene.objects[k] instanceof THREE.Line|| scene.objects[k].geometry instanceof Tick) continue
				for(var i in v){
					var ps=v[i].positionScreen
					if(inInterval(c.l,ps.x,c.r)&&inInterval(c.b,ps.y,c.t)){selection[this.operation](showVertex(v[i]))}
					}
				}
				return true;
		}
		}
function Mask()
	{
		this.show=function(){this.d.style.display=''}
		this.hide=function(){this.d.style.display='none'}
		this.d=h.cE('div');
		//this.d.className='selector';
		this.d.id='mask';
		with(this.d.style){position='absolute';top='0%';left='0%';width='100%';height='100%'}
		document.body.appendChild(this.d)
		this.hide()
	}
	apptitle=0
		function title(text,className,width)
		{
		var asd=materials[8]()
		asd=asd.color
		asd.a=.3;asd.updateStyleString()
		//asd={r:64+parseInt(asd.color.r*128),g:64+parseInt(asd.color.g*182),b:64+parseInt(asd.color.b*128)};
		//apptitle++
		return "<div class='"+className+"' style='background-color:"+asd.__styleString+";width:"+width+"px'>"+text+"</div>"
		}
		function button(text,className)
		{
		return "<div class='"+className+" button'>"+text+"</div>"
		}
		function Button(text,className)
		{
		this.element=h.cE('div')
		this.element.className=className+" button"
		this.element.innerHTML=text
		var _click=function(){}
		this.setClick=function (f){h.eL(this.element,'click',f,false);_click=f}
		}
function toolbar(buttons,className,pos,name,code)
	{
		var d=h.cE('div');d.id=name;d.className='holder';
		d.style.width=(pos.w!==undefined)?(pos.w+'px'):'185px'
		//else d.style.width='185px'
		if(pos.x!==undefined){d.style.position='absolute';
		d.style.left=pos.x+'px';
		d.style.top=(pos.y!==undefined)?(pos.y+'px'):'15px';}
		d.innerHTML=title(name,'title',(pos.w==undefined)?165:(pos.w-10));
		d.innerHTML+='<div style="color:#FFFFFF"></div>'
		var e=d.children[1]
		if(!code){for(var i in buttons)e.innerHTML+=button(buttons[i],className)} else {code(e)}
		return d;
	}
THREE.Vector=
{
halfPlane:function(p1,p2,p){
	var f=line(p1,p2);
	var s=(f(p.x)<=p.y)?'>=':'<';
	var n=f(0);
	var m=f(1)-n;
	return new Function('p','return p.y'+s+'('+m+'*p.x+'+n+')')
	},
testPoly:function(p0,p1,p2,p3){
	var hPlane1=THREE.Vector.halfPlane(p0,p1,p2),hPlane2=THREE.Vector.halfPlane(p1,p2,p3),hPlane3=THREE.Vector.halfPlane(p2,p3,p0),hPlane4=THREE.Vector.halfPlane(p3,p0,p1);
	return hPlane1(p3)&&hPlane2(p0)&&hPlane3(p1)&&hPlane4(p2)
	},
sum:function(){var tot={x:0,z:0};for(var i in arguments){tot.x+=arguments[i].x;tot.z+=arguments[i].z;}return tot;},
dist:function(a,b){return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.z-b.z)*(a.z-b.z))},
dist3:function(a,b){return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z))},
polar2rec:function (point)
	{return {"x":point.R*Math.cos(point.a),"z":point.R*Math.sin(point.a)}},
rec2polar:function (point)
	{var dist,a;
	dist=Math.sqrt(point.x*point.x+point.z*point.z);
	if(point.z>0)
		{
		a=Math.atan(point.x/point.z);
		}
	else
		{
		if(point.z<0)
			{
			a=Math.PI+Math.atan(point.x/point.z);
			}
		else
			{
			if(point.x<0)
				{
				a=-Math.PI/2
				}
			else
				{
				a=Math.PI/2
				}
			}
		}
	return {"R":dist,"a":a-Math.PI/2}
	},
diff:function(point1,point2){return {"x":(point1.x-point2.x),"z":(point1.z-point2.z)}},
line:function(a,b)
{
	var m=(b.x==a.x)?((b.z-a.z)*1e5):((b.z-a.z)/(b.x-a.x));
	var n=(b.z-m*b.x);
	return new Function("x","return "+m+"*x"+((n>0)?"+":"-")+Math.abs(n));
},
middle3:function(a,b)
{
	return new THREE.Vector3((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2)
},
middle:function(a,b,n)
{
	return {x:(a.x+b.x)/2,z:(a.z+b.z)/2};
},
symmetric:function(a,b)
{
	return {x:(2*b.x-a.x),z:(2*b.z-a.z)};
},
multiplyRelative:function(b,a,n)
{
	return {x:(n*a.x-(n-1)*b.x),z:(n*a.z-(n-1)*b.z)};
},
intersect:function(e1,e2)
{
	if((e1(1)-e1(0))!=(e2(1)-e2(0))){var sx=((e2(0)-e1(0))/((e1(1)-e1(0))-(e2(1)-e2(0))));return {x:sx,z:e1(sx)}}else{return {x:Infinity,z:e1(Infinity)}}
},
perpendicular:function(eq,p)
{
	var m=-1/(eq(1)-eq(0));
	var n1=p.z-p.x*m;
	var functionBody="return ("+m+"*x"+((n1<0)?"-":"+")+Math.abs(n1)+');';
	return new Function("x",functionBody);
},
parallel:function(eq,d)
{
	var m=(eq(1)-eq(0));
	var n1=eq(0)-d/m
	var functionBody="return ("+m+"*x"+((n1<0)?"-":"+")+Math.abs(n1)+');';
	return new Function("x",functionBody);
},
deltaVector:function(p1,p2,d)
{
	v1=vector.rec2polar(vector.diff(p2,p1));
	vr={x:d*Math.cos(v1.a+Math.PI/2),z:d*Math.sin(v1.a+Math.PI/2)}
	return vr;
},
bisectorPerpendicular:function(f1,f2,p)
{
function k(a,b)
{return a/Math.sqrt(b*b+1)}
		var n1=f1(0);
		var n2=f2(0);
		var m1=f1(1)-n1;
		var m2=f2(1)-n2;
		//a1*a2+b1*b2 < 0;
		s=((m1*m2+1)<0)?(-1):(1);
		m=k(m1,m1)-k(s*m2,m2);
		n=k(n1,m1)-k(s*n2,m2);
		fy=k(1,m1)-k(s,m2);
		m=m/fy;n=n/fy;
	var functionBody="return "+m+"*x"+((n<0)?"-":"+")+Math.abs(n);
	return new Function("x",functionBody);
},
bisector:function(f1,f2,p)
{
function k(a,b)
{return a/Math.sqrt(b*b+1)}
		var n1=f1(0);
		var n2=f2(0);
		var m1=f1(1)-n1;
		var m2=f2(1)-n2;
		//a1*a2+b1*b2 < 0;
		s=((m1*m2+1)<0)?(1):(-1);
		m=k(m1,m1)-k(s*m2,m2);
		n=k(n1,m1)-k(s*n2,m2);
		fy=k(1,m1)-k(s,m2);
		m=m/fy;n=n/fy;
	var functionBody="return "+m+"*x"+((n<0)?"-":"+")+Math.abs(n);
	return new Function("x",functionBody);
},
pointsOn:function(eq,d,p)
{
	var m=(eq(1)-eq(0));
	var x1=d/Math.sqrt(m*m+1)*((m>0)?1:-1);
	return [{x:(p+x1),z:eq(p+x1)},{x:(p-x1),z:eq(p-x1)}];
}
}
		function deg2rad(deg)
		{
		return deg*Math.PI/180;
		}
		function rad2deg(rad)
		{
		return rad*180/Math.PI;
		}

function focus()
	{
		renderer.domElement.focus()
	}
function convertToEditableMesh(noalert)
	{
		if(selection.objects.length){
		for(var j in selection.objects)
	{
object=selection.objects[j]
if(object.geometry instanceof Volume)
{
var vx = new THREE.Mesh( new Mesh(object.position.x,object.position.y,object.position.z,definition*object.scale.x,definition*object.scale.y,definition*object.scale.z), materials[colors.indexOf(object.material[0].color.hex& 0xffffff)]() );
scene.removeObject(object);
scene.addObject(vx);
}
}
}else{if(!noalert)alert('you must select at least one object')}
}

function refineFace(object,face)
{
if(face.d){
var kp;var v=object.geometry.vertices;var fa=object.geometry.faces;var m3=THREE.Vector.middle3
var fi=fa.indexOf(face)
var a=v[face.a].position.clone()
var b=v[face.b].position.clone()
var c=v[face.c].position.clone()
var d=v[face.d].position.clone()
//return [a,b,c,d]
var mab=m3(a,b)
var mbc=m3(b,c)
var mcd=m3(c,d)
var mda=m3(d,a)
var c1=m3(a,face.centroid)
var c2=m3(b,face.centroid)
var c3=m3(c,face.centroid)
var c4=m3(d,face.centroid)
var n=face.normal.clone();
//return [mab,mbc,mcd,mda]
var m=face.centroid.clone()
var k=parseInt(object.geometry.vertices.length);
v.push(new THREE.Vertex(mab));//k
v.push(new THREE.Vertex(mbc));//k+1
v.push(new THREE.Vertex(mcd));//k+2
v.push(new THREE.Vertex(mda));//k+3
v.push(new THREE.Vertex(m));//k+4
function f(a,b,c,d,n,ct)
{var t=new THREE.Face4(a,b,c,d);t.centroid=ct;t.normal=n
 return t}
if(kp=f(face.a,k,k+4,k+3,c1,n))fa.push(kp);
if(kp=f(k,face.b,k+1,k+4,c2,n))fa.push(kp);
if(kp=f(k+1,face.c,k+2,k+4,c3,n))fa.push(kp);
if(kp=f(k+2,face.d,k+3,k+4,c4,n))fa.push(kp);

fa.splice(fi,1);//a,mab,c,mda
//object.geometry.computeCentroids();object.geometry.computeCentroids()
return true
}
}

function refineMesh()
{
function onReady(s,g,i,l)
{
if(i<l){if(refineFace(s,g[i])){if(onReady(s,g,i+1,l)){g.splice(i,1)}}}
return true
}
var s=selection.objects[0],g=selection.objects[0].geometry.faces,l=g.length
onReady(s,s.geometry.faces,0,l)
}

function regen()
{
var o=scene.objects
for(var i in o){
	o[i].geometry.computeCentroids()
	o[i].geometry.computeNormals()
	}
}

function mergeMeshes()
{
var vertices=[],faces=[],Ki=0;
for(var j in selection.objects)
{
var object=selection.objects[j]
if(object.geometry instanceof Volume || object.geometry instanceof Mesh || object.geometry instanceof MultyMesh || object.geometry instanceof Arch )
{
var pos={x:object.position.x,y:object.position.y,z:object.position.z}
var sca={x:object.scale.x,y:object.scale.y,z:object.scale.z}
var vert=object.geometry.vertices;
var fac=object.geometry.faces
for( var k in vert){vertices.push({x:(pos.x+sca.x*vert[k].position.x),y:(pos.y+sca.y*vert[k].position.y),z:(pos.z+sca.z*vert[k].position.z)})}
for( var k in fac){faces.push({a:fac[k].a+Ki,b:fac[k].b+Ki,c:fac[k].c+Ki,d:fac[k].d+Ki});}
Ki+=vert.length;
}
}
var vx = new THREE.Mesh( new MultyMesh(vertices,faces), materials[colors.indexOf(selection.objects[0].material[0].color.hex& 0xffffff)]() );
vx.overdraw=true
if(confirm('Delete original objects ?')){for(var j in selection.objects){scene.removeObject(selection.objects[j]);}deselect();}
scene.addObject(vx);
}

function selectAll()
{
// to be merged into Selection Object
for(var i in scene.objects){selection.addObject(scene.objects[i]);}
selection.k+=1
}

function obj2Mesh(txt)
{
var stat={},statu=[]
var statements=txt.split('g');
statements.forEach(function(val,i,statement){statement[i]=val.split("usemtl");statement[i].forEach(function(va,j,geom){geom[j]=va.split('v');geom[j].forEach(function(v,k,vertex){vertex[k]=v.split('f')})})})
var isset=false;
for(var i=1;i<statements.length;i++) {
	stat['Mesh'+i]={
		'name':statements[i][0][0][0].split('\n')[0].split(' ')[1],
		'material':statements[i][1][0][0].split('\n')[0].split(' ')[1],
		'faces':(function(a) {
			var fac=[]
			for(var k=1;k<a.length;k++) {
			var t=a[k].split('\n')
				t=t[0].split(' ');
				fac.push({a:parseInt(t[1]),b:parseInt(t[2]),c:parseInt(t[3]),d:parseInt(t[4])})
				}
				return fac;
			})(statements[i][1][statements[i][1].length-1]),
		'vertices':(function(a) {
			var v=[];
			for(var k=1;k<a.length-1;k++) {
				v.push(a[k][0])
				}
			v.push(a[k][0]);
			v.forEach(function(val,i,nm){var vkt=val.split('\n')[0].split(' ');nm[i]={x:parseInt(vkt[1]),y:parseInt(vkt[2]),z:parseInt(vkt[3])}})
			return v
			})(statements[i][1])
		}
	}
	var vcnt=1;
	for(var i in stat) {
		obj=stat[i];
		for(var k in obj.faces) {
			mn=obj.faces[k];
			mn.a-=vcnt;mn.b-=vcnt;mn.c-=vcnt;mn.d-=vcnt;
			}
		vcnt+=obj.vertices.length;
		statu.push(new MultyMesh(obj.vertices,obj.faces))
		var msh=new THREE.Mesh(new MultyMesh(obj.vertices,obj.faces),materials[stat[i].material.split('color')[1]]())
		msh.overdraw=true
	scene.addObject(msh)
	}
	return statu;
}
function selectAllVertices()
{
// to be merged into Selection Object
//deselect()
for(var i in scene.objects){
	if(scene.objects[i].geometry instanceof Tick ) {
		//scene.objects[i].material.push(new THREE.MeshColorFillMaterial( 0xFF0000, 1 ))
		//scene.objects[i].geometry.vertices[0].__selected=true
		selection.objects.push(scene.objects[i])
		}
	}
}
function selectByCurrentColor()
{
deselect()
for(var i in scene.objects){
	if(colors.indexOf(scene.objects[i].material[0].color.hex&0xFFFFFF)==color && !(scene.objects[i].geometry instanceof Tick) && scene.objects[i]!==brush) {
		//scene.objects[i].material.push(new THREE.MeshColorStrokeMaterial( 0x0000FF, 1 ))
		selection.objects.push(scene.objects[i])
		}
	}
}
function convertWavefrontOBJ(name,toLib,flipAxes)
{
var floorValue=function(val){
return parseFloat(parseInt(val*100)/100)
}
//selectAll()
convertToEditableMesh(true)
var sc=scene.objects,code='# Alias OBJ Model File\n# Exported from THREE.Builder, (c) 2011 \n# File units ->> centimeters\n';
for(var i in colors){
var mat=new materials[i]();

code+='newmtl color'+i+'\n';
code+='Kd '+mat.color.r+' '+mat.color.g+' '+mat.color.b+' '+mat.color.a+'\n';
code+='Ka 1.000 1.000 1.000\n';
code+='Ks 1.000 1.000 1.000\n';
code+='Ns 10.000&u0x0d;';
code+='d '+mat.color.a+'\n';
}
//code=''
var vi=1;var index=false;var ty=(flipAxes!==undefined)?'z':'y';var tz=(flipAxes!==undefined)?'y':'z';
if(!name){var cname='Mesh'}else{var cname=name;code='';var index=1}
for(var i in sc){
if(sc[i].geometry instanceof Mesh || sc[i].geometry instanceof MultyMesh)
{
var mat=colors.indexOf(sc[i].material[0].color.hex&0xFFFFFF)
mat=mat>-1?mat:8
code+='\ng\n'
var ver=sc[i].geometry.vertices
var fac=sc[i].geometry.faces
for(var j in ver){code+='\nv '+floorValue(ver[j].position.x)+' '+floorValue(ver[j].position[ty])+' '+floorValue(ver[j].position[tz])}
code+='\r\ng '+cname+(index?';color:#'+(sc[i].material[0].color.hex.toString(16)):i)+'\nusemtl color'+mat+'\n';
for(var j in fac){code+='\nf '+(fac[j].a+vi)+' '+(fac[j].b+vi)+' '+(fac[j].c+vi)+' '+(function(a){return a?a:''})(fac[j].d+vi)}
if(!toLib)vi+=ver.length;
code+='';
}
}
return escape(code);
}
function convertKerkytheeaXML()
{
var floorValue=function(val){
return parseFloat(parseInt(val*100)/100)
}
kt_camera=function(camera){
camera.up.y=0;camera.up.z=1;camera.updateMatrix();
var tm=camera.matrix,tr=tm.n13+' '+tm.n11+' '+tm.n12+' '+tm.n14+' '+tm.n23+' '+tm.n21+' '+tm.n22+' '+tm.n24+' '+tm.n33+' '+tm.n31+' '+tm.n32+' '+tm.n34;
camera.up.y=1;camera.up.z=0;camera.updateMatrix();
return '<Object Identifier="./Cameras/Camera_SPC" Label="Pinhole Camera" Name="Camera_SPC" Type="Camera">\n<Parameter Name="Focal Length (mm)" Type="Real" Value="45"/>\n<Parameter Name="Film Height (mm)" Type="Real" Value="25"/>\n<Parameter Name="Resolution" Type="String" Value="'+renderer.domElement.width+'x'+renderer.domElement.height+'"/>\n<Parameter Name="Frame" Type="Transform" Value="'+tr+'"/>\n<Parameter Name="Focus Distance" Type="Real" Value="1"/>\n<Parameter Name="f-number" Type="String" Value="Pinhole"/>\n<Parameter Name="Lens Samples" Type="Integer" Value="3"/>\n<Parameter Name="Blades" Type="Integer" Value="6"/>\n<Parameter Name="Diaphragm" Type="String" Value="Circular"/>\n<Parameter Name="Projection" Type="String" Value="Planar"/>\n</Object>\n'
}
var solidMaterialDefinition=function(color){
return '<Object Identifier="Whitted Material" Label="Whitted Material" Name="" Type="Material">\n<Object Identifier="./Diffuse/Constant Texture" Label="Constant Texture" Name="" Type="Texture">\n<Parameter Name="Color" Type="RGB" Value="'+color.r+' '+color.g+' '+color.b+'"/>\n</Object>\n<Parameter Name="Shininess" Type="Real" Value="128"/>\n<Parameter Name="Transmitted Shininess" Type="Real" Value="128"/>\n<Parameter Name="Index of Refraction" Type="Real" Value="1"/>\n<Parameter Name="Specular Sampling" Type="Boolean" Value="0"/>\n<Parameter Name="Transmitted Sampling" Type="Boolean" Value="0"/>\n<Parameter Name="Specular Attenuation" Type="String" Value="Cosine"/>\n<Parameter Name="Transmitted Attenuation" Type="String" Value="Cosine"/>\n</Object>\n<Parameter Name="Map Channel" Type="Point2D List" Value="0">\n</Parameter>\n<Parameter Name="Frame" Type="Transform" Value="1 0 0 0 0 1 0 0 0 0 1 0 "/>\n<Parameter Name="Enabled" Type="Boolean" Value="1"/>\n<Parameter Name="Visible" Type="Boolean" Value="1"/>\n<Parameter Name="Shadow Caster" Type="Boolean" Value="1"/>\n<Parameter Name="Shadow Receiver" Type="Boolean" Value="1"/>\n<Parameter Name="Caustics Transmitter" Type="Boolean" Value="1"/>\n<Parameter Name="Caustics Receiver" Type="Boolean" Value="1"/>\n<Parameter Name="Exit Blocker" Type="Boolean" Value="0"/>\n'
}
var thinMaterialDefinition=function(color){
return '<Object Identifier="Thin Glass Material" Label="Thin Glass Material" Name="" Type="Material">\n<Object Identifier="./Reflectance/Constant Texture" Label="Constant Texture" Name="" Type="Texture">\n<Parameter Name="Color" Type="RGB" Value="'+color.r+' '+color.g+' '+color.b+'"/>\n</Object>\n<Parameter Name="Index of Refraction" Type="Real" Value="1.52"/>\n<Parameter Name="Shininess" Type="Real" Value="128"/>\n<Parameter Name="Transmitted Shininess" Type="Real" Value="128"/>\n<Parameter Name="Index of Refraction" Type="Real" Value="1"/>\n<Parameter Name="Specular Sampling" Type="Boolean" Value="0"/>\n<Parameter Name="Transmitted Sampling" Type="Boolean" Value="0"/>\n<Parameter Name="Specular Attenuation" Type="String" Value="Cosine"/>\n<Parameter Name="Transmitted Attenuation" Type="String" Value="Cosine"/>\n</Object>\n<Parameter Name="Map Channel" Type="Point2D List" Value="0">\n</Parameter>\n<Parameter Name="Frame" Type="Transform" Value="1 0 0 0 0 1 0 0 0 0 1 0 "/>\n<Parameter Name="Enabled" Type="Boolean" Value="1"/>\n<Parameter Name="Visible" Type="Boolean" Value="1"/>\n<Parameter Name="Shadow Caster" Type="Boolean" Value="1"/>\n<Parameter Name="Shadow Receiver" Type="Boolean" Value="1"/>\n<Parameter Name="Caustics Transmitter" Type="Boolean" Value="1"/>\n<Parameter Name="Caustics Receiver" Type="Boolean" Value="1"/>\n<Parameter Name="Exit Blocker" Type="Boolean" Value="0"/>\n'
}
convertToEditableMesh(true)
var sc=scene.objects,code='',mat=0,ver=[],fac=[],color=new THREE.Color,il,cd,materialDef
for(var i in sc){
	if(sc[i].geometry instanceof Mesh || sc[i].geometry instanceof MultyMesh)
	{
		il=0;cd='';
		ver=sc[i].geometry.vertices
		fac=sc[i].geometry.faces
		mat=colors.indexOf(sc[i].material[0].color.hex&0xFFFFFF)
		mat=mat>-1?mat:8
		materialDef=((mat==4)||(mat==6)||(mat==7)||(mat==12))?thinMaterialDefinition(sc[i].material[0].color):solidMaterialDefinition(sc[i].material[0].color)
		code+='<Object Identifier="./Models/color'+mat+'" Label="Default Model" Name="color'+mat+'" Type="Model">\n<Object Identifier="Triangular Mesh" Label="Triangular Mesh" Name="" Type="Surface">\n'
		code+='<Parameter Name="Vertex List" Type="Point3D List" Value="'+ver.length+'">\n'
		for(var j in ver){
			code+='<P xyz="'+(floorValue(ver[j].position.z))+' '+(floorValue(ver[j].position.x))+' '+(floorValue(ver[j].position.y))+'"/>\n'
			}
		code+='</Parameter>\n'
		code+='<Parameter Name="Normal List" Type="Point3D List" Value="0">\n</Parameter>\n';
		for(var j in fac){
			cd+='<F ijk="'+(fac[j].a)+' '+(fac[j].b)+' '+(fac[j].c)+'"/>\n';il+=1
			if(fac[j].d!==undefined){
				cd+='<F ijk="'+(fac[j].a)+' '+(fac[j].d)+' '+(fac[j].c)+'"/>\n';
				il+=1
			}
		}
		code+='<Parameter Name="Index List" Type="Triangle Index List" Value="'+il+'">\n'
		code+=cd
		code+='</Parameter>\n'
		code+='<Parameter Name="Smooth" Type="Boolean" Value="0"/>\n<Parameter Name="AA Tolerance" Type="Real" Value="15"/>\n';
		code+='</Object>\n'
		code+=materialDef
		code+='</Object>\n'
	}
}
code+=kt_camera(camera)
return escape(code);
}
var str="toolbar=yes,location=yes ,directories=yes,menubar=yes,resizable=yes,width=350,height=250,location=yes,status=yes,scrollbars=yes"
function exportWavefrontOBJ()
{
var code=convertWavefrontOBJ(undefined,false,false)
window.open('data:application/plain;charset=utf-8,'+code,'exportWavefrontOBJ',str,'Obj Export')
//h.gt('Export').children[1].children[0].innerHTML=code;
//h.gt('Export').children[1].children[0].style.display='';
//con.clear;
//con.out=code;
//con.height=400;
}
function exportForKerkytheea()
{
var code=convertKerkytheeaXML()
window.open('data:application/plain;charset=utf-8,'+code,'convertKerkytheeaXML',str,'Kerkytheea Export')
//var ta=h.cE('textarea');
//ta.innerHTML=code;
//interface.element.appendChild(ta)
//h.gt('Export').children[1].children[0].innerHTML=code;
//h.gt('Export').children[1].children[0].style.display='';
//con.out=code;
//con.height=400;
}
function addToLibrary()
{
sendModel(localLibrary);
}
function addToMyModels()
{
sendModel(models);
}
function sendModel(lib)
{
try{
var name=prompt('Object Name','Mesh')
if(!lib)var lib=localLibrary
if(lib[name])name+='_01';
var code=convertWavefrontOBJ(name,true).replace(/<br>/gi,'\n');
var c=new Chunk(code,2048)
c.index=0;
function doa(ch)
{
if(ch.index==0){
ch.interface=h.gt('leftPane');
ch.tl=toolbar([],'dialog',{},'Export Dialog',function(c){c.innerHTML='<progress value=0 max=100></progress><span></span>'});
ch.interface.appendChild(ch.tl);
}
ch.tl.children[1].children[0].value=parseInt(100*ch.index/ch.pieces);
ch.tl.children[1].children[1].innerHTML=(parseInt(parseFloat(ch.index*2.048)*100)/100)+'Kb'
h.xG('./popup.php?fileName='+escape(lib.filename)+'&last='+(ch.index==c.pieces)+'&txt='+escape(ch.chunks[ch.index]),function(txt,obj){if(obj.index<obj.pieces){;obj.index+=1;doa(obj);}else{obj.interface.removeChild(obj.tl);lib.src='./objectLibrary/'+lib.filename;} },ch)
}
doa(c);}catch(e){con.out='library:'+Prototype(e)+ listobj(e)}
}
function sendModelToRenderer(lib)
{
try{
var name=prompt('Object Name','Mesh')
if(!lib)var lib=localLibrary
if(lib[name])name+='_01';
var code=convertWavefrontOBJ(name,true).replace(/<br>/gi,'\n');
var c=new Chunk(code,2048)
c.index=0;
function doa(ch)
{
if(ch.index==0){
ch.interface=h.gt('leftPane');
ch.tl=toolbar([],'dialog',{},'Export Dialog',function(c){c.innerHTML='<progress value=0 max=100></progress><span></span>'});
ch.interface.appendChild(ch.tl);
}
ch.tl.children[1].children[0].value=parseInt(100*ch.index/ch.pieces);
ch.tl.children[1].children[1].innerHTML=(parseInt(parseFloat(ch.index*2.048)*100)/100)+'Kb'
h.xG('./usr/'+app.session.loggedIn+'/render.php?cmd=upload&SSID='+app.session.SSID+'&fileName='+escape(lib.filename)+'&last='+(ch.index==c.pieces)+'&txt='+escape(ch.chunks[ch.index]),function(txt,obj){if(obj.index<obj.pieces){;obj.index+=1;doa(obj);}else{obj.interface.removeChild(obj.tl);lib.src='./objectLibrary/'+lib.filename;} },ch)
}
doa(c);}catch(e){con.out='library:'+Prototype(e)+ listobj(e)}
}
function Prototype(o){
var registeredPrototypes=[Number,Function,Array,String,HTMLElement,Mesh,MultyMesh,Tick,Volume]
for(var i in registeredPrototypes)if(o instanceof registeredPrototypes[i]) return registeredPrototypes[i].toString().split('function ')[1].split('(')[0]
}
function Chunk(string,pieceLength)
{
var k=0;
var L=string.length;
this.chunks=[];
this.index=0;
this.pieces=parseInt(L/pieceLength)
for(var i=0;i<=L;i+=pieceLength){this.chunks[k]=string.substr(i,pieceLength);k++}
}
function showVertex(v){
var mat=new THREE.MeshColorFillMaterial(0x0000FF,1)
var vx = new THREE.Mesh( new Tick(new THREE.Vector3()), mat );
				vx.position=v.position;
				scene.addObject(vx);
				return vx;
}
function showVertices(object)
{
	var vert= object.geometry.vertices
	for(var j in vert){showVertex(vert[j])}

}
function deselect()
	{
		var frm=document.forms[1];
		for(var i=9;i>-1;i--){frm[i].value=''}
		h.gt('cmd').parentNode.parentNode.children[0].innerHTML='Properties';
		if(selection.deselect())return true
	}
			Math.sgn=function(n){return n>0?1:n<0?-1:0}
		function floor(t)
		{
		return snap?Math.floor( t / definition) * definition:t;
		}
		function setTool(t){
var ct1=h.gt('Tools').children[1].children;
var ct2=h.gt('Primitives').children[1].children;
for(var k in ct1){ct1[k].className=ct1[k].className!=='title'?'settool button':'title';}
for(var k in ct2){ct2[k].className=ct2[k].className!=='title'?'settool button':'title';}
currentTool=t.innerHTML;
t.className+=' selected';
}
function setColor(t){
var ct=t.parentNode.children;
//alert()
for(var k in ct){ct[k].className=ct[k].className!=='title'?'setcolor':'title';}
t.className+=' selectedColor';
}
function setOption(o,o1,o2){
	if(window[o]==o1)
		{window[o]=o2}
		else{window[o]=o1}
		var sc=scene.objects
	for(var i in sc)
	{
		var object=sc[i];
		if( (object instanceof THREE.Mesh) &&!(object.geometry instanceof Tick) && object !== plane && object !== brush )
			{
			var indexof=colors.indexOf(object.material[0].color.hex& 0xffffff);
			//alert(indexof)
			object.material[0]=materials[indexof]()
			}
	}
}

transform=function(){
				var form=document.forms[1];
				var transform={
					p:{
						x:parseFloat(form[0].value),
						y:parseFloat(form[1].value),
						z:parseFloat(form[2].value)
					},
					r:{
						x:deg2rad(parseFloat(form[4].value)),
						y:deg2rad(parseFloat(form[5].value)),
						z:deg2rad(parseFloat(form[6].value))
					},
					s:{
						x:parseFloat(form[8].value),
						y:parseFloat(form[9].value),
						z:parseFloat(form[10].value)
						},
					color:form[12].value
				}
				 matrix=	mark[0]=='1'?THREE.Matrix4.translationMatrix(transform.p.x,0,0):
							mark[1]=='1'?THREE.Matrix4.translationMatrix(0,transform.p.y,0):
							mark[2]=='1'?THREE.Matrix4.translationMatrix(0,0,transform.p.z):
							mark[4]=='1'?THREE.Matrix4.rotationXMatrix(transform.r.x):
							mark[5]=='1'?THREE.Matrix4.rotationYMatrix(transform.r.y):
							mark[6]=='1'?THREE.Matrix4.rotationZMatrix(transform.r.z):
							mark[8]=='1'?THREE.Matrix4.scaleMatrix(transform.s.x,1,1):
							mark[9]=='1'?THREE.Matrix4.scaleMatrix(1,transform.s.y,1):
							mark[10]=='1'?THREE.Matrix4.scaleMatrix(1,1,transform.s.z):
				lock={p:form[3].checked==true,r:form[7].checked==true,s:form[11].checked==true}
				lock=form[3].checked==true
				var o=selection.objects
				var mov=mark[0]=='1'?'x':mark[1]=='1'?'y':mark[2]=='1'?'z':false
				var rot=mark[4]=='1'?'x':mark[5]=='1'?'y':mark[6]=='1'?'z':false
				var scale=mark[8]=='1'?'x':mark[9]=='1'?'y':mark[10]=='1'?'z':false
				for(var j in o){
					referencePoint=lock?
							new THREE.Vector3(0,0,0):
							new THREE.Vector3(
								o[j].geometry.bbox.x[1]-o[j].geometry.bbox.x[0],
								o[j].geometry.bbox.y[0],
								o[j].geometry.bbox.z[1]-o[j].geometry.bbox.z[0]
							)
				
					var tm=THREE.Matrix4.translationMatrix(-referencePoint.x,-referencePoint.y,-referencePoint.z)
					var rtm=THREE.Matrix4.translationMatrix(referencePoint.x,referencePoint.y,referencePoint.z)
					if(o[j].geometry instanceof Volume || o[j].geometry instanceof Tick){
						if(mov)o[j].position.addSelf(o[j]._tP.clone().negate().addSelf(matrix.transform(o[j]._tP.clone())))
						if(rot){
								o[j].rotation[rot]=transform.r[rot]
								var newPosition=rtm.transform(matrix.transform(tm.transform(o[j]._tP.clone())))
								o[j].position.x=newPosition.x
								o[j].position.y=newPosition.y
								o[j].position.z=newPosition.z
						}
						if(scale)o[j].scale[scale]=transform.s[scale]
					}
					if(o[j].geometry instanceof Mesh || o[j].geometry instanceof MultyMesh){
						var v=o[j].geometry.vertices
						referencePoint=lock?
							new THREE.Vector3(0,0,0):
							new THREE.Vector3(
								o[j].geometry.bbox.x[1]-o[j].geometry.bbox.x[0],
								o[j].geometry.bbox.y[0],
								o[j].geometry.bbox.z[1]-o[j].geometry.bbox.z[0]
							)
						tmx=THREE.Matrix4.translationMatrix(-referencePoint.x,-referencePoint.y,-referencePoint.z),
						rtmx=THREE.Matrix4.translationMatrix(referencePoint.x,referencePoint.y,referencePoint.z);
						for(var k in v){
						v[k].position=rtmx.transform(matrix.transform(tmx.transform(v[k]._tP.clone())))
						v[k]._tP=v[k].position.clone()
						}
					}
				}
				//mark=[]
				;updateHash();render();//onDocumentMouseMove(event);
				return transform;
				}
				
function setBrushColor( value ) {

				color = value;
				//var alpha=(value!=5)?1:.5;
				brush.material[ 0 ]=new THREE.MeshColorStrokeMaterial(colors[value],1);

				render();

			}

			function buildFromHash() {

				hash = window.location.hash.substr( 1 ),
				version = hash.substr( 0, 2 );

				if ( version == "A/" ) {

					var current = { rx: 0, ry: 0, rz: 0, x: 0, y: 0, z: 0, w: 0, h: 0, d: 0, c: 0 }
					datam = decode( hash.substr( 2 ) );
					dataprel=datam;
					var i = 0, l = datam.length;

					while ( i < l ) {

						var code = datam[ i ].toString();
						current.rx = ((datam[ i + 7 ] - 46) *d2r*5);
						current.ry = ((datam[ i + 8 ] - 46) *d2r*5);
						current.rz = ((datam[ i + 9 ] - 46) *d2r*5);
						current.w = datam[ i + 1 ] ;
						current.h = datam[ i + 2 ] ;
						current.d = datam[ i + 3 ] ;
						current.x = datam[ i + 4 ] - 46;
						current.y = datam[ i + 5 ] - 46;
						current.z = datam[ i + 6 ] - 46;
						current.c = datam[ i + 10 ] - 46;
						i+=11;
							var cube2= new Volume(1,1,1,definition)
							var voxel = new THREE.Mesh( cube2, materials[current.c]() );
							voxel.position.x = current.x * definition ;
							voxel.position.y = current.y * definition ;
							voxel.position.z = current.z * definition ;
							voxel.rotation.x = current.rx;
							voxel.rotation.y = current.ry;
							voxel.rotation.z = current.rz;
							voxel.scale.x=current.w
							voxel.scale.y=current.h
							voxel.scale.z=current.d
							voxel.overdraw = true;
							scene.addObject( voxel );
					}

				} else {

					 dataz = decode( hash );
					

					for ( var i = 0; i < dataz.length; i += 11 ) {
						var cube2= new Volume(1,1,1,definition)
						var voxel = new THREE.Mesh( cube2, materials[ dataz[ i + 10 ] -46]() );
						voxel.rotation.x = ( dataz[ i + 7 ] - 46 )*d2r*5;
						voxel.rotation.y = ( dataz[ i + 8 ] - 46 )*d2r*5;
						voxel.rotation.z = ( dataz[ i + 9 ] - 46 )*d2r*5;
						voxel.position.x = ( dataz[ i + 4 ] - 46 ) * definition;
						voxel.position.y = ( dataz[ i + 5 ] - 46 ) * definition;
						voxel.position.z = ( dataz[ i + 6 ] - 46 ) * definition;
							voxel.scale.x=dataz[ i + 1 ]
							voxel.scale.y=dataz[ i + 2 ]
							voxel.scale.z=dataz[ i + 3 ]
						voxel.overdraw = true;
						scene.addObject( voxel );

					}

				}

				updateHash();

			}
			function updateHash() {
				
				data = [];
				var current = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, w: 0, h: 0, d: 0, c: 0 };
				if((!error1) && scene.objects.length>400){//con.out='there is a 400 objects limit, \nyou\'re over it'; 
error1=true
				}
				for ( var i in scene.objects ) {

					object = scene.objects[ i ];

					if ( (object instanceof THREE.Mesh) && !(object.geometry instanceof Tick) && object !== plane && object !== brush ) {

						current.rx = parseInt(object.rotation.x*r2d/5);
						current.ry = parseInt( object.rotation.y*r2d/5);
						current.rz = parseInt( object.rotation.z*r2d/5);
						current.w = parseInt(object.scale.x);
						current.h = parseInt( object.scale.y);
						current.d = parseInt( object.scale.z);
						current.x = parseInt(( object.position.x) / definition);
						current.y = parseInt(( object.position.y) / definition);
						current.z = parseInt(( object.position.z) / definition);
						var cn=colors.indexOf( object.material[ 0 ].color.hex & 0xffffff )
						current.c = cn>-1?cn:8;

						if(object instanceof Volume)data.push(0)
							else data.push(1)
							data.push( current.w );
							data.push( current.h );
							data.push( current.d );
							data.push( current.x +46);
							data.push( current.y +46);
							data.push( current.z +46);
							data.push( current.rx+46);
							data.push( current.ry+46);
							data.push( current.rz+46);
							data.push( current.c +46);

					}

				}

				dat = encode( data );
				window.location.hash = "A/" + dat;
				//document.getElementById( 'link' ).href = "http://mrdoob.com/projects/voxels/#A/" + dat;
				//if(0==1) con.out("http://mrdoob.com/projects/voxels/#A/" +dat)
			}

	IFCtype2Str=function(ob){for(var i in ob){if(ob[i]){return i;break;}}}
	function exportCurrentView(noRegen) {
				/*if(!noRegen){
				linesMaterial5.color.setRGBA( 0, 0, 0, 0 )
				linesMaterial10.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialRed.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialGreen.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialBlue.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialRed1.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialGreen1.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialBlue1.color.setRGBA( 0, 0, 0, 0 )
				brush.position.y = 2000;
				render();
				regen();}
				*/
				window.open( renderer.domElement.toDataURL('image/png'), 'mywindow' );
				/*
				if(!noRegen){
				linesMaterial5.color.setRGBA( 0, 0, 0, .2 )
				linesMaterial10.color.setRGBA( 0, 0, 0, .5 )
				linesMaterialRed.color.setRGBA( 255, 0, 0, 0.5 )
				linesMaterialGreen.color.setRGBA( 0, 255, 0, 0.5 )
				linesMaterialBlue.color.setRGBA( 0, 0, 255, 0.5 )
				linesMaterialRed1.color.setRGBA( 255, 0, 0, 0.2 )
				linesMaterialGreen1.color.setRGBA( 0, 255, 0, 0.2 )
				linesMaterialBlue1.color.setRGBA( 0, 0, 255, 0.2 )
				render();}
				*/
			}
			
			function exportPreviewWindow() {
				/*if(!noRegen){
				linesMaterial5.color.setRGBA( 0, 0, 0, 0 )
				linesMaterial10.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialRed.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialGreen.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialBlue.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialRed1.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialGreen1.color.setRGBA( 0, 0, 0, 0 )
				linesMaterialBlue1.color.setRGBA( 0, 0, 0, 0 )
				brush.position.y = 2000;
				render();
				regen();}
				*/
				window.open( renderer2.domElement.toDataURL('image/png'), 'mywindow' );
				/*
				if(!noRegen){
				linesMaterial5.color.setRGBA( 0, 0, 0, .2 )
				linesMaterial10.color.setRGBA( 0, 0, 0, .5 )
				linesMaterialRed.color.setRGBA( 255, 0, 0, 0.5 )
				linesMaterialGreen.color.setRGBA( 0, 255, 0, 0.5 )
				linesMaterialBlue.color.setRGBA( 0, 0, 255, 0.5 )
				linesMaterialRed1.color.setRGBA( 255, 0, 0, 0.2 )
				linesMaterialGreen1.color.setRGBA( 0, 255, 0, 0.2 )
				linesMaterialBlue1.color.setRGBA( 0, 0, 255, 0.2 )
				render();}
				*/
			}
			function updateHash() {}
			function buildFromHash() {}
			function clear() {

				if ( !confirm( 'Are you sure?' ) ) {

					return

				}

				window.location.hash = "";

				var i = 0;

				while ( i < scene.objects.length ) {

					object = scene.objects[ i ];

					if ( object instanceof THREE.Mesh && object !== plane && object !== brush ) {

						scene.removeObject( object );
						continue;
					}

					i ++;
				}

				updateHash();
				render();

			}

			// https://gist.github.com/665235

			function decode( string ) {

				var output = [];
				string.split('').forEach( function ( v ) { output.push( "~!@#$%^&*()_{}:|<>?`-=[];'\,.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf( v ) ); } );
				return output;

			}

			function encode( array ) {

				var output = "";
				array.forEach( function ( v ) { output += "~!@#$%^&*()_{}:|<>?`-=[];'\,.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt( v ); } );
				return output;

			}