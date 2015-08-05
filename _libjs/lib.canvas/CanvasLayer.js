/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 11/19/12
 * Time: 4:28 PM
 * To change this template use File | Settings | File Templates.
 */
function CanvasLayer(canvasPrototypeID,viewport,parent,sibling){
    this.name="layer";
    this.lineWidth=100;
    this.doubleLineWidth=2500;
    this.selected=false;
    this.visible=true;
    this.shapes=[];
    /**
     *
     * @type {HTMLCanvasElement}
     */
    this.canvasController=new ViewController();
    this.canvasController.initFromPrototype(canvasPrototypeID,parent,sibling);
    var cnv=this.canvasController.getView();
    cnv.width=viewport.screen.v1.x-viewport.screen.v0.x;
    cnv.height=viewport.screen.v1.y-viewport.screen.v0.y;
    cnv.style.display="";
    this.context=cnv.getContext('2d');
    this.viewport=viewport;
    /**
     *
     * @param style {String}{Object}
     * @return {CanvasLayer}
     */
    this.setStyle=function (style){
        if(style instanceof String){
            var s=style.split(';')
            for(var i=0;i< s.length;i++){
                var kv=s[i].split(':');
                this.context[kv[0]]=kv[1];
            }
            return this;
        }
        if(style instanceof Object){
            for(var i in style){
                this.context[i]=style[i];
            }
            return this;
        }
        return this;
    }
    /**
     * fill
     * @param pattern
     */
    this.setName=function(name){
        this.name=name;
    }
    this.getName=function(){
        return this.name;
    }
    this.setDoubleLineWidth=function(width){
        this.doubleLineWidth=width;
    }
    this.getDoubleLineWidth=function(){
        return this.doubleLineWidth;
    }
    this.setHatchStyle=function(patternStyleName){
        var patternStyle=PatternStyle.ANSI[patternStyleName];
        if(patternStyle!=undefined){
            this.hatchStyle=new Pattern(patternStyle,this.fillColor.getRGBAString(),this.viewport.getScale());
            this.context.fillStyle=this.hatchStyle.pattern;
        }
    }
    this.setDashStyle=function(patternStyleName){
        var patternStyle=PatternStyle.ANSI[patternStyleName];
        if(patternStyle!=undefined){
            this.dashStyle=new Pattern(patternStyle,this.strokeColor.getRGBAString());
            this.context.strokeStyle=this.dashStyle.pattern;
        }
    }
    this.setFillStyle=function (pattern){
        //log(pattern);
        if(this.fillColor==null){
            //log("init");
            this.fillColor=new Color();
        }
        if(this.fillPattern==null){
            if(pattern instanceof Pattern){
                this.fillPattern=pattern;
            }
        }
        this.fillColor.setFromString(pattern)
        this.context.fillStyle=this.fillColor.getRGBAString();
    }
    this.getFillStyle=function (){
        var s=this.fillColor.getDString();//this.context.fillStyle//
        //log("getFillStyle",s,this.fillColor);
        return s;
    }

    this.setFillAlpha=function (v){
        if(this.fillColor!=undefined){
            this.fillColor.a=v>1?v/100:v;
            this.context.fillStyle=this.fillColor.getRGBAString();
        }else{
            log("setFillAlpha : the other case");
        }
    }
    this.getFillAlpha=function (){
        if(this.fillColor!=undefined){
            return this.fillColor.a*100;
        }else{
            return 100;
        }
    }
    /**
     * stroke
     * @param pattern
     */
    this.setStrokeStyle=function (pattern){
        //log(pattern);
        if(this.strokeColor==null)this.strokeColor=new Color();
        this.strokeColor.setFromString(pattern);
        this.context.strokeStyle=this.strokeColor.getRGBAString();
    }
    this.getStrokeStyle=function (){
        var s=this.strokeColor.getDString();//this.context.strokeStyle//
        gs=this.strokeColor;//this.context.strokeStyle//
        //log("getStrokeStyle",s,gs);
        return s;
    }

    this.setStrokeAlpha=function (v){
        //log(v);
        if(this.strokeColor!=undefined){
            this.strokeColor.a=v>1?v/100:v;
            this.context.strokeStyle=this.strokeColor.getRGBAString();
        }else{
            log("setStrokeAlpha : the other case");
        }
    }
    this.getStrokeAlpha=function (){
        if(this.strokeColor!=undefined){
            return this.strokeColor.a*100;
        }else{
            return 100;
        }
    }

    this.setLineWidth=function (width){
        this.lineWidth=width;
        this.context.lineWidth=CanvasLayer.Scale*width/10;
    }
    this.getLineWidth=function (width){
        return this.lineWidth;
    }

    this.setLineCap=function (cap){
        this.context.lineCap=cap;
    }
    this.getLineCap=function (cap){
        return this.context.lineCap;
    }

    this.setLineJoin=function (join){
        this.context.lineJoin=join;
    }
    this.getLineJoin=function (){
        return this.context.lineJoin;
    }

    this.setGlobalCompositeOperation=function (_gco){
        this.context.globalCompositeOperation=_gco;
    }
    this.getGlobalCompositeOperation=function (){
        return this.context.globalCompositeOperation;
    }

    this.setMiterLimit=function (limit){
        this.context.miterLimit=limit;
    }
    this.getMiterLimit=function (){
        return this.context.miterLimit;
    }

    this.setShadowBlur=function (blurSize){
        this.context.shadowBlur=blurSize;
    }
    this.getShadowBlur=function (){
        return this.context.shadowBlur;
    }

    this.setShadowColor=function (color){
        this.context.shadowColor=color;
    }
    this.getShadowColor=function (){
        return this.context.shadowColor;
    }

    this.setShadowOffsetX=function (dx){
        this.context.shadowOffsetX=dx;
    }
    this.getShadowOffsetX=function (){
        return this.context.shadowOffsetX;
    }

    this.setShadowOffsetY=function (dy){
        this.context.shadowOffsetY=dy;
    }
    this.getShadowOffsetY=function (){
        return this.context.shadowOffsetY;
    }

    this.setTextBaseline=function (baseline){
        this.context.textBaseline=baseline;
    }
    this.getTextBaseline=function (){
        return this.context.textBaseline;
    }
    this.setTextAlign=function (align){
        this.context.textAlign=align;
    }
    this.getTextAlign=function (){
        return this.context.textAlign;
    }

    this.setWidth=function (width){
        this.canvas.width=width;
    }
    this.getWidth=function (){
        return this.canvas.width;
    }

    this.setHeight=function (height){
        this.canvas.height=height;
    }
    this.getHeight=function (){
        return this.canvas.height;
    }
}
CanvasLayer.Scale=50;
CanvasLayer.TEXT_BASELINE={
    top:'top',
    hanging:'hanging',
    middle:'middle',
    alphabetic:'alphabetic',
    ideographic:'ideographic',
    bottom:'bottom'
}
CanvasLayer.TEXT_ALIGN={
    start:'start',
    end:'end',
    left:'left' ,
    center:'center' ,
    right:'right'
}
CanvasLayer.LINE_CAP={
    butt:'butt',
    round:'round',
    square:'square'
}
CanvasLayer.LINE_JOIN={
    miter:'miter',
    round:'round',
    bevel:'bevel'
}
CanvasLayer.COMPOSITE_OPERATION={
    sourceOver:'source-over',
    sourceIn:'source-in',
    sourceOut:'source-out',
    sourceAtop:'source-atop',
    destinationOver:'destination-over',
    destinationIn:'destination-in',
    destinationOut:'destination-out',
    destinationAtop:'destination-atop',
    lighter:'lighter',
    darker:'darker',
    copy:'copy',
    xor:'xor'
}
CanvasLayer.STYLE_SELECTORS={
    name:"text",
    doubleLineWidth:"number",
    strokeStyle:"color",
    strokeAlpha:"range",
    fillStyle:"color",
    fillAlpha:"range",
    lineWidth:"number",
    lineCap:"list:LINE_CAP",
    lineJoin:"list:LINE_JOIN",
    globalCompositeOperation:"list:COMPOSITE_OPERATION",
    miterLimit:"range",
    shadowBlur:"range",
    shadowColor:"color",
    shadowOffsetX:"range",
    shadowOffsetY:"range",
    textBaseline:"list:TEXT_BASELINE",
    textAlign:"list:TEXT_ALIGN",
}
CanvasLayer.prototype.onTransform=function(){

    //if(this.hatchStyle!=null)this.setHatchStyle(this.hatchStyle.definition);
}
CanvasLayer.prototype.draw=function CanvasLayer_Draw(ignoreTransform){
    //log('draw');
    if(this.isScaledCanvas)this.setLineWidth(this.lineWidth);
    //else this.context.lineWidth=1;
    var u=2*ignoreTransform;
    this.context.clearRect(-10,-10, this.canvasController.getView().width+10,this.canvasController.getView().height+10);

    //var v=this.viewport.modelToScreen.ApplyTo(new Vector(this.canvasController.getView().width-u,this.canvasController.getView().height-u));
   // var w=this.viewport.modelToScreen.ApplyTo(new Vector(u,u));
    this.context.save()
    if(!ignoreTransform)this.viewport.matrix.ApplyTransform(this.context);

    //this.context.translate(.5,.5);
    //this.context.strokeRect(w.x, w.y, v.x-u, v.y-u);
    for(var i=0;i<this.shapes.length;i++){
        this.shapes[i].fill(this.context);
        this.shapes[i].draw(this.context);
    }
    //this.context.stroke();
    //this.context.fill();
    //this.context.translate(-.5,-.5);
    if(!ignoreTransform)this.viewport.inverseMatrix.ApplyTransform(this.context);
    this.context.restore()
}
CanvasLayer.prototype.transformMouseCoordinates=function CanvasLayer_TransformMouse(v){
    return this.viewport.transformToModel(v);
}
CanvasLayer.prototype.transformModelCoordinates=function CanvasLayer_TransformModelCoordinates(v){
    return this.viewport.transformToScreen(v);
}
CanvasLayer.prototype.clean=function(){
    //log(this.canvasController.view.parentNode);
    this.canvasController.view.parentNode.removeChild(this.canvasController.view);
    //this.canvasController.clean();
    this.shapes.length=0;
}
//SERIALIZATION
CanvasLayer.serialNumberID=0x00000001;
CanvasLayer.prototype.serialize=function(){
    var s={};
    for(var i in CanvasLayer.STYLE_SELECTORS){
        var n=i[0].toUpperCase()+ i.substr(1);
        if(typeof this["get"+n] == 'function')s[i]=this["get"+n]();
    }
    s.shapes=[];
    for(var i=0;i<this.shapes.length;i++){
        s.shapes[i]=this.shapes[i].serialize();
        //log(this.name,s.shapes[i]);
    }
    return s;
}
CanvasLayer.prototype.deserialize=function(o){
    var layer=this;
    //log(o);
    for(var i in o){
        var n=i[0].toUpperCase()+ i.substr(1);
        if(i=="shapes")continue;
        if(layer["set"+n])layer["set"+n](o[i]);
    }
    for(var i=0;i< o.shapes.length;i++){
        var shape=new window[o.shapes[i].shape]().deserialize(o.shapes[i]);
        //log("CanvasLayer.prototype.deserialize ",this,shape);
        layer.shapes[layer.shapes.length]= shape;
    }
    return layer;
}