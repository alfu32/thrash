var SelectView=(function(){
	var SELECT=function SelectView(){
		var _THIS=this;
		Widget.call(this);
		_THIS.Parent.afterSet=function(_parent){
			renderView();
			_parent.appendChild(_THIS.View());
		}
		var select
		this.View(MAKE.select({onchange:function(event){
					_THIS.OnSelectionChanged()(_THIS,_THIS.View(),_THIS.Data());
					_THIS.OnChange()(_THIS.Link(),_THIS.View(),_THIS.selectedIndex,this.value)
					_THIS.SelectedValue(_THIS.Data()[this.value]);
					_THIS.selectedIndex=this.value;
				}}));
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(val){
			renderView();
		};
		var set={};
		QProperty.call(this,['Link']);
		_THIS.Link({})
		
		QProperty.call(this,['OnSelectionChanged']);
		_THIS.OnSelectionChanged(function(event){})
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(event){})
		
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
		QProperty.call(this,['SelectedValue']);
		this.SelectedValue.afterSet=function(index){
			//console.log('SelectView.SelectedValue.afterSet',index)
			_THIS.View().selected=index;
			_THIS.selectedIndex=index;
			//renderView();
		};
		_THIS.SelectedValue('*')
		
		this.selectedIndex=0;
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			SELECT.clearView(v);
			//select.innerHTML="";
			//v.style.backgroundImage="url('image/loading-touring1-big.gif')";
			//v.style.backgroundColor="transparent";
			var norecord=new RegExp(" no record ",'gi')
			var i=0;var iht="";
			for(var k in d){
				var val=d[k];
				if(val==undefined){continue;}
				var f=_THIS.SelectedValue()==k;
				var s;
				if(f){
					_THIS.selectedIndex=k+'';
					s=MAKE.option({
						value:k
						,innerHTML:val
						,selected:true}
					,{});
				}
				else{
					s=MAKE.option({
						value:k
						,innerHTML:val}
					,{});
				}
				if(val.match(norecord)){
					s.style.color="#808080";
					s.style.backgroundColor="#DDDDDD";
					}
				else{
					s.style.backgroundColor="#FFFFFF";
				}
				v.appendChild(s);
				set[k]=val;
				i++;
			}
		}
	};
	WidgetStatic.call(SELECT);
	return SELECT;
})();