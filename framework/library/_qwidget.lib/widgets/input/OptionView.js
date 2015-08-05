var OptionView=(function(){
	var OPTION=function OptionView(fields){
    	Base.call(this,['OptionView']);
		var _THIS=this;
		Widget.call(this);
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,value){});
		
		this.View(MAKE.select({
			onchange:function(event){
				_THIS.OnChange()(_THIS,{index:this.value,values:(_THIS.Data())})
			}
		}));
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
		QProperty.call(this,['SelectedKey']);
		this.SelectedKey.afterSet=function(key){
			_THIS.View().value=key;
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
var OptionView2=(function(){
	var OPTION=function OptionView2(){
    	Base.call(this,['OptionView2']);
		var _THIS=this;
		Widget.call(this);
		QProperty.call(this,['SectionID']);
		_THIS.SectionID(null);
		QProperty.call(this,['SectionViewAtIndex']);
		_THIS.SectionViewAtIndex(function(ref,sectionIndex){
			return MAKE.optgroup({label:sectionIndex},{backgroundColor:"#777",color:'#FFF'})
		});
		QProperty.call(this,['OptionViewAtIndex']);
		_THIS.OptionViewAtIndex(function(ref,data,index){
			return MAKE.option({value:index,innerHTML:data[index]},{backgroundColor:"#FFF",color:'#000'})
		});
		QProperty.call(this,['SectionID']);
		_THIS.SectionID(null);
		
		QProperty.call(this,['OnClose']);
		_THIS.OnClose(function(ref){});
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(ref,value){});
		
		this.View(MAKE.select({
			onchange:function(event){
				_THIS.OnChange()(_THIS,{index:this.value,values:(_THIS.Data())})
			}
		}));
		QProperty.call(this,['Data']);
		this.Data.afterSet=function(val){
			renderView();
		};
		QProperty.call(this,['Selected']);
		this.Selected.afterSet=function(val){
			renderView();
			var set=_THIS.Data();
			for(var i in set){
				if(set[i]==val){
				_THIS.View().value=i;
				return;
				}
			}
		};
		QProperty.call(this,['SelectedKey']);
		this.SelectedKey.afterSet=function(key){
			_THIS.View().value=key;
		};
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			OPTION.clearView(v);
			if(_THIS.SectionID()==null){
				for(var i in d){
					var s=MAKE.option({value:i,innerHTML:d[i]});
					v.appendChild(s);
				}
			}else{
				var sections={}
				for(var i in d){
					var sectionIndex
					try{
						sectionIndex=_THIS.SectionID()(_THIS,i);
					}catch(err){
						sectionIndex='error'
					}
					if(sections[sectionIndex]==undefined){
						sections[sectionIndex]=_THIS.SectionViewAtIndex()(_THIS,sectionIndex)
					}
					sections[sectionIndex].appendChild(_THIS.OptionViewAtIndex()(_THIS,d,i));
				}
				for(var s in sections){
					v.appendChild(sections[s]);
				}
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