/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/17/12
 * Time: 12:20 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 *
 * @param x
 * @param y
 * @param w
 * @param h
 * @constructor
 */
function Rectangle(_x,_y,_width,_height){
    //this.position=new Vector(x||0,y||0);
    //this.size=new Vector(w||0,h||0);

    this.setBounds=function (x,y,w,h){

        this.x=x||0;
        this.width=w||0;
        this.y=y||0;
        this.height=h||0;

        this.top=this.y;
        this.left=this.x;
        this.right=this.x+this.width;
        this.bottom=this.y+this.height;
        this.v1=new Vector(this.x,this.y);
        this.v2=new Vector(this.right,this.bottom);
        return this;
    }
    this.setBounds(_x,_y,_width,_height);
}
/**
 *
 * @param el {Rectangle}{Vector}{Object}
 * @constructor
 *
 */
Rectangle.prototype.add=function Rectangle_Add(el){
    var r=new Rectangle(el.x,el.y,el.width,el.height);
    var x, y, w,h;
    this.setBounds(
        x=Math.min(r.left,this.left),
        y=Math.min(r.top,this.top),
        Math.max(r.right,this.right)-x,
        Math.max(r.bottom,this.bottom)-y
    )
    return this;
}
Rectangle.prototype.intersects=function Rectangle_Intersects(rectangle){
    return !(
        this.left>rectangle.right ||
        this.right<rectangle.left ||
        this.top>rectangle.bottom ||
        this.bottom<rectangle.top
        );
}
Rectangle.prototype.contains=function Rectangle_Contains(shape){
    return !(
        this.left<=rectangle.left &&
        this.right>=rectangle.right &&
        this.top>=rectangle.top &&
        this.bottom<=rectangle.bottom
        );
}