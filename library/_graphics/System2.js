
function System2(n11,n21,n12,n22,n13,n23){
    var m=new Matrix2(n11,n21,n12,n22).det();
    var mu=new Matrix2(n12,n22,n13,n23).det();
    var mw=new Matrix2(n11,n21,n13,n23).det();
    this.solution=function(){
        if(m==0)return null;
        return new Vector(mu/m,mw/m);
    }
}