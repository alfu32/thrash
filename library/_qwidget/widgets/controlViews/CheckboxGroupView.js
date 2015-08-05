var CheckboxGroupView=(function(){
	var CHB_GROUP=function CheckboxGroupView(){
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
		var set={};
		QProperty.call(this,['OnAfterSelectionChanged']);
		this.OnAfterSelectionChanged(function(view,data){});
		
		this.OnAfterSelectionChanged.afterSet=function(func){
			renderView();
		};
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			CHB_GROUP.clearView(v);
			for(var index in d){
				var name=d[index].name;
				var state=d[index].state;
				var input;
				var s=MAKE.div(
						{checked:state?'checked':false,className:'checkbox-group-item '+name,align:'left'}
						,{display:'inline-block',width:'168px'}
						,[
						  input=MAKE.input({type:'checkbox',value:index,checked:state})
						  ,MAKE.span({innerHTML:name})
						  ,MAKE.span({innerHTML:"("+d[index].found+")"})
						 ]);
				input.checked=state?'checked':false;
				s.children[0].onclick=(function(index,data,val){
					return function(event){
						data[index].state=!data[index].state;
						_THIS.OnAfterSelectionChanged()(v,data,val);
					}
				})(index,d,d[index])
				v.appendChild(s);
				set[index]=d[index];
			}
		}
	};
	WidgetStatic.call(CHB_GROUP);
	return CHB_GROUP;
})();