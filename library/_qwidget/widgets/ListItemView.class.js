var ListItemView=(function(){
	var APP=function ListItemView(_view){
		Widget.call(this);
		var _THIS=this;
		this.View(_view||MAKE.div({className:"ListItemView",innerHTML:"ListItemView"}));
		//this.View().className="ListItemView"
		QProperty.call(this,['Text']);
		_THIS.Text.afterSet=function(_value){
			_THIS.View().innerHTML=_value;
		}
		QProperty.call(this,['OnClick']);
		_THIS.OnClick.afterSet=function(_callback){
			_THIS.View().onclick=_callback;
		}
	};
	WidgetStatic.call(APP);
	return APP;
})();