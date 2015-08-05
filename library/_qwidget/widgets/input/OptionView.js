var OptionView=(function(){
	var OPTION=function OptionView(fields){
		var _THIS=this;
		Widget.call(this);
		this.View(MAKE.select());
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(val){
			renderView();
		};
		var set={};
		QProperty.call(this,['Selected']);
		this.Selected.afterSet=function(val){
			renderView();
			for(var i in set){
				if(set[i]==val){
				_THIS.View().value=i;
				return;
				}
			}
		};
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			OPTION.clearView(v);
			for(var i=0;i<d.length;i++){
				var kv=d[i].split("=");
				var s=MAKE.option({value:kv[0],innerHTML:kv[1]});
				v.appendChild(s);
				set[kv[0]]=kv[1];
			}
		}
	};
	WidgetStatic.call(OPTION);
	OPTION.onChange_listener=function(field){
		return function(event){
			field.value=this.value;
		}
	}
	return OPTION;
})();