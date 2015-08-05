/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/22/12
 * Time: 12:51 PM
 * To change this template use File | Settings | File Templates.
 */
function Symbol(){
    Shape.call(this);
}
Symbol.constructor=Symbol;
Symbol.prototype=new Shape;
Symbol.SIZE=15;

function Cursor(boxSize,wireSize){
    Shape.call(this);
    this.position=new Vector();
    this.boxSize=boxSize;
    this.wireSize=wireSize;
    this.intersects=function(){return false}
    this.bbox=new Rectangle();
}
Cursor.constructor=Cursor;
Cursor.prototype=new Shape;
Cursor.prototype.set=function(x,y){
    this.position.x=x>>0+.5;
    this.position.y=y>>0+.5;
    //this.bbox.setBounds(this.position.x-this.wireSize,this.position.y-this.wireSize,wireSize>>1,wireSize<<1);
    this.bbox.setBounds(x-this.wireSize,y-this.wireSize,this.wireSize>>1,this.wireSize<<1);
}
Cursor.prototype.draw=function (ctx){
    //ctx.save()
    //ctx.transform(1,0,0,1,this.position.x,this.position.y)
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y-this.wireSize);
    ctx.lineTo(this.position.x,this.position.y+this.wireSize);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.position.x-this.wireSize,this.position.y);
    ctx.lineTo(this.position.x+this.wireSize,this.position.y);
    ctx.stroke();
    ctx.strokeRect(this.position.x-this.boxSize/2,this.position.y-this.boxSize/2,this.boxSize,this.boxSize);
    //ctx.restore();
}
Cursor.prototype.fill=function(context){

}
function CoordinatesSymbol(arrowSize,wireSize){
    Shape.call(this);
    this.position=new Vector();
    this.arrowSize=arrowSize;
    this.wireSize=wireSize;
    this.intersects=function(){return false}
    this.bbox=new Rectangle();
}
CoordinatesSymbol.constructor=CoordinatesSymbol;
CoordinatesSymbol.prototype=new Shape;
CoordinatesSymbol.prototype.set=function(x,y){
    this.position.x=x>>0+.5;
    this.position.y=y>>0+.5;
    //this.bbox.setBounds(this.position.x-this.wireSize,this.position.y-this.wireSize,wireSize>>1,wireSize<<1);
    this.bbox.setBounds(x-this.wireSize,y-this.wireSize,this.wireSize>>1,this.wireSize<<1);
}
CoordinatesSymbol.prototype.draw=function (ctx){
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y);
    ctx.lineTo(this.position.x,this.position.y+this.wireSize);
    ctx.lineTo(this.position.x-this.arrowSize,this.position.y+this.wireSize-this.arrowSize);
    ctx.moveTo(this.position.x,this.position.y+this.wireSize);
    ctx.lineTo(this.position.x+this.arrowSize,this.position.y+this.wireSize-this.arrowSize);
    ctx.moveTo(this.position.x,this.position.y);
    ctx.lineTo(this.position.x+this.wireSize,this.position.y);
    ctx.lineTo(this.position.x+this.wireSize-this.arrowSize,this.position.y-this.arrowSize);
    ctx.moveTo(this.position.x+this.wireSize,this.position.y);
    ctx.lineTo(this.position.x+this.wireSize-this.arrowSize,this.position.y+this.arrowSize);
    ctx.stroke();
}
CoordinatesSymbol.prototype.fill=function(context){

}
function Grip(){
    Shape.call(this);
    this.position=new Vector();
    this.intersects=function(){return false}
    this.bbox=new Rectangle();
}
Grip.constructor=Grip;
Grip.prototype=new Shape;
Grip.prototype.set=function(v){
    this.position.x= v.x>>0+.5;
    this.position.y= v.y>>0+.5;
    //this.bbox.setBounds(this.position.x-this.wireSize,this.position.y-this.wireSize,wireSize>>1,wireSize<<1);
    this.bbox.setBounds(v.x-this.wireSize, v.y-this.wireSize,this.wireSize>>1,this.wireSize<<1);
    return this;
}
Grip.prototype.draw=function (ctx){
    ctx.beginPath();
    var cfcolor=ctx.fillStyle;
    var cscolor=ctx.strokeStyle;
    var s=Symbol.SIZE*.7;
    ctx.fillStyle="rgba(0,64,255,.7)";
    ctx.strokeStyle="rgba(0,64,255,1)";
    ctx.fillRect(this.position.x-s/2,this.position.y-s/2,s,s);
    ctx.strokeRect(this.position.x-s/2,this.position.y-s/2,s,s);
    ctx.fillStyle=cfcolor;
    ctx.strokeStyle=cscolor;
    //ctx.stroke();
}
Grip.prototype.fill=function (ctx){
    //log("grip");
}
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function EndPoint(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        context.strokeRect(this.bbox.x-Symbol.SIZE/2,this.bbox.y-Symbol.SIZE/2,Symbol.SIZE,Symbol.SIZE);
    }
    this.fill=function(context){

    }
}
EndPoint.constructor=EndPoint;
EndPoint.prototype=new Shape;

EndPoint.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function MidPoint(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        var x=this.v.x,y=this.v.y;
        var s=Symbol.SIZE*1.2;
        var a=2/(2+Math.sqrt(3));
        var h=Math.sqrt(3)/2;

        context.beginPath();
        context.moveTo(x -s/2,y+s*(h-a));
        context.lineTo(x,y-s*a);
        context.stroke();
        context.lineTo(x+s/2,y+s*(h-a));
        context.stroke();
        context.lineTo(x -s/2,y+s*(h-a));
        context.stroke();
    }
    this.fill=function(context){

    }
}
MidPoint.constructor=MidPoint;
MidPoint.prototype=new Shape;

MidPoint.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function IntersectPoint(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        var s=Symbol.SIZE*.6;
        context.beginPath();
        context.moveTo(x -s,y-s);
        context.lineTo(x+s,y+s);
        context.moveTo(x -s,y+s);
        context.lineTo(x+s,y-s);
        context.stroke();
    }
    this.fill=function(context){

    }
}
IntersectPoint.constructor=IntersectPoint;
IntersectPoint.prototype=new Shape;

IntersectPoint.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function NearPoint(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        var s=Symbol.SIZE*.6;
        context.beginPath();
        context.moveTo(x -s,y-s);
        context.lineTo(x+s,y+s);
        context.moveTo(x -s,y+s);
        context.lineTo(x+s,y-s);
        context.stroke();
        context.beginPath();
        context.arc(x, y, s, 0 , 2 * Math.PI, false);
        context.stroke();
    }
    this.fill=function(context){

    }
}
NearPoint.constructor=NearPoint;
NearPoint.prototype=new Shape;

NearPoint.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function NearPointOutside(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        var s=Symbol.SIZE*.6;
        var sh=s/1.5;
        context.beginPath();
        context.moveTo(x -s,y-s);
        context.lineTo(x+s,y+s);
        context.moveTo(x -s,y+s);
        context.lineTo(x+s,y-s);
        context.stroke();
        context.beginPath();
        context.arc(x, y, s, 0 , 2 * Math.PI, false);
        context.stroke();
        context.strokeRect(x+s+sh,y+s,s/6,s/6);
        context.strokeRect(x+s+2*sh,y+s,s/6,s/6);
        context.strokeRect(x+s+3*sh,y+s,s/6,s/6);
    }
    this.fill=function(context){

    }
}
NearPointOutside.constructor=NearPointOutside;
NearPointOutside.prototype=new Shape;

NearPointOutside.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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
/**
 *
 * @param x
 * @param y
 * @constructor
 */
function PerpPoint(x,y){
    Shape.call(this);
    this.set(x,y);
    this.bbox=new Rectangle(x,y);
    this.draw=function(context){
        var s=Symbol.SIZE*.6;
        context.beginPath();
        context.moveTo(x,y-2*s);
        context.lineTo(x,y);
        context.lineTo(x+2*s,y);
        context.stroke();
        context.strokeRect(x,y-s,s,s);
    }
    this.fill=function(context){

    }
}
PerpPoint.constructor=PerpPoint;
PerpPoint.prototype=new Shape;

PerpPoint.prototype.set=function (x,y){
    this.v=new Vector(x,y);

    this.points=[this.v];

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