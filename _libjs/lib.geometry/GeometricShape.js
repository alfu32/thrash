/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/15/12
 * Time: 9:18 AM
 * To change this template use File | Settings | File Templates.
 */
function GeometricShape(){
    this.vertices=[];
    this.draw=function GeometricShape_Draw(context){

    }
    this.set=function GeometricShape_Set(vector){};
    this.onShapeBuilt=function(){};

}
GeometricShape.constructor=GeometricShape;
GeometricShape.prototype=new GeometricShape();

function GeometricLine(){
    GeometricShape.call(this);
    this.onShapeBuilt=function(){log("line built");};
    this.input=function(v){
        var index=this.vertices.length;
        if(index<2){
            this.vertices[index]=new Vertex(v);
        }else{
            this.onShapeBuilt();
        }
    }
    this.draw=function(context){
        context.beginPath();
        context.moveTo(this.vertices[0].position.x,this.vertices[0].position.y);
        context.lineTo(this.vertices[1].position.x,this.vertices[1].position.y);
    }
}
GeometricLine.constructor=GeometricLine;
GeometricLine.prototype=new GeometricShape();
