function Vector(_x,_y,_z){
    this.x=_x||0;
    this.y=_y||0;
    this.z=_z||0;
}
Vector.prototype.init=function(o){
    this.x= o.x||0;
    this.y= o.y||0;
    this.z= o.z||0;
    return this;
}
Vector.prototype.add=function Vector_Add(vector){
    this.x+=vector.x;
    this.y+=vector.y;
    this.z+=vector.z;
    return this;
}
Vector.prototype.sub=function(vector){
    this.x-=vector.x;
    this.y-=vector.y;
    this.z-=vector.z;
    return this;
}
Vector.prototype.multiply=function Vector_Multiply(vector){
    this.x*=vector.x;
    this.y*=vector.y;
    this.z*=vector.z;
    return this;
}
Vector.prototype.multiplyScalar=function Vector_MultiplyScalar(val){
    this.x*=val;
    this.y*=val;
    this.z*=val;
    return this;
}
Vector.prototype.dot=function Vector_Dot(vector){
    return this.x*vector.x+this.y*vector.y+this.z*vector.z;
}
Vector.prototype.moduleSquared=function Vector_ModuleSquared(){
    return this.x*this.x+this.y*this.y+this.z*this.z;
}
Vector.prototype.module=function Vector_ModuleSquared(vector){
    return Math.sqrt(this.moduleSquared());
}
Vector.prototype.negate=function(){
    return this.multiplyScalar(-1);
}
Vector.prototype.swap=function(){
    var a=this.x,b=this.y;
    this.x=b;this.y=a;
}
Vector.prototype.clone=function(){
    return new Vector(this.x,this.y,this.z);
}
Vector.dist=function(a,b){
    return Math.sqrt((a.x- b.x)*(a.x- b.x)+(a.y- b.y)*(a.y- b.y));
}
Vector.prototype.string=function(){
    return this.x+","+this.y;
}