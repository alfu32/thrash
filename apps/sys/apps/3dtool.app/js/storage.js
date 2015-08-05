storeTexture=function(){}
storeColor=function(){}
storeMaterial=function(){}
storeObject=function(){}
storeArray=function(){}
toOBJ=function (geometry){
var vertices=geometry.vertices,faces=geometry.faces,uvs=geometry.uvs,code='g Mesh_'+name+' '
for(var v in vertices){code+='v '+vertices[v].position.x+' '+vertices[v].position.y+' '+vertices[v].position.z+' '}
for(var vt in uvs)code+='vt '+uvs[vt][0].u+','+uvs[vt][0].v+'vt '+uvs[vt][1].u+','+uvs[vt][1].v+'vt '+uvs[vt][2].u+','+uvs[vt][2].v+'vt '+uvs[vt][3].u+','+uvs[vt][3].v+' '
for(var f in faces){code+='f '+faces[f].a+'/'+(4*f)+' '+faces[f].b+'/'+(4*f+1)+' '+faces[f].c+'/'+(4*f+2)+faces[f].d+'/'+(4*f+3)+' '
	code+=faces[f].d?faces[f].d+'/4 ':''}
return code;
}
fromOBJ=function (geometry){
var vertices=geometry.vertices,faces=geometry.faces,uvs=geometry.uvs,code='g Mesh_'+name+' '
for(var v in vertices){code+='v '+vertices[v].position.x+' '+vertices[v].position.y+' '+vertices[v].position.z+' '}
for(var vt in uvs)code+='vt '+uvs[vt][0].u+','+uvs[vt][0].v+'vt '+uvs[vt][1].u+','+uvs[vt][1].v+'vt '+uvs[vt][2].u+','+uvs[vt][2].v+'vt '+uvs[vt][3].u+','+uvs[vt][3].v+' '
for(var f in faces){code+='f '+faces[f].a+'/'+(4*f)+' '+faces[f].b+'/'+(4*f+1)+' '+faces[f].c+'/'+(4*f+2)+faces[f].d+'/'+(4*f+3)+' '
	code+=faces[f].d?faces[f].d+'/4 ':''}
return code;
}
toJS=function (object){
var m=colors.indexOf(object.material[0].color.hex&0xFFFFFF),MatIndex=m<0?8:m
if(object.geometry instanceof MultyMesh || object.geometry instanceof Mesh){
var vertices=object.geometry.vertices,faces=object.geometry.faces
var vrt='[',fcs='['
for(var i in vertices){vrt+='{x:'+vertices[i].position.x+',y:'+vertices[i].position.y+',z:'+vertices[i].position.z+'},'}
vrt=vrt.substr(0,vrt.length-1);vrt+=']'
for(var i in faces){fcs+='{a:'+faces[i].a+',b:'+faces[i].b+',c:'+faces[i].c+',d:'+faces[i].d+'},'}
fcs=fcs.substr(0,fcs.length-1);fcs+=']'
return 'new Function("var tm=new MultyMesh('+vrt+','+fcs+');var tmo=new THREE.Mesh(tm,materials['+MatIndex+']());scene.addObject(tmo);tmo.updateMatrix();");'}
else
{
return 'new Function("var tm=new Volume('+object.scale.x+','+object.scale.y+','+object.scale.z+','+definition+');var tmo=new THREE.Mesh(tm,materials['+MatIndex+']());tmo.position=new THREE.Vector3('+object.position.x+','+object.position.y+','+object.position.z+');tmo.rotation=new THREE.Vector3('+object.rotation.x+','+object.rotation.y+','+object.rotation.z+');scene.addObject(tmo);tmo.updateMatrix();");'
}
}
toJavaScript=function(objects){
var code='';
for(var j in objects){if((objects[j]!==plane) && (objects[j]!==brush) && !(objects[j] instanceof THREE.Line))code+='var o'+j+'='+toJS(objects[j])+'o'+j+'();'}
return code;
}
Transactions={
CREATE_TABLE:function(table,id,text) {return 'CREATE TABLE IF NOT EXISTS '+table+' ('+id+', '+text+')';},
INSERT_INTO:function(table,columns,values) {return 'INSERT INTO '+table+' ('+columns.toString()+') VALUES ('+values.toString()+')';},
SELECT:function(table,columns,where) {
var wh=where;
wh.forEach(function(e,i,a){a[i]="("+e.toString().replace(/,/gi,' OR ')+")"});
return 'SELECT '+columns.toString()+' FROM '+table+' WHERE ('+wh.toString().replace(/,/gi,' AND ')+')';}
}
LObDB=function (n,v,d,s){
var _S=this
this.db=openDatabase('LODB','1.0','localObjects',2*1024*1024)
this.CT=function(n,i,t){_S.db.transaction(function (tx) {
  tx.executeSql(Transactions.CREATE_TABLE(n,i,t));})}
this.II=function(t,c,v){_S.db.transaction(function (tx) {
  tx.executeSql(Transactions.INSERT_INTO(t,c,v));})}
this.S=function(t,c,w){_S.db.transaction(function (tx) {
  tx.executeSql(Transactions.SELECT(t,c,w));})}
//dd.CT('materialLayers','1','materials')
}
