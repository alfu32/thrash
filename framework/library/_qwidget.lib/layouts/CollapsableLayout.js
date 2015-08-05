var CollapsableLayout1=(function(){
	var CLASS=function CollapsableLayout1(){
    	Base.call(this,['CollapsableLayout1']);
		var _THIS=this;
		Widget.call(this);
		var view,titleViews={};
		this.Parent.afterSet=function(_parent){
			_THIS.renderView();
			_parent.appendChild(_THIS.View())
		}
		QProperty.call(this,['OnTitleClick']);
		_THIS.OnTitleClick(function(ref,index,visibility){});
		QProperty.call(this,['TitleIDAtIndex']);
		_THIS.TitleIDAtIndex(function(ref,index){return index});
		QProperty.call(this,['TitleElementAtIndex']);
		_THIS.TitleElementAtIndex(function(ref,index){return ref.Children()[index].View().parentNode.parentNode.parentNode.previousElementSibling});
		QProperty.call(this,['TitleAtIndex']);
		_THIS.TitleAtIndex(function(ref,index,view){
				var txt,top,title;
				var visibility=false;
				var _target=ref.Children()[index];
				title=MAKE.div({
					align:'center'
					,id:_THIS.TitleIDAtIndex()(ref,index)
					,onclick:function(event){
						if(_target.Visible()){
							_target.hide();
							title.style.backgroundColor='#FFF';
							title.style.color='#122227';
							visibility=false;
						}else{
							_target.show();
							title.scrollIntoView();
							title.style.backgroundColor='#63009c';
							title.style.color='#FFF';
							visibility=true;
						}
						_THIS.OnTitleClick()(ref,index,visibility);
					}
					,onmousedown:function(event){}
					,onmouseup:function(event){}
					,onmouseout:function(event){}
				},{fontSize:'26px',color:'#121227',padding:'12px',backgroundImage:'url(image/expand.gif)',backgroundColor:'#FFF',backgroundPosition:'100% 50%',backgroundRepeat:'no-repeat'}
				,[
					top=MAKE.button({
						innerHTML:CLASS.STRINGS['PORTAIL.LABEL.TOP']
						,onclick:function(event){
							//firstNode.parentNode.scrollIntoView();
							NORM.stopPropagation(event);
							NORM.preventDefault(event);
							return false;
					}},{width:'10%',display:'inline-block',float:'left',fontSize:'10px',height:'32px'})
					,txt=MAKE.box({align:'center',innerHTML:index},{width:'90%',display:'inline-block',textDecoration:'underline'})
				])
				return MAKE.div({},{},[title,MAKE.div({align:'center'})]);
		});
		QProperty.call(this,['BodyAtIndex']);
		_THIS.BodyAtIndex(function(ref,index,id){return MAKE.div({},{backgroundColor:'#e7e3ff',margin:0,padding:0,outline:0},[
		])});
		
		_THIS.View(view=MAKE.table({},{width:'100%'}))
		var views={}
		_THIS.getViewAtIndex=function(index){
			return views[index];
		}
		_THIS.getTitleViewAtIndex=function(index){
			return titleViews[index];
		}
		this.renderView=function(){
			CLASS.clearView(view);
			titleViews={}
			var children=this.Children();
			var _body,tbody;
			for(var name in children){
				var child=children[name];
				child.renderView();
				var id=_THIS.TitleAtIndex()(_THIS,name,child);
				titleViews[name]=id;
				tbody=MAKE.tbody({},{},[
					MAKE.tr({},{},[MAKE.td({align:'center'},{},[
						id
					])])
					,MAKE.tr({},{},[MAKE.td({align:'center'},{},[
						_body=_THIS.BodyAtIndex()(_THIS,name,id)
					])])
					,MAKE.tr({},{borderCollapse:'collapse'},[MAKE.td({align:'center'},{height:'1px',background:'#566669'/*,borderBottom:'1px solid #BCCCCD',borderTop:'1px solid #89999A'*/},[
					])])
				]);
				child.Parent(_body);
				_body.appendChild(child.View());
				views[name]=child.View()
				view.appendChild(tbody);
				child.Visible(false);
			}
			return this;
		};
		_THIS.toggleChildByIndex=function CollapsabelLayout1_showId(index){
				var _target=_THIS.Children()[index];
				if(_target.Visible()){
					_target.hide();
					title.style.backgroundColor='#FFF';
					title.style.color='#122227';
					visibility=false;
				}else{
					_target.show();
					title.scrollIntoView();
					title.style.backgroundColor='#63009c';
					title.style.color='#FFF';
					visibility=true;
				}
		}
		this.showAll=function(){
			var children=_THIS.Children();
			for(var name in children){
				children[name].show();
			}
			return this;
		}
		this.hideAll=function(){
			var children=_THIS.Children();
			for(var name in children){
				children[name].hide();
			}
			return this;
		}
		this.scroll=function(child){
			var k=0;
			var children=this.Children();
			for(var name in children){
				if(children[name]==child){
					_THIS.View().children[0].children[3*k].scrollIntoView();
					return this;
				}
				k++;
			}
			return this;
		};
	};
	WidgetStatic.call(CLASS);
	CLASS.STRINGS_FETCH('CollapsableLayout',['PORTAIL.LABEL.TOP']);
	return CLASS;
})();
var CollapsableLayout=(function(){
	var CLASS=function CollapsableLayout(){
    	Base.call(this,['CollapsableLayout']);
		var _THIS=this;
		Widget.call(this);
		QProperty.call(this,['OnShowChild']);
		_THIS.OnShowChild(function(children,name,visibility){})
		var view=window.MAKE.div();
		this.View(view);
		this.View().className="CollapsableLayout";
		var tbody=window.MAKE.div({},{
			/*backgroundImage:'url(image/loadinfo_03.gif)'
			,backgroundPosition:'50% 50%'
			,backgroundRepeat:'no-repeat'*/
		});
		view.appendChild(tbody);
		var firstNode=document.body;
		this.Children({});
		this.Children.afterSet=function(_children){
			_THIS.renderView();
		}
		this.Parent.afterSet=function(_parent){
			_THIS.renderView();
			_parent.appendChild(_THIS.View())
		}
		//@ override
		this.append=function(child){
			var children=_THIS.Children();
			if(child.name in children){return this;}
			children[child.name]=child.widget;
			var first=true;
			
			for(var name in children){
				var child=children[name];
				if(first){
					firstNode=children[name].View();
					child.show();
					first=false;
				}else{
					child.hide();
				}
			}
			return this;
		};
		this.TitleAtIndex=function(index,value){
			if(arguments.length>1){
				tbody.children[index*3+1].children[1].innerHTML=value;
				return this;
			}else{
				return tbody.children[index*3+1].children[1].innerHTML
			}
		}
		this.TitleForIndex=function(name){
			var children=_THIS.Children(),i=0;
			for(var k in children){
				if(k==name)
					return tbody.children[i*3+1];
				i++;
			}
		}
		this.renderView=function(){
			CLASS.clearView(tbody);
			/*SET.css(tbody,{
			backgroundImage:''
			,backgroundPosition:''
			,backgroundRepeat:''})*/
			var hr=document.createElement("hr");
			tbody.appendChild(hr);
			var children=this.Children()
			for(var name in children){
				var child=children[name];
				child.renderView();//.renderView();
				var top=MAKE.button({
					innerHTML:CLASS.STRINGS['PORTAIL.LABEL.TOP']
					,onclick:function(event){
					firstNode.parentNode.scrollIntoView();
					NORM.stopPropagation(event);
					NORM.preventDefault(event);
					return false;
				}},{float:'left',fontSize:'70%',height:'32px'})
				var txt=MAKE.div({align:'center',innerHTML:name});
				
				var title=MAKE.div({
					className:"Title"
					,onmousedown:function(event){}
					,onmouseup:function(event){}
					,onmouseout:function(event){}
				},{},[top,txt])
				title.onclick=(function COLLAPSABLE_LAYOUT_TITLE_Click(body,title,_children,_name,_target){
					return function(event){
						/*for(var n in _children){
							_children[n].hide();
						}*/
						var visibility=false;
						if(_target.Visible()){
							title.className="Title Hidden";
							_target.hide();
							visibility=false;
						}else{
							title.className="Title Visible Title_Highlight";
							_target.show();
							title.scrollIntoView();
							visibility=true;
						}
						_THIS.OnShowChild()(_children,_name,visibility);
						//_target.show();
					};})(tbody,title,children,name,child)
				var body
					body=MAKE.div({align:"center",className:'Container'});
					child.Parent(body)
				try{
					body.appendChild(child.View())
				}catch(err){
					alert(children[name].View())
				}
				var hr=MAKE.hr();
				
				tbody.appendChild(title);
				tbody.appendChild(body);
				tbody.appendChild(hr);
			}
			return this;
		};
		this.showAll=function(){
			var children=_THIS.Children();
			for(var name in children){
				children[name].show();
			}
			return this;
		}
		this.hideAll=function(){
			var children=_THIS.Children();
			for(var name in children){
				children[name].hide();
			}
			return this;
		}
		this.scroll=function(child){
			var k=0;
			var children=this.Children();
			for(var name in children){
				if(children[name]==child){
					_THIS.View().children[0].children[3*k].scrollIntoView();
					return this;
				}
				k++;
			}
			return this;
		};
	};
	WidgetStatic.call(CLASS);
	CLASS.STRINGS_FETCH('CollapsableLayout',['PORTAIL.LABEL.TOP']);
	return CLASS;
})();