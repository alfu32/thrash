Progress=(function(){
	var CLASS=function Progress(){
		var _THIS=this;
		Widget.call(this);
		_THIS.Parent.beforeSet=function(_parent){
			renderView();
		}
		QProperty.call(this,['OnMin'])
		QProperty.call(this,['OnMax'])
		QProperty.call(this,['OnProgress'])
		_THIS.OnMin(function(val){});
		_THIS.OnMax(function(val){});
		_THIS.OnProgress(function(val){});
		
		QProperty.call(this,['Min'])
		_THIS.Min(0);
		QProperty.call(this,['Max'])
		_THIS.Max(100);
		QProperty.call(this,['Progress'])
		_THIS.Progress(0)
		_THIS.Progress.afterSet=function(value){
			var $else=true
			var val=parseInt(10000*value/(_THIS.Max()-_THIS.Min()))/100
			feed.style.width=parseInt(val)+"%"
			feed.innerHTML=val+"%"
			
			if(val>=_THIS.Max()){
				$else=false;
				_THIS.OnMax()(val)
			}
			if(val<=_THIS.Min()){
				$else=false;
				_THIS.OnMin()(val)
			}if($else){
				_THIS.OnProgress()(val)
			}
		}
		var feed;
		_THIS.View(MAKE.div({},{width:'100%'},[
		    feed=MAKE.div({},{
		    	backgroundColor:'#00FFFF'
		    	,width:'0%'
		    	,height:'120px'
		    })
		]))
		var renderView=function(){
			return _THIS;
		}
	}
	WidgetStatic.call(CLASS)
	return CLASS;
})()