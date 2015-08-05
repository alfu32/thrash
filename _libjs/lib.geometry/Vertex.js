/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/15/12
 * Time: 9:24 AM
 * To change this template use File | Settings | File Templates.
 */
function Vertex(v){
    this.initialPosition=v||new Vector();
    this.position= v||new Vector();
    this.set=function(v){
        this.position=v||new Vector();
        return this.set;
    }
    this.set.finalize=function(){
        this.initialPosition=this.position;
    }
    this.translate=function(v){
        return this.set(this.initialPosition.clone().add(v))
    }
    this.rotate=function(origin,angle){
        var _x=this.position.x-origin.x,_y=this.position.y-origin.y,_z=this.position.z-origin.z;
        var cosa=Math.cos(angle),sina=Math.sin(angle);
        var newVector=new Vector(_x*cosa-_y*sina,_x*sina+_y*cosa,_z).add(origin);

        return this.set(newVector);
    }
    this.scale=function(origin,factor){
        var _x=this.position.x-origin.x,_y=this.position.y-origin.y,_z=this.position.z-origin.z;
        var newVector=new Vector(_x*factor,_y*factor,_z*factor).add(origin);
        return this.set(newVector);
    }
}
Vertex.constructor=Vertex;