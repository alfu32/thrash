Progress=(function(){
	var CLASS=function Progress(){
    	Base.call(this,['Progress']);
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
	WidgetStatic.call(CLASS);
	return CLASS;
})();
var Progress1=(function(){
	var PROTO=function Progress1(){
		var _THIS=this;
		Widget.call(this);
		QProperty.call(_THIS,['OnClick']);
		_THIS.OnClick(function(ref){});
		
		
		_THIS.Parent.beforeSet=function(_parent){
			if(_parent===null){
				try{
					_THIS.Parent().removeChild(_THIS.View());
				}catch(err){}
			}else{
				try{
					_THIS.Parent().appendChild(_THIS.View());
				}catch(err){}
			}
		}
		var progressbar,s1,s2;
		_THIS.View(
				progressbar=MAKE.div({
					onmousedown:function(event){
						_THIS.OnClick()(_THIS);
					}
				}
					,{padding:'3px',width:'240px',border:'1px solid #07F',backgroundColor:'#777',margin:'2px'}
					,[
					  /*s2=MAKE.div({position:'absolute',innerHTML:'0%'})
					  ,*/s1=MAKE.div({align:'right'},{display:'inline-block',height:'32px',width:'0px',backgroundColor:'#07F',color:'#FFF',fontSize:'12px'})
					 ]
				)
			);
		QProperty.call(_THIS,['Progress']);
		_THIS.Progress(0);
		_THIS.Progress.afterSet=function(_value){
			try{
				s1.style.width=_value*208/100+'px'
				s1.innerHTML=parseInt(_value)+'%'
			}catch(err){}
		}
		
	}
	WidgetStatic.call(PROTO);
	return PROTO;
})()