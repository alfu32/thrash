var CheckboxView=(function(){
	var _CHB=function CheckboxView(){
    	Base.call(this,['CheckboxView']);
		var _THIS=this;
		Widget.call(this);
		_THIS.Parent.afterSet=function(_parent){
			_parent.appendChild(_THIS.View());
			renderView();
		}
		this.View(MAKE.div({},{display:'inline-block'}));
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(val){
			renderView();
		};
		QProperty.call(this,['OnAfterSelectionChanged']);
		this.OnAfterSelectionChanged(function(view,data){});
		
		this.OnAfterSelectionChanged.afterSet=function(func){
			renderView();
		};
		var renderView=function(){
			_CHB.clearView(_THIS.View());
			var name=_THIS.Data().name;
			var state=_THIS.Data().state;
			var input;
			_THIS.View().appendChild(MAKE.div({},{},[
			    input=MAKE.input({
			    	type:'checkbox'
			    	,checked:state?'checked':false
			    	,onclick:(function(data){
						return function(event){
							data.state=!data.state;
							_THIS.OnAfterSelectionChanged()(data);
						}
					})(_THIS.Data())
				})
			    ,MAKE.span({innerHTML:name})
			])
			);
			input.checked=state?'checked':false;
		}
	};
	WidgetStatic.call(_CHB);
	return _CHB;
})();