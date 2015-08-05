

function mReplace(string,matches,values) {
 rx='';mx='';
 for(var i in matches) {
  rx+='('+matches[i]+')|';
  mx+="m=='"+matches[i]+"'?'"+values[i]+"':"
 }
 mx="return "+mx+"m";
 rx+='()';
 rx=new RegExp(rx,'gi')
 mx=new Function("m",mx)
 return string.replace(rx,mx)
}
function parseCLI(text,synthax)
{
var lines=text.split(synthax.separators.newLine);
var decode=[]
for(var i in lines){
if(lines[i]!==''){
var a=lines[i].split(synthax.separators.command);
var b={'instruction':a[0],'parameters':a[1].split(synthax.separators.parameter)}
decode.push(b);
}
}
return decode;

}
function objImporter(tx,type)
{
var asd=tx.split('\n');
var kkk=[];
var msh=[];var first=true;
var p={name:'',material:'',vertices:[],normals:[],texture:[],faces:[]}
//simple mesh
//kkk=[];for(var i in asd){if(asd[i]!=="" && asd[i][0]!=='#' && asd[i][1]!=='t' && asd[i][1]!=='n')kkk.push(asd[i].split(' '))}
//complex mesh
for(var i in asd){if(asd[i]!=="" && asd[i][0]!=='#')kkk.push(asd[i].split(' '))}

for(var i in kkk) {
	var o={type:kkk[i][0]};
	if(kkk[i][4]) {
		o.a=kkk[i][1];o.b=kkk[i][2];o.c=kkk[i][3];o.d=kkk[i][4];
	} else {
		if(kkk[i][3]) {
			if(o.type=='f') {
				o.type='f3';
				o.a=kkk[i][1];o.b=kkk[i][2];o.c=kkk[i][3]
			} else {
				o.x=parseFloat(kkk[i][1]);o.y=parseFloat(kkk[i][2]);o.z=parseFloat(kkk[i][3])
			}
		} else {
			if(kkk[i][2]) {
				if(parseFloat(kkk[i][2])) {
						o.x=parseFloat(kkk[i][1]);o.y=parseFloat(kkk[i][2])
					} else {
						o.name=kkk[i][1]+' '+kkk[i][2]
					}
			} else {
				o.name=kkk[i][1]
			}
		}
	}
	kkk[i]=o;
	if(kkk[i].type=='g'){
		if(!first)msh.push(p);first=false;var p={name:kkk[i].name,material:'',vertices:[],normals:[],texture:[],faces4:[],faces3:[]}
		}
	if(kkk[i].type=='v'){p.vertices.push({x:kkk[i].x,y:kkk[i].y,z:kkk[i].z})}
	if(kkk[i].type=='vn'){p.normals.push({x:kkk[i].x,y:kkk[i].y,z:kkk[i].z})}
	if(kkk[i].type=='vt'){p.texture.push({x:kkk[i].x,y:kkk[i].y})}
	if(kkk[i].type=='f') {
		if(kkk[i].d!==undefined) {
			p.faces4.push({a:kkk[i].a.split('/')[0]-1,b:kkk[i].b.split('/')[0]-1,c:kkk[i].c.split('/')[0]-1,d:kkk[i].d.split('/')[0]-1})
		} else {
			kkk[i].type='f3'
			}
		}
	if(kkk[i].type=='f3'){
		try{
			p.faces3.push({
			a:kkk[i].a.split('/')[0]-1,
			b:kkk[i].b.split('/')[0]-1,
			c:kkk[i].c.split('/')[0]-1
			})
			}
			catch(err)
			{
			return kkk[i];
			break;
			}
			}
	if(kkk[i].type=='usemtl'){p.material=kkk[i].name}
}
msh.push(p);
//for(var i in msh){msh[i]=new THREE.MultyMesh(msh[i].vertices,msh[i].faces4,msh[i].faces3)}
return msh;
}
function importObj(meshData,scale,add)
{
if(!scale) var sc=1 
	else sc=scale
var leng=0;var geom=[]
for(var i in meshData) {//alert(i);
meshData[i].vertices.forEach(function(val,k,ar){ar[k]={x:val.x*sc,y:val.y*sc,z:val.z*sc}})
meshData[i].faces4.forEach(function(val,k,ar){ar[k]={a:val.a-leng,b:val.b-leng,c:val.c-leng,d:val.d-leng}})
meshData[i].faces3.forEach(function(val,k,ar){ar[k]={a:val.a-leng,b:val.b-leng,c:val.c-leng}})
//if(i!='0'){var as=[];for(var k in meshData[i-1].vertices){as.push(meshData[i-1].vertices[k])};for(var k in meshData[i].vertices){as.push(meshData[i].vertices[k])} meshData[i].vertices=as}
geom[i]=new THREE.Mesh(
		new MultyMesh(
			meshData[i].vertices,
			meshData[i].faces4,
			meshData[i].faces3,
			undefined,
			undefined
			),
		materials[(
			function(a){
				var b=parseInt(a.split('color')[1]);
				return b?b:8
				}
			)(meshData[i].material)]()
			
		)
if(add)scene.addObject(geom[i]);
	leng+=meshData[i].vertices.length;
}
	return geom;
}