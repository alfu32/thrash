var SelectView1=(function(){
	var PROTO=function SelectView1(){
    	Base.call(this,['SelectView1']);
		var _THIS=this;
		Widget.call(this);
		_THIS.Parent.afterSet=function(_parent){
			renderView();
			_parent.appendChild(_THIS.View());
		}
		var select
		QProperty.call(this,['ItemAtIndex']);
		_THIS.ItemAtIndex(
			function(ref,index){
				var val=ref.Data()[index];
				if(val==undefined){return;}
				var s;
				if(ref.SelectedValue()==index){
					_THIS.selectedIndex=index+'';
					s=MAKE.option({
						value:index
						,innerHTML:val
						,selected:'selected'});
				}
				else{
					s=MAKE.option({
						value:index
						,innerHTML:val});
				}
				if(index.indexOf('*')>-1){
					s.style.backgroundColor='#E0E0FF';
				}
				return s;
			}
		)
		this.ItemAtIndex.afterSet=function(val){
			renderView();
		};
		QProperty.call(this,['Multiple']);
		this.Multiple.afterSet=function(val){
			try{
				if(val && !isNaN(parseInt(val))){
					_THIS.View().multiple=true;
					_THIS.View().size=12;
				}else{
					_THIS.View().multiple=false;
					_THIS.View().size=1;
				}
			}catch(error){
				
			}
		};
		_THIS.Multiple(false);
		
		QProperty.call(this,['SectionIDForIndex']);
		_THIS.SectionIDForIndex(null)
		this.SectionIDForIndex.afterSet=function(val){
			renderView();
		};
		QProperty.call(this,['SectionAtIndex']);
		_THIS.SectionAtIndex(
			function(ref,index,sid){
				var s=MAKE.optgroup({
					label:sid
				});
				return s;
			}
		)
		this.SectionAtIndex.afterSet=function(val){
			renderView();
		};
		this.View(MAKE.select({onchange:function(event){
					_THIS.OnSelectionChanged()(_THIS,_THIS.View(),_THIS.Data());
					_THIS.OnChange()(_THIS.Link(),_THIS.View(),_THIS.selectedIndex,this.value)
					//_THIS.SelectedValue(_THIS.Data()[this.value]);
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
		
		this.selectedIndex=0;
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			PROTO.clearView(v);
			var norecord=new RegExp(" no record ",'gi')
			var i=0;var kref;
			var has_sections=_THIS.SectionIDForIndex()!==null;
			if(has_sections){
				var optgroups={}
				for(var k in d){
					var sectionID=_THIS.SectionIDForIndex()(_THIS,k);
					if(optgroups[sectionID]===undefined){
						optgroups[sectionID]=_THIS.SectionAtIndex()(_THIS,k,sectionID);
					}
					var s=_THIS.ItemAtIndex()(_THIS,k)
					var val=d[k];
					if(s==undefined)continue;
					optgroups[sectionID].appendChild(s);
					if(k.indexOf('*')>-1){
						kref=s;
					}
					set[k]=val;
					i++;
				}
				for(var id in optgroups){
					v.appendChild(optgroups[id])
				}
			}else{
				for(var k in d){
					var s=_THIS.ItemAtIndex()(_THIS,k)
					var val=d[k];
					if(s==undefined)continue;
					v.appendChild(s);
					if(k.indexOf('*')>-1){
						kref=s;
					}
					set[k]=val;
					i++;
				}
				if(kref!==null)try{v.insertBefore(kref,v.children[0]);}catch(error){}
			}
		}
		QProperty.call(this,['SelectedValue']);
		this.SelectedValue.afterSet=function(index){
			//console.log('SelectView.SelectedValue.afterSet',index)
			_THIS.View().selected=index;
			_THIS.selectedIndex=index;
			renderView();
		};
		_THIS.SelectedValue('*');
		_THIS.Value=_THIS.SelectedValue;
	};
	WidgetStatic.call(PROTO);
	return PROTO;
})();
var SelectView=(function(){
	var PROTO=function SelectView(){
    	Base.call(this,['SelectView']);
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
			PROTO.clearView(v);
			//select.innerHTML="";
			//v.style.backgroundImage="url('image/loading-touring1-big.gif')";
			//v.style.backgroundColor="transparent";
			var norecord=new RegExp(" no record ",'gi')
			var i=0;var iht="";var kref=null;
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
				if(k.indexOf('*')>-1){
					s.style.backgroundColor='#E0E0FF';
					kref=s;
				}
				v.appendChild(s);
				set[k]=val;
				i++;
			}
			if(kref!==null)v.insertBefore(kref,v.children[0]);
		}
	};
	WidgetStatic.call(PROTO);
	return PROTO;
})();

var MultipleSelectView=(function(){
	var PROTO=function MultipleSelectView(){
    	Base.call(this,['MultipleSelectView']);
		var _THIS=this;
		Widget.call(this);
		var select
		_THIS.Parent.afterSet=function(_parent){
			renderView();
			_parent.appendChild(_THIS.View());
		}
		QProperty.call(this,['Data']);
		_THIS.Data.afterSet=function(val){
			renderView();
		};
		QProperty.call(this,['Size']);
		_THIS.Size(12);
		_THIS.Size.afterSet=function(val){
			select.size=val;
		};
		
		QProperty.call(this,['OnChange']);
		_THIS.OnChange(function(widget,view){})
		
		QProperty.call(this,['Select']);
		this.Select.afterSet=function(val){
			renderView();
			for(var i in set){
				if(set[i]==val){
				_THIS.View().value=i;
				return;
				}
			}
		};
		QProperty.call(this,['SelectValue']);
		this.SelectValue.afterSet=function(index){
			//console.log('SelectView.SelectedValue.afterSet',index)
			_THIS.View().selected=index;
			_THIS.selectedIndex=index;
			//renderView();
		};
		
		_THIS.Selection=function(map){
			if(map===undefined){
				var map={}
				for(var j=0;j<select.children.length;j++){
					var item=select.children[j];
					if(item.selected){
						map[item.value]=item.innerHTML;
					}
				}
				return map;
			}else{
				for(var j=0;j<select.children.length;j++){
					var item=select.children[j];
					if(item.value in map){
						item.setAttribute('selected','selected');
					}
				}
			}
		};
		
		_THIS.View(
			select=MAKE.select({
				size:_THIS.Size()
				,align:'center'
				,multiple:true
				,onchange:function(event){
					_THIS.OnChange()(_THIS,this);
				}
			},{width:'22em'})
		);
		
		var renderView=function(){
			var d=_THIS.Data();
			var v=_THIS.View();
			PROTO.clearView(select);
			for(var i in d){
				select.appendChild(MAKE.option({innerHTML:d[i],value:i},{backgroundImage:'',backgroundPosition:'100% 50%',backgroundRepeat:'no-repeat'}))
			}
		}
	};
	WidgetStatic.call(PROTO);
	return PROTO;
})();