function Matrix2(n11,n21,n12,n22){
    this.n11=n11||1;
    this.n12=n12||0;
    this.n21=n21||0;
    this.n22=n22||1
}
Matrix2.prototype.det=function(){
    return this.n11*this.n22-this.n12*this.n21;
}
Matrix2.prototype.initWithVectors=function(v1,v2){
    this.n11=v1.x;
    this.n12=v2.x;
    this.n21=v1.y;
    this.n22=v2.y;
}
Matrix2.prototype.diff=function(matrix){
    this.n11-=matrix.n11;
    this.n12-=matrix.n12;
    this.n21-=matrix.n21;
    this.n22-=matrix.n22;
    return this;
}
Matrix2.prototype.add=function(matrix){
    this.n11+=matrix.n11;
    this.n12+=matrix.n12;
    this.n21+=matrix.n21;
    this.n22+=matrix.n22;
    return this;
}