/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/17/12
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * abstract
 * @constructor
 */
function Shape(){
    this.bbox=new Rectangle();
    this.vertices=[];
    this.intersects=function(shape){
        return !(
            this.bbox.left>shape.bbox.right ||
            this.bbox.right < shape.bbox.left ||
            this.bbox.top>shape.bbox.bottom ||
            this.bbox.bottom<shape.bbox.top
            );
    }
    this.setIntersectPoints=function(shape){
        //this.snapPoints.fields.intersect;
        //this.snapPoints.fields["intersect"]=[];
        var k=0;
        for(var i=0;i<this.segments.length;i++){
            //if(this.segments[i].Length()<0.01)continue;
            for(var j=0;j<shape.segments.length;j++){
                //if(shape.segments[i].Length()<0.01)continue;
                var p=this.segments[i].getIntersection(shape.segments[j]);
                if(p!=null){
                    if(!(p instanceof Vector)){
                        log(p);
                        continue;
                    }
                    var pp= p.clone();
                    this.snapPoints.fields["intersect"].push(pp);
                    //shape.snapPoints.fields["intersect"].push(pp);
                    k++;
                    //shape.snapPoints.fields["intersect"].push(pp);
                }
            }
        }
    }
    this.getSnapPoint=function(v,eps){
        var sp=[];
        var tab=this.snapPoints.fields;
        for(var i in tab){
            for(var j=0;j<tab[i].length;j++){
                var p=tab[i][j];
                var l=(p.x- v.x)*(p.x- v.x)+(p.y- v.y)*(p.y- v.y);
                if(l<(eps*eps)){
                    sp.push({type:i,point:p.clone()});
                }
            }
        }
        return sp;
    }
    this.getPerpendicularPoint=function(from,near,eps){
        var sp=[];
        for(var i=0;i<this.segments.length;i++){
            if(this.segments[i].Length()<0.01)continue;
            var perp=this.segments[i].getProjection(from);
            //log(perp,perp.Length());
            if(perp.clone().sub(near).module()<eps){
                sp.push({type:"perpendicular",point:perp});
            }
        }
        return sp;
    }
    this.getNearPoint=function(v,eps){
        var sp=[];
        for(var i=0;i<this.segments.length;i++){
            if(this.segments[i].Length()<0.01)continue;
            var perp=this.segments[i].getProjection(v);
            //log(perp,perp.Length());
            if(perp.clone().sub(v).module()<eps){
                if(this.segments[i].containsPoint(v))
                sp.push({type:"near",point:this.segments[i].getProjection(v)});
                else sp.push({type:"outside",point:this.segments[i].getProjection(v)});
            }
        }
        return sp;
    }
    this.isInRectangle=function Shape_isInRectangle(rectangle){
        TODO("Shape.isInRectangle");
    }
    this.intersectsRectangle=function Shape_intersectsRectangle(rectangle){
        var diag1=new FreeVector(new Vector(rectangle.left,rectangle.top),new Vector(rectangle.right,rectangle.bottom)),
            diag2=new FreeVector(new Vector(rectangle.right,rectangle.top),new Vector(rectangle.left,rectangle.bottom)),
            t=new FreeVector(new Vector(rectangle.left,rectangle.top),new Vector(rectangle.right,rectangle.top)),
            b=new FreeVector(new Vector(rectangle.left,rectangle.bottom),new Vector(rectangle.right,rectangle.bottom)),
            l=new FreeVector(new Vector(rectangle.left,rectangle.top),new Vector(rectangle.left,rectangle.bottom)),
            r=new FreeVector(new Vector(rectangle.right,rectangle.top),new Vector(rectangle.right,rectangle.bottom))
        var segs=[t,b,l,r]
        for(var i=0;i<this.segments.length;i++){
            for(var j=0;j<4;j++){
                var intersection=diag1.getIntersection(this.segments[i]);
                if(intersection!=null)return true;
            }
        }
        return false;
    }
    this.getPointsInRectangle=function Shape_getPointsInRectangle(rectangle){
        var vertices=[],r=rectangle;
        for(var i=0;i<this.vertices.length;i++){
            var a=this.vertices[i]
            if((a.x> r.x && a.x< r.right)&&(a.y> r.y && a.y< r.bottom))vertices.push(this.vertices[i]);
        }
        return vertices;
    }
    this.getSegmentsInRectangle=function Shape_getSegmentsInRectangle(rectangle){
        var segments=[],r=new Rect(new Vector(rectangle.x,rectangle.y),new Vector(rectangle.right,rectangle.bottom));
        //log(rectangle== box);
        for(var i=0;i<segments.length;i++){
            for(var j=0;j<r.segments.length;j++){
                var p=this.segments[i].getIntersection(r.segments[j]);
                if(p!=null){
                    segments.push(r.segments[j])
                }
            }
        }
        return segments;
    }
    this.setBbox=function(){
        this.bbox=new Rectangle()
        for(var i=0;i<this.vertices.length;i++){
            this.bbox.add(this.vertices[i]);
        }
    }
    this.clone=function(){
        log("Shape");
    }
}
Shape.constructor=Shape;
Shape.prototype=new Shape;
Shape.INTERSECTION_PRIORITY={
    end:1,
    intersect:2,
    mid:3,
    center:4,
    perpendicular:5,
    near:10,
    outside:25
}
Shape.prototype.draw=function(context){
    TODO(this," must implement draw()");
}
Shape.prototype.fill=function(context){
    TODO(this," must implement fill()");
}
//SERIALIZATION
Shape.serialNumberID=0x00000002;
Shape.prototype.serialize=function(){
    var s={shape:"Shape"};
    s.__proto__=null;
    return s;
}
Shape.prototype.deserialize=function(o){
    return this;
}
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function Point(x,y){
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.segments=[];
    this.size=5;
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        context.strokeRect(this.vertices[0].x-this.size,this.vertices[0].y-this.size,this.size*2,this.size*2);
    }
    this.fill=function(context){

        context.fillRect(this.vertices[0].x-this.size,this.vertices[0].y-this.size,this.size*2,this.size*2);
    }
    this.clone=function(){
        log("Point");
    }
}
Point.constructor=Point;
Point.prototype=new Shape;

Point.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.vertices=[this.v];
    this.snapPoints.fields.end=[this.v];
    this.segments=[];

    this.bbox=new Rectangle();
    this.bbox.left=x
    this.bbox.right=x;
    this.bbox.top=y;
    this.bbox.bottom=y;
    this.bbox.x=this.bbox.left;
    this.bbox.y=this.bbox.top;
    this.bbox.width=this.bbox.right-this.bbox.left;
    this.bbox.height=this.bbox.bottom-this.bbox.top;
    return this;
}
//SERIALIZATION
Point.serialNumberID=0x00000003;
Point.prototype.serialize=function(){
    var s={shape:"Point",vertices:this.vertices};
    s.__proto__=null;
    return s;
}
Point.prototype.deserialize=function(o){
    this.set(o.vertices[0].x,o.vertices[0].y);
    return this;
}
/**
 *
 * @param _v1
 * @param _v2
 * @constructor
 */
function Line(_v1,_v2){
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.set(_v1||new Vector(),_v2||new Vector());
    this.draw=function Line_Draw(context){
        if((context.strokeStyle instanceof CanvasPattern))return this;
        //return this;
//        var s =this.segments[0],p0=s.getProjection(new Vector(0,0));
        context.beginPath();
        context.moveTo(this.vertices[0].x,this.vertices[0].y);
        context.lineTo(this.vertices[1].x,this.vertices[1].y);
        context.stroke();
        return this;
    }
    this.fill=function(context){
        if(!(context.strokeStyle instanceof CanvasPattern))return this;
        context.save();
        //var fill=context.fillStyle;
        context.fillStyle=context.strokeStyle;
        var a=this.segments[0].alpha()*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a);
        //log(a);
        var w=this.segments[0].Length(),h=context.lineWidth/2;
        context.translate(this.vertices[0].x,this.vertices[0].y);
        context.transform(ca,sa,-sa,ca,0,0);
        context.beginPath();
        context.moveTo(0,-h);
        context.lineTo(w,-h);
        context.lineTo(w,h);
        context.lineTo(0,h);

        context.fill();
        //context.fillStyle=fill;
        context.restore();
        return this;
    }
    this.stroke=function(context){
        return this;
    }
    this.clone=function(){
        log("Line");
    }
}
Line.constructor=Line;
Line.prototype=new Shape();

Line.prototype.set=function (v1,v2){
    this.v1=v1;
    this.v2=v2;
    this.m=new Vector((v1.x+v2.x)/2,(v1.y+v2.y)/2);

    this.segments=[new FreeVector(this.v1,this.v2)];
    this.vertices=[this.v1,this.v2];
    this.snapPoints.fields.end=[this.v1,this.v2];
    this.snapPoints.fields.mid=[this.m];

    this.bbox=new Rectangle();
    this.bbox.left=Math.min(v1.x,v2.x);
    this.bbox.right=Math.max(v1.x,v2.x);
    this.bbox.top=Math.min(v1.y,v2.y);
    this.bbox.bottom=Math.max(v1.y,v2.y);
    this.bbox.x=this.bbox.left;
    this.bbox.y=this.bbox.top;
    this.bbox.width=this.bbox.right-this.bbox.left;
    this.bbox.height=this.bbox.bottom-this.bbox.top;
    return this;
}
//SERIALIZATION
Line.serialNumberID=0x00000004;
Line.prototype.serialize=function(){
    var s={shape:"Line",vertices:[]};
    for(var i=0;i<this.vertices.length;i++){
        s.vertices[i]={
            x:this.vertices[i].x,
            y:this.vertices[i].y,
            z:this.vertices[i].z,
        }
        s.vertices[i].__proto__=null;
    }
    s.vertices.__proto__=null;
    s.shape.__proto__=null;
    s.__proto__=null;
    return s;
}
Line.prototype.deserialize=function(o){
    var v1=new Vector().init(o.vertices[0]),v2=new Vector().init(o.vertices[1]);
    this.set(v1,v2);
    return this;
}
/**
 *
 * @param _v1
 * @param _v2
 * @constructor
 */
function Rect(_v1,_v2){
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.set(_v1||new Vector(),_v2||new Vector());
    this.setPoint1=function Rect_SetPoint1(v){
        v1=v;
    }
    this.setPoint2=function Rect_SetPoint2(v){
        v2=v;
    }
    this.draw=function Rect_Draw(context){
        context.strokeRect(this.vertices[0].x,this.vertices[0].y,this.vertices[1].x-this.vertices[0].x,this.vertices[1].y-this.vertices[0].y);
        return this;
    }
    this.fill=function(context){

        context.fillRect(this.vertices[0].x,this.vertices[0].y,this.vertices[1].x-this.vertices[0].x,this.vertices[1].y-this.vertices[0].y);
        return this;
    }
    this.clone=function(){
        log("Rect");
    }
}
Rect.constructor=Rect;
Rect.prototype=new Shape();

Rect.prototype.set=function (_v1,_v2){
    var v1=_v1||new Vector();
    var v2=_v2||new Vector();

    this.bbox=new Rectangle();
    this.bbox.left=Math.min(v1.x,v2.x);
    this.bbox.right=Math.max(v1.x,v2.x);
    this.bbox.top=Math.min(v1.y,v2.y);
    this.bbox.bottom=Math.max(v1.y,v2.y);
    this.bbox.x=this.bbox.left;
    this.bbox.y=this.bbox.top;
    this.bbox.width=this.bbox.right-this.bbox.left;
    this.bbox.height=this.bbox.bottom-this.bbox.top;

    //this.v1=this.bbox.v1;
    //this.v2=this.bbox.v2;
    this.v1=new Vector(this.bbox.left,this.bbox.top);
    this.v2=new Vector(this.bbox.right,this.bbox.bottom);
    this.v3=new Vector(this.v1.x,this.v2.y);
    this.v4=new Vector(this.v2.x,this.v1.y);
    this.va=new Vector(this.v1.x,(this.v1.y+this.v2.y)/2);
    this.vb=new Vector((this.v1.x+this.v2.x)/2,this.v2.y);
    this.vc=new Vector(this.v2.x,(this.v1.y+this.v2.y)/2);
    this.vd=new Vector((this.v1.x+v2.x)/2,this.v1.y);

    this.vertices=[this.v1,this.v2]//,this.v3,this.v4];
    this.segments=[new FreeVector(this.v1,this.v3)
        ,new FreeVector(this.v4,this.v2)
        ,new FreeVector(this.v3,this.v2)
        ,new FreeVector(this.v1,this.v4)
    ];
    this.snapPoints.fields.end=[this.v1,this.v2,this.v3,this.v4];
    this.snapPoints.fields.mid=[this.va,this.vb,this.vc,this.vd];


    return this;
}
//SERIALIZATION
Rect.serialNumberID=0x00000005;
Rect.prototype.serialize=function(){
    var s={shape:"Rect",vertices:[]};
    for(var i=0;i<this.vertices.length;i++){
        s.vertices[i]={
            x:this.vertices[i].x,
            y:this.vertices[i].y,
            z:this.vertices[i].z,
        }
        s.vertices[i].__proto__=null;
    }
    s.vertices.__proto__=null;
    s.shape.__proto__=null;
    s.__proto__=null;
    return s;
}
Rect.prototype.deserialize=function(o){
    var v1=new Vector().init(o.vertices[0]),v2=new Vector().init(o.vertices[1]);
    this.set(v1,v2);
    return this;
}
/**
 *
 * @param _v1
 * @param _v2
 * @constructor
 */
function DoubleLine(_v1,_v2){
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.width=1000;
    this.set(_v1||new Vector(),_v2||new Vector());
    this.draw=function DoubleLine_Draw(context){
        this.set(this.vertices[0],this.vertices[1]);

        context.beginPath();
        context.moveTo(this.vertices[0].x,this.vertices[0].y);
        context.lineTo(this.vertices[1].x,this.vertices[1].y);
        context.moveTo(this.vertices[0].x,this.vertices[0].y);
        context.lineTo(this.vertices[1].x,this.vertices[1].y);
        context.moveTo(this.v3.x,this.v3.y);
        context.lineTo(this.v4.x,this.v4.y);
        context.stroke();

        return this;
    }
    this.fill=function(context){
        context.save();
        var a=this.segments[0].alpha()*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a);
        //log(a);
        var w=this.segments[0].Length(),h=this.segments[0].a.clone().sub(this.segments[1].a.clone()).module();
        context.translate(this.vertices[0].x,this.vertices[0].y);
        context.transform(ca,sa,-sa,ca,0,0);
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(w,0);
        context.lineTo(w,h);
        context.lineTo(0,h);

        context.fill();
        context.restore();
        return this;
    }
    this.clone=function(){
        log("DoubleLine");
    }
}
DoubleLine.constructor=DoubleLine;
DoubleLine.prototype=new Shape();
DoubleLine.prototype.setWidth=function(width){
    this.width=width;
    this.set(this.v1.clone(),this.v2.clone());
}
DoubleLine.prototype.set=function (v1,v2){
    this.v1=v1;
    this.v2=v2;
    var segment=new FreeVector(this.v1,this.v2),paralel=segment.getParalelAtDistance(this.width);
    this.m1=segment.getMidpoint();
    this.m2=paralel.getMidpoint()
    this.v3=paralel.a;
    this.v4=paralel.b;

    this.segments=[segment,paralel];
    this.vertices=[this.v1,this.v2]//,this.v3,this.v4];
    this.snapPoints.fields.end=[this.v1,this.v2,this.v3,this.v4];
    this.snapPoints.fields.mid=[this.m1,this.m2];

    this.bbox=new Rectangle();
    this.bbox.left=Math.min(v1.x,v2.x,this.v3.x,this.v4.x);
    this.bbox.right=Math.max(v1.x,v2.x,this.v3.x,this.v4.x);
    this.bbox.top=Math.min(v1.y,v2.y,this.v3.y,this.v4.y);
    this.bbox.bottom=Math.max(v1.y,v2.y,this.v3.y,this.v4.y);
    this.bbox.x=this.bbox.left;
    this.bbox.y=this.bbox.top;
    this.bbox.width=this.bbox.right-this.bbox.left;
    this.bbox.height=this.bbox.bottom-this.bbox.top;
    return this;
}
//SERIALIZATION
DoubleLine.serialNumberID=0x00000006;
DoubleLine.prototype.serialize=function(){
    var s={shape:"DoubleLine",width:this.width,vertices:[]};
    for(var i=0;i<this.vertices.length;i++){
        s.vertices[i]={
            x:this.vertices[i].x,
            y:this.vertices[i].y,
            z:this.vertices[i].z,
        }
        s.vertices[i].__proto__=null;
    }
    s.vertices.__proto__=null;
    s.shape.__proto__=null;
    s.__proto__=null;
    return s;
}
DoubleLine.prototype.deserialize=function(o){
    this.width= o.width;
    var v1=new Vector().init(o.vertices[0]),v2=new Vector().init(o.vertices[1]);
    this.set(v1,v2);
    return this;
}
/**
 *
 * @param _v1
 * @param _v2
 * @constructor
 */
function Dimension(_v1,_v2){
    var text,textAngle,textPosition,detail,detailPosition;
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.width=10;
    this.set(_v1||new Vector(),_v2||new Vector());
    this.draw=function Dimension_Draw(context){
        this.set(this.vertices[0],this.vertices[1],this.vertices[2])
        var sw=300*CanvasLayer.Scale/100;
        var lw=context.lineWidth;
        var color=context.fillStyle;
        context.fillStyle=(color instanceof CanvasPattern)?color.proto.color:color;

        context.beginPath();
        context.lineWidth=sw/10;
        context.moveTo(this.v1.x,this.v1.y);
        context.lineTo(this.v3.x,this.v3.y);

        context.moveTo(this.v2.x,this.v2.y);
        context.lineTo(this.v4.x,this.v4.y);

        context.moveTo(this.v3.x,this.v3.y);
        context.lineTo(this.v4.x,this.v4.y);

        context.stroke();

        context.lineWidth=lw;
        context.save();
        var of=context.font;
        var s =this.segments[0],p=this.segments[1];
        var dl=new FreeVector(this.v1,this.m1).Length();
        context.translate(this.m2.x,this.m2.y);
        textAngle=s.alpha();
        if(textAngle>=90 && textAngle<=270) textAngle-=180;
        var l=s.Length()/100,lp=l<<0;
        //var textSize=(l>=10000)?20*sw:(l>=1000)?10*sw:(l>=100)?5*sw:(l>=10)?3*sw:2*sw;
        var textSize=(l>=700)?(20*sw):(8*sw);
        context.font=textSize+'px sans-serif'
        text=((lp>=100)?(((lp/100)<<0)+"."+(((lp%100)>=10)?(lp%100):("0"+(lp%100)))):lp)+"";
        var r=(((l*4)<<0)%4)*25;
        detail=""+(r>0?r:"");
        var ts=context.measureText(text);
        textPosition={x:-ts.width/2,y:0};
        detailPosition={x:ts.width/2,y:-textSize*2/3};
        context.rotate((textAngle)*Math.PI/180);
        context.fillText(text,textPosition.x,textPosition.y);

        context.font=(textSize*2/3)+'px sans-serif';
        context.fillText(detail,detailPosition.x,detailPosition.y);
        context.font=of;

        context.lineWidth=sw/2;

        context.beginPath();
        context.moveTo(-dl+sw,sw);
        context.lineTo(-dl-sw,-sw);

        context.moveTo(dl+sw,sw);
        context.lineTo(dl-sw,-sw);
        context.lineWidth=lw;
        context.fillStyle=color;
        context.stroke();
        context.restore();
        return this;
    }
    this.fill=function(context){

        return this;
    }
    this.clone=function(){
        log("Dimension");
    }
}
Dimension.constructor=Dimension;
Dimension.prototype=new Shape();
Dimension.prototype.setWidth=function(width){
    this.width=width;
    this.set(this.v1.clone(),this.v2.clone());
}
Dimension.prototype.set=function (v1,v2,v3){
    if(v1==undefined){
        log("no parameters");
    }
    this.v1=v1;
    this.v2=v2||this.v1.clone();
    this.v5=v3||this.v2.clone();

    if(v3!=undefined && !(v3 instanceof Vector)){
        log("not a Vector",this.v5);
    }

    var segment=new FreeVector(this.v1,this.v2)
    var segment2=new FreeVector(this.v2,this.v5)
    var dist=segment.getPerpendicular(this.v5);
        var sa= Math.sin((segment2.alpha()-segment.alpha())*Math.PI/180);
        sa/=Math.abs(sa);


    var paralel=segment.getParalelAtDistance(dist.Length()*sa);
    this.m1=segment.getMidpoint()
    this.m2=paralel.getMidpoint()
    this.v3=paralel.a;
    this.v4=paralel.b;

    this.segments=[segment];
    this.vertices=[this.v1,this.v2,this.v5]//,this.v4,this.m2,this.m2];
    this.snapPoints.fields.end=[this.v1,this.v2,this.v3,this.v4];
    this.snapPoints.fields.mid=[this.m2];

    this.bbox=new Rectangle();
    this.bbox.left=Math.min(this.v1.x,this.v2.x,this.v3.x,this.v4.x);
    this.bbox.right=Math.max(this.v1.x,this.v2.x,this.v3.x,this.v4.x);
    this.bbox.top=Math.min(this.v1.y,this.v2.y,this.v3.y,this.v4.y);
    this.bbox.bottom=Math.max(this.v1.y,this.v2.y,this.v3.y,this.v4.y);
    this.bbox.x=this.bbox.left;
    this.bbox.y=this.bbox.top;
    this.bbox.width=this.bbox.right-this.bbox.left;
    this.bbox.height=this.bbox.bottom-this.bbox.top;
    return this;
}
//SERIALIZATION
Dimension.serialNumberID=0x00000007;
Dimension.prototype.serialize=function(){
    var s={shape:"Dimension",vertices:[]};
    for(var i=0;i<this.vertices.length;i++){
        s.vertices[i]={
            x:this.vertices[i].x,
            y:this.vertices[i].y,
            z:this.vertices[i].z,
        }
        s.vertices[i].__proto__=null;
    }
    s.vertices.__proto__=null;
    s.shape.__proto__=null;
    s.__proto__=null;
    return s;
}
Dimension.prototype.deserialize=function(o){
    var v1=new Vector().init(o.vertices[0]),v2=new Vector().init(o.vertices[1]),v3=new Vector().init(o.vertices[2]);
    //log(v1,v2,v3);
    this.set(v1,v2,v3);
    return this;
}
/**
 *
 * @constructor
 */
function Polyline(){
    Shape.call(this);
    this.snapPoints=new Table("end","mid","intersect","center");
    this.vertices=[];
    this.bbox=new Rectangle();
    this.draw=function(context){
        if(this.vertices.length>1){
            var v=this.vertices[0];
            context.beginPath();
            context.moveTo(v.x, v.y);
            for(var i=1;i<this.vertices.length;i++){
                v=this.vertices[i];
                context.lineTo(v.x, v.y);
            }
            context.closePath();
        }
        context.stroke()
        return this;
    }
    this.fill=function(context){

        context.fill();
        return this;
    }
    this.clone=function(){
        log("Polyline");
    }

}
Polyline.constructor=Polyline;
Polyline.prototype=new Shape();
/**
 *
 * @param v
 * @return {Polyline}
 * @constructor
 */
Polyline.prototype.add=function Polyline_Add(v){
    this.bbox.add(v);
    this.vertices.push(v);
    return this;
}
/**
 *
 * @param v
 * @return {Polyline}
 * @constructor
 */
Polyline.prototype.remove=function Polyline_Remove(v){
    this.bbox=new Rectangle()
    for(var i=0;i<this.vertices.length;i++){
        var point=this.vertices[i];
        this.bbox.add(point);
    }
    this.vertices.push(v);
    return this;
}
//SERIALIZATION
Polyline.serialNumberID=0x00000008;
Polyline.prototype.serialize=function(){
    var s={shape:"Polyline",vertices:this.vertices};
    for(var i=0;i<this.vertices.length;i++){
        s.vertices[i]={
            x:this.vertices[i].x,
            y:this.vertices[i].y,
            z:this.vertices[i].z,
        }
        s.vertices[i].__proto__=null;
    }
    s.vertices.__proto__=null;
    s.shape.__proto__=null;
    s.__proto__=null;
    return s;
}
Polyline.prototype.deserialize=function(o){
    for(var i=0;i< o.vertices.length;i++){
        this.vertices[i]=new Vector().init(o.vertices[i]);
    }
    return this;
}