var ListView=(function(){
	var APP=function ListView(){
    	Base.call(this,['ListView']);
		Widget.call(this);
		var _THIS=this;
		this.View(MAKE.div());
		QProperty.call(this,['ViewForIndex'])
		_THIS.ViewForIndex(function(parent,data,index){
			return data[index]
		})
		QProperty.call(this,['SectionForIndex'])
		_THIS.SectionForIndex(function(index){
			return false;
		})
		this.Children.afterSet=function(data){
			var v=_THIS.View();
			APP.clearView(v);
			for(var i=0;i<data.length;i++){
				var child=_THIS.ViewForIndex()(_THIS,data,i);
				child.Parent(v);
			};
		}
	};
	WidgetStatic.call(APP);
	return APP;
})();