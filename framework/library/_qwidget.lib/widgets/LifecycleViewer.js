
var LifecycleViewer=(function(){
	var PROTO=function LifecycleViewer(){
    	Base.call(this,['LifecycleViewer']);
		var _THIS=this;
		Widget.call(_THIS);
		QProperty.call(this,['Data']);
		_THIS.Data([]);
		_THIS.Data.afterSet=function(){
			renderView();
		}
		QProperty.call(this,['Selected']);
		_THIS.Selected(0);
		_THIS.Selected.afterSet=function(){
			renderView();
		}
		var tr;
		_THIS.View(make.table({},{borderCollapse:'collapse'},[make.tbody({},{borderCollapse:'collapse'},[tr=make.tr({},{borderCollapse:'collapse'})])]));
		
		var renderView=function(){
			var d=_THIS.Data();
			var s=_THIS.Selected();
			PROTO.clearView(tr);
			var w=(90/d.length)+'%';
			
			for(var i=0;i<d.length;i++){
				var bcolor=i<s?"#DDD":i==s?"#233338":"#AAA";
				var bkcolor=i<s?"#DDD":i==s?"#122227":"";
				var color=i<s?"#888":i==s?"#FFF":"#555";
				tr.appendChild(
					make.td({
						align:'left'
						,innerHTML:d[i]
					},{
						fontSize:'10px'
						,padding:'2px'
						,backgroundColor:bkcolor
						,color:color
						,borderBottom:'4px solid '+bcolor
					})
				);
			}
		}
	}
	WidgetStatic.call(PROTO);
	return PROTO;
})();