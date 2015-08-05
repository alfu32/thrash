var VListLayout=(function(){
	var APP=function VListLayout(){
		Widget.call(this);
		var _THIS=this;
		var viewTemplate=new HTMLTemplateFactory('<div class="##CLASS_NAME##"><img src="##IMG##"/>##TITLE##</div>');
		this.View(MAKE.div());
		var lastClicked=null;
		this.Children.afterSet=function(data){
			var v=_THIS.View();
			APP.clearView(v);
			for(var i=0;i<data.length;i++){
				var child=viewTemplate.makeInstance(data[i])
				child.Parent(v);
				var cv=child.View();
				cv.onclick=data[i].LISTENER;
				cv.onmousedown=(function(type){return function(event){
					if(lastClicked!=null){lastClicked.style.backgroundColor="";}
					this.style.backgroundColor="#96d4df";
					lastClicked=this;
					}
				})(cv.className);
				cv.onmouseover=(function(type){return function(event){this.className="hover"}})(cv.className);
				cv.onmouseout=(function(type){return function(event){this.className=type}})(cv.className);
				cv.onmouseleave=(function(type){return function(event){this.className=type}})(cv.className);
			};
		}
	};
	WidgetStatic.call(APP);
	return APP;
})();

var VLayout = (function() {
    var CLASS = function VLayout() {
        var _THIS = this;
        Widget.call(this);
        
        QProperty.call(this,['OnChildClick']);
        this.OnChildClick(function(widget){});
        this.OnChildClick.afterSet=function(_function){
        	//renderView();
        }
        
        
        var tbody;
        this.View(MAKE.table({className:'VLayout'},{},[tbody=MAKE.tbody()]));
        this.Parent.afterSet=function(_parent){
            renderView();
           if(_parent!=null)_parent.appendChild(_THIS.View());
        }
        this.Children.afterSet=function(_parent){
            renderView();
        }
        //this.renderView=function(){renderView()};
        var renderView=function(){
            CLASS.clearView(tbody);
			var children=_THIS.Children();
			for(var name in children){
				var cssDef={}
				if(children[name]['SetParentCss']!=null){cssDef=children[name].SetParentCss()}
				var td=MAKE.td(
						{
							align:_THIS.Align()
							,onmousedown:(function(_child){
								return function(event){
									_THIS.OnChildClick()(_child);
								}
							})(children[name].View())
						}
						,cssDef
				);
				children[name].Parent(td);
				tbody.appendChild(MAKE.tr({},{},[td]));
			}
			return _THIS;
		};
        
        QProperty.call(this,['VAlign']);
        this.VAlign('bottom');
        this.VAlign.afterSet=function(_align){
        	renderView();
        }
		
        QProperty.call(this,['Align']);
        this.Align.afterSet=function(_align){
        	renderView();
        }
        this.Align('center');
	};
	WidgetStatic.call(CLASS);
	return CLASS;
})();