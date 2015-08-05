
function Transform2D(a11,a21,a12,a22,a13,a23){
    this.set(a11,a21,a12,a22,a13,a23)
}
Transform2D.prototype.set=function(a11,a21,a12,a22,a13,a23){
    this.n11=a11||1;
    this.n12=a12||0;
    this.n13=a13||0;
    this.n21=a21||0;
    this.n22=a22||1;
    this.n23=a23||0;
    this.n31=0;
    this.n32=0;
    this.n33=1;
    return this;
}
Transform2D.prototype.ApplyTransform=function Transform2D_ApplyTransform(context){
    context.setTransform(this.n11,this.n12,this.n21,this.n22,this.n13,this.n23);
    return this;
}
Transform2D.Identity=new Transform2D();
Transform2D.prototype.det=function Tranform2d_Det(){
    var a=this.n11,b=this.n12,c=this.n12,d=this.n21,e=this.n22,f=this.n23,g=this.n31,h=this.n32,k=this.n33;
    return a*e*k + b*f*g + c*d*h - c*e*g - b*d*k - a*f*h;
}
Transform2D.prototype.getInverse=function Transform2D_GetInverse(){
    var det=this.det();
    if(det!=0){
        var a=this.n11,b=this.n12,c=this.n12,d=this.n21,e=this.n22,f=this.n23,g=this.n31,h=this.n32,k=this.n33;
        var inv=new Transform2D(e*k-f*h,c*h-b*k,f*g-d*k,a*k-c*g,d*h-e*g,g*b-a*h);
        inv.n31=b*f-c*e;
        inv.n32=c*d-a*f;
        inv.n33=a*e-b*d;
        inv.multiplyScalar(1/det);
        return inv;
    }
    return this;
}
Transform2D.prototype.add=function Tranform2d_Add(matrix){
    this.n11+=matrix.n11;
    this.n12+=matrix.n12;
    this.n13+=matrix.n13;
    this.n21+=matrix.n21;
    this.n22+=matrix.n22;
    this.n23+=matrix.n23;
    this.n31+=matrix.n31;
    this.n32+=matrix.n32;
    this.n33+=matrix.n33;
}
Transform2D.prototype.multiplyScalar=function Tranform2d_MultiplyScalar(scalar){
    this.n11*=scalar;
    this.n12*=scalar;
    this.n13*=scalar;
    this.n21*=scalar;
    this.n22*=scalar;
    this.n23*=scalar;
    this.n31*=scalar;
    this.n32*=scalar;
    this.n33*=scalar;
}
Transform2D.prototype.multiply=function Tranform2d_Multiply(matrix){
    var A=[[this.n11,this.n12,this.n13],[this.n21,this.n22,this.n23],[this.n31,this.n32,this.n33]];
    var B=[[matrix.n11,matrix.n12,matrix.n13],[matrix.n21,matrix.n22,matrix.n23],[matrix.n31,matrix.n32,matrix.n33]];
    this.n11=A[1][1]*B[1][1]+A[1][2]*B[2][1]+A[1][3]*B[3][1];
    this.n12=A[1][2]*B[1][2]+A[1][2]*B[2][2]+A[1][3]*B[3][3];
    this.n13=A[1][3]*B[1][3]+A[1][2]*B[2][3]+A[1][3]*B[3][3];
    this.n21=A[2][1]*B[1][1]+A[2][2]*B[2][1]+A[2][3]*B[3][1];
    this.n22=A[2][1]*B[1][2]+A[2][2]*B[2][2]+A[2][3]*B[3][2];
    this.n23=A[2][1]*B[1][3]+A[2][2]*B[2][3]+A[2][3]*B[3][3];
    this.n31=A[3][1]*B[1][1]+A[3][2]*B[2][1]+A[3][3]*B[3][1];
    this.n32=A[3][1]*B[1][2]+A[3][2]*B[2][2]+A[3][3]*B[3][2];
    this.n33=A[3][1]*B[1][3]+A[3][2]*B[2][3]+A[3][3]*B[3][3];
}
Transform2D.prototype.ApplyTo=function Transform2d_ApplyTo(vector){
    return new Vector(
        this.n11*vector.x+this.n12*vector.y+this.n13*vector.z
        ,this.n21*vector.x+this.n22*vector.y+this.n23*vector.z
        ,this.n31*vector.x+this.n32*vector.y+this.n33*vector.z
    )
}
Transform2D.prototype.RotationMatrix=function Transform2d_RotationMatrix(alpha){
    return this(Math.cos(alpha),Math.sin(alpha),-Math.sin(alpha),Math.cos(alpha),0,0);
}
Transform2D.prototype.TranslationMatrix=function Transform2d_TranslationMatrix(dx,dy){
    return this.set(1,0,0,1,dx,dy);
}
Transform2D.prototype.ScaleMatrix=function Transform2d_ScaleMatrix(sx,sy){
    return this.set(sx,0,0,sy,0,0);
}
Transform2D.prototype.ShearMatrix=function Transform2d_ShearMatrix(sx,sy){
    return this.set(1,sy,sx,1,0,0);
}
Transform2D.prototype.SqueezeMatrix=function Transform2d_SqueezeMatrix(f){
    return this.set(f,0,0,1/f,0,0);
}