/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/8/12
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */
function Selector(layer){
    this.targetLayerView=layer.canvasController.getView()
    this.selection=[];
    this.initialSelection=[];
    this.points=[];
    var type=Selector.SELECTION_TYPE.CROSSING;
    var operation=Selector.SELECTION_OPERATION.ADD;
    this.bbox=new Rectangle();
    this.view=document.createElement("canvas");
    this.view=document.createElement("div");
    this.targetLayerView.parentNode.insertBefore(this.view,this.targetLayerView);
    this.view.style.position="absolute";
    this.view.style.textAlign="center";
    //this.view.style.paddingLeft="auto";
    //this.view.style.paddingTop="auto";
    this.view.style.overflow="hidden";
    this.view.style.color="grey";
    this.view.style.display="table-cell";
    this.view.style.verticalAlign="bottom";
    this.view.style.border="1px dashed grey";
    this.view.style.background="rgba(77, 190, 154, 0.298039)";
    this.view.style.boxShadow="black 8px 8px 16px, rgba(0, 0, 0, 0.690196) 0px 0px 8px inset";
    this.view.style.display="none";
    this.view.className="selector";
    var tv=document.createElement("div");
    tv.style.color="rgba(255,255,255, .8)";
    tv.style.fontSize="32px";
    tv.style.textShadow="0px 1px 0px black";
    this.view.appendChild(tv);

    this.show=function(){
        this.view.style.display="";
    }
    this.hide=function(){
        this.view.style.display="none";
    }
    this.set=function(v1,v2){
        this.bbox.setBounds(v1.x,v1.y);
        this.bbox.add(v2);
        type=(v1.x>v2.x)?Selector.SELECTION_TYPE.CROSSING:Selector.SELECTION_TYPE.BOUNDING;
        operation=(v1.y>v2.y)?Selector.SELECTION_OPERATION.REMOVE:Selector.SELECTION_OPERATION.ADD;
        this.view.style.border=(type==Selector.SELECTION_TYPE.BOUNDING)?"1px solid grey":"1px dashed grey";
        this.view.style.background=(operation==Selector.SELECTION_OPERATION.ADD)?"rgba(77, 190, 154, 0.298039)":"rgba(255, 0, 0, 0.298039)";
        tv.innerHTML=/*((type==Selector.SELECTION_TYPE.BOUNDING)?"in":"cross")+":"+*/((operation==Selector.SELECTION_OPERATION.ADD)?"+":"-");

        var m=layer.viewport.modelToMouse(new Vector(this.bbox.x,this.bbox.y));
        var sw=layer.canvasController.getView().offsetWidth-1;
        var sh=layer.canvasController.getView().offsetHeight-1;
        var s=layer.viewport.getScale();
        var w=this.bbox.width*s,h=this.bbox.height*s;
        if((w+ m.x)>sw){
            w=sw- m.x
        }
        if(m.x<0){
            w+= m.x-5;
            m.x=1;
        }
        if((h+ m.y)>sh){
            h=sh- m.y
        }
        if(m.y<0){
            h+= m.y-5
            m.y=1
        }
        this.view.style.top=this.targetLayerView.offsetTop+ m.y+"px";
        this.view.style.left=this.targetLayerView.offsetLeft+ m.x+"px";
        this.view.style.width=w+"px";
        this.view.style.height=h+"px";
        //this.view.style.paddingLeft=(-5+(w/2)<<0)+"px";
        tv.style.paddingTop=(-16+(h/2)<<0)+"px";
    }
    this.getSelection=function(layers){
        var selection=[];

        for(var i=0;i<layers.length;i++){
            if(!layers[i].visible)continue;
            var shapes=layers[i].shapes;
            for(var j=0;j<shapes.length;j++){
                var shape=shapes[j];
                if(shape.intersectsRectangle(this.bbox)){
                    var points=shape.getPointsInRectangle(this.bbox);
                    for(var k=0;k<points.length;k++){
                        points[k].shape=shape;
                    }
                    var segments=shape.getSegmentsInRectangle(this.bbox);
                    if(type==Selector.SELECTION_TYPE.CROSSING)selection=selection.concat(points);
                    else selection=selection.concat([shape]); // disabled for now
                    //selection=selection.concat(segments); // disabled for now
                }
            }
        }
        this.selection=selection;
        this.initialSelection=[];
        this.points=[];
        for(var i=0;i<selection.length;i++){
            this.initialSelection[i]=(new Vector(selection[i].x,selection[i].y));
            var grip=new Grip().set(this.initialSelection[i]);
            grip.shape=selection[i].shape;
            this.points[i]=(grip);
        }
    }
    this.selectVertices=function(model){

    }
    this.selectObjects=function(model){

    }
    this.select=function(model){

    }
    this.clear=function(){
        this.selection.length=0;
        this.initialSelection.length=0;
        this.points.length=0;
    }
    this.add=function(model){

    }
    this.remove=function(model){

    }
    this.isSelected=function(shape){
        var length=this.selection.length;
        for(var i=0;i<length;i++){
            if(this.selection[i].shape==shape)return true
            if(this.selection[length-i-1].shape==shape)return true
        }
        return false;
    }
}
Selector.constructor=Selector;
Selector.SELECTION_OPERATION={
    REMOVE:0,
    ADD:1
}
Selector.SELECTION_TYPE={
    CROSSING:0,
    BOUNDING:1
}