Selector=(function(){
	var CLASS=function Selector(target){
    	Base.call(this,['Selector']);
		var _THIS=this;
		Widget.call(this);
	    QProperty.call(this,['OnSelectStart'])
	    _THIS.OnSelectStart(function(bbox){})
	    QProperty.call(this,['OnSelecting'])
	    _THIS.OnSelecting(function(bbox){})
	    QProperty.call(this,['OnSelectEnd'])
	    _THIS.OnSelectEnd(function(bbox){})
	    
	    var Z;
	    if(isNaN(parseFloat(document.body.style.zoom))){Z=1}
	    else {Z=parseFloat(document.body.style.zoom);}
	    
	    var type=Selector.SELECTION_TYPE.CROSSING;
	    var operation=Selector.SELECTION_OPERATION.ADD;
	    var vectors=[];
	    var bbox={t:0,l:0,r:0,b:0}
	    var v,tv,mask;
	    _THIS.View(
	    	MAKE.div({},{},[
	    	    v=MAKE.div({
		    	className:'selector'
			    },{
			    	position:"absolute"
			    	,textAlign:'center'
			    	,overflow:"hidden"
			    	,color:"grey"
			    	,display:"inline-block"
			    	,border:"1px dashed grey"
			    	,background:"rgba(77, 190, 154, 0.298039)"
			    	,fontSize:"32px"
			    	,textShadow:"0px 1px 0px black"
			    },[
			       	tv=MAKE.div({},{
					color:"rgba(255,255,255, .8)"
			    	,display:"inline-block"
					,fontSize:"32px"
					,textShadow:"0px 1px 0px black"
			       })
			    ])
	    	    ,mask=MAKE.div({
		    	className:'selector'
	    		,onmousemove:function(event){
	    			var x=event.layerX/Z+GET.X(target),y=event.layerY/Z+GET.Y(target);
	    			if(vectors.length==0){
						vectors[0]={x:x,y:y}
						vectors[1]={x:x,y:y}
	    			}
	    			else vectors[1]={x:x,y:y}
	    			_THIS.set();
	    			_THIS.OnSelecting()(bbox)
	    		}
	    		,onmouseup:function(event){
	    			_THIS.set();
	    			_THIS.OnSelectEnd()(bbox);
	    			_THIS.hide();
	    		}
	    	},{
			    position:"absolute"
			    ,backgroundColor:'rgba(0,0,0,0.1)'
	    		,top:'0px'
	    		,left:'0px'
	    		,width:'0px'
	    		,height:'0px'
	    	})])
		)
	    this.show=function(begin){
	    	var x=begin.X+GET.X(target),y=begin.Y+GET.Y(target);
				vectors[0]={x:x,y:y}
				vectors[1]={x:x,y:y}
	    	_THIS.Parent(document.body);
	    	SET.css(mask,{
	    		top:GET.Y(target)+'px'
	    		,left:GET.X(target)+'px'
	    		,width:target.offsetWidth+'px'
	    		,height:target.offsetHeight+'px'
	    	})
	    	_THIS.set();
	    	vectors.length=0;
	        _THIS.View().style.display="";
	    	_THIS.OnSelectStart()(bbox);
	        return _THIS;
	    }
	    this.hide=function(){
	    	_THIS.Parent().removeChild(_THIS.View())
	        _THIS.View().style.display="none";
	        return _THIS;
	    }
	    this.set=function(){
	    	if(vectors.length<2)return;
	    	var b={},e={},ltr=vectors[0].x<vectors[1].x,ttd=vectors[0].y<vectors[1].y;
	    	if(ltr){b.x=vectors[0].x;e.x=vectors[1].x}
	    	else{e.x=vectors[0].x;b.x=vectors[1].x}
	    	if(ttd){b.y=vectors[0].y;e.y=vectors[1].y}
	    	else{e.y=vectors[0].y;b.y=vectors[1].y}
	    	bbox={
	    		t:b.y
	    		,l:b.x
	    		,r:e.x
	    		,b:e.y
	    	}
	    	SET.css(v,{
	    		top:b.y+'px'
	    		,left:b.x+'px'
	    		,width:(e.x-b.x)+'px'
	    		,height:(e.y-b.y)+'px'
	    		,border:ltr?'1px solid grey':'1px dashed grey'
	    		,backgroundColor:ttd?"rgba(77, 190, 154, 0.298039)":"rgba(190, 77, 154, 0.298039)"
	    	})
	    }
	}
	CLASS.SELECTION_OPERATION={
	    REMOVE:0,
	    ADD:1
	}
	CLASS.SELECTION_TYPE={
	    CROSSING:0,
	    BOUNDING:1
	}
	return CLASS;
})();