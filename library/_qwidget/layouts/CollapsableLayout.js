
var CollapsableLayout=(function(){
	var CLASS=function CollapsableLayout(){
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
				var top=MAKE.button({className:"TopButton",innerHTML:CLASS.STRINGS['PORTAIL.LABEL.TOP'],onmousedown:function(event){
					firstNode.parentNode.scrollIntoView();
					NORM.stopPropagation(event);
					NORM.preventDefault(event);
				}})
				var txt=MAKE.div({className:"TitleText",innerHTML:name});
				
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
							_target.View().scrollIntoView();
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