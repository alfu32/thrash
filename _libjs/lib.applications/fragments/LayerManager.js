/**
 * Created with JetBrains PhpStorm.
 * User: Alf
 * Date: 12/9/12
 * Time: 10:12 AM
 * To change this template use File | Settings | File Templates.
 */
function LayerManager(viewport,screenViewport,feedbackViewport,feedbackLayer){
    ViewController.call(this);
    var layerManager=this;
    this.unsaved=true;
    this.currentLayer=null;
    this.constructorParameters={'viewport':viewport,"screenViewport":screenViewport,'feedbackViewport':feedbackViewport,'feedbackLayer':feedbackLayer}
    this.initFromPrototype("layerList",document.getElementById("layerPanel"));
    //layerManager.setParent(null);
    this.regen=function(){
        for(var i=0;i<this.children.length;i++){
            this.children[i].onTransform();
            this.children[i].draw();
        }
    }
    this.redraw=function LayerManager_Redraw(){

    }
    this.setMatrix=function(scale,tr){
        viewport.setMatrix(scale,0,0,scale,tr.x,tr.y);
        screenViewport.setMatrix(1,0,0,1,tr.x/scale,tr.y/scale);
        feedbackViewport.setMatrix(scale,0,0,scale,tr.x,tr.y);
        layerManager.regen();
    }
    this.mouseToModel=function(mouse){
        return viewport.mouseToModel(mouse);
    }
    this.modelToMouse=function(point){
        return viewport.modelToMouse(point);
    }

    this.setTranslation=function(v){
        var s=viewport.getScale()
        viewport.setMatrix(s,0,0,s, v.x, v.y);
        //screenViewport.setMatrix(1,0,0,1, v.x/s, v.y/s);
        feedbackViewport.setMatrix(s,0,0,s, v.x, v.y);
        layerManager.regen();
    }
    this.setScale=function(s){
        var v=viewport.getTranslation()
        viewport.setMatrix(s,0,0,s, v.x, v.y);
        //screenViewport.setMatrix(1,0,0,1, v.x/s, v.y/s);
        feedbackViewport.setMatrix(s,0,0,s, v.x, v.y);
        feedbackLayer.setLineWidth(1/s/4);
        layerManager.regen();
    }
    this.translate=function(v){
        var currentTranslation=viewport.getTranslation().clone();
        this.setTranslation(currentTranslation.add(v));
    }
    this.scale=function(f){
        var scale=viewport.getScale()
        this.setScale(scale*f);
    }
    this.zoomAboutPoint=function(mousePoint,factor){
        function xf(A0,f,P,sk){
            var A1=A0+(1-f)*sk*P;
            //log(f,sk);
            return A1
        }
        //if(factor<0)log(factor);
        var sk=viewport.getScale();
        if((CanvasLayer.Scale*sk*factor/100)>1){
            return;
        }
        var p=viewport.mouseToModel(mousePoint.clone());
        var t0=viewport.getTranslation();
        var t1=new Vector(xf(t0.x,factor,p.x,sk),xf(t0.y,factor,p.y,sk))
        //symbol2.set(t1.x,t1.y);
        this.setTranslation(t1);
        this.scale(factor);

        Symbol.SIZE=15/(sk*factor);
    }
    this.zoomAboutPoint_Pinch=function(mousePoint,initialScale,factor){
        function xf(A0,f,P,sk){
            var A1=A0+(1-f)*sk*P;
            //log(f,sk);
            return A1
        }
        //if(factor<0)log(factor);
        var sk=initialScale;
        var p=viewport.mouseToModel(mousePoint.clone());
        var t0=viewport.getTranslation();
        var t1=new Vector(xf(t0.x,factor,p.x,sk),xf(t0.y,factor,p.y,sk))
        //symbol2.set(t1.x,t1.y);
        this.setTranslation(t1);
        this.setScale(factor*sk);

        Symbol.SIZE=15/(sk*factor);
    }
    //this.snapPoints=new Table("end","mid","center","intersect");
    this.clearIntersectionPoints=function(){
        var layers=this.children;
        for(var i=0;i<layers.length;i++){
            if(!layers[i].visible)continue;
            var shapes=layers[i].shapes;
            for(var j=0;j<shapes.length;j++){
                shapes[j].snapPoints.fields["intersect"].length=0;
            }
        }
    }
    this.setIntersectPoints=function(cShape){
        //if(this.clearIntersectionPoints()){}
        var layers=this.children;
        for(var i=0;i<layers.length;i++){
            var layer=layers[i];
            if(!layer.visible)continue;
            var shapes=layer.shapes;
            for(var j=0;j<shapes.length;j++){
                var shape=shapes[j];
                if(shape==cShape)continue;
                shape.setIntersectPoints(cShape);
                cShape.setIntersectPoints(shape);
            }
        }
    }
    this.regenIntersections=function(){
        this.clearIntersectionPoints();
        var layers=this.children;
        for(var i=0;i<layers.length;i++){
            var layer=layers[i];
            if(!layer.visible)continue;
            var shapes=layer.shapes;
            for(var j=0;j<shapes.length;j++){
                var shape=shapes[j];
                this.setIntersectPoints(shape);
            }
        }
    }
    this.renderItemAtIndex=function(table,index){
        var layerControlView=null//layerManager.dequeueCellWithIndex(index);
        //var layerControlView=layerManager.dequeueCellWithIndex(index);
        var layerControl=new ViewController();
        //if(layerControlView==null){
        layerControl.initFromPrototype("layerListItem",this.getView());
        layerControlView=layerControl.getView();
        //}

        if(table[index].selected){
            layerControlView.className="layerListItem_selected";
        }else{
            layerControlView.className="layerListItem";
        }
        layerControlView.children[1].innerHTML=table[index].name;
        var selectLayer_listener=function(table,index){
            return function(event){
                if(table[index].visible){
                    layerManager.currentLayer.selected=false;
                    layerManager.currentLayer=table[index]
                    layerManager.currentLayer.selected=true;
                    //this.parentNode.style.backgroundColor="rgba(255,128,0,1)";
                    layerManager.layout();
                }
            }
        }
        var toggleVisibility_listener=function(table,index){
            return function(event){
                if(layerManager.currentLayer!=table[index]){
                    var v=!table[index].visible;
                    table[index].visible=v;
                    table[index].canvasController.view.style.display=v?"":"none";
                    //log(this.children[0],v);
                    this.children[0].style.backgroundPositionX=(v?"0px":"59px")+"";
                }
            }
        }
        var settings_listener=function(table,index){
            return function(event){
                if(dlg!=null){dlg.dismiss()}
                dlg=new PropertiesEditDialog(table[index],CanvasLayer.STYLE_SELECTORS);

                dlg.onClose=function(){
                    this.layout();
                    dlg=null;
                };
                dlg.onPropertyChanged=function(){
                    this.layout();
                    //log(this);
                    layerManager.regen();
                };
                dlg.show();
            }
        }
        layerControlView.children[1].addEventListener("click",selectLayer_listener(table,index));
        var v=table[index].visible;
        layerControlView.children[2].children[0].style.backgroundPositionX=(v?"0px":"59px")+"";
        layerControlView.children[2].addEventListener("click",toggleVisibility_listener(table,index))
        layerControlView.children[0].addEventListener("click",settings_listener(table,index))
        return layerControlView;
    }
}
LayerManager.dynamicGrid=function(x,sk){
    var r=1000000/(CanvasLayer.Scale*sk);

    var d=r<100?0.05:r<200?.2:r<500 ?.5:r<1000?1:r<2000?2:r<5000?5:r<10000?10:25;
    return StringUtils.roundWithStep(x,d);
}
LayerManager.constructor=LayerManager;
LayerManager.prototype=new ViewController();
LayerManager.prototype.clean=function(child){
    //log("exterminate lman!")
    delete this.currentLayer;
    for(var i=0;i<this.children.length;i++){
        this.children[i].clean();
        delete(this.children[i]);
    }
    this.children.length=0;
    //this.layout();
}
LayerManager.prototype.addChild=function(child){
    this.children.push(child);
    this.layout();
    return this;
}
//SERIALIZATION
LayerManager.serialNumberID=0x00000000;
LayerManager.prototype.serialize=function(){
    var s={
        serializer:{
            version:'1.01',
            type:'application-x/json'
        },
        //viewportMatrix:this.constructorParameters.viewport.matrix,
        //screenViewportMatrix:this.constructorParameters.screenViewport.matrix,
        //feedbackViewportMatrix:this.constructorParameters.feedbackViewport.matrix,
        //feedbackLayer:this.constructorParameters.feedbackLayer.serialize(),
        layers:{}}
    s.layers.length=this.children.length;
    for(var i=0;i<this.children.length;i++){
        s.layers[i]=this.children[i].serialize();
    }
    s.serializer.__proto__=null;
    s.layers.__proto__=null;
    s.__proto__=null;
    return s;
}
LayerManager.prototype.deserialize=function(s){
    layerManager.clean();
    for(var i=0;i< s.layers.length;i++){
        var layer=new CanvasLayer("mainCanvas",viewport,document.getElementById("centerPanel"),feedbackLayer.canvasController.view);
        layer.deserialize(s.layers[i]);
        //log("LayerManager.prototype.deserialize ",layer);
        layerManager.addChild(layer);

    }
    input2=null;
    input=null;
    currentShape=null;
    layerManager.currentLayer=layer;
    layerManager.currentLayer.selected=true;
    layerManager.regenIntersections();
    layerManager.regen();
    layerManager.layout();
}