/**
 * @author mr.doob / http://mrdoob.com/
 */
 THREE.Scene.prototype.countVertices=function(){
 var _S=this
 var objects=_S.objects,counter=0
 for(var i in objects)counter+=objects[i].geometry.vertices.length
 return counter
 }
 THREE.Scene.prototype.countFaces=function(){
 var _S=this
 var objects=_S.objects,counter=0
 for(var i in objects)counter+=objects[i].geometry.faces.length
  return counter
 }
 var standardMapping=[new THREE.UV(0,.5),new THREE.UV(10,10),new THREE.UV(10,0),new THREE.UV(0,0)]
 var pixelMapping=function(a,b,c){
	function distab(v1,v2){return Math.sqrt(Math.pow(v1.position.x-v2.position.x,2)+Math.pow(v1.position.y-v2.position.y,2)+Math.pow(v1.position.z-v2.position.z,2))}
	var ab=distab(a,b)/256,bc=distab(b,c)/256;
 //if(window.con!==undefined){con.out=['L: '+ab+' ',' H: '+bc]}
	return [new THREE.UV(0,bc),new THREE.UV(ab,bc),new THREE.UV(ab,0),new THREE.UV(0,0)]
	}
function Selection() {
this.k=0
this.objects=new Array()
var S=this.objects
this.is=function(o) {
return o.geometry!==undefined
}
this.exists=function(o) {
try { o } catch(err){result=window[err.toString().split(' ')[1]]!==undefined}
if(result){}
}
this.inS=function(o) {
	return this.objects.indexOf(o)>-1
	}
this.isCube=function(o) {
	return o.geometry instanceof Volume
	}
this.isMesh=function(o) {
	return o.geometry instanceof MultyMesh || o.geometry instanceof Mesh
	}
this.isVertex=function(o) {
	return o.geometry instanceof Tick
	}
this.removeObject=function(o) {
	if(this.inS(o)){
	//var istick=o.geometry instanceof Tick
	//if(istick){vrtx=o.geometry.vertices[0].__selected=false;}
		delete(o._tR);
		delete(o._tP); 
		if(o.material[o.material.length-1] instanceof THREE.MeshColorStrokeMaterial)o.material.pop()
		S.splice(S.indexOf(o),1)
		this.k--
		if(S.length==0){var cmd=h.gt('cmd').children;for(var i in cmd){if(cmd[1].value)cmd[i].value=''}}
		}
	return true
	}
this.addObject=function(io) {
	var istick=io.geometry instanceof Tick
	var ismesh=io.geometry instanceof Mesh || io.geometry instanceof MultyMesh
	if(!this.inS(io) && (this.isMesh(io) || this.isCube(io) || this.isVertex(io) ) && io !== plane && io !== brush) {
	if(istick){var vrtx=io.geometry.vertices[0];/*;vrtx.__selected=true;*/vrtx._tP=vrtx.position.clone()}//io.material.push(new THREE.MeshColorFillMaterial( 0xFF0000, .7 ))
	if(!ismesh) {
		io._tP=io.position.clone()
		io._tR=io.rotation.clone()
	}
	else {
	for(var k in io.geometry.vertices){io.geometry.vertices[k]._tP=io.geometry.vertices[k].position.clone()}
	}
	this.objects.push(io)
	this.k++
	}
	return true
}
this.apply=function(f) {
for(var i in S){f(S[i])}
}
this.addCube=function(o)
{
if(this.isCube(o))this.addObject(o)
}
this.addMesh=function(o)
{
if(this.isMesh(o))this.addObject(o)
}
this.addVertex=function(o)
{
if(this.isVertex(o))this.addObject(o)
}
this.clone=function()
{
var clone=new Selection()
for(var i in this.objects)clone.objects.push(this.objects[i])
return clone;
}
this.deselect=function()
{
var clone=this.clone()
for(var i in clone.objects){
	this.removeObject(clone.objects[i])
	if(clone.objects[i].geometry instanceof Tick)scene.removeObject(clone.objects[i])
	}
return true;
}
}

function Cube (width, height, depth) {

	THREE.Geometry.call(this);

	var scope = this,
	width_half = width / 2,
	height_half = height / 2,
	depth_half = depth / 2;

	v(  width_half,  height_half, -depth_half );
	v(  width_half, -height_half, -depth_half );
	v( -width_half, -height_half, -depth_half );
	v( -width_half,  height_half, -depth_half );
	v(  width_half,  height_half,  depth_half );
	v(  width_half, -height_half,  depth_half );
	v( -width_half, -height_half,  depth_half );
	v( -width_half,  height_half,  depth_half );

	f4( 0, 1, 2, 3 );
	f4( 4, 7, 6, 5 );
	f4( 0, 4, 5, 1 );
	f4( 1, 5, 6, 2 );
	f4( 2, 6, 7, 3 );
	f4( 4, 0, 3, 7 );

	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(standardMapping)
	}
	this.computeCentroids();
	this.computeNormals();

}

Cube.prototype = new THREE.Geometry();
Cube.prototype.constructor = Cube;

function Tick2 (base) {

	THREE.Geometry.call(this);

	var scope = this,
	width_half = base / 2,
	height_half = base / 2,
	depth_half = base / 2;

	v(  width_half,  height_half, -depth_half );
	v(  width_half, -height_half, -depth_half );
	v( -width_half, -height_half, -depth_half );
	v( -width_half,  height_half, -depth_half );
	v(  width_half,  height_half,  depth_half );
	v(  width_half, -height_half,  depth_half );
	v( -width_half, -height_half,  depth_half );
	v( -width_half,  height_half,  depth_half );
	
	f4( 0, 1, 2, 3 );
	f4( 4, 7, 6, 5 );
	f4( 0, 4, 5, 1 );
	f4( 1, 5, 6, 2 );
	f4( 2, 6, 7, 3 );
	f4( 4, 0, 3, 7 );
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}

	this.computeCentroids();
	this.computeNormals();

}

Tick2.prototype = new THREE.Geometry();
Tick2.prototype.constructor = Tick2;
function Tick (base) {

	THREE.Geometry.call(this);

	var scope = this
	v(  base.x,base.y,base.z );
	//this.vertices[0]=base
	f4( 0, 0, 0, 0 );
	
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}
}

Tick.prototype = new THREE.Geometry();
Tick.prototype.constructor = Tick;

function Plate (size,n) {

	THREE.Geometry.call(this);
	var scope=this
	v(  p.x*n.x-size,  p.y*n.y, p.z*n.z-size );
	v(  p.x*n.x-size,  p.y*n.y, p.z*n.z+size );
	v(  p.x*n.x+size,  p.y*n.y, p.z*n.z+size );
	v(  p.x*n.x+size,  p.y*n.y, p.z*n.z-size );
	f4( 0, 1, 2, 3 );
	f4( 0, 3, 2, 1 );
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}

	this.computeCentroids();
	this.computeNormals();

}

Plate.prototype = new THREE.Geometry();
Plate.prototype.constructor = Plate;

function MultyMesh(vertices,faces,faces3,centroids,normals){

	THREE.Geometry.call(this);

	var _G = this;
	for(var vi in vertices)v(vertices[vi].x,vertices[vi].y,vertices[vi].z)
	for(var fi in faces){f4(faces[fi].a,faces[fi].b,faces[fi].c,faces[fi].d)}
	if(faces3){for(var fi in faces3){f3(faces3[fi].a,faces3[fi].b,faces3[fi].c)}}
	function v(x, y, z) {

		_G.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		_G.faces.push( new THREE.Face4( a, b, c, d ) );
		_G.uvs.push(pixelMapping(_G.vertices[a],_G.vertices[b],_G.vertices[c]))
	}
	
	function f3(a, b, c) {

		_G.faces.push( new THREE.Face3( a, b, c ) );
	}
	if(!centroids)this.computeCentroids()
	 else for(var j in centroids){_G.faces[j].centroid=new THREE.Vector3(centroids[j].x,centroids[j].y,centroids[j].z)}
	if(!normals)this.computeNormals()
	 else for(var j in normals){_G.faces[j].normal=new THREE.Vector3(normals[j].x,normals[j].y,normals[j].z)}
}

MultyMesh.prototype = new THREE.Geometry();
MultyMesh.prototype.constructor = MultyMesh;
Furniture=MultyMesh
function Volume (width, height, depth, base) {

	THREE.Geometry.call(this);

	var scope = this;
	width*=base;
	height*=base;
	depth*=base;
	var	w = width ,
	h = height ,
	d = depth ;
	//var wall=(d>w)*(h>w)&&(w>d)*(h>d);
	var beamFB=(d==h)*(1);
	var beamLR=(w==h)*(1);
	var column=(w==d)*(1);
	var slab=(h<w)*(h<d);
	var block=!beamFB&&!beamLR&&!column&&!slab;
	this.IFCtype={}//this.IFCtype=(beamFB||beamLR)?"beam":column?"column":slab?"slab":"wall";
	this.IFCtype.beamLR=beamLR
	this.IFCtype.beamFB=beamFB
	this.IFCtype.column=column
	this.IFCtype.slab=slab
	//this.IFCtype.wall=wall
	this.IFCtype.block=block
	this.dimension={w:width,h:height,d:depth}
	v( 0, 0, 0 );//0
	v( 0, 0,  depth );//2
	v(  width, 0,  depth );//2
	v(  width, 0, 0 );//3
	v( 0,  height, 0 );//4
	v( 0,  height,  depth );//5
	v(  width,  height,  depth );//6
	v(  width,  height, 0 );//7
	
	f4( 0, 3, 2, 1 );//down
	f4( 4, 5, 6, 7 );//up
	f4( 0, 1, 5, 4 );//front
	f4( 2, 3, 7, 6 );//back
	f4( 1, 2, 6, 5 );//right
	f4( 3, 0, 4, 7 );//left
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(pixelMapping(scope.vertices[a],scope.vertices[d],scope.vertices[c]))
	}

	this.computeCentroids();
	this.computeNormals();

}

Volume.prototype = new THREE.Geometry();
Volume.prototype.constructor = Volume;
function Arch(innerRadius, outerRadius, height, angle, pieces) {
	
	THREE.Geometry.call(this);
	
	var scope = this;

	var ma=angle/pieces;var ca=0;var ve=[],fa=[]
	for(var k=0;k<=pieces;k+=1){
	scope.vertices[4*k+0]=new THREE.Vertex(new THREE.Vector3( innerRadius*Math.cos(ca), innerRadius*Math.sin(ca), 0 ))
	scope.vertices[4*k+1]=new THREE.Vertex(new THREE.Vector3( outerRadius*Math.cos(ca), outerRadius*Math.sin(ca), 0 ))
	scope.vertices[4*k+3]=new THREE.Vertex(new THREE.Vector3( innerRadius*Math.cos(ca), innerRadius*Math.sin(ca), height ))
	scope.vertices[4*k+2]=new THREE.Vertex(new THREE.Vector3( outerRadius*Math.cos(ca), outerRadius*Math.sin(ca), height ))
	ca+=ma;
	}
	scope.faces.push(new THREE.Face4( 0, 1, 2, 3 ))
	for(var n=0;n<pieces;n+=1){
	var k=4*n
	scope.faces.push(new THREE.Face4( k+0, k+4, k+5, k+1 ))
	scope.faces.push(new THREE.Face4( k+3, k+2, k+6, k+7 ))
	scope.faces.push(new THREE.Face4( k+0, k+3, k+7, k+4 ))
	scope.faces.push(new THREE.Face4( k+1, k+5, k+6, k+2 ))
	}
	scope.faces.push(new THREE.Face4( 4*n+0, 4*n+3, 4*n+2, 4*n+1 ))
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(pixelMapping(scope.vertices[a],scope.vertices[b],scope.vertices[c]))
	}

	this.computeCentroids();
	this.computeNormals();

}

Arch.prototype = new THREE.Geometry();
Arch.prototype.constructor = Arch;
function Mesh(x,y,z, width, height, depth) {

	THREE.Geometry.call(this);
	base=1
	var scope = this;
	width*=base;
	height*=base;
	depth*=base;
	var	w = width ,
	h = height ,
	d = depth ;
	//var wall=(d>w)*(h>w)&&(w>d)*(h>d);
	var beamFB=(d==h)*(1);
	var beamLR=(w==h)*(1);
	var column=(w==d)*(1);
	var slab=(h<w)*(h<d);
	var block=!beamFB&&!beamLR&&!column&&!slab;
	this.IFCtype={}//this.IFCtype=(beamFB||beamLR)?"beam":column?"column":slab?"slab":"wall";
	this.IFCtype.beamLR=beamLR
	this.IFCtype.beamFB=beamFB
	this.IFCtype.column=column
	this.IFCtype.slab=slab
	//this.IFCtype.wall=wall
	this.IFCtype.block=block
	//this.dimension={w:width,h:height,d:depth}
	v(  x+width,  y+height, z+0 );
	v(  x+width, y+0, z+0 );
	v( x+0, y+0, z+0 );
	v( x+0, y+ height, z+0 );
	v(  x+width,  y+height,  z+depth );
	v(  x+width, y+0,  z+depth );
	v( x+0, y+0,  z+depth );
	v( x+0,  y+height,  z+depth );
	/*
	v(  width,  2*height, 0 );
	v(  width, height, 0 );
	v( 0, height, 0 );
	v( 0,  2*height, 0 );
	v(  width,  2*height,  depth );
	v(  width, height,  depth );
	v( 0, height,  depth );
	v( 0,  2*height,  depth );*/
	
		//if(this.__proto__.scale==undefined){alert('is')}
	//if(block+beamLR+beamFB+slab)
	f4( 0, 1, 2, 3 );//down
	//if(block+beamLR+beamFB+slab)
	f4( 4, 7, 6, 5 );//up
	//if(block||wall||beamFB||column)
	f4( 0, 4, 5, 1 );//front
	//if(block||wall||beamLR||column)
	f4( 1, 5, 6, 2 );//left
	//if(block||wall||beamFB||column)
	f4( 2, 6, 7, 3 );//back
	//if(block||wall||beamLR||column)
	f4( 4, 0, 3, 7 );//right
	/*	//if(this.__proto__.scale==undefined){alert('is')}
	//if(block+beamLR+beamFB+slab)
	f4( 8, 9, 10, 11 );//down
	//if(block+beamLR+beamFB+slab)
	f4( 12, 15, 14, 13 );//up
	//if(block||wall||beamFB||column)
	f4( 8, 12, 13, 9 );//front
	//if(block||wall||beamLR||column)
	f4( 9, 13, 14, 10 );//left
	//if(block||wall||beamFB||column)
	f4( 10, 12, 15, 11 );//back
	//if(block||wall||beamLR||column)
	f4( 12, 8, 11, 15 );//right*/
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(pixelMapping(scope.vertices[a],scope.vertices[b],scope.vertices[c]))
	}

	this.computeCentroids();
	this.computeNormals();

}

Mesh.prototype = new THREE.Geometry();
Mesh.prototype.constructor = Mesh;
function Walls (width, height, depth, base) {

	THREE.Geometry.call(this);
	var scope = this;
	var	w = width ,
	h = height ,
	d = depth ;
function p(p,d,scope)
{
	d.w+=p.x
	d.h+=p.y
	d.d+=p.z
	var i=scope.vertices.length;
	//var i=0
	//alert(scope.vertices.length)
	v(  d.w,  d.h, p.z );
	v(  d.w, p.y, p.z );
	v( p.x, p.y, p.z );
	v( p.x,  d.h, p.z );
	v(  d.w,  d.h,  d.d );
	v(  d.w, p.y,  d.d );
	v( p.x, p.y,  d.d );
	v( p.x,  d.h,  d.d );
	f4( i+0, i+1, i+2, i+3 );//down
	f4( i+4, i+7, i+6, i+5 );//up
	f4( i+0, i+4, i+5, i+1 );//front
	f4( i+1, i+5, i+6, i+2 );//left
	f4( i+2, i+6, i+7, i+3 );//back
	f4( i+4, i+0, i+3, i+7 );//right
	}
	//corners
	p({x:0,y:0,z:0},{w:base,h:2*base,d:base},scope)
	p({x:0,y:2*base,z:0},{w:base,h:2*base,d:base},scope)
	p({x:0,y:4*base,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:0},{w:base,h:2*base,d:base},scope)
	p({x:w,y:2*base,z:0},{w:base,h:2*base,d:base},scope)
	p({x:w,y:4*base,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:d},{w:base,h:2*base,d:base},scope)
	p({x:w,y:2*base,z:d},{w:base,h:2*base,d:base},scope)
	p({x:w,y:4*base,z:d},{w:base,h:base,d:base},scope)
	
	p({x:0,y:0,z:d},{w:base,h:2*base,d:base},scope)
	p({x:0,y:2*base,z:d},{w:base,h:2*base,d:base},scope)
	p({x:0,y:4*base,z:d},{w:base,h:base,d:base},scope)
	//faces
	p({x:base,y:0,z:0},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:2*base,z:0},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:4*base,z:0},{w:w-base,h:base,d:base},scope)
	
	p({x:0,y:0,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:0,y:2*base,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:0,y:4*base,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:w,y:0,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:w,y:2*base,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:w,y:4*base,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:base,y:0,z:d},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:2*base,z:d},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:4*base,z:d},{w:w-base,h:base,d:base},scope)
	
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(pixelMapping(scope.vertices[a],scope.vertices[b],scope.vertices[c]))
	}

	this.computeCentroids();
	this.computeNormals();

}

Walls.prototype = new THREE.Geometry();
Walls.prototype.constructor = Walls;
function Room (width, height, depth, base) {

	THREE.Geometry.call(this);
	var scope = this;
	var	w = width ,
	h = height ,
	d = depth ;
function p(p,d,scope)
{
	d.w+=p.x
	d.h+=p.y
	d.d+=p.z
	var i=scope.vertices.length;
	//var i=0
	//alert(scope.vertices.length)
	v(  d.w,  d.h, p.z );
	v(  d.w, p.y, p.z );
	v( p.x, p.y, p.z );
	v( p.x,  d.h, p.z );
	v(  d.w,  d.h,  d.d );
	v(  d.w, p.y,  d.d );
	v( p.x, p.y,  d.d );
	v( p.x,  d.h,  d.d );
	f4( i+0, i+1, i+2, i+3 );//down
	f4( i+4, i+7, i+6, i+5 );//up
	f4( i+0, i+4, i+5, i+1 );//front
	f4( i+1, i+5, i+6, i+2 );//left
	f4( i+2, i+6, i+7, i+3 );//back
	f4( i+4, i+0, i+3, i+7 );//right
	}
	//corners
	p({x:0,y:0,z:0},{w:base,h:2*base,d:base},scope)
	p({x:0,y:2*base,z:0},{w:base,h:2*base,d:base},scope)
	p({x:0,y:4*base,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:0},{w:base,h:2*base,d:base},scope)
	p({x:w,y:2*base,z:0},{w:base,h:2*base,d:base},scope)
	p({x:w,y:4*base,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:d},{w:base,h:2*base,d:base},scope)
	p({x:w,y:2*base,z:d},{w:base,h:2*base,d:base},scope)
	p({x:w,y:4*base,z:d},{w:base,h:base,d:base},scope)
	
	p({x:0,y:0,z:d},{w:base,h:2*base,d:base},scope)
	p({x:0,y:2*base,z:d},{w:base,h:2*base,d:base},scope)
	p({x:0,y:4*base,z:d},{w:base,h:base,d:base},scope)
	//faces
	p({x:base,y:0,z:0},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:2*base,z:0},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:4*base,z:0},{w:w-base,h:base,d:base},scope)
	
	p({x:0,y:0,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:0,y:2*base,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:0,y:4*base,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:w,y:0,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:w,y:2*base,z:base},{w:base,h:2*base,d:d-base},scope)
	p({x:w,y:4*base,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:base,y:0,z:d},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:2*base,z:d},{w:w-base,h:2*base,d:base},scope)
	p({x:base,y:4*base,z:d},{w:w-base,h:base,d:base},scope)
	
	//plate
	p({x:base,y:4*base,z:base},{w:w-base,h:base,d:w-base},scope)
	
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(pixelMapping(scope.vertices[a],scope.vertices[b],scope.vertices[c]))
	}

	this.computeCentroids();
	this.computeNormals();

}

Room.prototype = new THREE.Geometry();
Room.prototype.constructor = Room;
function Slab (width, height, depth, base) {

	THREE.Geometry.call(this);
	var scope = this;
	var	w = width ,
	h = height ,
	d = depth ;
function p(p,d,scope)
{
	d.w+=p.x
	d.h+=p.y
	d.d+=p.z
	var i=scope.vertices.length;
	//var i=0
	//alert(scope.vertices.length)
	v(  d.w,  d.h, p.z );
	v(  d.w, p.y, p.z );
	v( p.x, p.y, p.z );
	v( p.x,  d.h, p.z );
	v(  d.w,  d.h,  d.d );
	v(  d.w, p.y,  d.d );
	v( p.x, p.y,  d.d );
	v( p.x,  d.h,  d.d );
	f4( i+0, i+1, i+2, i+3 );//down
	f4( i+4, i+7, i+6, i+5 );//up
	f4( i+0, i+4, i+5, i+1 );//front
	f4( i+1, i+5, i+6, i+2 );//left
	f4( i+2, i+6, i+7, i+3 );//back
	f4( i+4, i+0, i+3, i+7 );//right
	}
	//corners
	p({x:0,y:0,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:0},{w:base,h:base,d:base},scope)
	
	p({x:w,y:0,z:d},{w:base,h:base,d:base},scope)
	
	p({x:0,y:0,z:d},{w:base,h:base,d:base},scope)
	//beams
	p({x:base,y:0,z:0},{w:w-base,h:base,d:base},scope)
	
	p({x:0,y:0,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:w,y:0,z:base},{w:base,h:base,d:d-base},scope)
	
	p({x:base,y:0,z:d},{w:w-base,h:base,d:base},scope)
	
	//plate
	p({x:base,y:base,z:base},{w:w-base,h:base,d:w-base},scope)
	
	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
		scope.uvs.push(standardMapping)
	}

	this.computeCentroids();
	this.computeNormals();

}

Slab.prototype = new THREE.Geometry();
Slab.prototype.constructor = Slab;

function Cube3(width, height, depth, base) {

	THREE.Geometry.call(this);

	var scope = this;
	width*=base;
	height*=base;
	depth*=base;
	
	this.IFCtype="cursor";
	v(  width,  height, 0 );
	v(  width, 0, 0 );
	v( 0, 0, 0 );
	v( 0,  height, 0 );
	v(  width,  height,  depth );
	v(  width, 0,  depth );
	v( 0, 0,  depth );
	v( 0,  height,  depth );

	f4( 0, 1, 2, 3 );//down
	f4( 4, 7, 6, 5 );//up
	f4( 0, 4, 5, 1 );//front
	f4( 1, 5, 6, 2 );//left
	f4( 2, 6, 7, 3 );//back
	f4( 4, 0, 3, 7 );//right

	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}

	this.computeCentroids();
	this.computeNormals();

}

Cube3.prototype = new THREE.Geometry();
Cube3.prototype.constructor = Cube3;
/*
var Cube3 = function (width, height, depth, base) {

	THREE.Geometry.call(this);

	var scope = this;
	width*=base;
	height*=base;
	depth*=base;
	
	this.IFCtype="cursor";
	v(  width, 0, depth );
	v(  width, 0, 0 );
	v( 0, 0, 0 );
	v( 0,  0, depth );

	f4( 0, 1, 2, 3 );//down
	f4( 0, 3, 2, 1 );//down

	function v(x, y, z) {

		scope.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
	}

	function f4(a, b, c, d) {

		scope.faces.push( new THREE.Face4( a, b, c, d ) );
	}

	this.computeCentroids();
	this.computeNormals();

}

Cube3.prototype = new THREE.Geometry();
Cube3.prototype.constructor = Cube3;
*/
