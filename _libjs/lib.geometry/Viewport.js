/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/17/12
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
function Viewport(matrix){

    this.screen={v0:new Vector(),v1:new Vector()};
    this.window={v0:new Vector(),v1:new Vector()};
    this.matrix=new Transform2D()
    this.inverseMatrix=new Transform2D()
    //this.screenToModel=viewportToModelTransformMatrix;
    //this.modelToScreen=modelToViewportTransformMatrix;
this.setScreen=function(v0,v1){
    this.screen.v0=v0;
    this.screen.v1=v1;
    this.window.v0=this.getTranslation();
    this.window.v1=this.screen.v1.clone().multiplyScalar(this.getScale()).add(this.window.v0)
}
    this.inView=function Viewport_InView(shape){
        return shape.bbox.intersects(view.area);
    }
    this.setMatrix=function(_n11,_n21,_n12,_n22,_n13,_n23){
        var n11,n21,n12,n22,n13,n23;
        if(_n11 instanceof Array){
            n11=_n11[0];n21=_n11[1];n12=_n11[2];n22=_n11[3];n13=_n11[4];n23=_n11[5];
        }else{
            n11=_n11;n21=_n21;n12=_n12;n22=_n22;n13=_n13;n23=_n23;
        }
        var v0=new Vector(n13,n23)
        this.matrix.set(n11,n21,n12,n22,n13,n23);
        this.inverseMatrix.set(1/n11,1/n11,1/n11,1/n11,-n13/n11,-n23/n11);
        this.window={v0:v0,v1:this.screen.v1.clone().multiplyScalar(n11).add(v0)};
    }
    this.getTranslation=function(){
        return new Vector(this.matrix.n13,this.matrix.n23);
    }
    this.getScale=function(){
        return this.matrix.n11;
    }
    this.modMatrix=function(n11,n21,n12,n22,n13,n23){
        var t=this.getTranslation();
        var s=this.getScale();
        this.setMatrix(s*n11,s*n21,s*n12,s*n22, t.x+n13, t.y+n23);
    }
    this.translate=function(v){
        var t=this.getTranslation().add(v);
        this.setMatrix(this.matrix.n11,this.matrix.n21,this.matrix.n12,this.matrix.n22, t.x, t.y);
    }
    this.scale=function(factor){
        var s=this.getScale();
        this.setMatrix(this.matrix.n11*factor,this.matrix.n21*factor,this.matrix.n12*factor,this.matrix.n22*factor, this.matrix.n13,this.matrix.n23);
    }
    this.modelToMouse=function(v){
        var t=this.getTranslation();
        var s=this.getScale();
        return new Vector((v.x*s+ t.x),(v.y*s+ t.y));
    }
    this.mouseToModel=function(v){
        var t=this.getTranslation();
        var s=this.getScale();
        return new Vector(v.x/s- t.x/s,v.y/s- t.y/s);
    }
    this.applyMatrix=function(context){
        context.setTransform(this.matrix.n11,this.matrix.n21,this.matrix.n12,this.matrix.n22, this.matrix.n13,this.matrix.n23)
    }
    this.applyInverseMatrix=function(context){
        context.setTransform(this.inverseMatrix.n11,this.inverseMatrix.n21,this.inverseMatrix.n12,this.inverseMatrix.n22, this.inverseMatrix.n13,this.inverseMatrix.n23)
    }

    this.setMatrix(matrix.n11,matrix.n21,matrix.n12,matrix.n22,matrix.n13,matrix.n33);
}