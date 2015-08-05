/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/22/12
 * Time: 2:58 PM
 * To change this template use File | Settings | File Templates.
 */
function FreeVector(v1,v2){
    var eps=1e-300;
    this.set(v1,v2);
    function compare(a,b){
        if(Math.abs(a-b)<eps)return 1;
        if(a>b)return 2;
        return 0;
    }
    this.alpha=function(){
        var dx=this.b.x-this.a.x;
        var dy=this.b.y-this.a.y;
        var cx=compare(dx,0);
        var cy=compare(dy,0);
        var c=3*cx+cy;
        switch(c){
            case 0:
            case 2:
                return (Math.atan(dy/dx)+Math.PI)*180/Math.PI;
            case 3:
                return 270;
            case 1:
                return 180;
            case 4:
            case 7:
                return 0;
            case 5:
                return 90;
            case 6:
            case 8:
                return (Math.atan(dy/dx))*180/Math.PI;
        }
    }
}
FreeVector.prototype.set=function(v1,v2){
    this.a=v1||new Vector();
    this.b=v2||new Vector();
    this.bbox=new Rectangle(this.a.x, this.a.y,0,0);
    this.bbox.add(new Rectangle(this.b.x,this.b.y,0,0));
}
FreeVector.prototype.setFromOriginAndAngle=function(origin,angle,distance){
    var dist=distance||1;
    this.a=origin;
    this.b=origin.clone().add(new Vector(dist*Math.cos(angle),dist*Math.sin(angle)));
    this.bbox=new Rectangle(this.a.x, this.a.y,0,0);
    this.bbox.add(new Rectangle(this.b.x,this.b.y,0,0));
    return this;
}
FreeVector.prototype.Length=function(){
    return this.a.clone().add(this.b.clone().multiplyScalar(-1)).module();
}
FreeVector.prototype.containsPoint=function(p){
    var ax=this.a.x- p.x,bx= p.x-this.b.x,ay=this.a.y- p.y,by= p.y-this.b.y,ca=(ax*bx+ay*by);
    return ca>=0;
}
FreeVector.prototype.hasPoint=function(p){
    var ax=this.a.x,bx=this.b.x,ay=this.a.y,by=this.b.y,cx=((ax-p.x)*(bx- p.x)),cy=((ay- p.y)*(by- p.y));
    return !(cx>0 || cy>0);
}
FreeVector.prototype.getIntersectionParameters=function(segment){
    var $else=true, u=new Vector(),w=new Vector(), s,t;
    var a=this.a,b=this.b,c=segment.a,d=segment.b;
    //log(this.alpha(),segment.alpha());
    if((this.alpha()==0 || this.alpha()==180)){
        if((segment.alpha()==90 || segment.alpha()==270)){

            var iv=new Vector(segment.a.x,this.a.y);

            if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
        }else{
            var q=(this.a.x-segment.a.x)/(this.b.x-this.a.x);
            var iv=new Vector(this.a.x+q*(this.b.x-this.a.x),this.a.y+q*(this.b.y-this.a.y));
            if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
        }
        $else=false;
    }else{
        if((this.alpha()==90 || this.alpha()==270)){
            if((segment.alpha()==0 || segment.alpha()==180)){
                var iv=new Vector(this.a.x,segment.a.y);
                if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
            }else{
                var q=(this.a.y-segment.a.y)/(this.b.y-this.a.y);
                var iv=new Vector(this.a.x+q*(this.b.x-this.a.x),this.a.y+q*(this.b.y-this.a.y));
                if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
            }
            $else=false;
        }
    }
    if($else){

        var sol=new System2(
            b.x-a.x,b.y-a.y,
            c.x-d.x,c.y-d.y,
            a.x-c.x,a.y-c.y).solution();
        if(sol==null)return null;
        u=new Vector(this.a.x+sol.x*(this.b.x-this.a.x),this.a.y+sol.x*(this.b.y-this.a.y));
        w=new Vector(this.a.x+sol.y*(this.b.x-this.a.x),this.a.y+sol.y*(this.b.y-this.a.y));
    }
    if(this.containsPoint(u)&&segment.containsPoint(u))return u;
    //else log("point out ",sol.x,u);
    if(this.containsPoint(w)&&segment.containsPoint(w))return w;
    //log("point ",sol.y,w);
    return w||u;
}
FreeVector.prototype.getIntersection=function(segment){
    var $else=true, u=new Vector(),w=new Vector();
    //log(this.alpha(),segment.alpha());
    if((this.alpha()==0 || this.alpha()==180)){
        if((segment.alpha()==90 || segment.alpha()==270)){
        var iv=new Vector(segment.a.x,this.a.y);
            if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
        }else{
            var q=(this.a.x-segment.a.x)/(this.b.x-this.a.x);
            var iv=new Vector(this.a.x+q*(this.b.x-this.a.x),this.a.y+q*(this.b.y-this.a.y));
            if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
        }
        $else=false;
    }else{
        if((this.alpha()==90 || this.alpha()==270)){
            if((segment.alpha()==0 || segment.alpha()==180)){
                var iv=new Vector(this.a.x,segment.a.y);
                if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
            }else{
                var q=(this.a.y-segment.a.y)/(this.b.y-this.a.y);
                var iv=new Vector(this.a.x+q*(this.b.x-this.a.x),this.a.y+q*(this.b.y-this.a.y));
                if(this.containsPoint(iv)&&segment.containsPoint(iv))return iv;
            }
            $else=false;
        }
    }
    if($else){
        var a=this.a,b=this.b,c=segment.a,d=segment.b;
        var sol=new System2(
            b.x-a.x,b.y-a.y,
            c.x-d.x,c.y-d.y,
            a.x-c.x,a.y-c.y).solution();
        if(sol==null)return null;
        u=new Vector(this.a.x+sol.x*(this.b.x-this.a.x),this.a.y+sol.x*(this.b.y-this.a.y));
        w=new Vector(this.a.x+sol.y*(this.b.x-this.a.x),this.a.y+sol.y*(this.b.y-this.a.y));
    }
    if(this.containsPoint(u)&&segment.containsPoint(u))return u;
    //else log("point out ",sol.x,u);
    if(this.containsPoint(w)&&segment.containsPoint(w))return w;
    //log("point ",sol.y,w);
    return w||u;
}
FreeVector.prototype.getMidpoint=function(){
    return new Vector((this.a.x+this.b.x)/2,(this.a.y+this.b.y)/2);
}
FreeVector.prototype.pointOnSegment=function(q){
    return new Vector(this.b.x-q*(this.b.x-this.a.x),this.b.y-q*(this.b.y-this.a.y));
}
FreeVector.prototype.getParalelInPoint=function(p){
    var delta2=new FreeVector(this.a,p);
    var delta1=new FreeVector(this.b,p);
    if(delta1.Length()<delta2.Length())return new FreeVector(p,this.b.clone().sub(this.a).add(p));
    else return new FreeVector(this.a.clone().sub(this.b).add(p),p);
}
FreeVector.prototype.getPerpendicular=function(c){
    var a=this.a,b=this.b;
    var sol=new System2(
        a.x-b.x,a.y-b.y,
        a.x-b.x,b.y-a.y,
        a.x-c.x,a.y-c.y).solution();

    return new FreeVector(c,this.getProjection(c));
}
FreeVector.prototype.getProjection=function(v){
    var a=this.b.clone().sub(this.a);
    var b=this.b.clone().sub(v);
    var q= a.dot(b)/ a.moduleSquared();
    return this.pointOnSegment(q);
}
FreeVector.prototype.getPerpendicularAtDistanceInPoint=function(d,p){
    var a=this.alpha();
    var b=new FreeVector().setFromOriginAndAngle(p.clone(),(a+90)*Math.PI/180,d);
    return b.b;
}
FreeVector.prototype.getParalelAtDistance=function(d){
    var a=this.getPerpendicularAtDistanceInPoint(d,this.a);
    var b=this.getPerpendicularAtDistanceInPoint(d,this.b);
    return new FreeVector(a,b);
}