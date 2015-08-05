var PivotView=(function(){
	var CLASS=function PivotView(){
		
		var _THIS=this;
		Widget.call(this);
		QProperty.call(this,['Data']);
		_THIS.Data.afterSet=function(_data){
			_THIS.renderView();
		}
		QProperty.call(this,['Title']);
		_THIS.Title.afterSet=function(_title){
			title.innerHTML=_title;
		}
		QProperty.call(this,['TitleView']);
		var title;
		var tbody=MAKE.tbody();
		var thead=MAKE.tbody({},{},[MAKE.tr({},{},[title=MAKE.td({className:'Title',colSpan:2,innerHTML:'Pivot'})])]);
		
		_THIS.TitleView(title);
		this.View(MAKE.table({hasLayout:true},{},[thead,tbody]));
		
		this.renderView=function(){
			CLASS.clearView(tbody);
			var d=_THIS.Data();
			for(var i in d){
				tbody.appendChild(
					MAKE.tr({},{},[
					     MAKE.td({innerHTML:i})
					     ,MAKE.td({innerHTML:d[i]})
					])
				)
			}
			return _THIS;
		};
		
	};
	WidgetStatic.call(CLASS);
	CLASS.MAKE_rowClickEventListener=function(){
		return function(event){
		};
	};
	return CLASS;
})();